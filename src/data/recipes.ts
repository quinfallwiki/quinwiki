/**
 * Recipe / craft helpers — small index over `craft_tablosu` so item
 * modals can show "who makes this" and a clickable material list.
 */
import {
  loadItemDb,
  getIconPath,
} from '@/data/items';
import {
  getRecipeMaterials,
  type ItemDb,
  type RawCraftRecipe,
  type RawItem,
  type RawMaterial,
  type RawProp,
} from '@/data/types';
import { CRAFTING_TIERS } from '@/data/craftingTiers';
import { GATHERING_ICONS } from '@/data/craftingTools';

let cache: Promise<RecipeIndex> | null = null;

export interface RecipeIndex {
  /** itemId → recipe that produces it (if any) */
  byOutputId: Map<string, RawCraftRecipe>;
  db: ItemDb;
}

/** Strip trailing _NNN... segments until we find an id that exists in the
 * item / material / prop tables. craft_tablosu encodes `<base>_<qty>_<extra>`
 * style suffixes that we have to peel off. */
function resolveBaseId(rawId: string, lookup: Set<string>): string | null {
  if (lookup.has(rawId)) return rawId;
  let base = rawId;
  for (let i = 0; i < 8; i++) {
    const next = base.replace(/_\d+$/, '');
    if (next === base) break;
    base = next;
    if (lookup.has(base)) return base;
  }
  return null;
}

export function loadRecipeIndex(): Promise<RecipeIndex> {
  if (!cache) {
    cache = loadItemDb().then((db) => {
      // Build a lookup set spanning all 3 tables
      const lookup = new Set<string>();
      for (const it of db.item_tablosu)     lookup.add(it.id);
      for (const m of db.material_tablosu)  lookup.add(m.id);
      for (const p of db.prop_tablosu)      lookup.add(p.id);

      const byOutputId = new Map<string, RawCraftRecipe>();
      for (const r of db.craft_tablosu) {
        const base = resolveBaseId(r.item_id, lookup);
        if (base && !byOutputId.has(base)) {
          byOutputId.set(base, r);
        }
      }
      return { byOutputId, db };
    });
  }
  return cache;
}

export interface MaterialEntry {
  id: string;
  quantity: number;
  /** The actual entry from item/material/prop tables (if found) */
  entry?: RawItem | RawMaterial | RawProp;
  /** Icon path resolved from icon1 */
  iconUrl?: string;
}

/** Resolve recipe materials into clickable entries (with icon + entry).
 *  Material ids in craft_tablosu may also carry a _qty / _variant suffix
 *  so we apply the same iterative strip used for output ids. */
export function resolveMaterials(recipe: RawCraftRecipe, db: ItemDb): MaterialEntry[] {
  const lookup = new Map<string, RawItem | RawMaterial | RawProp>();
  for (const it of db.item_tablosu)     lookup.set(it.id, it);
  for (const m of db.material_tablosu)  lookup.set(m.id, m);
  for (const p of db.prop_tablosu)      lookup.set(p.id, p);
  const idSet = new Set(lookup.keys());

  return getRecipeMaterials(recipe).map(({ id, quantity }) => {
    const base = resolveBaseId(id, idSet) ?? id;
    const entry = lookup.get(base);
    return {
      id: base,
      quantity,
      entry,
      iconUrl: entry?.icon1 ? getIconPath(entry.icon1) : undefined,
    };
  });
}

/** Look up the profession id for a meslek_no number. */
const MESLEK_TO_PROF: Record<number, string> = {
  1: 'cooking', 2: 'alchemy', 3: 'blacksmithing', 4: 'tailoring', 5: 'carpentry',
  6: 'engineering', 7: 'jewelcrafting',
  20: 'logging', 21: 'smelting', 22: 'tanning', 23: 'spinning',
  24: 'gemcutting', 25: 'essence-refining', 26: 'fishing', 27: 'logging', 100: 'workbench',
};

export function professionIdForMeslek(no: number): string | undefined {
  return MESLEK_TO_PROF[no];
}

/** Profession metadata (icon + family) — falls back gracefully. */
export function professionMeta(profId: string | undefined) {
  if (!profId) return undefined;
  const found = CRAFTING_TIERS.find((p) => p.id === profId);
  if (found) return { id: found.id, iconCode: found.iconCode, family: found.family };
  // Gathering professions live in GATHERING_ICONS only
  if (GATHERING_ICONS[profId]) {
    return { id: profId, iconCode: GATHERING_ICONS[profId], family: 'gathering' as const };
  }
  return { id: profId, iconCode: undefined, family: 'crafting' as const };
}
