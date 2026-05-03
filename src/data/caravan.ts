export const CARAVAN_RENTAL_ANIMALS = [
  { id: 'donkey',   iconCode: 'binek_icon1_0001', accent: '#9c8268', tier: 'starter' },
  { id: 'ox',       iconCode: 'binek_icon1_0002', accent: '#8a7355', tier: 'starter' },
  { id: 'camel',    iconCode: 'binek_icon1_0003', accent: '#d8a25e', tier: 'mid' },
  { id: 'elephant', iconCode: 'binek_icon1_0004', accent: '#7a6c8e', tier: 'top' },
] as const;

export const CARAVAN_PREMIUMS = [
  { id: 'goldenMerchant',  iconCode: 'binek_icon1_K013', accent: '#e8c44a' },
  { id: 'desertCaravan',   iconCode: 'binek_icon1_K601', accent: '#d8a25e' },
  { id: 'sultansGuardian', iconCode: 'binek_icon1_K602', accent: '#e8a93a' },
  { id: 'warBehemoth',     iconCode: 'binek_icon1_K603', accent: '#7a6c8e' },
] as const;

export const MAJOR_CITIES = [
  { id: 'meadow',       baslik: 'Meadow',       region: 'west' },
  { id: 'runeMound',    baslik: 'Rune Mound',   region: 'west' },
  { id: 'shadowAtoll',  baslik: 'Shadow Atoll', region: 'west' },
  { id: 'kineallen',    baslik: 'Kineallen',    region: 'central' },
  { id: 'mreafall',     baslik: 'Mreafall',     region: 'central' },
  { id: 'calmarnock',   baslik: 'Calmarnock',   region: 'central' },
  { id: 'astrakhan',    baslik: 'Astrakhan',    region: 'central' },
  { id: 'larcbost',     baslik: 'Larcbost',     region: 'east' },
  { id: 'nearon',       baslik: 'Nearon',       region: 'east' },
  { id: 'pabas',        baslik: 'Pabas',        region: 'south' },
  { id: 'horus',        baslik: 'Horus',        region: 'desert' },
  { id: 'reasya',       baslik: 'Reasya',       region: 'desert' },
] as const;

export const HARBORS = [
  { id: 'edgeshore',   baslik: 'Edgeshore Harbor',   payoutGold: 500 },
  { id: 'silvercrest', baslik: 'Silvercrest Harbor', payoutGold: 500 },
  { id: 'maplewood',   baslik: 'Maplewood Harbor',   payoutGold: 800 },
  { id: 'thessahazy',  baslik: 'Thessahazy Harbor',  payoutGold: 900 },
  { id: 'puttonas',    baslik: 'Puttonas Harbor',    payoutGold: 1100 },
  { id: 'ellingliers', baslik: 'Ellingliers Harbor', payoutGold: 1200 },
  { id: 'traystable',  baslik: 'Traystable Harbor',  payoutGold: 1500 },
] as const;

export const CHANNEL_RULES = ['pveSafe', 'pvpRisk', 'pvpBonus', 'unattendedTimer'] as const;

export const CARAVAN_FLOW_STEPS = ['rent', 'package', 'route', 'travel', 'deliver'] as const;

export const SEA_CARAVAN_FACTS = ['harborMaster', 'departurePayout', 'destroyOnDock', 'pirate', 'channelSwitch'] as const;

export const CARAVAN_STRATEGIES = ['starter', 'midGame', 'pvpHigh', 'guildOps'] as const;
