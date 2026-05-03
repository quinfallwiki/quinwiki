/**
 * Crafting / processing tier breakdown — computed directly from
 * `craft_tablosu` inside items.json (recipe count + min meslek_level
 * per profession × tier). Verified data, not hand-typed.
 *
 * Each profession has up to three workbench tiers (T1 → T3). The min
 * profession-level required to start using a tier is shown below;
 * the recipe count is the number of recipes available at that tier.
 */
export interface CraftingProfessionStats {
  id: string;
  /** Internal meslek_no in items.json */
  mesleknNo: number;
  /** Family group used for the page filter chips */
  family: 'gathering' | 'processing' | 'crafting' | 'workbench';
  iconCode: string;
  totalRecipes: number;
  levelMin: number;
  levelMax: number;
  tiers: { tier: 1 | 2 | 3; minLevel: number; recipes: number }[];
}

export const CRAFTING_TIERS: CraftingProfessionStats[] = [
  // ─── GATHERING ────────────────────────────────────────────────────────
  {
    id: 'fishing',     mesleknNo: 26, family: 'gathering', iconCode: 'item_icon1_0_6301',
    totalRecipes: 18, levelMin: 1, levelMax: 70,
    tiers: [{ tier: 1, minLevel: 1, recipes: 18 }],
  },

  // ─── PROCESSING / REFINING ────────────────────────────────────────────
  {
    id: 'logging',     mesleknNo: 20, family: 'processing', iconCode: 'material_icon1_13101',
    totalRecipes: 7, levelMin: 1, levelMax: 1,
    tiers: [{ tier: 1, minLevel: 1, recipes: 7 }],
  },
  {
    id: 'smelting',    mesleknNo: 21, family: 'processing', iconCode: 'material_icon1_12001',
    totalRecipes: 20, levelMin: 1, levelMax: 76,
    tiers: [
      { tier: 1, minLevel: 1,  recipes: 7 },
      { tier: 2, minLevel: 20, recipes: 6 },
      { tier: 3, minLevel: 40, recipes: 7 },
    ],
  },
  {
    id: 'tanning',     mesleknNo: 22, family: 'processing', iconCode: 'material_icon1_13201',
    totalRecipes: 19, levelMin: 1, levelMax: 1,
    tiers: [{ tier: 1, minLevel: 1, recipes: 19 }],
  },
  {
    id: 'spinning',    mesleknNo: 23, family: 'processing', iconCode: 'material_icon1_12201',
    totalRecipes: 7, levelMin: 1, levelMax: 50,
    tiers: [
      { tier: 1, minLevel: 1,  recipes: 3 },
      { tier: 2, minLevel: 10, recipes: 2 },
      { tier: 3, minLevel: 45, recipes: 2 },
    ],
  },
  {
    id: 'gemcutting',  mesleknNo: 24, family: 'processing', iconCode: 'material_icon1_12301',
    totalRecipes: 8, levelMin: 1, levelMax: 70,
    tiers: [
      { tier: 1, minLevel: 1,  recipes: 3 },
      { tier: 2, minLevel: 30, recipes: 3 },
      { tier: 3, minLevel: 60, recipes: 2 },
    ],
  },
  {
    id: 'essence-refining', mesleknNo: 25, family: 'processing', iconCode: 'material_icon1_22101',
    totalRecipes: 10, levelMin: 1, levelMax: 15,
    tiers: [
      { tier: 1, minLevel: 1, recipes: 5 },
      { tier: 2, minLevel: 8, recipes: 2 },
      { tier: 3, minLevel: 15, recipes: 3 },
    ],
  },

  // ─── CRAFTING (FINAL GOODS) ───────────────────────────────────────────
  {
    id: 'cooking',     mesleknNo: 1,  family: 'crafting', iconCode: 'material_icon1_12401',
    totalRecipes: 57, levelMin: 1, levelMax: 60,
    tiers: [
      { tier: 1, minLevel: 1,  recipes: 17 },
      { tier: 2, minLevel: 40, recipes: 17 },
      { tier: 3, minLevel: 60, recipes: 23 },
    ],
  },
  {
    id: 'alchemy',     mesleknNo: 2,  family: 'crafting', iconCode: 'material_icon1_22010',
    totalRecipes: 59, levelMin: 1, levelMax: 60,
    tiers: [
      { tier: 1, minLevel: 1,  recipes: 21 },
      { tier: 2, minLevel: 15, recipes: 16 },
      { tier: 3, minLevel: 30, recipes: 22 },
    ],
  },
  {
    id: 'blacksmithing', mesleknNo: 3, family: 'crafting', iconCode: 'item_icon1_0_A016',
    totalRecipes: 231, levelMin: 1, levelMax: 40,
    tiers: [
      { tier: 1, minLevel: 1,  recipes: 86 },
      { tier: 2, minLevel: 9,  recipes: 65 },
      { tier: 3, minLevel: 21, recipes: 80 },
    ],
  },
  {
    id: 'tailoring',   mesleknNo: 4,  family: 'crafting', iconCode: 'item_icon1_3_1404',
    totalRecipes: 120, levelMin: 1, levelMax: 40,
    tiers: [
      { tier: 1, minLevel: 1,  recipes: 42 },
      { tier: 2, minLevel: 9,  recipes: 34 },
      { tier: 3, minLevel: 21, recipes: 44 },
    ],
  },
  {
    id: 'carpentry',   mesleknNo: 5,  family: 'crafting', iconCode: 'material_icon1_11801',
    totalRecipes: 108, levelMin: 1, levelMax: 40,
    tiers: [
      { tier: 1, minLevel: 1,  recipes: 56 },
      { tier: 2, minLevel: 20, recipes: 33 },
      { tier: 3, minLevel: 40, recipes: 19 },
    ],
  },
  {
    id: 'engineering', mesleknNo: 6,  family: 'crafting', iconCode: 'material_icon1_36601',
    totalRecipes: 20, levelMin: 1, levelMax: 20,
    tiers: [
      { tier: 1, minLevel: 1, recipes: 5 },
      { tier: 2, minLevel: 1, recipes: 11 },
      { tier: 3, minLevel: 1, recipes: 4 },
    ],
  },
  {
    id: 'jewelcrafting', mesleknNo: 7, family: 'crafting', iconCode: 'item_icon1_0_1010',
    totalRecipes: 36, levelMin: 1, levelMax: 70,
    tiers: [
      { tier: 1, minLevel: 1,  recipes: 12 },
      { tier: 2, minLevel: 30, recipes: 12 },
      { tier: 3, minLevel: 60, recipes: 12 },
    ],
  },
];

/** Total numbers shown on the hero strip */
export const CRAFTING_TOTALS = {
  professions: CRAFTING_TIERS.length,
  recipes: CRAFTING_TIERS.reduce((s, p) => s + p.totalRecipes, 0),
  workbenchTiers: 3,
};

/** Filter-chip groupings (UI) */
export const FAMILY_ORDER: CraftingProfessionStats['family'][] = [
  'gathering', 'processing', 'crafting',
];
