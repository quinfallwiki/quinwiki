export interface CraftProfessionDef {
  id: string;
  mesleknNo: number;
  iconCode: string;
}

export const CRAFT_PROFESSIONS: CraftProfessionDef[] = [
  { id: 'cooking', mesleknNo: 1, iconCode: 'material_icon1_12401' },
  { id: 'alchemy', mesleknNo: 2, iconCode: 'material_icon1_22010' },
  { id: 'blacksmithing', mesleknNo: 3, iconCode: 'item_icon1_0_A016' },
  { id: 'tailoring', mesleknNo: 4, iconCode: 'item_icon1_3_1404' },
  { id: 'carpentry', mesleknNo: 5, iconCode: 'material_icon1_11801' },
  { id: 'engineering', mesleknNo: 6, iconCode: 'material_icon1_36601' },
  { id: 'jewelcrafting', mesleknNo: 7, iconCode: 'item_icon1_0_1010' },
  { id: 'lumber', mesleknNo: 20, iconCode: 'material_icon1_13101' },
  { id: 'smelting', mesleknNo: 21, iconCode: 'material_icon1_12001' },
  { id: 'tanning', mesleknNo: 22, iconCode: 'material_icon1_13201' },
  { id: 'spinning', mesleknNo: 23, iconCode: 'material_icon1_12201' },
  { id: 'gemcutting', mesleknNo: 24, iconCode: 'material_icon1_12301' },
  { id: 'essence', mesleknNo: 25, iconCode: 'material_icon1_22101' },
  { id: 'fishing', mesleknNo: 26, iconCode: 'item_icon1_0_6301' },
  { id: 'stonecutting', mesleknNo: 27, iconCode: 'material_icon1_11901' },
  { id: 'workbench', mesleknNo: 100, iconCode: 'material_icon1_36601' },
];

export function findCraftProfession(id: string): CraftProfessionDef | undefined {
  return CRAFT_PROFESSIONS.find((p) => p.id === id);
}
