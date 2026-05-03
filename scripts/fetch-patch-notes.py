"""
Fetch Quinfall patch notes / announcements from Steam, then auto-translate
the missing-language entries via Google's free translate endpoint.

Steam exposes a per-app RSS feed at:
  https://store.steampowered.com/feeds/news/app/<APPID>/?l=<lang>

For Quinfall the publisher only ships English copy on Steam — the `tr`,
`de` and `ru` feeds repeat the same English body. So we additionally run
each English title + body through the public translate.googleapis.com
endpoint (no key, used by the Chrome translate widget) for the three
non-English languages.

Output is a single JSON file at public/data/patch-notes.json which the
wiki loads at runtime — no live CORS dance, no backend.

Run:  python scripts/fetch-patch-notes.py
"""
from __future__ import annotations
import html
import json
import re
import sys
import time
import urllib.parse
import urllib.request
import xml.etree.ElementTree as ET
from pathlib import Path
from datetime import datetime, timezone

APP_ID = "2294660"
ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "public" / "data" / "patch-notes.json"

# Steam serves localised feeds through the `l=` query.  The `german` and
# `russian` languages are the ones that actually return localised copy;
# `turkish` works too — but for Quinfall most strings remain English.
LANG_MAP = {
    "en": "english",
    "tr": "turkish",
    "de": "german",
    "ru": "russian",
}

UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36"

TAG_RE = re.compile(r"<[^>]+>")
WHITESPACE_RE = re.compile(r"\s+")


def fetch(url: str) -> str:
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    with urllib.request.urlopen(req, timeout=30) as resp:
        return resp.read().decode("utf-8", errors="replace")


def parse_pubdate(s: str) -> str | None:
    """Steam emits RFC-822 dates; convert to ISO-8601 UTC."""
    try:
        dt = datetime.strptime(s, "%a, %d %b %Y %H:%M:%S %z")
        return dt.astimezone(timezone.utc).isoformat()
    except Exception:
        return None


def text_summary(raw: str, max_chars: int = 280) -> str:
    """Strip BBCode/HTML and trim to a card-sized snippet."""
    if not raw:
        return ""
    s = html.unescape(raw)
    s = re.sub(r"\[/?\w[^\]]*\]", " ", s)
    s = TAG_RE.sub(" ", s)
    s = WHITESPACE_RE.sub(" ", s).strip()
    if len(s) > max_chars:
        s = s[: max_chars - 1].rstrip() + "…"
    return s


def parse_feed(xml_text: str) -> list[dict]:
    try:
        root = ET.fromstring(xml_text)
    except ET.ParseError as exc:
        print(f"  ! XML parse error: {exc}", file=sys.stderr)
        return []
    items = []
    for item in root.findall(".//item"):
        guid_el  = item.find("guid")
        title_el = item.find("title")
        link_el  = item.find("link")
        date_el  = item.find("pubDate")
        desc_el  = item.find("description")
        guid = (guid_el.text or "").strip() if guid_el is not None else ""
        if not guid:
            continue
        items.append({
            "guid":    guid,
            "title":   (title_el.text or "").strip() if title_el is not None else "",
            "link":    (link_el.text or "").strip()  if link_el  is not None else "",
            "pubDate": parse_pubdate((date_el.text or "").strip()) if date_el is not None else None,
            "summary": text_summary(desc_el.text or "", 240) if desc_el is not None else "",
            "body":    text_summary(desc_el.text or "", 1200) if desc_el is not None else "",
        })
    return items


