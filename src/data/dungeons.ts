export type DungeonStatus = 'live' | 'event' | 'locked';

export const DIFFICULTY_TIERS = ['easy', 'normal', 'hard', 'veryHard'] as const;
export type DifficultyTier = (typeof DIFFICULTY_TIERS)[number];

export interface DungeonEntry {
  id: string;
  status: DungeonStatus;
  themeAccent: 'cave' | 'stone' | 'tomb' | 'volcanic' | 'locked';
  imageBase: string;
  drops: {
    soloEasy: number;
    soloNormal: number;
    soloHard: number;
    soloVeryHard: number;
    party: number;
  };
}

export const INSTANCED_DUNGEONS: DungeonEntry[] = [
  {
    id: 'foamingCatacombs',
    status: 'live',
    themeAccent: 'cave',
    imageBase: 'foaming',
    drops: { soloEasy: 8, soloNormal: 13, soloHard: 16, soloVeryHard: 16, party: 7 },
  },
  {
    id: 'quietChambers',
    status: 'live',
    themeAccent: 'stone',
    imageBase: 'quiet',
    drops: { soloEasy: 9, soloNormal: 15, soloHard: 18, soloVeryHard: 18, party: 9 },
  },
  {
    id: 'grimPoint',
    status: 'live',
    themeAccent: 'tomb',
    imageBase: 'grim',
    drops: { soloEasy: 7, soloNormal: 13, soloHard: 16, soloVeryHard: 16, party: 7 },
  },
  {
    id: 'deepestMaze',
    status: 'live',
    themeAccent: 'volcanic',
    imageBase: 'deepest',
    drops: { soloEasy: 13, soloNormal: 19, soloHard: 21, soloVeryHard: 21, party: 13 },
  },
  {
    id: 'lockedDungeon',
    status: 'locked',
    themeAccent: 'locked',
    imageBase: '',
    drops: { soloEasy: 0, soloNormal: 0, soloHard: 0, soloVeryHard: 0, party: 0 },
  },
];

export type WorldBossKind = 'naval' | 'land-melee' | 'land-aerial' | 'land-dragon' | 'land-caster' | 'land-fiend' | 'land-celestial' | 'land-ogre' | 'locked';

export interface WorldBossEntry {
  id: string;
  kind: WorldBossKind;
  status: 'live' | 'locked';
  spawnPerDay: number;
  imageFile: string | null;
  accent: string;
}

export const WORLD_BOSSES: WorldBossEntry[] = [
  { id: 'kraken',     kind: 'naval',          status: 'live',   spawnPerDay: 3, imageFile: 'kraken.jpg',     accent: '#4a7ad0' },
  { id: 'titanseal',  kind: 'land-melee',     status: 'live',   spawnPerDay: 1, imageFile: 'titanseal.jpg',  accent: '#c9a14a' },
  { id: 'aeroForge',  kind: 'land-aerial',    status: 'live',   spawnPerDay: 1, imageFile: 'aero-forge.jpg', accent: '#6cb3e0' },
  { id: 'draconarch', kind: 'land-dragon',    status: 'live',   spawnPerDay: 1, imageFile: 'draconarch.jpg', accent: '#c0392b' },
  { id: 'doomcaller', kind: 'land-caster',    status: 'live',   spawnPerDay: 1, imageFile: 'doomcaller.jpg', accent: '#7a48b0' },
  { id: 'velkhurath', kind: 'land-fiend',     status: 'live',   spawnPerDay: 1, imageFile: 'velkhurath.jpg', accent: '#5d8a3a' },
  { id: 'seraphiel',  kind: 'land-celestial', status: 'live',   spawnPerDay: 1, imageFile: 'seraphiel.jpg',  accent: '#e8d9a0' },
  { id: 'vorgath',    kind: 'land-ogre',      status: 'live',   spawnPerDay: 1, imageFile: 'vorgath.jpg',    accent: '#5a4a6a' },
  { id: 'sealedSlot', kind: 'locked',         status: 'locked', spawnPerDay: 0, imageFile: 'sealed.png',     accent: '#3a3a4a' },
];

export const ENDGAME_LEVEL_CAP = 100;
export const PARTY_MAX_SIZE = 8;
export const DUNGEON_POINTS_CAP = 1000;

export const BOSS_IMAGE_BASE = '/assets/quinfall/bosses-panel/';
export const DUNGEON_IMAGE_BASE = '/assets/quinfall/dungeons/';
