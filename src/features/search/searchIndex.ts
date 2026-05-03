/**
 * Site-wide search index. Aggregates entries from:
 *   - PAGES (top-level wiki pages)
 *   - WORLD_BOSSES + DUNGEONS (combat content)
 *   - HUNTING_ZONES (54 zones lifted from mob_alanlari_tablosu)
 *   - CRAFTING_TIERS (professions)
 *   - item_tablosu / material_tablosu / prop_tablosu / ...
 *
 * Language-aware: titles are taken from the active i18n locale + the
 * `baslik_loc_<Lang>` field in items.json.
 *
 * Index is built lazily on first open and cached by language code.
 */
import type { TFunction } from 'i18next';

import { PAGES } from '@/routes/pages';
import { WORLD_BOSSES, INSTANCED_DUNGEONS } from '@/data/dungeons';
import { HUNTING_ZONES } from '@/data/leveling';
import { CRAFTING_TIERS } from '@/data/craftingTiers';
import { loadItemDb } from '@/data/items';
import { getLocalized } from '@/data/types';
import { getLanguage, FALLBACK_LANGUAGE, type LanguageCode } from '@/i18n/languages';

export type EntryKind =
  | 'page'
  | 'item'
  | 'material'
  | 'prop'
  | 'boss'
  | 'dungeon'
  | 'zone'
  | 'profession';

export interface SearchEntry {
  id: string;
  kind: EntryKind;
  /** Localized display title */
  title: string;
  /** Optional secondary line (level / type / etc.) */
  subtitle?: string;
  /** Where to navigate on click; if absent, the modal stays open and emits a callback */
  href?: string;
  /** Optional icon path (under /assets/...) */
  iconUrl?: string;
  /** Lowercase haystack used for matching */
  haystack: string;
}

const ICON_BASE = '/assets/icons/';
let cache: Map<string, SearchEntry[]> = new Map();

/** Build (or fetch cached) entries for the given language. */
export async function buildIndex(lang: LanguageCode, t: TFunction): Promise<SearchEntry[]> {
  if (cache.has(lang)) return cache.get(lang)!;

  const language = getLanguage(lang);
  const fallback = getLanguage(FALLBACK_LANGUAGE);
  const langPrefix = `/${lang}`;
  const entries: SearchEntry[] = [];

  // ---- Pages -------------------------------------------------------------
  for (const p of PAGES) {
    const title = String(t(p.navKey, { defaultValue: p.key }));
    const summary = String(t(`pages.${p.key}.summary`, { defaultValue: '' }));
    entries.push({
      id: `page:${p.key}`,
      kind: 'page',
      title,
      subtitle: summary || undefined,
      href: `${langPrefix}/${p.slug}`,
      haystack: norm(`${title} ${summary} ${p.key} ${p.slug}`),
    });
  }

  // ---- World bosses ------------------------------------------------------
  for (const b of WORLD_BOSSES) {
    const name = String(t(`worldBossRoster.list.${b.id}.name`, {
      ns: 'dungeons', defaultValue: b.id,
    }));
    entries.push({
      id: `boss:${b.id}`,
      kind: 'boss',
      title: name,
      subtitle: b.kind,
      href: `${langPrefix}/zindanlar`,
      haystack: norm(`${name} ${b.kind} boss`),
    });
  }

  // ---- Dungeons ----------------------------------------------------------
  for (const d of INSTANCED_DUNGEONS) {
    const name = String(t(`dungeonRoster.list.${d.id}.name`, {
      ns: 'dungeons', defaultValue: d.id,
    }));
    entries.push({
      id: `dungeon:${d.id}`,
      kind: 'dungeon',
      title: name,
      href: `${langPrefix}/zindanlar`,
      haystack: norm(`${name} dungeon zindan`),
    });
  }

  // ---- Hunting zones -----------------------------------------------------
  for (const bracket of HUNTING_ZONES) {
    for (const z of bracket.zones) {
      entries.push({
        id: `zone:${z.name}`,
        kind: 'zone',
        title: z.name,
        subtitle: `Lvl ${bracket.label}${z.party ? ' · ' + String(t('zones.partyFlag', { ns: 'leveling', defaultValue: 'Party' })) : ''}`,
        href: `${langPrefix}/level-kasma`,
        haystack: norm(`${z.name} lvl${bracket.label} hunting`),
      });
    }
  }

  // ---- Professions -------------------------------------------------------
  for (const prof of CRAFTING_TIERS) {
    const name = String(t(`professionsList.${prof.id}.name`, {
      ns: 'crafting', defaultValue: prof.id,
    }));
    entries.push({
      id: `prof:${prof.id}`,
      kind: 'profession',
      title: name,
      subtitle: `${prof.totalRecipes} ` + String(t('matrix.stats.recipesShort', { ns: 'crafting', defaultValue: 'recipes' })),
      href: `${langPrefix}/crafting`,
      iconUrl: prof.iconCode ? `${ICON_BASE}${prof.iconCode}.png` : undefined,
      haystack: norm(`${name} ${prof.id} profession meslek`),
    });
  }

  // ---- Items / materials / props (heavy — async DB) ---------------------
  try {
    const db = await loadItemDb();
    const sources: { kind: EntryKind; rows: typeof db.item_tablosu; href: string }[] = [
      { kind: 'item',     rows: db.item_tablosu,     href: `${langPrefix}/itemler` },
      { kind: 'material', rows: db.material_tablosu, href: `${langPrefix}/itemler` },
      { kind: 'prop',     rows: db.prop_tablosu,     href: `${langPrefix}/itemler` },
    ];
    for (const src of sources) {
      for (const it of src.rows) {
        const title = getLocalized(it, 'baslik', language, fallback);
        const titleEn = String(it.baslik_loc_English ?? '');
        if (!title && !titleEn) continue;
        const typeLabel = getLocalized(it, 'tip', language, fallback);
        entries.push({
          id: `${src.kind}:${it.id}`,
          kind: src.kind,
          title: title || titleEn,
          subtitle: typeLabel || undefined,
          href: src.href,
          iconUrl: it.icon1 ? `${ICON_BASE}${it.icon1}.png` : undefined,
          haystack: norm(`${title} ${titleEn} ${typeLabel}`),
        });
      }
    }
  } catch (err) {
    console.warn('search index: items DB unavailable', err);
  }

  cache.set(lang, entries);
  return entries;
}

