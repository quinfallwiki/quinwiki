import type { ClassRole, ContentTag, WeaponKey } from '@/data/classes';

export interface ComboDef {
  id: string;
  primary: WeaponKey;
  secondary: WeaponKey;
  role: ClassRole | 'hybrid';
  difficulty: 1 | 2 | 3 | 4 | 5;
  bestFor: ContentTag[];
}

export const WEAPON_COMBOS: ComboDef[] = [
  {
    id: 'paladin',
    primary: 'swordShield',
    secondary: 'lifeStaff',
    role: 'tank',
    difficulty: 3,
    bestFor: ['raid', 'group', 'siege'],
  },
  {
    id: 'crusader',
    primary: 'swordShield',
    secondary: 'twoHandedSword',
    role: 'tank',
    difficulty: 2,
    bestFor: ['pve', 'group'],
  },
  {
    id: 'berserker',
    primary: 'twoHandedSword',
    secondary: 'warHammer',
    role: 'melee',
    difficulty: 3,
    bestFor: ['pvp', 'arena', 'solo'],
  },
  {
    id: 'reaver',
    primary: 'dualAxes',
    secondary: 'crossbow',
    role: 'melee',
    difficulty: 3,
    bestFor: ['pve', 'solo', 'arena'],
  },
  {
    id: 'assassin',
    primary: 'dualDaggers',
    secondary: 'bow',
    role: 'melee',
    difficulty: 4,
    bestFor: ['pvp', 'arena', 'solo'],
  },
  {
    id: 'dragoon',
    primary: 'spear',
    secondary: 'bow',
    role: 'hybrid',
    difficulty: 4,
    bestFor: ['pvp', 'group', 'arena'],
  },
  {
    id: 'ranger',
    primary: 'bow',
    secondary: 'dualDaggers',
    role: 'ranged',
    difficulty: 3,
    bestFor: ['pve', 'solo', 'pvp'],
  },
  {
    id: 'sniper',
    primary: 'crossbow',
    secondary: 'warHammer',
    role: 'ranged',
    difficulty: 3,
    bestFor: ['raid', 'siege', 'pvp'],
  },
  {
    id: 'battlemage',
    primary: 'staff',
    secondary: 'lifeStaff',
    role: 'magic',
    difficulty: 4,
    bestFor: ['raid', 'group', 'pve'],
  },
  {
    id: 'cleric',
    primary: 'lifeStaff',
    secondary: 'staff',
    role: 'healer',
    difficulty: 4,
    bestFor: ['raid', 'arena', 'group'],
  },
  {
    id: 'templar',
    primary: 'lifeStaff',
    secondary: 'swordShield',
    role: 'healer',
    difficulty: 4,
    bestFor: ['arena', 'group', 'pvp'],
  },
  {
    id: 'spellblade',
    primary: 'dualDaggers',
    secondary: 'staff',
    role: 'hybrid',
    difficulty: 5,
    bestFor: ['pvp', 'arena'],
  },
];
