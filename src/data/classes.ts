export type WeaponKey =
  | 'swordShield'
  | 'twoHandedSword'
  | 'spear'
  | 'dualAxes'
  | 'dualDaggers'
  | 'warHammer'
  | 'bow'
  | 'crossbow'
  | 'staff'
  | 'lifeStaff';

export type ClassRole = 'tank' | 'melee' | 'ranged' | 'magic' | 'healer';
export type RangeType = 'melee' | 'mid' | 'ranged';
export type AttackSpeed = 'slow' | 'medium' | 'fast';
export type DamageType = 'physical' | 'magic' | 'mixed';
export type ContentTag = 'pve' | 'pvp' | 'solo' | 'group' | 'raid' | 'arena' | 'siege';

export interface ClassStats {
  damage: number;
  defense: number;
  mobility: number;
  range: number;
  support: number;
  complexity: number;
}

export interface ClassDef {
  id: string;
  slug: string;
  weaponKey: WeaponKey;
  iconCode: string;
  role: ClassRole;
  range: RangeType;
  attackSpeed: AttackSpeed;
  damageType: DamageType;
  difficulty: 1 | 2 | 3 | 4 | 5;
  maxLevel: number;
  stats: ClassStats;
  strengthCount: number;
  weaknessCount: number;
  skillCount: number;
  milestoneLevels: number[];
  bestFor: ContentTag[];
  recommendedSecondaries: WeaponKey[];
}

export const MAX_WEAPON_LEVEL = 100;

