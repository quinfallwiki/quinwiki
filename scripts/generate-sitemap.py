"""
Generate sitemap.xml for The Quinfall Wiki.

  - 4 languages × 15 pages = 60 URLs
  - <xhtml:link rel="alternate" hreflang="..."> for every URL pointing to
    the same page in the other 3 languages + an x-default to TR
  - lastmod = today

Run: `python scripts/generate-sitemap.py`
Output: public/sitemap.xml
"""
from __future__ import annotations
from datetime import date
from pathlib import Path
import xml.sax.saxutils as sx

SITE_URL = "https://quinwiki.com"
LOCALES = ("tr", "en", "de", "ru")
DEFAULT_LOCALE = "tr"

# Mirror of src/routes/pages.ts (key -> slug + priority hint)
PAGES = [
    ("home",       "",               1.0,  "weekly"),
    ("guide",      "rehber",         0.9,  "weekly"),
    ("classes",    "siniflar",       0.8,  "weekly"),
    ("crafting",   "crafting",       0.8,  "weekly"),
    ("dungeons",   "zindanlar",      0.9,  "weekly"),
    ("items",      "itemler",        0.9,  "weekly"),
    ("craftCalc",  "craft-hesaplama",0.6,  "monthly"),
    ("mounts",     "binekler-petler",0.7,  "weekly"),
    ("sailing",    "denizcilik",     0.7,  "weekly"),
    ("caravan",    "kervan",         0.7,  "weekly"),
    ("leveling",   "level-kasma",    0.8,  "weekly"),
    ("gallery",    "galeri",         0.5,  "monthly"),
    ("system",     "sistem",         0.5,  "monthly"),
    ("updates",    "guncellemeler",  0.9,  "daily"),
    ("studio",     "vawraek",        0.4,  "monthly"),
    ("contact",    "iletisim",       0.4,  "yearly"),
]


def url_for(lang: str, slug: str) -> str:
    trail = f"/{slug}" if slug else ""
    return f"{SITE_URL}/{lang}{trail}"


def build():
    today = date.today().isoformat()
    lines = [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"',
        '        xmlns:xhtml="http://www.w3.org/1999/xhtml">',
    ]

    for lang in LOCALES:
        for _key, slug, prio, freq in PAGES:
            loc = url_for(lang, slug)
            lines.append("  <url>")
            lines.append(f"    <loc>{sx.escape(loc)}</loc>")
            lines.append(f"    <lastmod>{today}</lastmod>")
            lines.append(f"    <changefreq>{freq}</changefreq>")
            lines.append(f"    <priority>{prio:.1f}</priority>")
            # hreflang alternates (one for every locale + x-default)
            for alt_lang in LOCALES:
                alt_loc = url_for(alt_lang, slug)
                lines.append(
                    f'    <xhtml:link rel="alternate" hreflang="{alt_lang}" href="{sx.escape(alt_loc)}"/>'
                )
            lines.append(
                f'    <xhtml:link rel="alternate" hreflang="x-default" href="{sx.escape(url_for(DEFAULT_LOCALE, slug))}"/>'
            )
            lines.append("  </url>")

    lines.append("</urlset>\n")

    out = Path(__file__).resolve().parent.parent / "public" / "sitemap.xml"
    out.write_text("\n".join(lines), encoding="utf-8")
    size_kb = out.stat().st_size // 1024
    print(f"wrote {out}  ({size_kb} KB, {len(LOCALES) * len(PAGES)} URLs)")


if __name__ == "__main__":
    build()
