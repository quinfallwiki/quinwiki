import type { ItemDb, RawCraftRecipe, RawItem, RawMaterial, RawProp } from '@/data/types';

let cache: Promise<ItemDb> | null = null;

export function loadItemDb(): Promise<ItemDb> {
  if (!cache) {
    cache = fetch('/data/items.json')
      .then((r) => {
        if (!r.ok) throw new Error(`Items DB not found: ${r.status}`);
        return r.json() as Promise<ItemDb>;
      })
      .catch((err) => {
        cache = null;
        throw err;
      });
  }
  return cache;
}

export async function getItemById(id: string): Promise<RawItem | undefined> {
  const db = await loadItemDb();
  return db.item_tablosu.find((it) => it.id === id);
}

export interface SearchOptions {
  query?: string;
  language?: string;
  limit?: number;
  minLevel?: number;
  maxLevel?: number;
}

export async function searchItems(opts: SearchOptions = {}): Promise<RawItem[]> {
  const { query, language = 'Turkish', limit = 100, minLevel, maxLevel } = opts;
  const db = await loadItemDb();
  const q = query?.trim().toLowerCase();
  const titleField = `baslik_loc_${language}`;

  const filtered: RawItem[] = [];
  for (const item of db.item_tablosu) {
    if (typeof minLevel === 'number' && item.level < minLevel) continue;
    if (typeof maxLevel === 'number' && item.level > maxLevel) continue;
    if (q) {
      const title = (item[titleField as keyof RawItem] as string | undefined) ?? '';
      if (!title.toLowerCase().includes(q)) continue;
    }
    filtered.push(item);
    if (filtered.length >= limit) break;
  }
  return filtered;
}

export function getIconPath(iconCode: string | undefined): string {
  if (!iconCode) return '/logo.webp';
  return `/assets/icons/${iconCode}.png`;
}

export function findInDb(
  rawId: string,
  db: ItemDb,
): { entry: RawItem | RawMaterial | RawProp; kind: 'item' | 'material' | 'prop' } | null {
  let entry: RawItem | undefined = db.item_tablosu.find((it) => it.id === rawId);
  if (entry) return { entry, kind: 'item' };
  const firstSeg = rawId.split('_')[0];
  let mat: RawMaterial | undefined = db.material_tablosu.find((m) => m.id === firstSeg);
  if (mat) return { entry: mat, kind: 'material' };
  let prop: RawProp | undefined = db.prop_tablosu.find((p) => p.id === firstSeg);
  if (prop) return { entry: prop, kind: 'prop' };
  entry = db.item_tablosu.find((it) => rawId.startsWith(it.id));
  if (entry) return { entry, kind: 'item' };
  mat = db.material_tablosu.find((m) => rawId.startsWith(m.id));
  if (mat) return { entry: mat, kind: 'material' };
  prop = db.prop_tablosu.find((p) => rawId.startsWith(p.id));
  if (prop) return { entry: prop, kind: 'prop' };
  return null;
}

export function getRecipesByProfession(db: ItemDb, mesleknNo: number | null): RawCraftRecipe[] {
  if (mesleknNo === null) return db.craft_tablosu;
  return db.craft_tablosu.filter((r) => r.meslek_no === mesleknNo);
}