def gtranslate(text: str, target: str, source: str = "en") -> str | None:
    """Use the public translate.googleapis.com endpoint that the Chrome
    translate widget hits. No API key required, free, but informally
    rate-limited. Returns None on failure so the caller can fall back."""
    if not text or not text.strip():
        return text
    if len(text) > 4500:
        chunks: list[str] = []
        cur = ""
        for sentence in re.split(r"(?<=[.!?…])\s+", text):
            if len(cur) + len(sentence) + 1 > 3500:
                chunks.append(cur)
                cur = sentence
            else:
                cur = (cur + " " + sentence).strip() if cur else sentence
        if cur:
            chunks.append(cur)
        translated = []
        for c in chunks:
            t = gtranslate(c, target, source)
            if t is None:
                return None
            translated.append(t)
            time.sleep(0.4)
        return " ".join(translated)

    params = {
        "client": "gtx", "sl": source, "tl": target, "dt": "t", "q": text,
    }
    url = "https://translate.googleapis.com/translate_a/single?" + urllib.parse.urlencode(params)
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    try:
        with urllib.request.urlopen(req, timeout=30) as resp:
            payload = json.loads(resp.read().decode("utf-8", errors="replace"))
    except Exception as exc:
        print(f"  ! translate {source}->{target} failed: {exc}", file=sys.stderr)
        return None

    try:
        chunks = payload[0] or []
        return "".join(c[0] for c in chunks if c and c[0])
    except Exception:
        return None


def fill_translations(by_guid: dict[str, dict]) -> None:
    """For every entry, run EN -> {tr, de, ru} when those languages are
    missing or are an exact copy of the English text."""
    targets = ("tr", "de", "ru")
    for slot in by_guid.values():
        en_title   = slot["titles"].get("en", "")
        en_summary = slot["summaries"].get("en", "")
        en_body    = slot["bodies"].get("en", "")
        if not en_title and not en_body:
            continue

        any_translated = False
        for tgt in targets:
            if (slot["titles"].get(tgt, "") in ("", en_title)) and en_title:
                t = gtranslate(en_title, tgt)
                if t and t != en_title:
                    slot["titles"][tgt] = t
                    any_translated = True
                time.sleep(0.3)
            if (slot["summaries"].get(tgt, "") in ("", en_summary)) and en_summary:
                t = gtranslate(en_summary, tgt)
                if t and t != en_summary:
                    slot["summaries"][tgt] = t
                    any_translated = True
                time.sleep(0.3)
            if (slot["bodies"].get(tgt, "") in ("", en_body)) and en_body:
                t = gtranslate(en_body, tgt)
                if t and t != en_body:
                    slot["bodies"][tgt] = t
                    any_translated = True
                time.sleep(0.4)
        if any_translated:
            print(f"  translated {slot['id']}")


def main():
    by_guid: dict[str, dict] = {}

    for lang_code, lang_steam in LANG_MAP.items():
        url = f"https://store.steampowered.com/feeds/news/app/{APP_ID}/?l={lang_steam}"
        print(f"=== {lang_code} ({lang_steam}) ===")
        try:
            xml_text = fetch(url)
        except Exception as exc:
            print(f"  ! fetch failed: {exc}", file=sys.stderr)
            continue
        items = parse_feed(xml_text)
        print(f"  {len(items)} entries")
        for it in items:
            slot = by_guid.setdefault(it["guid"], {
                "id":       guid_to_id(it["guid"]),
                "guid":     it["guid"],
                "link":     it["link"],
                "pubDate":  it["pubDate"],
                "titles":   {},
                "summaries":{},
                "bodies":   {},
            })
            slot["titles"][lang_code]    = it["title"]
            slot["summaries"][lang_code] = it["summary"]
            slot["bodies"][lang_code]    = it["body"]
            if lang_code == "en":
                slot["link"]    = it["link"]
                slot["pubDate"] = it["pubDate"]

    print()
    print("=== Auto-translating missing languages (en -> tr/de/ru) ===")
    fill_translations(by_guid)

    entries = sorted(by_guid.values(), key=lambda e: e["pubDate"] or "", reverse=True)

    payload = {
        "fetchedAt": datetime.now(timezone.utc).isoformat(),
        "appId":     APP_ID,
        "count":     len(entries),
        "entries":   entries[:30],
    }

    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text(json.dumps(payload, ensure_ascii=False, indent=2), encoding="utf-8")
    size_kb = OUT.stat().st_size // 1024
    print()
    print(f"wrote {OUT}  ({size_kb} KB, {len(entries)} entries -> top 30)")


def guid_to_id(guid: str) -> str:
    m = re.search(r"/view/(\d+)", guid)
    if m:
        return m.group(1)
    nums = re.findall(r"\d+", guid)
    if nums:
        return nums[-1]
    return re.sub(r"[^A-Za-z0-9_-]+", "-", guid)[:40]


if __name__ == "__main__":
    main()
