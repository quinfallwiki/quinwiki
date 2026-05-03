export const PROGRESSION_PHASES = [
  { id: 'tutorial',  levelFrom: 1,  levelTo: 10, hours: '0–4',   tone: 'emerald' },
  { id: 'build',     levelFrom: 10, levelTo: 25, hours: '4–15',  tone: 'frost' },
  { id: 'dungeon',   levelFrom: 25, levelTo: 40, hours: '15–35', tone: 'ember' },
  { id: 'guild',     levelFrom: 40, levelTo: 50, hours: '35–60', tone: 'amber' },
  { id: 'endgame',   levelFrom: 50, levelTo: 100, hours: '60+',  tone: 'rose' },
] as const;

export const QUICK_START_STEPS = [
  'install', 'server', 'channel', 'character', 'tutorial', 'weapon',
  'mount', 'profession', 'guild', 'grade',
] as const;

export const STATS = ['str', 'def', 'con', 'int', 'res', 'men'] as const;
export type Stat = (typeof STATS)[number];

export const STAT_META: Record<Stat, { color: string }> = {
  str: { color: 'text-rose-300' },
  def: { color: 'text-emerald-300' },
  con: { color: 'text-amber-300' },
  int: { color: 'text-purple-300' },
  res: { color: 'text-frost-300' },
  men: { color: 'text-cyan-300' },
};

export const STAT_FACTS = ['perLevel', 'totalAtCap', 'mastery90', 'sixStats', 'twoWeapons', 'noClassLock'] as const;

export const POST50_BANDS = [
  { id: 'level50to75',  range: '50 → 75',   pace: 'fast',    paceTone: 'emerald' },
  { id: 'level75to90',  range: '75 → 90',   pace: 'medium',  paceTone: 'frost' },
  { id: 'level90to100', range: '90 → 100',  pace: 'slow',    paceTone: 'rose' },
] as const;

export const XP_BUFFS = [
  { id: 'townBoard',   value: '×2',    accent: 'border-emerald-400/40 text-emerald-200' },
  { id: 'statueBuff',  value: '+40%',  accent: 'border-frost-400/40 text-frost-200' },
  { id: 'guildAltar',  value: '+30%',  accent: 'border-amber-400/40 text-amber-200' },
  { id: 'guildBuff',   value: '+40%',  accent: 'border-rose-400/40 text-rose-200' },
] as const;

export const DAILY_ROUTINES = [
  'townBoard', 'dungeonPoints', 'quinfallsTower', 'zenithConquest', 'worldBoss', 'statue',
] as const;

export const XP_SOURCES = ['townBoard', 'partyMobs', 'highDungeons', 'championStars'] as const;

export const TIMELINE = [
  { hours: '0–4',    levelBand: '1 → 10',   focus: 'tutorial',  city: 'starter' },
  { hours: '4–15',   levelBand: '10 → 25',  focus: 'sideQuest', city: 'kineallen' },
  { hours: '15–30',  levelBand: '25 → 35',  focus: 'firstDungeon', city: 'pabas' },
  { hours: '30–50',  levelBand: '35 → 45',  focus: 'guildJoin', city: 'larcbost' },
  { hours: '50–70',  levelBand: '45 → 50',  focus: 'endgameDungeon', city: 'shadowAtoll' },
  { hours: '70–100', levelBand: 'Grade 50+25', focus: 'siege', city: 'guildIsland' },
] as const;

export const MISTAKES = [
  'skipTutorial', 'multiWeapon', 'respecWait', 'lowTierEnhance', 'pvpEarly',
  'noGuild', 'ignoreTownBoard', 'noProfession', 'cashShopAddict', 'rushed',
] as const;

/**
 * Backdrops are hand-picked from the local gallery (public/assets/quinfall/gallery)
 * so every section has a real, themed in-game shot rather than a generic Steam
 * screenshot. 12 unique images for 12 slots — all semantic matches.
 */
const GALLERY = '/assets/quinfall/gallery';

export const HERO_BG_URL = `${GALLERY}/manzara.jpg`;          // open-world panorama → guide hero

export const PHASE_BGS: Record<string, string> = {
  tutorial: `${GALLERY}/manzara3.png`,    // first light / fresh start
  build:    `${GALLERY}/build.jpg`,       // player housing → build-up phase
  dungeon:  `${GALLERY}/dungeon.png`,     // direct match
  guild:    `${GALLERY}/kasaba.jpg`,      // town = social / guild hub
  endgame:  `${GALLERY}/denizcilik2.png`, // grand harbor approach → late-game scale
};

export const SECTION_BGS = {
  quickStart:  `${GALLERY}/walking.png`,      // character on the road → start your journey
  stats:       `${GALLERY}/zirhli-at.png`,    // armored cavalry → stats / build mastery
  post50:      `${GALLERY}/manzara2.png`,     // valley vista → the long road past 50
  daily:       `${GALLERY}/toplayicilik.png`, // daily harvest → daily routines
  mistakes:    `${GALLERY}/su-alti.jpg`,      // dark depths → hidden pitfalls
  timeline:    `${GALLERY}/denizcilik.png`,   // open sea voyage → 100-hour roadmap
} as const;
export type SectionBgKey = keyof typeof SECTION_BGS;
