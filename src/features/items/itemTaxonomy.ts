/**
 * Item taxonomy — categorise every catalogued entry across:
 *   - item_tablosu       (gear: weapons, armor, accessories, bags, tools, costumes)
 *   - material_tablosu   (drops, crafting mats, food, potions, ammo, talismans, …)
 *   - prop_tablosu       (furniture, workbenches, seeds, farmable animals, siege)
 *   - guc_karti_tablosu  (power cards)
 *   - beceri_tasi_tablosu (skill stones)
 *
 * The classification feeds the slot/family filter chips and the detail modal.
 */
import type { ItemDb, RawItem } from '@/data/types';

export type ItemSource =
  | 'item'
  | 'material'
  | 'prop'
  | 'powerCard'
  | 'skillStone';

export type EquipmentSlot =
  /* gear (item_tablosu) */
  | 'weapon'
  | 'armor'
  | 'accessory'
  | 'bag'
  | 'tool'
  | 'costume'
  /* materials (drops + crafting + sea + dungeon loot lives here) */
  | 'material'
  | 'foodPotion'
  | 'enhancement'
  | 'talisman'
  | 'ammo'
  | 'skillBook'
  | 'quest'
  | 'shop'
  /* props */
  | 'furniture'
  | 'workbench'
  | 'farm'
  | 'siege';

export type WeaponFamily =
  | 'sword'
  | 'shield'
  | 'twoHandSword'
  | 'spear'
  | 'dualAxe'
  | 'dualDagger'
  | 'bow'
  | 'dualCrossbow'
  | 'arcaneStaff'
  | 'lifeStaff'
  | 'warHammer';

export type ArmorWeight = 'heavy' | 'light' | 'robe';
export type ArmorPiece = 'chest' | 'helmet' | 'gauntlet' | 'boots';
export type AccessoryType = 'necklace' | 'bracelet' | 'earring' | 'ring';
export type ToolType = 'axe' | 'pickaxe' | 'sickle' | 'fishingRod' | 'huntingKnife';

export interface CategorisedItem {
  item: RawItem;
  source: ItemSource;
  slot: EquipmentSlot;
  /** Sub-family for filter chips (weapon family, armor weight, material kind, …) */
  family?: string;
  /** Armor piece slot for armor entries */
  piece?: ArmorPiece;
}

/* -------------------------------------------------------------------------- */
/*  Type-string lookup tables                                                 */
/* -------------------------------------------------------------------------- */

const TYPE_TO_WEAPON: Record<string, WeaponFamily> = {
  Sword: 'sword',
  Shield: 'shield',
  'Two Handed Sword': 'twoHandSword',
  Spear: 'spear',
  'Dual Axe': 'dualAxe',
  'Dual Dagger': 'dualDagger',
  Bow: 'bow',
  'Dual Crossbow': 'dualCrossbow',
  'Arcane Staff': 'arcaneStaff',
  'Life Staff': 'lifeStaff',
  'War Hammer': 'warHammer',
};

const TYPE_TO_ACCESSORY: Record<string, AccessoryType> = {
  Necklace: 'necklace',
  Bracelet: 'bracelet',
  Earring: 'earring',
  Ring: 'ring',
};

const TYPE_TO_TOOL: Record<string, ToolType> = {
  'Axe [Tool]': 'axe',
  'Pickaxe [Tool]': 'pickaxe',
  'Sickle [Tool]': 'sickle',
  'Fishing Rod [Tool]': 'fishingRod',
  'Hunting Knife [Tool]': 'huntingKnife',
};

const WORKBENCH_TYPES = new Set([
  "Blacksmith’s Forge",
  "Cook’s Workbench",
  'Loom',
  'Sawmill',
  'Smelter',
  'Tanning Rack',
  'Spinning Wheel',
  'Essence Refiner',
  "Carpenter's Workbench",
  'Tinkering Workbench',
  "Alchemist’s Workbench",
]);

/* -------------------------------------------------------------------------- */
/*  Per-source classifier                                                     */
/* -------------------------------------------------------------------------- */

function classifyGear(item: RawItem): { slot: EquipmentSlot; family?: string; piece?: ArmorPiece } {
  const type = String(item.tip_loc_English ?? '').trim();

  if (type.startsWith('Costume')) return { slot: 'costume', family: type };
  if (type in TYPE_TO_WEAPON)     return { slot: 'weapon',    family: TYPE_TO_WEAPON[type] };
  if (type in TYPE_TO_ACCESSORY)  return { slot: 'accessory', family: TYPE_TO_ACCESSORY[type] };
  if (type in TYPE_TO_TOOL)       return { slot: 'tool',      family: TYPE_TO_TOOL[type] };
  if (type === 'Bag')             return { slot: 'bag' };

  const armorMatch = type.match(/^(Armor|Helmet|Gauntlet|Boots)\s*\[(Heavy|Light|Robe)\]$/);
  if (armorMatch) {
    const piece: ArmorPiece =
      armorMatch[1] === 'Armor'
        ? 'chest'
        : (armorMatch[1].toLowerCase() as ArmorPiece);
    const weight = armorMatch[2].toLowerCase() as ArmorWeight;
    return { slot: 'armor', family: weight, piece };
  }

  return { slot: 'costume', family: type };
}

