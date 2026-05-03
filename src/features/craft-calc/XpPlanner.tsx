import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';

import { Container } from '@/components/ui/Container';
import { Card } from '@/components/ui/Card';
import { Icon } from '@/components/ui/Icon';
import { AssetIcon } from '@/components/ui/AssetIcon';
import { findInDb, loadItemDb } from '@/data/items';
import { getRecipeMaterials, type ItemDb, type RawCraftRecipe, type RawMaterial } from '@/data/types';
import { CRAFT_PROFESSIONS, findCraftProfession } from '@/data/craftProfessions';
import { LANGUAGES, type LanguageCode } from '@/i18n/languages';
import {
  XP_BUFFS,
  buffMultiplier,
  buffPercentTotal,
  effectivePercent,
  type ActiveBuffs,
  type AltarRegion,
  type XpBuffDef,
} from '@/data/xpBuffs';
import { useLocalStorage } from '@/hooks/useLocalStorage';

interface XpPlannerProps {
  lang: LanguageCode;
}

interface InventoryEntry {
  id: string;
  qty: number;
}

interface IngredientView {
  id: string;
  name: string;
  icon: string;
  needPerCraft: number;
  have: number;
  missing: number;
  totalNeeded: number;
}

interface OptimizedRecipe {
  recipe: RawCraftRecipe;
  outputName: string;
  outputIcon: string;
  professionId: string | null;
  craftsPossible: number;
  craftsIfTopped: number;
  xpPerCraft: number;
  totalXp: number;
  timePerCraft: number;
  totalTime: number;
  xpPerHour: number;
  ingredients: IngredientView[];
  missingIngredients: IngredientView[];
}

function xpForLevel(level: number): number {
  if (level <= 1) return 0;
  return Math.round(100 * Math.pow(1.1, level - 1) * level);
}
function totalXpBetween(from: number, to: number): number {
  let s = 0;
  for (let l = from + 1; l <= to; l++) s += xpForLevel(l);
  return s;
}

const ALMOST_TARGET_CRAFTS = 20;

