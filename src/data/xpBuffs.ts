export type AltarRegion = 'blue' | 'red';
export type BuffCategory = 'altar' | 'character' | 'premium' | 'potion' | 'scroll';

export interface BuffTier {
  tier: number;
  percent: number;
}

export interface XpBuffDef {
  id: string;
  category: BuffCategory;
  tiers: BuffTier[];
  regionDependent?: boolean;
}

export const XP_BUFFS: XpBuffDef[] = [
  { id: 'homeAltar', category: 'altar', regionDependent: true, tiers: [{ tier: 1, percent: 40 }] },
  { id: 'clanAltar', category: 'altar', regionDependent: true, tiers: [{ tier: 1, percent: 60 }] },
  { id: 'clanBuff', category: 'altar', tiers: [{ tier: 1, percent: 60 }] },
  { id: 'statueBuff', category: 'altar', tiers: [{ tier: 1, percent: 40 }] },
  { id: 'characterBuff', category: 'character', tiers: [{ tier: 1, percent: 5 }] },
  { id: 'anostiasBlessing', category: 'premium', tiers: [{ tier: 1, percent: 25 }] },
  { id: 'ordenusSecretArts', category: 'premium', tiers: [{ tier: 1, percent: 10 }] },
  { id: 'valuablePackage', category: 'premium', tiers: [{ tier: 1, percent: 15 }] },
  {
    id: 'mastersElixir',
    category: 'potion',
    tiers: [
      { tier: 1, percent: 10 },
      { tier: 2, percent: 15 },
      { tier: 3, percent: 20 },
    ],
  },
];

export type ActiveBuffs = Record<string, number>;

export function regionAdjustedPercent(
  buffId: string,
  basePct: number,
  region: AltarRegion,
): number {
  if (region !== 'red') return basePct;
  if (buffId === 'homeAltar') return 50;
  if (buffId === 'clanAltar') return 50;
  return basePct;
}

export function buffPercentTotal(active: ActiveBuffs, region: AltarRegion): number {
  let total = 0;
  for (const b of XP_BUFFS) {
    const tier = active[b.id] ?? 0;
    if (tier <= 0) continue;
    const t = b.tiers.find((x) => x.tier === tier);
    if (!t) continue;
    const pct = b.regionDependent ? regionAdjustedPercent(b.id, t.percent, region) : t.percent;
    total += pct;
  }
  return total;
}

export function buffMultiplier(active: ActiveBuffs, region: AltarRegion): number {
  return 1 + buffPercentTotal(active, region) / 100;
}

export function effectivePercent(buff: XpBuffDef, tier: number, region: AltarRegion): number {
  const t = buff.tiers.find((x) => x.tier === tier);
  if (!t) return 0;
  return buff.regionDependent ? regionAdjustedPercent(buff.id, t.percent, region) : t.percent;
}
