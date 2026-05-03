/**
 * Leveling page data — XP path from 1 → 100.
 *
 * Verified against:
 *   - In-game quest cap = 50 (confirmed by Steam patch notes & community wiki).
 *   - Character max level = 100 (NOT 110; the 110/150 numbers are item levels).
 *   - Town Board ×2 XP grind loop after 50 (confirmed by community guides).
 *   - mob_alanlari_tablosu (items.json) — 54 hunting zones with the bracket
 *     distribution shown in HUNTING_ZONES below.
 */

export interface LevelingPhase {
  id: 'tutorial' | 'questCore' | 'questLate' | 'townBoard' | 'endgame';
  fromLevel: number;
  toLevel: number;
  /** Tailwind accent — used for the gradient bar / chip */
  accent: string;
}

export const LEVELING_PHASES: LevelingPhase[] = [
  { id: 'tutorial',  fromLevel: 1,   toLevel: 15,  accent: 'from-emerald-500/30 border-emerald-400/50 text-emerald-200' },
  { id: 'questCore', fromLevel: 15,  toLevel: 30,  accent: 'from-frost-500/30 border-frost-400/55 text-frost-200' },
  { id: 'questLate', fromLevel: 30,  toLevel: 50,  accent: 'from-amber-500/30 border-amber-400/55 text-amber-200' },
  { id: 'townBoard', fromLevel: 50,  toLevel: 75,  accent: 'from-purple-500/30 border-purple-400/60 text-purple-200' },
  { id: 'endgame',   fromLevel: 75,  toLevel: 100, accent: 'from-ember-500/30 border-ember-400/60 text-ember-200' },
];

/* -------------------------------------------------------------------------- */
/*  XP sources — what actually feeds the bar                                  */
/* -------------------------------------------------------------------------- */

export interface XpSource {
  id:
    | 'storyQuest'
    | 'sideQuest'
    | 'townBoard'
    | 'mobKill'
    | 'partyKill'
    | 'dungeonClear'
    | 'worldBoss'
    | 'profession';
  /** Lifecycle range where this source is the strongest */
  rangeFrom: number;
  rangeTo: number;
  /** Multiplier hint (×2, ×1, etc.) shown on the card */
  multiplier?: string;
  icon: 'book' | 'flag' | 'spark' | 'sword' | 'shield' | 'skull' | 'anvil' | 'wagon';
}

export const XP_SOURCES: XpSource[] = [
  { id: 'storyQuest',  rangeFrom: 1,  rangeTo: 50,  icon: 'book' },
  { id: 'sideQuest',   rangeFrom: 1,  rangeTo: 50,  icon: 'flag' },
  { id: 'townBoard',   rangeFrom: 50, rangeTo: 100, multiplier: '×2', icon: 'spark' },
  { id: 'mobKill',     rangeFrom: 1,  rangeTo: 50,  icon: 'sword' },
  { id: 'partyKill',   rangeFrom: 50, rangeTo: 100, multiplier: '×1.5', icon: 'shield' },
  { id: 'dungeonClear',rangeFrom: 25, rangeTo: 100, icon: 'skull' },
  { id: 'worldBoss',   rangeFrom: 60, rangeTo: 100, icon: 'skull' },
  { id: 'profession',  rangeFrom: 1,  rangeTo: 100, icon: 'anvil' },
];

/* -------------------------------------------------------------------------- */
/*  Hunting zones — straight from mob_alanlari_tablosu                        */
/* -------------------------------------------------------------------------- */

export interface HuntingZone {
  /** Real in-game zone name from mob_alanlari_tablosu.baslik */
  name: string;
  /** True = party recommended, False = solo-able */
  party: boolean;
}

export interface HuntingBracket {
  id: string;
  /** Display label, e.g. "1-5", "60", "100" */
  label: string;
  /** Default party expectation for the bracket badge */
  partySize: 1 | 3 | 5;
  /** Real zones in this bracket — names lifted from mob_alanlari_tablosu */
  zones: HuntingZone[];
}

/**
 * Quinfall hunting zones, grouped by character-level bracket.
 * Names + party flags lifted verbatim from items.json → mob_alanlari_tablosu
 * (the in-game zone catalogue). 54 zones total.
 */