export const CLASSES: ClassDef[] = [
  {
    id: 'sword-shield',
    slug: 'kalkanli-kilic',
    weaponKey: 'swordShield',
    iconCode: 'item_icon1_0_A016',
    role: 'tank',
    range: 'melee',
    attackSpeed: 'medium',
    damageType: 'physical',
    difficulty: 2,
    maxLevel: MAX_WEAPON_LEVEL,
    stats: { damage: 45, defense: 95, mobility: 50, range: 20, support: 65, complexity: 35 },
    strengthCount: 4,
    weaknessCount: 3,
    skillCount: 4,
    milestoneLevels: [10, 25, 50, 75, 100],
    bestFor: ['pve', 'group', 'raid', 'siege'],
    recommendedSecondaries: ['lifeStaff', 'warHammer', 'twoHandedSword'],
  },
  {
    id: 'two-handed-sword',
    slug: 'cift-elli-kilic',
    weaponKey: 'twoHandedSword',
    iconCode: 'item_icon1_0_C016',
    role: 'melee',
    range: 'melee',
    attackSpeed: 'slow',
    damageType: 'physical',
    difficulty: 3,
    maxLevel: MAX_WEAPON_LEVEL,
    stats: { damage: 85, defense: 55, mobility: 45, range: 35, support: 25, complexity: 50 },
    strengthCount: 4,
    weaknessCount: 3,
    skillCount: 4,
    milestoneLevels: [10, 25, 50, 75, 100],
    bestFor: ['pve', 'pvp', 'group'],
    recommendedSecondaries: ['swordShield', 'warHammer', 'crossbow'],
  },
  {
    id: 'spear',
    slug: 'mizrak',
    weaponKey: 'spear',
    iconCode: 'item_icon1_0_D016',
    role: 'melee',
    range: 'mid',
    attackSpeed: 'medium',
    damageType: 'physical',
    difficulty: 4,
    maxLevel: MAX_WEAPON_LEVEL,
    stats: { damage: 75, defense: 60, mobility: 65, range: 60, support: 40, complexity: 75 },
    strengthCount: 4,
    weaknessCount: 3,
    skillCount: 4,
    milestoneLevels: [10, 25, 50, 75, 100],
    bestFor: ['pvp', 'arena', 'group'],
    recommendedSecondaries: ['bow', 'swordShield', 'dualDaggers'],
  },
  {
    id: 'dual-axes',
    slug: 'cift-balta',
    weaponKey: 'dualAxes',
    iconCode: 'item_icon1_0_E016',
    role: 'melee',
    range: 'melee',
    attackSpeed: 'fast',
    damageType: 'physical',
    difficulty: 3,
    maxLevel: MAX_WEAPON_LEVEL,
    stats: { damage: 80, defense: 35, mobility: 80, range: 25, support: 20, complexity: 55 },
    strengthCount: 4,
    weaknessCount: 3,
    skillCount: 4,
    milestoneLevels: [10, 25, 50, 75, 100],
    bestFor: ['pve', 'pvp', 'solo'],
    recommendedSecondaries: ['crossbow', 'twoHandedSword', 'bow'],
  },
  {
    id: 'dual-daggers',
    slug: 'cift-hancer',
    weaponKey: 'dualDaggers',
    iconCode: 'item_icon1_0_F016',
    role: 'melee',
    range: 'melee',
    attackSpeed: 'fast',
    damageType: 'physical',
    difficulty: 4,
    maxLevel: MAX_WEAPON_LEVEL,
    stats: { damage: 78, defense: 30, mobility: 95, range: 30, support: 30, complexity: 80 },
    strengthCount: 4,
    weaknessCount: 3,
    skillCount: 4,
    milestoneLevels: [10, 25, 50, 75, 100],
    bestFor: ['pvp', 'arena', 'solo'],
    recommendedSecondaries: ['bow', 'staff', 'spear'],
  },
  {
    id: 'war-hammer',
    slug: 'savas-cekici',
    weaponKey: 'warHammer',
    iconCode: 'item_icon1_0_L016',
    role: 'melee',
    range: 'melee',
    attackSpeed: 'slow',
    damageType: 'physical',
    difficulty: 3,
    maxLevel: MAX_WEAPON_LEVEL,
    stats: { damage: 95, defense: 70, mobility: 35, range: 30, support: 40, complexity: 50 },
    strengthCount: 4,
    weaknessCount: 3,
    skillCount: 4,
    milestoneLevels: [10, 25, 50, 75, 100],
    bestFor: ['pvp', 'siege', 'group'],
    recommendedSecondaries: ['swordShield', 'twoHandedSword', 'crossbow'],
  },
  {
    id: 'bow',
    slug: 'yay',
    weaponKey: 'bow',
    iconCode: 'item_icon1_0_G016',
    role: 'ranged',
    range: 'ranged',
    attackSpeed: 'fast',
    damageType: 'physical',
    difficulty: 3,
    maxLevel: MAX_WEAPON_LEVEL,
    stats: { damage: 75, defense: 35, mobility: 75, range: 95, support: 30, complexity: 60 },
    strengthCount: 4,
    weaknessCount: 3,
    skillCount: 4,
    milestoneLevels: [10, 25, 50, 75, 100],
    bestFor: ['pve', 'pvp', 'solo', 'arena'],
    recommendedSecondaries: ['dualDaggers', 'spear', 'staff'],
  },
  {
    id: 'crossbow',
    slug: 'tatar-yayi',
    weaponKey: 'crossbow',
    iconCode: 'item_icon1_0_H016',
    role: 'ranged',
    range: 'ranged',
    attackSpeed: 'slow',
    damageType: 'physical',
    difficulty: 3,
    maxLevel: MAX_WEAPON_LEVEL,
    stats: { damage: 90, defense: 40, mobility: 50, range: 90, support: 30, complexity: 55 },
    strengthCount: 4,
    weaknessCount: 3,
    skillCount: 4,
    milestoneLevels: [10, 25, 50, 75, 100],
    bestFor: ['pve', 'pvp', 'raid', 'siege'],
    recommendedSecondaries: ['warHammer', 'twoHandedSword', 'dualAxes'],
  },
  {
    id: 'staff',
    slug: 'asa',
    weaponKey: 'staff',
    iconCode: 'item_icon1_0_J016',
    role: 'magic',
    range: 'mid',
    attackSpeed: 'medium',
    damageType: 'magic',
    difficulty: 4,
    maxLevel: MAX_WEAPON_LEVEL,
    stats: { damage: 88, defense: 30, mobility: 55, range: 75, support: 50, complexity: 75 },
    strengthCount: 4,
    weaknessCount: 3,
    skillCount: 4,
    milestoneLevels: [10, 25, 50, 75, 100],
    bestFor: ['pve', 'raid', 'group'],
    recommendedSecondaries: ['lifeStaff', 'dualDaggers', 'bow'],
  },
  {
    id: 'life-staff',
    slug: 'hayat-asasi',
    weaponKey: 'lifeStaff',
    iconCode: 'item_icon1_0_K016',
    role: 'healer',
    range: 'mid',
    attackSpeed: 'medium',
    damageType: 'magic',
    difficulty: 4,
    maxLevel: MAX_WEAPON_LEVEL,
    stats: { damage: 30, defense: 50, mobility: 55, range: 65, support: 100, complexity: 80 },
    strengthCount: 4,
    weaknessCount: 3,
    skillCount: 4,
    milestoneLevels: [10, 25, 50, 75, 100],
    bestFor: ['raid', 'group', 'arena'],
    recommendedSecondaries: ['staff', 'swordShield', 'spear'],
  },
];

export function findClassBySlug(slug: string): ClassDef | undefined {
  return CLASSES.find((c) => c.slug === slug);
}

export function findClassByWeapon(weapon: WeaponKey): ClassDef | undefined {
  return CLASSES.find((c) => c.weaponKey === weapon);
}
