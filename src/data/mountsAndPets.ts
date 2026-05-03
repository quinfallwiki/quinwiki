export type MountId = 'horse' | 'donkey' | 'ox' | 'camel' | 'elephant';
export type MountSource = 'tameable' | 'caravanRental';

export interface MountStat {
  speed: 1 | 2 | 3 | 4 | 5;
  capacity: 1 | 2 | 3 | 4 | 5;
  combat: 1 | 2 | 3 | 4 | 5;
  stamina: 1 | 2 | 3 | 4 | 5;
}

export interface MountEntry {
  id: MountId;
  source: MountSource;
  iconCode: string;
  accent: string;
  iconKey: 'horse' | 'wagon' | 'spark' | 'shield';
  stats: MountStat;
}

export const MOUNTS: MountEntry[] = [
  { id: 'horse',    source: 'tameable',      iconCode: 'binek_icon1_0301', accent: '#c9a14a', iconKey: 'horse',  stats: { speed: 4, capacity: 3, combat: 4, stamina: 3 } },
  { id: 'donkey',   source: 'caravanRental', iconCode: 'binek_icon1_0001', accent: '#9c8268', iconKey: 'wagon',  stats: { speed: 2, capacity: 4, combat: 1, stamina: 4 } },
  { id: 'ox',       source: 'caravanRental', iconCode: 'binek_icon1_0002', accent: '#8a7355', iconKey: 'wagon',  stats: { speed: 1, capacity: 5, combat: 2, stamina: 5 } },
  { id: 'camel',    source: 'caravanRental', iconCode: 'binek_icon1_0003', accent: '#d8a25e', iconKey: 'spark',  stats: { speed: 3, capacity: 4, combat: 2, stamina: 4 } },
  { id: 'elephant', source: 'caravanRental', iconCode: 'binek_icon1_0004', accent: '#7a6c8e', iconKey: 'shield', stats: { speed: 1, capacity: 5, combat: 5, stamina: 4 } },
];

export const TAME_STEPS = ['buyLasso', 'find', 'throw', 'minigame', 'success', 'stable'] as const;

export const HORSE_RARITIES = ['common', 'uncommon', 'rare', 'legendary'] as const;
export type HorseRarity = (typeof HORSE_RARITIES)[number];

export const HORSE_RARITY_META: Record<HorseRarity, { color: string; bg: string; border: string; obtain: 'wild' | 'breeding'; iconCode: string }> = {
  common:    { color: 'text-emerald-200', bg: 'bg-emerald-500/15',  border: 'border-emerald-400/50',  obtain: 'wild',     iconCode: 'binek_icon1_0101' },
  uncommon:  { color: 'text-frost-200',   bg: 'bg-frost-500/15',    border: 'border-frost-400/50',    obtain: 'wild',     iconCode: 'binek_icon1_0205' },
  rare:      { color: 'text-purple-200',  bg: 'bg-purple-500/15',   border: 'border-purple-400/50',   obtain: 'breeding', iconCode: 'binek_icon1_0303' },
  legendary: { color: 'text-orange-200',  bg: 'bg-orange-500/15',   border: 'border-orange-400/50',   obtain: 'breeding', iconCode: 'binek_icon1_0407' },
};

export const BREEDING_FACTS = ['duration', 'femaleCharges', 'maleUnlimited', 'lockDuring', 'stableCap', 'rngStats'] as const;
export const BREEDING_SHOP_ITEMS = ['resetStone', 'reductionStone'] as const;
export const BREEDING_MEDALLIONS = ['horseMedallion', 'qualityHorseMedallion'] as const;

export const CARAVAN_FACTS = ['vendor', 'rent', 'package', 'route', 'profit'] as const;