export function XpPlanner({ lang }: XpPlannerProps) {
  const { t } = useTranslation('craftCalc');
  const langDef = LANGUAGES.find((l) => l.code === lang) ?? LANGUAGES[0];
  const titleField = `baslik_loc_${langDef.itemDbField}` as const;

  const [db, setDb] = useState<ItemDb | null>(null);
  const [loading, setLoading] = useState(true);

  const [profId, setProfId] = useState<string>(CRAFT_PROFESSIONS[0]?.id ?? 'cooking');
  const [searchAll, setSearchAll] = useLocalStorage<boolean>('quinwiki.searchAllProfs', false);
  const [current, setCurrent] = useState<number>(1);
  const [target, setTarget] = useState<number>(50);
  const [workbenches, setWorkbenches] = useLocalStorage<number>('quinwiki.workbenches', 1);
  const [region, setRegion] = useLocalStorage<AltarRegion>('quinwiki.altarRegion', 'blue');
  const [activeBuffs, setActiveBuffs] = useLocalStorage<ActiveBuffs>('quinwiki.xpBuffs.v3', {});
  const [inventory, setInventory] = useLocalStorage<InventoryEntry[]>('quinwiki.inventory', []);
  const [matQuery, setMatQuery] = useState('');
  const [optimizerTab, setOptimizerTab] = useState<'ready' | 'almost'>('ready');

  useEffect(() => {
    let alive = true;
    setLoading(true);
    loadItemDb()
      .then((d) => alive && setDb(d))
      .finally(() => alive && setLoading(false));
    return () => {
      alive = false;
    };
  }, []);

  const profession = findCraftProfession(profId);
  const profMul = buffMultiplier(activeBuffs, region);
  const profPct = buffPercentTotal(activeBuffs, region);
  const wb = Math.max(1, Math.min(20, workbenches));
  const effTime = (s: number) => s;

  const recipes = useMemo<RawCraftRecipe[]>(() => {
    if (!db) return [];
    if (searchAll) return db.craft_tablosu.filter((r) => r.exp > 0 && r.min_meslek_level <= current);
    if (!profession) return [];
    return db.craft_tablosu.filter(
      (r) => r.meslek_no === profession.mesleknNo && r.exp > 0 && r.min_meslek_level <= current,
    );
  }, [db, profession, current, searchAll]);

  const fastest = useMemo<RawCraftRecipe | null>(() => {
    if (recipes.length === 0) return null;
    return [...recipes].sort((a, b) => {
      const ax = (a.exp * profMul) / Math.max(1, effTime(a.time));
      const bx = (b.exp * profMul) / Math.max(1, effTime(b.time));
      return bx - ax;
    })[0];
  }, [recipes, profMul, wb]);

  const totalXp = useMemo(() => (target <= current ? 0 : totalXpBetween(current, target)), [current, target]);
  const totalCrafts = useMemo(() => {
    if (!fastest) return 0;
    return Math.max(0, Math.ceil(totalXp / (fastest.exp * profMul)));
  }, [totalXp, fastest, profMul]);
  const totalTimeSeconds = useMemo(() => {
    if (!fastest) return 0;
    return Math.ceil((totalCrafts * effTime(fastest.time)) / wb);
  }, [totalCrafts, fastest, wb, wb]);

  const fastestOutput = useMemo(() => {
    if (!db || !fastest) return null;
    const found = findInDb(fastest.item_id, db);
    if (!found) return null;
    return {
      name: (found.entry[titleField] as string | undefined) ?? '',
      icon: (found.entry.icon1 as string | undefined) ?? '',
    };
  }, [db, fastest, titleField]);

  const inventoryMap = useMemo(() => {
    const map = new Map<string, number>();
    for (const e of inventory) map.set(e.id, e.qty);
    return map;
  }, [inventory]);

  const { ready, almost } = useMemo<{ ready: OptimizedRecipe[]; almost: OptimizedRecipe[] }>(() => {
    if (!db || inventory.length === 0) return { ready: [], almost: [] };
    const ready: OptimizedRecipe[] = [];
    const almost: OptimizedRecipe[] = [];

    for (const r of recipes) {
      const mats = getRecipeMaterials(r);
      if (mats.length === 0) continue;

      let craftsPossible = Infinity;
      const ingrInfo: IngredientView[] = [];
      let usesAtLeastOneInventoryItem = false;

      for (const m of mats) {
        const have = inventoryMap.get(m.id) ?? 0;
        if (have > 0) usesAtLeastOneInventoryItem = true;
        const possible = Math.floor(have / m.quantity);
        if (possible < craftsPossible) craftsPossible = possible;
        const found = findInDb(m.id, db);
        const name = (found?.entry[titleField] as string | undefined) ?? m.id;
        const icon = (found?.entry.icon1 as string | undefined) ?? '';
        ingrInfo.push({
          id: m.id,
          name,
          icon,
          needPerCraft: m.quantity,
          have,
          missing: 0,
          totalNeeded: 0,
        });
      }

      if (!Number.isFinite(craftsPossible)) craftsPossible = 0;
      if (!usesAtLeastOneInventoryItem) continue;

      const xpPerCraft = Math.round(r.exp * profMul);
      const timePerCraft = effTime(r.time);
      const found = findInDb(r.item_id, db);
      const outputName = (found?.entry[titleField] as string | undefined) ?? r.item_id;
      const outputIcon = (found?.entry.icon1 as string | undefined) ?? '';
      const profOfRec = CRAFT_PROFESSIONS.find((p) => p.mesleknNo === r.meslek_no)?.id ?? null;

      if (craftsPossible > 0) {
        ingrInfo.forEach((i) => {
          i.totalNeeded = i.needPerCraft * craftsPossible;
        });
        const totalXpRecipe = xpPerCraft * craftsPossible;
        const totalTime = Math.ceil((timePerCraft * craftsPossible) / wb);
        const xpPerHour = totalTime > 0 ? Math.round((totalXpRecipe * 3600) / totalTime) : 0;
        ready.push({
          recipe: r,
          outputName,
          outputIcon,
          professionId: profOfRec,
          craftsPossible,
          craftsIfTopped: craftsPossible,
          xpPerCraft,
          totalXp: totalXpRecipe,
          timePerCraft,
          totalTime,
          xpPerHour,
          ingredients: ingrInfo,
          missingIngredients: [],
        });
      } else {
        const missing: IngredientView[] = [];
        ingrInfo.forEach((i) => {
          const need = i.needPerCraft * ALMOST_TARGET_CRAFTS;
          const miss = Math.max(0, need - i.have);
          i.totalNeeded = need;
          i.missing = miss;
          if (miss > 0) missing.push(i);
        });
        const coverage =
          ingrInfo.reduce((acc, i) => acc + Math.min(i.have, i.totalNeeded), 0) /
          Math.max(1, ingrInfo.reduce((acc, i) => acc + i.totalNeeded, 0));
        if (coverage >= 0.05) {
          const totalXpAlmost = xpPerCraft * ALMOST_TARGET_CRAFTS;
          const totalTime = Math.ceil((timePerCraft * ALMOST_TARGET_CRAFTS) / wb);
          almost.push({
            recipe: r,
            outputName,
            outputIcon,
            professionId: profOfRec,
            craftsPossible: 0,
            craftsIfTopped: ALMOST_TARGET_CRAFTS,
            xpPerCraft,
            totalXp: totalXpAlmost,
            timePerCraft,
            totalTime,
            xpPerHour: totalTime > 0 ? Math.round((totalXpAlmost * 3600) / totalTime) : 0,
            ingredients: ingrInfo,
            missingIngredients: missing,
          });
        }
      }
    }

    ready.sort((a, b) => b.xpPerHour - a.xpPerHour);
    almost.sort((a, b) => {
      const aMiss = a.missingIngredients.reduce((acc, i) => acc + i.missing, 0);
      const bMiss = b.missingIngredients.reduce((acc, i) => acc + i.missing, 0);
      return aMiss - bMiss;
    });
    return { ready: ready.slice(0, 8), almost: almost.slice(0, 8) };
  }, [db, recipes, inventory, inventoryMap, profMul, wb, wb, titleField]);

  return (
    <Container size="xl" className="pb-20">
      <header className="mb-6 max-w-3xl">
        <div className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-frost-300/90">
          {t('xp.title')}
        </div>
        <p className="text-sm leading-relaxed text-steel-200 sm:text-base">{t('xp.subtitle')}</p>
      </header>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_22rem]">
        <div className="space-y-5">
          <Card className="p-5">
            <SectionHeading icon="cpu" label={t('xp.settings')} />
            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <Field label={t('xp.profession')}>
                <select
                  value={profId}
                  onChange={(e) => setProfId(e.target.value)}
                  disabled={searchAll}
                  className="h-11 w-full rounded-lg border border-steel-700 bg-ink-950/70 px-3 text-sm text-white focus:border-frost-400/70 disabled:opacity-40"
                >
                  {CRAFT_PROFESSIONS.map((p) => (
                    <option key={p.id} value={p.id} className="bg-ink-900">
                      {t(`filters.${p.id}`)}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label={t('xp.searchAllProfessions')} hint={t('xp.searchAllHint') as string}>
                <button
                  type="button"
                  onClick={() => setSearchAll(!searchAll)}
                  className={`flex h-11 w-full items-center justify-between rounded-lg border px-3 transition ${
                    searchAll
                      ? 'border-frost-400/80 bg-frost-500/15 text-white shadow-glow'
                      : 'border-steel-700/60 bg-ink-900/40 text-steel-300 hover:border-frost-400/50'
                  }`}
                >
                  <span className="text-sm font-medium">
                    {searchAll ? t('xp.professionLocked') : t('xp.off')}
                  </span>
                  <span
                    className={`relative inline-flex h-4 w-7 shrink-0 items-center rounded-full transition ${
                      searchAll ? 'bg-frost-400/90' : 'bg-steel-700'
                    }`}
                    aria-hidden
                  >
                    <span
                      className={`absolute h-3 w-3 rounded-full bg-white transition ${
                        searchAll ? 'translate-x-3.5' : 'translate-x-0.5'
                      }`}
                    />
                  </span>
                </button>
              </Field>
              <Field label={t('xp.workbenches')} hint={t('xp.workbenchHint') as string}>
                <input
                  type="number"
                  min={1}
                  max={20}
                  value={workbenches}
                  onChange={(e) => setWorkbenches(Math.max(1, Math.min(20, Number(e.target.value) || 1)))}
                  className="h-11 w-full rounded-lg border border-steel-700 bg-ink-950/70 px-3 text-base text-white focus:border-frost-400/70"
                />
              </Field>
              <Field label={t('xp.region.label')} hint={t('xp.region.hint') as string}>
                <div className="flex gap-1">
                  {(['blue', 'red'] as AltarRegion[]).map((reg) => {
                    const active = region === reg;
                    return (
                      <button
                        key={reg}
                        type="button"
                        onClick={() => setRegion(reg)}
                        className={`flex-1 rounded-md border px-2 py-2 text-xs font-medium transition ${
                          active
                            ? reg === 'red'
                              ? 'border-rose-400/70 bg-rose-500/15 text-white shadow-glow'
                              : 'border-frost-400/80 bg-frost-500/15 text-white shadow-glow'
                            : 'border-steel-700/60 bg-ink-900/40 text-steel-300 hover:border-frost-400/50'
                        }`}
                      >
                        {t(`xp.region.${reg}`)}
                      </button>
                    );
                  })}
                </div>
              </Field>
              <Field label={t('xp.currentLevel')}>
                <input
                  type="number"
                  min={1}
                  max={100}
                  value={current}
                  onChange={(e) => setCurrent(Math.max(1, Math.min(100, Number(e.target.value) || 1)))}
                  className="h-11 w-full rounded-lg border border-steel-700 bg-ink-950/70 px-3 text-base text-white focus:border-frost-400/70"
                />
              </Field>
              <Field label={t('xp.targetLevel')}>
                <input
                  type="number"
                  min={1}
                  max={100}
                  value={target}
                  onChange={(e) => setTarget(Math.max(1, Math.min(100, Number(e.target.value) || 1)))}
                  className="h-11 w-full rounded-lg border border-steel-700 bg-ink-950/70 px-3 text-base text-white focus:border-frost-400/70"
                />
              </Field>
            </div>
          </Card>

          <BuffPanel
            active={activeBuffs}
            region={region}
            onSet={(id, tier) => setActiveBuffs((prev) => ({ ...prev, [id]: tier }))}
            professionPercent={profPct}
          />

          <InventoryEditor
            db={db}
            loading={loading}
            inventory={inventory}
            onChange={setInventory}
            query={matQuery}
            onQuery={setMatQuery}
            titleField={titleField}
          />

          <OptimizerResults
            ready={ready}
            almost={almost}
            tab={optimizerTab}
            onTab={setOptimizerTab}
            hasInventory={inventory.length > 0}
          />
        </div>

        <aside className="space-y-5 lg:sticky lg:top-24 lg:self-start">
          <Card className="p-5">
            {loading ? (
              <div className="space-y-3">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="h-12 animate-pulse rounded-md bg-ink-900/40" />
                ))}
              </div>
            ) : !fastest ? (
              <div className="flex flex-col items-center gap-3 py-6 text-center text-sm text-steel-400">
                <Icon name="cpu" size={28} className="text-frost-300" />
                <div>{t('xp.noRecipes')}</div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="rounded-xl border border-frost-400/30 bg-frost-500/10 p-3">
                  <div className="flex items-center justify-between text-[10px] font-semibold uppercase tracking-[0.18em] text-frost-200">
                    <span>{t('xp.fastest')}</span>
                    {profPct > 0 && (
                      <span className="rounded-full border border-ember-400/40 bg-ember-500/10 px-2 py-0.5 text-[9px] text-ember-300">
                        +{profPct}%
                      </span>
                    )}
                  </div>
                  <div className="mt-2 flex items-center gap-3">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-steel-700/60 bg-ink-900/70 p-1.5">
                      {fastestOutput?.icon ? (
                        <AssetIcon code={fastestOutput.icon} size={36} />
                      ) : (
                        <Icon name="spark" size={20} className="text-frost-300" />
                      )}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-sm font-medium text-white">{fastestOutput?.name}</div>
                      <div className="text-[10px] uppercase tracking-[0.16em] text-steel-400">
                        +{Math.round(fastest.exp * profMul)} XP · {effTime(fastest.time)}s · ×{wb}
                      </div>
                    </div>
                  </div>
                  <p className="mt-3 text-[11px] leading-relaxed text-steel-300">{t('xp.fastestNote')}</p>
                </div>

                <dl className="grid grid-cols-1 gap-2 text-xs">
                  <Stat label={t('xp.totalXp')} value={totalXp.toLocaleString()} />
                  <Stat label={t('xp.totalCrafts')} value={totalCrafts.toLocaleString()} accent />
                  <Stat
                    label={t('xp.estimatedTime')}
                    value={formatHours(
                      totalTimeSeconds,
                      t('calc.seconds') as string,
                      t('calc.minutes') as string,
                      t('calc.hours') as string,
                    )}
                  />
                </dl>

                <p className="text-[11px] italic text-steel-400">{t('xp.modelNote')}</p>
              </div>
            )}
          </Card>
        </aside>
      </div>
    </Container>
  );
}

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.18em] text-steel-300">
        {label}
      </span>
      {children}
      {hint && <span className="mt-1 block text-[10px] text-steel-400">{hint}</span>}
    </label>
  );
}