/** Reset cache (e.g. after language change of the underlying t function). */
export function clearSearchCache() {
  cache = new Map();
}

/* -------------------------------------------------------------------------- */
/*  Matching                                                                  */
/* -------------------------------------------------------------------------- */

const TOKEN_SPLIT = /[\s\-_/.,;:!?()[\]"']+/;

/** Normalize text for matching — lowercase + strip diacritics + collapse whitespace. */
function norm(s: string): string {
  return s
    .toLocaleLowerCase('tr')
    // strip Turkish/Latin diacritics
    .replace(/ı/g, 'i')
    .replace(/ğ/g, 'g')
    .replace(/ü/g, 'u')
    .replace(/ş/g, 's')
    .replace(/ö/g, 'o')
    .replace(/ç/g, 'c')
    .replace(/é/g, 'e')
    .replace(/[^\p{L}\p{N}\s]/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

interface Scored {
  entry: SearchEntry;
  score: number;
}

/** Search the index. Higher score = better match. */
export function search(entries: SearchEntry[], rawQuery: string, limit = 50): Scored[] {
  const q = norm(rawQuery);
  if (!q) return [];
  const tokens = q.split(TOKEN_SPLIT).filter(Boolean);
  if (tokens.length === 0) return [];

  const results: Scored[] = [];
  for (const e of entries) {
    const hay = e.haystack;
    let score = 0;

    // Exact title match — biggest boost
    const titleNorm = norm(e.title);
    if (titleNorm === q) score += 1000;
    if (titleNorm.startsWith(q)) score += 500;

    let allTokensMatch = true;
    for (const tk of tokens) {
      const idx = hay.indexOf(tk);
      if (idx === -1) {
        allTokensMatch = false;
        break;
      }
      // Token-prefix match in haystack
      if (idx === 0 || hay[idx - 1] === ' ') score += 50;
      // General hit
      score += 10;
      // Closer to start = slightly better
      score += Math.max(0, 30 - idx);
    }
    if (!allTokensMatch) continue;

    // Boost certain kinds (pages > others when all else equal)
    if (e.kind === 'page')       score += 80;
    if (e.kind === 'profession') score += 30;
    if (e.kind === 'boss')       score += 25;
    if (e.kind === 'dungeon')    score += 25;
    if (e.kind === 'zone')       score += 15;

    results.push({ entry: e, score });
  }

  results.sort((a, b) => b.score - a.score);
  return results.slice(0, limit);
}

export const KIND_ORDER: EntryKind[] = [
  'page', 'profession', 'boss', 'dungeon', 'zone',
  'item', 'material', 'prop',
];