function classifyMaterial(item: RawItem): { slot: EquipmentSlot; family?: string } {
  const type = String(item.tip_loc_English ?? '').trim();

  // satis_kapali === 1 means the item cannot be sold back to NPCs —
  // in Quinfall this is the marker for cash-shop / premium-store items
  // (slot expansions, character-name change coupons, fireworks, etc).
  if (Number(item.satis_kapali) === 1) return { slot: 'shop' };

  if (type === 'Material')                return { slot: 'material', family: 'crafting' };
  if (type === 'Usable Material')         return { slot: 'material', family: 'usable' };
  if (type === 'Food')                    return { slot: 'foodPotion', family: 'food' };
  if (type === 'Potion')                  return { slot: 'foodPotion', family: 'potion' };
  if (type === 'Supplement Potion')       return { slot: 'foodPotion', family: 'supplement' };
  if (type === 'Enhancement Material')    return { slot: 'enhancement', family: 'upgrade' };
  if (type === 'Power Stone')             return { slot: 'enhancement', family: 'powerStone' };
  if (type === 'Puzzle Stone')            return { slot: 'enhancement', family: 'puzzleStone' };
  if (type === 'Talisman')                return { slot: 'talisman' };
  if (type === 'Quest Material')          return { slot: 'quest' };
  if (type === 'Defense Vehicles')        return { slot: 'siege' };
  if (type.startsWith('Arrow'))           return { slot: 'ammo', family: type.includes('Crossbow') ? 'crossbow' : 'bow' };
  if (type.startsWith('Skill Book')) {
    const m = type.match(/Skill Book\s*\[(.+)\]$/);
    return { slot: 'skillBook', family: m ? m[1] : undefined };
  }

  // Fallback for anything else
  return { slot: 'material', family: 'crafting' };
}

function classifyProp(item: RawItem): { slot: EquipmentSlot; family?: string } {
  const type = String(item.tip_loc_English ?? '').trim();

  if (type === 'Home Furnitures')   return { slot: 'furniture' };
  if (type === 'Farmable Animal')   return { slot: 'farm', family: 'animal' };
  if (type === 'Seed')              return { slot: 'farm', family: 'seed' };
  if (type === 'Defense Vehicles')  return { slot: 'siege' };
  if (WORKBENCH_TYPES.has(type))    return { slot: 'workbench', family: type };

  return { slot: 'furniture' };
}

export function classify(source: ItemSource, item: RawItem): CategorisedItem {
  let result: { slot: EquipmentSlot; family?: string; piece?: ArmorPiece };
  if (source === 'item')           result = classifyGear(item);
  else if (source === 'material')  result = classifyMaterial(item);
  else if (source === 'prop')      result = classifyProp(item);
  else if (source === 'powerCard') result = { slot: 'enhancement', family: 'powerCard' };
  else                             result = { slot: 'enhancement', family: 'skillStone' };
  return { item, source, ...result };
}

/** Bring all 5 tables into one flat, classified list. */
export function flattenDb(db: ItemDb): CategorisedItem[] {
  const out: CategorisedItem[] = [];
  for (const it of db.item_tablosu)         out.push(classify('item',       it));
  for (const it of db.material_tablosu)     out.push(classify('material',   it));
  for (const it of db.prop_tablosu)         out.push(classify('prop',       it));
  for (const it of db.guc_karti_tablosu)    out.push(classify('powerCard',  it));
  for (const it of db.beceri_tasi_tablosu)  out.push(classify('skillStone', it));
  return out;
}

/* -------------------------------------------------------------------------- */
/*  Grade → tier (color band)                                                 */
/* -------------------------------------------------------------------------- */

export type GradeTier = 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';

export function gradeTier(grade: number | undefined): GradeTier {
  const g = grade ?? 0;
  if (g >= 160) return 'legendary';
  if (g >= 120) return 'epic';
  if (g >= 70)  return 'rare';
  if (g >= 30)  return 'uncommon';
  return 'common';
}