export const PREMIUM_HORSES = [
  { id: 'armoredWarrior',    iconCode: 'binek_icon1_K001', tone: 'border-rose-400/40' },
  { id: 'bloodyKnight',      iconCode: 'binek_icon1_K002', tone: 'border-rose-400/40' },
  { id: 'goldenGuardian',    iconCode: 'binek_icon1_K003', tone: 'border-ember-400/40' },
  { id: 'shadowWanderer',    iconCode: 'binek_icon1_K004', tone: 'border-purple-400/40' },
  { id: 'darkCommander',     iconCode: 'binek_icon1_K005', tone: 'border-purple-400/40' },
  { id: 'ironGuardian',      iconCode: 'binek_icon1_K006', tone: 'border-steel-400/40' },
  { id: 'nobleKnight',       iconCode: 'binek_icon1_K007', tone: 'border-frost-400/40' },
  { id: 'stormRider',        iconCode: 'binek_icon1_K008', tone: 'border-frost-400/40' },
  { id: 'shadowVoyager',     iconCode: 'binek_icon1_K009', tone: 'border-purple-400/40' },
  { id: 'nightWanderer',     iconCode: 'binek_icon1_K010', tone: 'border-purple-400/40' },
  { id: 'mistGuardian',      iconCode: 'binek_icon1_K011', tone: 'border-frost-400/40' },
  { id: 'desertTraveler',    iconCode: 'binek_icon1_K012', tone: 'border-ember-400/40' },
  { id: 'goldenMerchant',    iconCode: 'binek_icon1_K013', tone: 'border-ember-400/40' },
  { id: 'bloodyLegend',      iconCode: 'binek_icon1_K014', tone: 'border-rose-400/40' },
  { id: 'emeraldGuardian',   iconCode: 'binek_icon1_K016', tone: 'border-emerald-400/40' },
  { id: 'flameSentinel',     iconCode: 'binek_icon1_K017', tone: 'border-rose-400/40' },
  { id: 'darkHunter',        iconCode: 'binek_icon1_K018', tone: 'border-purple-400/40' },
  { id: 'blueKnight',        iconCode: 'binek_icon1_K019', tone: 'border-frost-400/40' },
  { id: 'silverWarrior',     iconCode: 'binek_icon1_K020', tone: 'border-steel-400/40' },
  { id: 'goldenShield',      iconCode: 'binek_icon1_K021', tone: 'border-ember-400/40' },
];

export const PREMIUM_CARAVANS = [
  { id: 'desertCaravan',  iconCode: 'binek_icon1_K601', tone: 'border-ember-400/40' },
  { id: 'sultansGuardian', iconCode: 'binek_icon1_K602', tone: 'border-ember-400/40' },
  { id: 'warBehemoth',    iconCode: 'binek_icon1_K603', tone: 'border-rose-400/40' },
];

export const HORSE_GEAR = [
  { id: 'saddleLow',     iconCode: 'binek_icon1_E011', quality: 'low' },
  { id: 'saddleMedium',  iconCode: 'binek_icon1_E012', quality: 'medium' },
  { id: 'saddleHigh',    iconCode: 'binek_icon1_E013', quality: 'high' },
  { id: 'horseshoeLow',  iconCode: 'binek_icon1_E021', quality: 'low' },
  { id: 'horseshoeMed',  iconCode: 'binek_icon1_E022', quality: 'medium' },
  { id: 'horseshoeHigh', iconCode: 'binek_icon1_E023', quality: 'high' },
  { id: 'stirrupLow',    iconCode: 'binek_icon1_E031', quality: 'low' },
  { id: 'stirrupMed',    iconCode: 'binek_icon1_E032', quality: 'medium' },
  { id: 'stirrupHigh',   iconCode: 'binek_icon1_E033', quality: 'high' },
];

export type PetGroup = 'flying' | 'dragon' | 'wolf' | 'rhino' | 'pitbull' | 'raccoon' | 'reptile' | 'mythic' | 'rabbit' | 'rodent' | 'serpent' | 'special';

export interface PetEntry {
  id: string;
  group: PetGroup;
  iconCode: string;
  accent: string;
}

export const PET_GROUPS: PetGroup[] = ['flying', 'dragon', 'wolf', 'rhino', 'pitbull', 'raccoon', 'reptile', 'rabbit', 'rodent', 'serpent', 'mythic', 'special'];

