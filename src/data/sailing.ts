export type ShipFaction = 'trader' | 'pirate' | 'premium';
export type ShipClass = 'raft' | 'boat' | 'frigate' | 'warship';

export interface ShipBuildCost {
  coins: number;
  materials: string[];
}

export interface ShipEntry {
  id: string;
  faction: ShipFaction;
  shipClass: ShipClass | null;
  iconCode: string;
  cannonsAllowed: boolean;
  build?: ShipBuildCost;
  accent: string;
}

export const SHIPS: ShipEntry[] = [
  // Trader ships (item id 1-4)
  { id: 'raftTrader',     faction: 'trader',  shipClass: 'raft',     iconCode: 'prop_icon1_1', cannonsAllowed: false, accent: '#9ab59c',
    build: { coins: 60000,    materials: ['100 LQ Oak White / Acacia / Birch', '10 LQ Iron'] } },
  { id: 'boatTrader',     faction: 'trader',  shipClass: 'boat',     iconCode: 'prop_icon1_2', cannonsAllowed: false, accent: '#7eb3d9',
    build: { coins: 150000,   materials: ['60 MQ Palm Coconut', '60 MQ Oak White', '200 LQ Iron'] } },
  { id: 'frigateTrader',  faction: 'trader',  shipClass: 'frigate',  iconCode: 'prop_icon1_3', cannonsAllowed: true,  accent: '#e8c44a',
    build: { coins: 750000,   materials: ['100 MQ Palm Yucca', '100 MQ Forest Pine', '30 HQ Acacia', '30 HQ Birch', '500 LQ Iron', '10 HQ Iron'] } },
  { id: 'warshipTrader',  faction: 'trader',  shipClass: 'warship',  iconCode: 'prop_icon1_4', cannonsAllowed: true,  accent: '#d8853a',
    build: { coins: 1200000,  materials: ['100 MQ Queen Palm', '100 MQ Birch', '60 HQ Pine Araucaria', '60 HQ Sycamore', '1000 LQ Iron', '50 MQ Iron'] } },

  // Pirate variants (item id 1001-1004) — same build cost, role-divided
  { id: 'raftPirate',     faction: 'pirate', shipClass: 'raft',     iconCode: 'prop_icon1_1001', cannonsAllowed: false, accent: '#a06d6d' },
  { id: 'boatPirate',     faction: 'pirate', shipClass: 'boat',     iconCode: 'prop_icon1_1002', cannonsAllowed: false, accent: '#b85a5a' },
  { id: 'frigatePirate',  faction: 'pirate', shipClass: 'frigate',  iconCode: 'prop_icon1_1003', cannonsAllowed: true,  accent: '#c0392b' },
  { id: 'warshipPirate',  faction: 'pirate', shipClass: 'warship',  iconCode: 'prop_icon1_1004', cannonsAllowed: true,  accent: '#7a0000' },

  // Premium / cosmetic (item id 5001-5004)
  { id: 'mermaidShip',     faction: 'premium', shipClass: null, iconCode: 'prop_icon1_5001', cannonsAllowed: true, accent: '#6cb3e0' },
  { id: 'charonsFerryShip',faction: 'premium', shipClass: null, iconCode: 'prop_icon1_5002', cannonsAllowed: true, accent: '#5a4d6e' },
  { id: 'medusaShip',      faction: 'premium', shipClass: null, iconCode: 'prop_icon1_5003', cannonsAllowed: true, accent: '#5d8a3a' },
  { id: 'tridentShip',     faction: 'premium', shipClass: null, iconCode: 'prop_icon1_5004', cannonsAllowed: true, accent: '#e8a93a' },
];

export const SHIP_CLASSES: ShipClass[] = ['raft', 'boat', 'frigate', 'warship'];

export const SHIP_CLASS_META: Record<ShipClass, { coins: number; tier: 1 | 2 | 3 | 4; cannons: boolean }> = {
  raft:    { coins: 60000,   tier: 1, cannons: false },
  boat:    { coins: 150000,  tier: 2, cannons: false },
  frigate: { coins: 750000,  tier: 3, cannons: true  },
  warship: { coins: 1200000, tier: 4, cannons: true  },
};

export const HARBORS = [
  { id: 'edgeshore',   baslik: 'Edgeshore Harbor',   payoutGold: 500,  region: 'east' },
  { id: 'silvercrest', baslik: 'Silvercrest Harbor', payoutGold: 500,  region: 'central' },
  { id: 'maplewood',   baslik: 'Maplewood Harbor',   payoutGold: 750,  region: 'west' },
  { id: 'thessahazy',  baslik: 'Thessahazy Harbor',  payoutGold: 750,  region: 'mist' },
  { id: 'puttonas',    baslik: 'Puttonas Harbor',    payoutGold: 1000, region: 'south' },
  { id: 'ellingliers', baslik: 'Ellingliers Harbor', payoutGold: 1250, region: 'north' },
  { id: 'traystable',  baslik: 'Traystable Harbor',  payoutGold: 1500, region: 'central' },
] as const;

export const HARBOR_SERVICES = ['shipsInHarbor', 'shipTrading', 'barter', 'caravanPackages', 'shipBuilding', 'towing'] as const;

export const NAVAL_COMBAT_FACTS = ['pvpOnly', 'mannedCannons', 'durability', 'channelSwitch', 'piracy', 'cannonRestriction'] as const;

export const FISHING_CATEGORIES = ['freshwater', 'saltwater', 'deepSea'] as const;
export type FishingCategory = (typeof FISHING_CATEGORIES)[number];

export const FISHING_FACTS = ['activeMode', 'afkMode', 'tokens', 'enhancement'] as const;

export const ENHANCEMENT_MATERIALS = ['nebulas', 'starScroll', 'meteorSouls', 'astralCloth'] as const;

export const KRAKEN_PHASES = ['surface', 'tentacle', 'inkCloud', 'whirlpool', 'underwater'] as const;
export const KRAKEN_REWARDS = ['materials', 'gold', 'navalSet', 'title'] as const;

export const SHIP_ICON_BASE = '/assets/icons/';