export const GRADE_TONE: Record<GradeTier, string> = {
  common:    'border-steel-500/40 text-steel-200',
  uncommon:  'border-emerald-500/50 text-emerald-200',
  rare:      'border-frost-400/60 text-frost-200',
  epic:      'border-purple-400/60 text-purple-200',
  legendary: 'border-ember-400/70 text-ember-200',
};

export const GRADE_GLOW: Record<GradeTier, string> = {
  common:    'from-steel-500/0',
  uncommon:  'from-emerald-500/15',
  rare:      'from-frost-400/20',
  epic:      'from-purple-400/25',
  legendary: 'from-ember-400/30',
};

/* -------------------------------------------------------------------------- */
/*  Display order (filter sidebar)                                            */
/* -------------------------------------------------------------------------- */

export const WEAPON_FAMILIES: WeaponFamily[] = [
  'sword', 'shield', 'twoHandSword', 'spear',
  'dualAxe', 'dualDagger', 'bow', 'dualCrossbow',
  'arcaneStaff', 'lifeStaff', 'warHammer',
];

export const ARMOR_WEIGHTS: ArmorWeight[] = ['heavy', 'light', 'robe'];
export const ARMOR_PIECES: ArmorPiece[] = ['chest', 'helmet', 'gauntlet', 'boots'];
export const ACCESSORY_TYPES: AccessoryType[] = ['necklace', 'bracelet', 'earring', 'ring'];
export const TOOL_TYPES: ToolType[] = ['axe', 'pickaxe', 'sickle', 'fishingRod', 'huntingKnife'];

export const SLOTS: EquipmentSlot[] = [
  'weapon', 'armor', 'accessory', 'bag', 'tool', 'costume',
  'material', 'foodPotion', 'enhancement', 'talisman', 'ammo', 'skillBook', 'quest',
  'furniture', 'workbench', 'farm', 'siege', 'shop',
];

/** Top-level grouping for the filter bar — keeps the chip rail tidy. */
export const SLOT_GROUPS: { id: string; slots: EquipmentSlot[] }[] = [
  { id: 'gear',        slots: ['weapon', 'armor', 'accessory', 'bag', 'tool', 'costume'] },
  { id: 'consumables', slots: ['material', 'foodPotion', 'enhancement', 'talisman', 'ammo', 'skillBook', 'quest'] },
  { id: 'world',       slots: ['furniture', 'workbench', 'farm', 'siege'] },
  { id: 'shop',        slots: ['shop'] },
];

/* -------------------------------------------------------------------------- */
/*  Stat helpers                                                              */
/* -------------------------------------------------------------------------- */

export const COMBAT_STAT_KEYS = [
  'physical_ap', 'physical_dp', 'magic_ap', 'magic_dp',
  'hp', 'mp', 'hp_regen', 'mp_regen',
  'accuracy', 'evasion', 'speed', 'atk_speed', 'casting_speed',
  'extra_damage_mob', 'extra_damage_boss',
] as const;
export type CombatStatKey = typeof COMBAT_STAT_KEYS[number];

/**
 * Clean the in-game description text the data extractor pulled straight out
 * of the game files. The raw strings carry rich-text tokens that are useless
 * to web visitors and must be stripped or converted:
 *
 *   {0}…{1}              colour-highlight pair      → keep inner text
 *   {2}                  paragraph break            → newline
 *   <color=#xxxxxx>…</color>  game UI colour tag    → keep inner text
 *   \r\n  /  \t          legacy line / tab markers  → newline / space
 */
export function cleanDescription(raw: string | undefined): string {
  if (!raw) return '';
  let s = raw;

  // strip game UI color wrappers, keep inner text
  s = s.replace(/<color=[^>]*>/gi, '').replace(/<\/color>/gi, '');

  // {2} → paragraph break
  s = s.replace(/\{2\}/g, '\n');

  // {0} and {1} highlight markers — drop entirely (inner text already kept)
  s = s.replace(/\{[01]\}/g, '');

  // any remaining {n} tokens → drop
  s = s.replace(/\{\d+\}/g, '');

  // normalise whitespace
  s = s.replace(/\r\n?/g, '\n').replace(/\t/g, ' ');

  // collapse 3+ blank lines, then trim trailing spaces per line
  s = s
    .split('\n')
    .map((line) => line.replace(/[  ]+/g, ' ').trim())
    .join('\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();

  return s;
}

export function activeStats(item: RawItem): { key: CombatStatKey; value: number }[] {
  const out: { key: CombatStatKey; value: number }[] = [];
  for (const k of COMBAT_STAT_KEYS) {
    const raw = item[k as keyof RawItem];
    const v = typeof raw === 'number' ? raw : Number(raw ?? 0);
    if (v && v !== 0) out.push({ key: k, value: v });
  }
  return out;
}