export const PETS: PetEntry[] = [
  { id: 'venomBee',          group: 'flying',  iconCode: 'pet_icon1_0001', accent: '#e7c44a' },
  { id: 'speckledButterfly', group: 'flying',  iconCode: 'pet_icon1_0002', accent: '#9bc78a' },
  { id: 'lavaDragon',        group: 'dragon',  iconCode: 'pet_icon1_0003', accent: '#d65c1a' },
  { id: 'nightDragon',       group: 'dragon',  iconCode: 'pet_icon1_0004', accent: '#5a4a8a' },
  { id: 'sandDragon',        group: 'dragon',  iconCode: 'pet_icon1_0005', accent: '#caa257' },
  { id: 'forestDragon',      group: 'dragon',  iconCode: 'pet_icon1_0006', accent: '#5d8a3a' },
  { id: 'rhinoBeetle',       group: 'flying',  iconCode: 'pet_icon1_0007', accent: '#7a6e4a' },
  { id: 'shadowBat',         group: 'flying',  iconCode: 'pet_icon1_0008', accent: '#3a2a4a' },
  { id: 'glacierWolf',       group: 'wolf',    iconCode: 'pet_icon1_0009', accent: '#7eb3d9' },
  { id: 'shadowWolf',        group: 'wolf',    iconCode: 'pet_icon1_0010', accent: '#5a4d6e' },
  { id: 'mistWolf',          group: 'wolf',    iconCode: 'pet_icon1_0011', accent: '#8e9aab' },
  { id: 'mountainWolf',      group: 'wolf',    iconCode: 'pet_icon1_0012', accent: '#7d6e5a' },
  { id: 'rockRhino',         group: 'rhino',   iconCode: 'pet_icon1_0013', accent: '#7d8a99' },
  { id: 'lavaRhino',         group: 'rhino',   iconCode: 'pet_icon1_0014', accent: '#d65c1a' },
  { id: 'purpleRhino',       group: 'rhino',   iconCode: 'pet_icon1_0015', accent: '#a067c0' },
  { id: 'skyRhino',          group: 'rhino',   iconCode: 'pet_icon1_0016', accent: '#6cb3e0' },
  { id: 'earthPitbull',      group: 'pitbull', iconCode: 'pet_icon1_0017', accent: '#8a6e4a' },
  { id: 'shadowPitbull',     group: 'pitbull', iconCode: 'pet_icon1_0018', accent: '#3a3548' },
  { id: 'fangPitbull',       group: 'pitbull', iconCode: 'pet_icon1_0019', accent: '#caa257' },
  { id: 'marmaladeRaccoon',  group: 'raccoon', iconCode: 'pet_icon1_0020', accent: '#d68a4e' },
  { id: 'rockRaccoon',       group: 'raccoon', iconCode: 'pet_icon1_0021', accent: '#7d8a99' },
  { id: 'forestRaccoon',     group: 'raccoon', iconCode: 'pet_icon1_0022', accent: '#5d8a3a' },
  { id: 'nightRaccoon',      group: 'raccoon', iconCode: 'pet_icon1_0023', accent: '#3a3548' },
  { id: 'desertReptile',     group: 'reptile', iconCode: 'pet_icon1_0024', accent: '#caa257' },
  { id: 'enchantedPhoenix',  group: 'mythic',  iconCode: 'pet_icon1_0501', accent: '#e8a93a' },
  { id: 'crystalRabbit',     group: 'rabbit',  iconCode: 'pet_icon1_0507', accent: '#a4cbe0' },
  { id: 'goldenRabbit',      group: 'rabbit',  iconCode: 'pet_icon1_0508', accent: '#e8c44a' },
  { id: 'darkHopper',        group: 'rabbit',  iconCode: 'pet_icon1_0509', accent: '#3a3548' },
  { id: 'lightRunner',       group: 'rabbit',  iconCode: 'pet_icon1_0510', accent: '#e0d8b0' },
  { id: 'darkWanderer',      group: 'wolf',    iconCode: 'pet_icon1_0511', accent: '#3a3548' },
  { id: 'skyManedWolf',      group: 'wolf',    iconCode: 'pet_icon1_0512', accent: '#6cb3e0' },
  { id: 'lavaClaw',          group: 'special', iconCode: 'pet_icon1_0513', accent: '#d65c1a' },
  { id: 'wintersFootprints', group: 'special', iconCode: 'pet_icon1_0514', accent: '#a4cbe0' },
  { id: 'dazzlingWolf',      group: 'wolf',    iconCode: 'pet_icon1_0515', accent: '#e8c44a' },
  { id: 'lightRat',          group: 'rodent',  iconCode: 'pet_icon1_0516', accent: '#e0d8b0' },
  { id: 'shadowRodent',      group: 'rodent',  iconCode: 'pet_icon1_0517', accent: '#3a3548' },
  { id: 'goldenRodent',      group: 'rodent',  iconCode: 'pet_icon1_0518', accent: '#e8c44a' },
  { id: 'midnightSeer',      group: 'mythic',  iconCode: 'pet_icon1_0519', accent: '#5a4a8a' },
  { id: 'venomLeaper',       group: 'serpent', iconCode: 'pet_icon1_0520', accent: '#5d8a3a' },
  { id: 'glintSnake',        group: 'serpent', iconCode: 'pet_icon1_0521', accent: '#e8c44a' },
  { id: 'ashenCreature',     group: 'special', iconCode: 'pet_icon1_0522', accent: '#8e9aab' },
];

export const PET_EVOLUTION_STEPS = ['level', 'material', 'npc', 'ritual'] as const;
export const PET_SKILL_TREES = ['gathering', 'combat', 'loot', 'aura'] as const;

export const STABLE_CAP = 20;
export const BREEDING_HOURS = 12;
export const FEMALE_BREEDING_CHARGES = 3;
export const REDUCTION_STONE_HOURS = 6;

export const ICON_BASE = '/assets/icons/';
