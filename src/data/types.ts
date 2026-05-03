import type { LanguageDefinition } from '@/i18n/languages';

export interface RawItem {
  id: string;
  icon1: string;
  icon2?: string;
  level: number;
  default_grade?: number;
  purchase_price?: number;
  sale_price?: number;
  weight?: number;
  satis_kapali?: number;
  [key: `baslik_loc_${string}`]: string | undefined;
  [key: `tip_loc_${string}`]: string | undefined;
  [key: `aciklama_loc_${string}`]: string | undefined;
  [key: string]: unknown;
}

export interface RawMaterial extends RawItem {}
export interface RawProp extends RawItem {}

export interface RawCraftRecipe {
  meslek_no: number;
  item_id: string;
  exp: number;
  tier: number;
  time: number;
  min_meslek_level: number;
  malzeme_1?: string;
  malzeme_2?: string;
  malzeme_3?: string;
  malzeme_4?: string;
  malzeme_5?: string;
  malzeme_6?: string;
  malzeme_7?: string;
  malzeme_8?: string;
  malzeme_9?: string;
  malzeme_10?: string;
}

export interface ItemDb {
  item_tablosu: RawItem[];
  material_tablosu: RawMaterial[];
  prop_tablosu: RawProp[];
  craft_tablosu: RawCraftRecipe[];
  guc_karti_tablosu: RawItem[];
  beceri_tasi_tablosu: RawItem[];
  pet_tablosu: RawItem[];
  binek_tablosu: RawItem[];
  gemi_tablosu: RawItem[];
}

export type LocalizedField = 'baslik' | 'tip' | 'aciklama';

export function getLocalized(
  item: RawItem,
  field: LocalizedField,
  lang: LanguageDefinition,
  fallback: LanguageDefinition,
): string {
  const primaryKey = `${field}_loc_${lang.itemDbField}` as const;
  const fallbackKey = `${field}_loc_${fallback.itemDbField}` as const;
  return (item[primaryKey] as string | undefined) ?? (item[fallbackKey] as string | undefined) ?? '';
}

export function parseRecipeMaterial(raw: string | undefined): { id: string; quantity: number } | null {
  if (!raw) return null;
  const idx = raw.lastIndexOf('_');
  if (idx === -1) return { id: raw, quantity: 1 };
  const id = raw.slice(0, idx);
  const qty = parseInt(raw.slice(idx + 1), 10);
  return { id, quantity: Number.isFinite(qty) && qty > 0 ? qty : 1 };
}

export function getRecipeMaterials(recipe: RawCraftRecipe): { id: string; quantity: number }[] {
  const slots = [
    recipe.malzeme_1,
    recipe.malzeme_2,
    recipe.malzeme_3,
    recipe.malzeme_4,
    recipe.malzeme_5,
    recipe.malzeme_6,
    recipe.malzeme_7,
    recipe.malzeme_8,
    recipe.malzeme_9,
    recipe.malzeme_10,
  ];
  const out: { id: string; quantity: number }[] = [];
  for (const slot of slots) {
    const parsed = parseRecipeMaterial(slot);
    if (parsed) out.push(parsed);
  }
  return out;
}