function SectionHeading({ icon, label }: { icon: 'cpu' | 'spark' | 'image'; label: string }) {
  return (
    <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-frost-300/90">
      <Icon name={icon} size={12} />
      {label}
    </div>
  );
}

function Stat({ label, value, accent = false }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="rounded-lg border border-steel-700/50 bg-ink-950/60 p-3">
      <dt className="text-[10px] uppercase tracking-[0.16em] text-steel-400">{label}</dt>
      <dd className={`mt-1 font-display text-2xl ${accent ? 'heading-gradient' : 'text-white'}`}>
        {value}
      </dd>
    </div>
  );
}

function BuffPanel({
  active,
  region,
  onSet,
  professionPercent,
}: {
  active: ActiveBuffs;
  region: AltarRegion;
  onSet: (id: string, tier: number) => void;
  professionPercent: number;
}) {
  const { t } = useTranslation('craftCalc');
  const grouped = useMemo(() => {
    const groups: Record<string, XpBuffDef[]> = {};
    for (const b of XP_BUFFS) {
      if (!groups[b.category]) groups[b.category] = [];
      groups[b.category].push(b);
    }
    return groups;
  }, []);

  return (
    <Card className="p-5">
      <div className="flex items-start justify-between gap-3">
        <SectionHeading icon="spark" label={t('xp.buffs')} />
        <span
          className={`rounded-full border px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-[0.16em] ${
            professionPercent > 0
              ? 'border-ember-400/40 bg-ember-500/10 text-ember-300'
              : 'border-steel-700/60 bg-ink-900/70 text-steel-300'
          }`}
        >
          +{professionPercent}% · {t(`xp.region.${region}`)}
        </span>
      </div>

      <div className="mt-4 space-y-4">
        {Object.entries(grouped).map(([cat, buffs]) => (
          <div key={cat}>
            <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-steel-400">
              {t(`xp.buffCategoriesV2.${cat}`)}
            </div>
            <div className="grid grid-cols-1 gap-2">
              {buffs.map((b) => (
                <BuffRow
                  key={b.id}
                  buff={b}
                  activeTier={active[b.id] ?? 0}
                  region={region}
                  onSet={(tier) => onSet(b.id, tier)}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

function BuffRow({
  buff,
  activeTier,
  region,
  onSet,
}: {
  buff: XpBuffDef;
  activeTier: number;
  region: AltarRegion;
  onSet: (tier: number) => void;
}) {
  const { t } = useTranslation('craftCalc');
  const on = activeTier > 0;
  const isMultiTier = buff.tiers.length > 1;
  const currentPct = on ? effectivePercent(buff, activeTier, region) : 0;

  return (
    <div
      className={`rounded-lg border px-3 py-2.5 transition ${
        on ? 'border-frost-400/70 bg-frost-500/10' : 'border-steel-700/60 bg-ink-900/40'
      }`}
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className={`text-sm font-medium ${on ? 'text-white' : 'text-steel-200'}`}>
              {t(`xp.buffNames.${buff.id}`)}
            </span>
            {on && (
              <span className="rounded-full border border-ember-400/40 bg-ember-500/10 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-[0.14em] text-ember-300">
                +{currentPct}%
              </span>
            )}
          </div>
          {buff.regionDependent && (
            <div className="mt-0.5 text-[9px] uppercase tracking-[0.14em] text-steel-400">
              {region === 'red' ? '50%' : `${buff.tiers[0].percent}%`}
            </div>
          )}
        </div>

        <div className="flex shrink-0 items-center gap-1">
          {isMultiTier ? (
            <>
              <button
                type="button"
                onClick={() => onSet(0)}
                className={`h-8 px-2 rounded-md border text-[11px] font-semibold transition ${
                  activeTier === 0
                    ? 'border-frost-400/80 bg-frost-500/15 text-white'
                    : 'border-steel-700/60 text-steel-400 hover:border-frost-400/50'
                }`}
              >
                {t('xp.off')}
              </button>
              {buff.tiers.map((tier) => {
                const isOn = activeTier === tier.tier;
                const pct = effectivePercent(buff, tier.tier, region);
                return (
                  <button
                    key={tier.tier}
                    type="button"
                    onClick={() => onSet(tier.tier)}
                    className={`h-8 px-2 rounded-md border text-[11px] font-semibold transition ${
                      isOn
                        ? 'border-frost-400/80 bg-frost-500/15 text-white shadow-glow'
                        : 'border-steel-700/60 text-steel-300 hover:border-frost-400/50'
                    }`}
                  >
                    T{tier.tier}
                    <span className="ml-1 text-frost-300">+{pct}%</span>
                  </button>
                );
              })}
            </>
          ) : (
            <button
              type="button"
              onClick={() => onSet(on ? 0 : buff.tiers[0].tier)}
              className={`relative inline-flex h-5 w-9 items-center rounded-full transition ${
                on ? 'bg-frost-400/90' : 'bg-steel-700'
              }`}
              aria-label={t(`xp.buffNames.${buff.id}`) as string}
            >
              <span
                className={`absolute h-4 w-4 rounded-full bg-white transition ${
                  on ? 'translate-x-4' : 'translate-x-0.5'
                }`}
              />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function InventoryEditor({
  db,
  loading,
  inventory,
  onChange,
  query,
  onQuery,
  titleField,
}: {
  db: ItemDb | null;
  loading: boolean;
  inventory: InventoryEntry[];
  onChange: (next: InventoryEntry[] | ((prev: InventoryEntry[]) => InventoryEntry[])) => void;
  query: string;
  onQuery: (q: string) => void;
  titleField: `baslik_loc_${string}`;
}) {
  const { t } = useTranslation('craftCalc');

  const matchingMaterials = useMemo<RawMaterial[]>(() => {
    if (!db) return [];
    const q = query.trim().toLowerCase();
    if (q.length < 2) return [];
    const out: RawMaterial[] = [];
    for (const m of db.material_tablosu) {
      const name = (m[titleField] as string | undefined) ?? '';
      if (name.toLowerCase().includes(q)) {
        out.push(m);
        if (out.length >= 8) break;
      }
    }
    return out;
  }, [db, query, titleField]);

  function addMaterial(id: string) {
    onChange((prev) => {
      const existing = prev.find((e) => e.id === id);
      if (existing) return prev.map((e) => (e.id === id ? { ...e, qty: e.qty + 10 } : e));
      return [...prev, { id, qty: 10 }];
    });
    onQuery('');
  }
  function setQty(id: string, qty: number) {
    onChange((prev) => prev.map((e) => (e.id === id ? { ...e, qty: Math.max(0, qty) } : e)));
  }
  function remove(id: string) {
    onChange((prev) => prev.filter((e) => e.id !== id));
  }

  return (
    <Card className="p-5">
      <div className="flex items-center justify-between gap-3">
        <SectionHeading icon="image" label={t('inventory.title')} />
        <span className="text-[10px] uppercase tracking-[0.16em] text-steel-400">
          {inventory.length} {t('inventory.items')} · {t('inventory.saved')}
        </span>
      </div>
      <p className="mt-1 text-xs text-steel-300">{t('inventory.subtitle')}</p>

      <div className="mt-4 relative">
        <Icon name="search" size={14} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-steel-400" />
        <input
          type="search"
          value={query}
          onChange={(e) => onQuery(e.target.value)}
          placeholder={t('inventory.search') as string}
          className="h-11 w-full rounded-lg border border-steel-700 bg-ink-950/70 pl-9 pr-4 text-sm text-white placeholder:text-steel-500 focus:border-frost-400/70"
        />
        <AnimatePresence>
          {!loading && matchingMaterials.length > 0 && (
            <motion.ul
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.15 }}
              className="absolute z-20 mt-1 max-h-72 w-full overflow-y-auto rounded-lg border border-steel-700 bg-ink-900/95 shadow-panel scrollbar-thin"
            >
              {matchingMaterials.map((m) => (
                <li key={m.id}>
                  <button
                    type="button"
                    onClick={() => addMaterial(m.id)}
                    className="flex w-full items-center gap-2.5 px-3 py-2 text-left text-sm text-white transition hover:bg-frost-500/10"
                  >
                    <span className="flex h-9 w-9 items-center justify-center rounded-md border border-steel-700/40 bg-ink-900/80 p-1">
                      <AssetIcon code={m.icon1} size={26} />
                    </span>
                    <span className="flex-1 truncate">{(m[titleField] as string | undefined) ?? m.id}</span>
                    <Icon name="arrow-right" size={12} className="text-steel-500" />
                  </button>
                </li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>

      {inventory.length === 0 ? (
        <div className="mt-4 rounded-lg border border-dashed border-steel-700/60 bg-ink-950/40 p-4 text-center text-xs text-steel-400">
          {t('inventory.empty')}
        </div>
      ) : (
        <ul className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
          {inventory.map((entry) => {
            const found = db ? findInDb(entry.id, db) : null;
            const name = (found?.entry[titleField] as string | undefined) ?? entry.id;
            const icon = (found?.entry.icon1 as string | undefined) ?? '';
            return (
              <li key={entry.id} className="flex items-center gap-2.5 rounded-lg border border-steel-700/50 bg-ink-950/60 p-2">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-steel-700/40 bg-ink-900/80 p-1">
                  {icon ? <AssetIcon code={icon} size={28} /> : <Icon name="spark" size={14} className="text-steel-500" />}
                </span>
                <span className="flex-1 truncate text-xs text-white">{name}</span>
                <input
                  type="number"
                  min={0}
                  max={99999}
                  value={entry.qty}
                  onChange={(e) => setQty(entry.id, Math.max(0, Math.min(99999, Number(e.target.value) || 0)))}
                  className="h-9 w-20 rounded-md border border-steel-700 bg-ink-900/80 px-2 text-right text-sm text-white focus:border-frost-400/70"
                />
                <button
                  type="button"
                  onClick={() => remove(entry.id)}
                  aria-label={t('inventory.remove') as string}
                  className="flex h-9 w-9 items-center justify-center rounded-md border border-steel-700/60 text-steel-400 transition hover:border-rose-400/60 hover:text-rose-300"
                >
                  <Icon name="close" size={14} />
                </button>
              </li>
            );
          })}
        </ul>
      )}

      {inventory.length > 0 && (
        <button
          type="button"
          onClick={() => onChange([])}
          className="mt-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-steel-400 transition hover:text-rose-300"
        >
          {t('inventory.clear')}
        </button>
      )}
    </Card>
  );
}

function OptimizerResults({
  ready,
  almost,
  tab,
  onTab,
  hasInventory,
}: {
  ready: OptimizedRecipe[];
  almost: OptimizedRecipe[];
  tab: 'ready' | 'almost';
  onTab: (t: 'ready' | 'almost') => void;
  hasInventory: boolean;
}) {
  const { t } = useTranslation('craftCalc');
  const list = tab === 'ready' ? ready : almost;

  return (
    <Card className="p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <SectionHeading icon="spark" label={t('optimizer.title')} />
          <p className="mt-1 text-xs text-steel-300">{t('optimizer.subtitle')}</p>
        </div>
        <div className="inline-flex rounded-full border border-steel-700 bg-ink-900/60 p-1">
          {(['ready', 'almost'] as const).map((id) => {
            const active = tab === id;
            const count = id === 'ready' ? ready.length : almost.length;
            return (
              <button
                key={id}
                type="button"
                onClick={() => onTab(id)}
                className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition ${
                  active ? 'bg-frost-500/20 text-white shadow-glow' : 'text-steel-300 hover:text-white'
                }`}
              >
                {t(`optimizer.${id === 'ready' ? 'tabReady' : 'tabAlmost'}`)}
                <span
                  className={`rounded-full px-1.5 py-0.5 text-[9px] ${
                    active ? 'bg-frost-400/30 text-white' : 'bg-ink-900 text-steel-400'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {!hasInventory ? (
        <div className="mt-4 rounded-lg border border-dashed border-steel-700/60 bg-ink-950/40 p-5 text-center text-xs text-steel-400">
          {t('optimizer.addInventoryFirst')}
        </div>
      ) : list.length === 0 ? (
        <div className="mt-4 rounded-lg border border-dashed border-steel-700/60 bg-ink-950/40 p-5 text-center text-xs text-steel-400">
          {tab === 'ready' ? t('optimizer.noResults') : t('optimizer.noAlmost')}
        </div>
      ) : (
        <>
          {tab === 'almost' && (
            <p className="mt-3 text-[11px] italic text-steel-400">{t('optimizer.almostHint')}</p>
          )}
          <ol className="mt-4 space-y-2">
            {list.map((opt, i) => (
              <RecipeRow key={`${opt.recipe.meslek_no}-${opt.recipe.item_id}-${opt.recipe.tier}`} opt={opt} index={i} mode={tab} />
            ))}
          </ol>
        </>
      )}
    </Card>
  );
}

function RecipeRow({
  opt,
  index,
  mode,
}: {
  opt: OptimizedRecipe;
  index: number;
  mode: 'ready' | 'almost';
}) {
  const { t } = useTranslation('craftCalc');
  return (
    <motion.li
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, delay: index * 0.04 }}
      className={`rounded-xl border p-3 ${
        mode === 'almost' ? 'border-ember-400/30 bg-ember-500/[0.04]' : 'border-steel-700/60 bg-ink-950/60'
      }`}
    >
      <div className="flex items-start gap-3">
        <span
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-xs font-bold ${
            index === 0 && mode === 'ready'
              ? 'border-ember-400/60 bg-ember-500/10 text-ember-300'
              : 'border-frost-400/40 bg-frost-500/10 text-frost-200'
          }`}
        >
          {index + 1}
        </span>
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-steel-700/60 bg-ink-900/80 p-1.5">
          {opt.outputIcon ? (
            <AssetIcon code={opt.outputIcon} size={36} />
          ) : (
            <Icon name="spark" size={20} className="text-steel-500" />
          )}
        </span>
        <div className="min-w-0 flex-1">
          <div className="font-display text-sm text-white truncate">{opt.outputName}</div>
          <div className="mt-0.5 flex flex-wrap items-center gap-1.5 text-[10px] uppercase tracking-[0.16em] text-steel-400">
            <span>+{opt.xpPerCraft} XP</span>
            <span>·</span>
            <span>{opt.timePerCraft}s</span>
            <span>·</span>
            <span>T{opt.recipe.tier}</span>
            {opt.professionId && (
              <>
                <span>·</span>
                <span className="text-frost-300">{t(`filters.${opt.professionId}`)}</span>
              </>
            )}
          </div>
        </div>
        <div className="text-right">
          <div className={`font-display text-base ${mode === 'almost' ? 'text-ember-300' : 'heading-gradient'}`}>
            {opt.xpPerHour.toLocaleString()}
          </div>
          <div className="text-[9px] uppercase tracking-[0.16em] text-steel-400">{t('optimizer.xpPerHour')}</div>
        </div>
      </div>

      {mode === 'ready' ? (
        <>
          <div className="mt-3 grid grid-cols-3 gap-2 text-[10px]">
            <Cell label={t('optimizer.possible') as string} value={opt.craftsPossible.toLocaleString()} />
            <Cell label={t('optimizer.totalXp') as string} value={`+${opt.totalXp.toLocaleString()}`} />
            <Cell label={t('optimizer.totalTime') as string} value={formatHours(opt.totalTime, 's', 'd', 'h')} />
          </div>
          <div className="mt-2.5 text-[10px] text-steel-400">{t('optimizer.uses')}:</div>
          <div className="mt-1.5 flex flex-wrap gap-1.5">
            {opt.ingredients.map((ing) => (
              <IngrChip key={ing.id} ing={ing} short={`×${ing.totalNeeded.toLocaleString()}`} />
            ))}
          </div>
        </>
      ) : (
        <>
          <div className="mt-3">
            <div className="mb-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-rose-300">
              {t('optimizer.missing')} ({opt.missingIngredients.length})
            </div>
            <div className="flex flex-wrap gap-1.5">
              {opt.missingIngredients.map((ing) => (
                <span
                  key={ing.id}
                  className="inline-flex items-center gap-1.5 rounded-full border border-rose-400/40 bg-rose-500/10 py-0.5 pl-1 pr-2 text-[10px]"
                >
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-ink-900/80">
                    {ing.icon ? <AssetIcon code={ing.icon} size={16} /> : <Icon name="spark" size={9} className="text-steel-500" />}
                  </span>
                  <span className="truncate max-w-[8rem] text-rose-200">{ing.name}</span>
                  <span className="font-semibold text-rose-300">+{ing.missing.toLocaleString()}</span>
                </span>
              ))}
            </div>
          </div>
          {opt.ingredients.filter((i) => i.have > 0 && i.missing === 0).length > 0 && (
            <div className="mt-2.5">
              <div className="mb-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-emerald-300">
                {t('optimizer.have')}
              </div>
              <div className="flex flex-wrap gap-1.5">
                {opt.ingredients
                  .filter((i) => i.have > 0 && i.missing === 0)
                  .map((ing) => (
                    <IngrChip key={ing.id} ing={ing} short={`×${ing.have.toLocaleString()}`} positive />
                  ))}
              </div>
            </div>
          )}
        </>
      )}
    </motion.li>
  );
}

function IngrChip({
  ing,
  short,
  positive = false,
}: {
  ing: IngredientView;
  short: string;
  positive?: boolean;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border bg-ink-900/80 py-0.5 pl-1 pr-2 text-[10px] ${
        positive ? 'border-emerald-400/40' : 'border-steel-700/60'
      }`}
    >
      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-ink-900/80">
        {ing.icon ? <AssetIcon code={ing.icon} size={16} /> : <Icon name="spark" size={9} className="text-steel-500" />}
      </span>
      <span className="truncate max-w-[8rem] text-steel-300">{ing.name}</span>
      <span className={`font-semibold ${positive ? 'text-emerald-300' : 'text-frost-300'}`}>{short}</span>
    </span>
  );
}

function Cell({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border border-steel-700/40 bg-ink-900/50 px-2 py-1.5">
      <div className="text-[9px] uppercase tracking-[0.16em] text-steel-400">{label}</div>
      <div className="mt-0.5 text-xs font-semibold text-white">{value}</div>
    </div>
  );
}

function formatHours(seconds: number, secLabel: string, minLabel: string, hourLabel: string): string {
  if (seconds < 60) return `${seconds}${secLabel}`;
  if (seconds < 3600) {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return s === 0 ? `${m}${minLabel}` : `${m}${minLabel} ${s}${secLabel}`;
  }
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  return m === 0 ? `${h}${hourLabel}` : `${h}${hourLabel} ${m}${minLabel}`;
}