export const HUNTING_ZONES: HuntingBracket[] = [
  {
    id: 'b1', label: '1–5', partySize: 1,
    zones: [
      { name: 'Shoreguard Camp',   party: false },
      { name: 'Abyss Camp',        party: false },
      { name: 'Shadowfang Den',    party: false },
    ],
  },
  {
    id: 'b2', label: '5–10', partySize: 1,
    zones: [
      { name: 'Abandoned Farmfields', party: false },
    ],
  },
  {
    id: 'b3', label: '10–15', partySize: 1,
    zones: [
      { name: 'Beresriden Cavity', party: false },
    ],
  },
  {
    id: 'b4', label: '15–20', partySize: 1,
    zones: [
      { name: 'Westpoint Encampment', party: false },
    ],
  },
  {
    id: 'b5', label: '20–25', partySize: 1,
    zones: [
      { name: 'Lakeview Ruins', party: false },
    ],
  },
  {
    id: 'b6', label: '25–30', partySize: 1,
    zones: [
      { name: 'Fungprowl', party: false },
    ],
  },
  {
    id: 'b7', label: '30–35', partySize: 1,
    zones: [
      { name: 'Lonely Cemetery', party: false },
    ],
  },
  {
    id: 'b8', label: '35–40', partySize: 1,
    zones: [
      { name: 'Rockville', party: false },
    ],
  },
  {
    id: 'b9', label: '40–45', partySize: 1,
    zones: [
      { name: 'The Crossing', party: false },
    ],
  },
  {
    id: 'b10', label: '45–50', partySize: 1,
    zones: [
      { name: 'Sorrowtown', party: false },
      { name: 'Wild Camp',  party: false },
    ],
  },
  {
    id: 'b11', label: '60', partySize: 3,
    zones: [
      { name: 'Arachnothorax Valley', party: true  },
      { name: 'Fang Hill',            party: false },
      { name: 'Mountainside Valley',  party: true  },
      { name: 'Truewill Manor',       party: false },
      { name: 'Plains Encampment',    party: true  },
      { name: 'North Passage',        party: false },
      { name: 'Ruins of Agony',       party: false },
    ],
  },
  {
    id: 'b12', label: '75', partySize: 3,
    zones: [
      { name: 'Migftwall Wildlands',   party: true  },
      { name: 'Amalgadon Ruin',        party: false },
      { name: 'Lost Warrior Spirits',  party: true  },
      { name: 'Noble Burial Vaults',   party: false },
      { name: 'Pillars of Death',      party: true  },
      { name: 'Mossy Forest',          party: false },
      { name: 'Riverside Watchpost',   party: false },
      { name: 'Deep Forest',           party: false },
    ],
  },
  {
    id: 'b13', label: '100', partySize: 5,
    zones: [
      { name: 'Savage Graveyard',         party: false },
      { name: 'Wrapsoul Origin Valley',   party: true  },
      { name: 'Pure Fire Ruin',           party: false },
      { name: 'Arachnid Temple',          party: true  },
      { name: 'Raynear Valley',           party: false },
      { name: 'Golmagne Ruins',           party: false },
      { name: 'Bellerath Ruins',          party: true  },
      { name: 'Forgotten Cemetery',       party: true  },
      { name: 'Overrun Village',          party: true  },
      { name: 'Ancient Ruins',            party: true  },
      { name: 'Stonewall Castle',         party: false },
      { name: 'Ancestral Graveyard',      party: false },
      { name: 'Poverty Watchpost',        party: true  },
      { name: 'Night Horn Ruins',         party: true  },
      { name: 'Wilderness Town',          party: true  },
      { name: 'Cruelty Valley',           party: true  },
      { name: 'Midnight Zombies Farms',   party: true  },
      { name: 'Frenzy Dinosaur Watchpost',party: true  },
      { name: 'Annihilation Camp',        party: true  },
      { name: 'Starfall Ruins',           party: true  },
      { name: 'Arrowtip Farms',           party: true  },
      { name: 'Virtue Tombs',             party: true  },
      { name: 'Malevolence Camp',         party: true  },
      { name: 'Maggot Farms',             party: true  },
      { name: 'Holy Tombs',               party: true  },
      { name: 'Effigy Camp',              party: true  },
    ],
  },
];

/** Total zone count helper (used by hero stat band). */
export const TOTAL_HUNTING_ZONES = HUNTING_ZONES.reduce((s, b) => s + b.zones.length, 0);

/* -------------------------------------------------------------------------- */
/*  Common mistakes                                                           */
/* -------------------------------------------------------------------------- */

export const LEVELING_MISTAKES: { id: string }[] = [
  { id: 'soloPast50' },
  { id: 'ignoringTownBoard' },
  { id: 'wrongWeaponMastery' },
  { id: 'noProfessions' },
  { id: 'overgearing' },
  { id: 'skipDungeons' },
];
