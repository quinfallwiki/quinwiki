import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';

import { Container } from '@/components/ui/Container';
import { Card } from '@/components/ui/Card';
import { Icon } from '@/components/ui/Icon';
import { AssetIcon } from '@/components/ui/AssetIcon';
import { findInDb, loadItemDb } from '@/data/items';
import {
  getRecipeMaterials,
  type ItemDb,
  type RawCraftRecipe,
} from '@/data/types';
import { CRAFT_PROFESSIONS, findCraftProfession } from '@/data/craftProfessions';
import { LANGUAGES, type LanguageCode } from '@/i18n/languages';

interface CraftCalculatorProps {
  lang: LanguageCode;
}

interface ResolvedItem {
  name: string;
  type: string;
  icon: string;
  level: number;
  salePrice: number;
  purchasePrice: number;
  weight: number;
}

interface ResolvedRecipe {
  recipe: RawCraftRecipe;
  output: ResolvedItem;
}

interface ResolvedIngredient {
  rawId: string;
  qty: number;
  info: ResolvedItem;
  subRecipe: RawCraftRecipe | null;
}

const RECIPE_LIST_LIMIT = 250;

export function CraftCalculator({ lang }: CraftCalculatorProps) {
  const { t } = useTranslation('craftCalc');
  const langDef = LANGUAGES.find((l) => l.code === lang) ?? LANGUAGES[0];
  const titleField = `baslik_loc_${langDef.itemDbField}` as const;
  const typeField = `tip_loc_${langDef.itemDbField}` as const;

  const [db, setDb] = useState<ItemDb | null>(null);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [filterId, setFilterId] = useState<string>('all');
  const [selectedKey, setSelectedKey] = useState<string | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [expandedSub, setExpandedSub] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;
    setLoading(true);
    loadItemDb()
      .then((d) => {
        if (alive) setDb(d);
      })
      .finally(() => {
        if (alive) setLoading(false);
      });
    return () => {
      alive = false;
    };
  }, []);

  const resolve = (rawId: string): ResolvedItem | null => {
    if (!db) return null;
    const found = findInDb(rawId, db);
    if (!found) return null;
    const e = found.entry;
    return {
      name: (e[titleField] as string | undefined) ?? rawId,
      type: (e[typeField] as string | undefined) ?? '',
      icon: (e.icon1 as string | undefined) ?? '',
      level: (e.level as number | undefined) ?? 0,
      salePrice: (e.sale_price as number | undefined) ?? 0,
      purchasePrice: (e.purchase_price as number | undefined) ?? 0,
      weight: (e.weight as number | undefined) ?? 0,
    };
  };

  const findRecipeForOutput = (rawId: string): RawCraftRecipe | null => {
    if (!db) return null;
    return (
      db.craft_tablosu.find((r) => r.item_id === rawId) ??
      db.craft_tablosu.find((r) => r.item_id.startsWith(rawId + '_')) ??
      null
    );
  };

  const recipes = useMemo<ResolvedRecipe[]>(() => {
    if (!db) return [];
    const meslekNo =
      filterId === 'all'
        ? null
        : (findCraftProfession(filterId)?.mesleknNo ?? null);

    const all =
      filterId === 'all'
        ? db.craft_tablosu
        : db.craft_tablosu.filter((r) => r.meslek_no === meslekNo);

    const q = query.trim().toLowerCase();

    const out: ResolvedRecipe[] = [];
    for (const r of all) {
      const info = resolve(r.item_id);
      if (!info) continue;
      if (q && !info.name.toLowerCase().includes(q)) continue;
      out.push({ recipe: r, output: info });
      if (out.length >= RECIPE_LIST_LIMIT) break;
    }
    return out;
  }, [db, filterId, query, titleField, typeField]);

  const selected = useMemo(() => {
    if (!selectedKey) return null;
    return recipes.find((r) => recipeKey(r.recipe) === selectedKey) ?? null;
  }, [recipes, selectedKey]);

  const ingredients = useMemo<ResolvedIngredient[]>(() => {
    if (!db || !selected) return [];
    const rawList = getRecipeMaterials(selected.recipe);
    return rawList
      .map((m) => {
        const info = resolve(m.id);
        if (!info) return null;
        return {
          rawId: m.id,
          qty: m.quantity,
          info,
          subRecipe: findRecipeForOutput(m.id),
        };
      })
      .filter((x): x is ResolvedIngredient => x !== null);
  }, [db, selected, titleField]);

  const rawMaterials = useMemo<ResolvedIngredient[]>(() => {
    if (!db || !selected) return [];
    const totals = new Map<string, number>();

    function visit(rawId: string, multiplier: number, depth: number) {
      if (depth > 4) {
        totals.set(rawId, (totals.get(rawId) ?? 0) + multiplier);
        return;
      }
      const sub = findRecipeForOutput(rawId);
      if (!sub) {
        totals.set(rawId, (totals.get(rawId) ?? 0) + multiplier);
        return;
      }
      const subMats = getRecipeMaterials(sub);
      if (subMats.length === 0) {
        totals.set(rawId, (totals.get(rawId) ?? 0) + multiplier);
        return;
      }
      for (const m of subMats) {
        visit(m.id, multiplier * m.quantity, depth + 1);
      }
    }

    for (const ing of ingredients) {
      visit(ing.rawId, ing.qty, 0);
    }

    const out: ResolvedIngredient[] = [];
    for (const [id, qty] of totals.entries()) {
      const info = resolve(id);
      if (!info) continue;
      out.push({ rawId: id, qty, info, subRecipe: null });
    }
    out.sort((a, b) => b.qty - a.qty);
    return out;
  }, [db, selected, ingredients]);

  const totals = useMemo(() => {
    if (!selected) return null;
    const qty = Math.max(1, Math.min(999, quantity));
    const totalParts = ingredients.reduce((acc, i) => acc + i.qty * qty, 0);
    const totalCost = ingredients.reduce(
      (acc, i) => acc + i.qty * qty * i.info.salePrice,
      0,
    );
    const totalExp = (selected.recipe.exp ?? 0) * qty;
    const totalTime = (selected.recipe.time ?? 0) * qty;
    const totalValue = selected.output.salePrice * qty;
    const totalWeight = (selected.output.weight * qty) / 1000;
    const profit = totalValue - totalCost;
    const margin = totalCost > 0 ? (profit / totalCost) * 100 : 0;
    const hourly = totalTime > 0 ? (3600 / totalTime) * qty : 0;
    const profitPerHour = hourly > 0 ? Math.round((profit / qty) * (3600 / (selected.recipe.time || 1))) : 0;
    const expPerHour = totalTime > 0 ? Math.round((selected.recipe.exp || 0) * (3600 / (selected.recipe.time || 1))) : 0;
    return {
      qty,
      totalParts,
      totalCost,
      totalValue,
      totalExp,
      totalTime,
      totalWeight,
      profit,
      margin,
      profitPerHour,
      expPerHour,
    };
  }, [selected, ingredients, quantity]);

  const subIngredients = useMemo<ResolvedIngredient[]>(() => {
    if (!db || !expandedSub) return [];
    const ing = ingredients.find((i) => i.rawId === expandedSub);
    if (!ing || !ing.subRecipe) return [];
    return getRecipeMaterials(ing.subRecipe)
      .map((m) => {
        const info = resolve(m.id);
        if (!info) return null;
        return {
          rawId: m.id,
          qty: m.quantity,
          info,
          subRecipe: findRecipeForOutput(m.id),
        };
      })
      .filter((x): x is ResolvedIngredient => x !== null);
  }, [db, expandedSub, ingredients]);

  return (
    <Container size="xl" className="pb-20">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_26rem]">
        <div>
          <ProfessionFilters
            value={filterId}
            onChange={(v) => {
              setFilterId(v);
              setSelectedKey(null);
              setExpandedSub(null);
            }}
          />

          <div className="mt-5 relative">
            <Icon
              name="search"
              size={16}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-steel-400"
            />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t('search.placeholder') as string}
              className="h-12 w-full rounded-lg border border-steel-700 bg-ink-900/60 pl-10 pr-4 text-sm text-white placeholder:text-steel-500 focus:border-frost-400/70"
            />
          </div>

          <div className="mt-3 flex items-center justify-between text-xs text-steel-400">
            <span>{loading ? t('search.loading') : `${recipes.length} ${t('search.results')}`}</span>
            {filterId !== 'all' && !loading && (
              <span className="rounded-full border border-frost-400/30 bg-frost-500/10 px-2 py-0.5 text-[10px] uppercase tracking-[0.16em] text-frost-200">
                {t(`filters.${filterId}`)}
              </span>
            )}
          </div>

          <ul className="mt-4 grid max-h-[820px] grid-cols-1 gap-2 overflow-y-auto pr-1 scrollbar-thin sm:grid-cols-2">
            {!loading && recipes.length === 0 && (
              <li className="col-span-full panel p-5 text-center text-sm text-steel-400">
                {t('search.resultEmpty')}
              </li>
            )}
            {recipes.map((r, i) => {
              const key = recipeKey(r.recipe);
              const isActive = key === selectedKey;
              return (
                <motion.li
                  key={key}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: Math.min(i, 12) * 0.012 }}
                >
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedKey(key);
                      setExpandedSub(null);
                    }}
                    className={`group flex w-full items-center gap-3 rounded-xl border p-3 text-left transition ${
                      isActive
                        ? 'border-frost-400/80 bg-frost-500/10 shadow-glow'
                        : 'border-steel-700/60 bg-ink-900/60 hover:border-frost-400/50 hover:bg-ink-800/60'
                    }`}
                  >
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-steel-700/40 bg-ink-900/80 p-1.5">
                      {r.output.icon ? (
                        <AssetIcon code={r.output.icon} size={36} alt={r.output.name} />
                      ) : (
                        <Icon name="spark" size={20} className="text-steel-500" />
                      )}
                    </span>
                    <span className="flex-1 min-w-0">
                      <span className="block truncate text-sm font-medium text-white">
                        {r.output.name}
                      </span>
                      <span className="mt-0.5 block truncate text-[10px] uppercase tracking-[0.16em] text-steel-400">
                        {r.output.type || '—'} · {t('labels.level')} {r.output.level}
                      </span>
                    </span>
                    <span className="flex flex-col items-end text-right text-[10px] uppercase tracking-[0.14em] text-steel-400">
                      <span className="font-semibold text-frost-300">T{r.recipe.tier}</span>
                      <span>{r.recipe.min_meslek_level}+</span>
                      {r.output.salePrice > 0 && (
                        <span className="mt-0.5 font-semibold text-ember-300">{r.output.salePrice}</span>
                      )}
                    </span>
                  </button>
                </motion.li>
              );
            })}
          </ul>
        </div>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <Card className="p-5">
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-frost-300/90">
              {t('calc.title')}
            </div>
            <div className="mt-1 text-sm text-steel-300">{t('calc.subtitle')}</div>

            {selected ? (
              <SelectedPanel
                selected={selected}
                ingredients={ingredients}
                rawMaterials={rawMaterials}
                totals={totals}
                quantity={quantity}
                onQuantity={setQuantity}
                expandedSub={expandedSub}
                onExpandSub={setExpandedSub}
                subIngredients={subIngredients}
                onReset={() => {
                  setSelectedKey(null);
                  setQuantity(1);
                  setExpandedSub(null);
                }}
              />
            ) : (
              <div className="mt-5 flex flex-col items-center gap-3 rounded-xl border border-steel-700/60 bg-ink-900/60 py-12 text-center text-sm text-steel-400">
                <Icon name="calc" size={28} className="text-frost-300" />
                <div className="font-display text-base text-white">{t('calc.selectItem')}</div>
                <div className="text-xs">{t('calc.pickAnItem')}</div>
              </div>
            )}
          </Card>
        </aside>
      </div>
    </Container>
  );
}

function recipeKey(r: RawCraftRecipe): string {
  return `${r.meslek_no}-${r.item_id}-${r.tier}-${r.min_meslek_level}`;
}

function ProfessionFilters({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  const { t } = useTranslation('craftCalc');
  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
      <FilterButton
        iconCode=""
        active={value === 'all'}
        onClick={() => onChange('all')}
        label={t('filters.all') as string}
      />
      {CRAFT_PROFESSIONS.map((p) => (
        <FilterButton
          key={p.id}
          iconCode={p.iconCode}
          active={value === p.id}
          onClick={() => onChange(p.id)}
          label={t(`filters.${p.id}`) as string}
        />
      ))}
    </div>
  );
}

function FilterButton({
  iconCode,
  active,
  onClick,
  label,
}: {
  iconCode: string;
  active: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group flex items-center gap-2 rounded-xl border px-2.5 py-2 text-left text-xs font-medium transition ${
        active
          ? 'border-frost-400/80 bg-frost-500/15 text-white shadow-glow'
          : 'border-steel-700 bg-ink-900/40 text-steel-200 hover:border-frost-400/60 hover:text-white'
      }`}
    >
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-steel-700/40 bg-ink-900/80 p-1">
        {iconCode ? (
          <AssetIcon code={iconCode} size={28} />
        ) : (
          <Icon name="spark" size={16} className="text-frost-300" />
        )}
      </span>
      <span className="truncate">{label}</span>
    </button>
  );
}

interface CraftTotals {
  qty: number;
  totalParts: number;
  totalCost: number;
  totalValue: number;
  totalExp: number;
  totalTime: number;
  totalWeight: number;
  profit: number;
  margin: number;
  profitPerHour: number;
  expPerHour: number;
}

interface SelectedPanelProps {
  selected: ResolvedRecipe;
  ingredients: ResolvedIngredient[];
  rawMaterials: ResolvedIngredient[];
  totals: CraftTotals | null;
  quantity: number;
  onQuantity: (n: number) => void;
  expandedSub: string | null;
  onExpandSub: (id: string | null) => void;
  subIngredients: ResolvedIngredient[];
  onReset: () => void;
}

function SelectedPanel(props: SelectedPanelProps) {
  const { selected, ingredients, rawMaterials, totals, quantity, onQuantity, expandedSub, onExpandSub, subIngredients, onReset } = props;
  const { t } = useTranslation('craftCalc');
  const showRawSection = ingredients.some((i) => i.subRecipe !== null);
  return (
    <div className="mt-4 space-y-4">
      <div className="rounded-xl border border-steel-700/60 bg-gradient-to-br from-ink-900/80 to-ink-950/60 p-4 shadow-md">
        <div className="flex items-start gap-3">
          <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-lg border border-frost-400/40 bg-ink-900/80 p-2 shadow-md">
            {selected.output.icon ? (
              <AssetIcon code={selected.output.icon} size={48} glow />
            ) : (
              <Icon name="spark" size={24} className="text-steel-400" />
            )}
          </span>
          <div className="min-w-0 flex-1">
            <div className="font-display text-base text-white">{selected.output.name}</div>
            <div className="mt-0.5 truncate text-[11px] uppercase tracking-[0.16em] text-steel-400">
              {selected.output.type || '—'}
            </div>
            <div className="mt-2 flex flex-wrap gap-1.5">
              <Pill>{t('calc.tier')} {selected.recipe.tier}</Pill>
              <Pill>{t('calc.minLevel')}: {selected.recipe.min_meslek_level}</Pill>
              <Pill accent>+{selected.recipe.exp} XP</Pill>
            </div>
          </div>
        </div>
        <div className="mt-3 grid grid-cols-3 gap-2 text-xs">
          <MiniStat label={t('labels.price')} value={`${selected.output.salePrice}`} />
          <MiniStat label={t('labels.weight')} value={`${(selected.output.weight / 1000).toFixed(2)} kg`} />
          <MiniStat label={t('calc.time')} value={`${selected.recipe.time}${t('calc.seconds')}`} />
        </div>
      </div>

      <label className="block text-xs font-semibold uppercase tracking-[0.16em] text-steel-300">
        {t('calc.quantity')}
        <input
          type="number"
          min={1}
          max={999}
          value={quantity}
          onChange={(e) => onQuantity(Math.max(1, Math.min(999, Number(e.target.value) || 1)))}
          className="mt-2 h-11 w-full rounded-lg border border-steel-700 bg-ink-950/70 px-3 text-base text-white focus:border-frost-400/70"
        />
      </label>

      {ingredients.length > 0 ? (
        <div>
          <div className="mb-2 flex items-center justify-between">
            <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-frost-300/90">
              {t('calc.ingredients')}
            </span>
            <span className="text-[10px] uppercase tracking-[0.16em] text-steel-400">
              {ingredients.length}
            </span>
          </div>
          <ul className="space-y-1.5">
            {ingredients.map((i) => {
              const lineQty = i.qty * (totals?.qty ?? 1);
              const lineCost = lineQty * i.info.salePrice;
              const isExpanded = expandedSub === i.rawId;
              const hasSub = i.subRecipe !== null;
              return (
                <li key={i.rawId} className="rounded-lg border border-steel-700/50 bg-ink-950/60">
                  <button
                    type="button"
                    onClick={() => hasSub && onExpandSub(isExpanded ? null : i.rawId)}
                    disabled={!hasSub}
                    className={`flex w-full items-center gap-2.5 px-2.5 py-2 text-left transition ${
                      hasSub ? 'hover:bg-frost-500/5' : 'cursor-default'
                    }`}
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-steel-700/40 bg-ink-900/70 p-1">
                      {i.info.icon ? (
                        <AssetIcon code={i.info.icon} size={26} />
                      ) : (
                        <Icon name="spark" size={14} className="text-steel-500" />
                      )}
                    </span>
                    <span className="flex-1 min-w-0">
                      <span className="flex items-center gap-1.5">
                        <span className="block truncate text-xs font-medium text-white">{i.info.name}</span>
                        {hasSub && (
                          <span className="rounded-full border border-frost-400/40 bg-frost-500/10 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-[0.14em] text-frost-200">
                            {t('calc.subRecipeNote')}
                          </span>
                        )}
                      </span>
                      <span className="text-[10px] text-steel-400">
                        {i.info.salePrice} × {lineQty} = <span className="text-frost-300">{lineCost}</span>
                      </span>
                    </span>
                    <span className="text-xs font-semibold text-frost-300">×{lineQty}</span>
                    {hasSub && (
                      <Icon
                        name="arrow-right"
                        size={12}
                        className={`text-steel-500 transition ${isExpanded ? 'rotate-90' : ''}`}
                      />
                    )}
                  </button>

                  <AnimatePresence>
                    {isExpanded && i.subRecipe && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.22 }}
                        className="overflow-hidden"
                      >
                        <div className="border-t border-steel-700/40 bg-ink-950/80 px-3 py-3">
                          <div className="mb-2 flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-frost-300/90">
                            <Icon name="spark" size={11} />
                            {t('calc.subRecipeChain')}
                          </div>
                          <ul className="space-y-1.5">
                            {subIngredients.map((sub) => (
                              <li
                                key={sub.rawId}
                                className="flex items-center gap-2 rounded-md border border-steel-700/30 bg-ink-900/40 px-2 py-1.5"
                              >
                                <span className="flex h-7 w-7 items-center justify-center rounded border border-steel-700/40 bg-ink-900/80 p-0.5">
                                  {sub.info.icon ? <AssetIcon code={sub.info.icon} size={20} /> : <Icon name="spark" size={10} className="text-steel-500" />}
                                </span>
                                <span className="flex-1 min-w-0 truncate text-[11px] text-steel-200">{sub.info.name}</span>
                                <span className="text-[10px] font-semibold text-frost-300">×{sub.qty * lineQty}</span>
                              </li>
                            ))}
                          </ul>
                          <div className="mt-2 text-[10px] text-steel-400">
                            T{i.subRecipe.tier} · {t('calc.minLevel')}: {i.subRecipe.min_meslek_level}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              );
            })}
          </ul>
        </div>
      ) : (
        <div className="rounded-lg border border-steel-700/40 bg-ink-950/40 p-3 text-center text-xs italic text-steel-400">
          {t('calc.noRecipe')}
        </div>
      )}

      {showRawSection && rawMaterials.length > 0 && (
        <div className="rounded-xl border border-frost-400/30 bg-frost-500/[0.04] p-3">
          <div className="mb-1 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-frost-300/90">
            <Icon name="spark" size={12} />
            {t('rawChain.title')}
          </div>
          <p className="mb-2.5 text-[11px] leading-relaxed text-steel-300">{t('rawChain.subtitle')}</p>
          <ul className="space-y-1">
            {rawMaterials.map((m) => (
              <li
                key={m.rawId}
                className="flex items-center gap-2.5 rounded-md border border-steel-700/40 bg-ink-950/40 px-2 py-1.5"
              >
                <span className="flex h-7 w-7 items-center justify-center rounded border border-steel-700/40 bg-ink-900/80 p-0.5">
                  {m.info.icon ? <AssetIcon code={m.info.icon} size={20} /> : <Icon name="spark" size={10} className="text-steel-500" />}
                </span>
                <span className="flex-1 min-w-0">
                  <span className="block truncate text-[11px] font-medium text-white">{m.info.name}</span>
                  <span className="text-[9px] text-steel-400">{m.info.salePrice} × {m.qty * (totals?.qty ?? 1)} = <span className="text-frost-300">{m.info.salePrice * m.qty * (totals?.qty ?? 1)}</span></span>
                </span>
                <span className="text-xs font-semibold text-frost-300">×{m.qty * (totals?.qty ?? 1)}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="rounded-xl border border-steel-700/60 bg-ink-950/60 p-4">
        <div className="grid grid-cols-2 gap-2 text-xs">
          <Cell label={t('calc.totalCost')} value={`${totals?.totalCost ?? 0}`} tone="neutral" />
          <Cell label={t('calc.outputValue')} value={`${totals?.totalValue ?? 0}`} tone="frost" />
          <Cell
            label={t('calc.profit')}
            value={`${totals && totals.profit >= 0 ? '+' : ''}${totals?.profit ?? 0}`}
            tone={totals && totals.profit >= 0 ? 'positive' : 'negative'}
          />
          <Cell
            label={t('calc.margin')}
            value={`${totals?.margin?.toFixed(0) ?? 0}%`}
            tone={totals && totals.margin >= 0 ? 'positive' : 'negative'}
          />
        </div>
        <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
          <Cell label={t('calc.totalIngredients')} value={`${totals?.totalParts ?? 0}`} />
          <Cell label={t('calc.exp')} value={`+${totals?.totalExp ?? 0}`} />
          <Cell
            label={t('calc.time')}
            value={formatTime(
              totals?.totalTime ?? 0,
              t('calc.seconds') as string,
              t('calc.minutes') as string,
              t('calc.hours') as string,
            )}
          />
          <Cell label={t('calc.expPerHour')} value={`+${totals?.expPerHour ?? 0}`} />
        </div>
      </div>

      <button type="button" onClick={onReset} className="btn-ghost h-9 w-full text-xs">
        {t('calc.reset')}
      </button>
    </div>
  );
}

function Pill({ children, accent = false }: { children: React.ReactNode; accent?: boolean }) {
  return (
    <span
      className={`rounded-full border px-2 py-0.5 text-[10px] uppercase tracking-[0.16em] ${
        accent
          ? 'border-ember-400/40 bg-ember-500/10 text-ember-300'
          : 'border-steel-700/60 bg-ink-900/70 text-steel-300'
      }`}
    >
      {children}
    </span>
  );
}

function MiniStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border border-steel-700/40 bg-ink-900/50 p-2 text-center">
      <div className="text-[9px] uppercase tracking-[0.14em] text-steel-400">{label}</div>
      <div className="mt-0.5 text-xs font-semibold text-white">{value}</div>
    </div>
  );
}

function Cell({
  label,
  value,
  tone = 'neutral',
}: {
  label: string;
  value: string;
  tone?: 'neutral' | 'frost' | 'positive' | 'negative';
}) {
  const valueClass =
    tone === 'frost'
      ? 'heading-gradient'
      : tone === 'positive'
        ? 'text-emerald-300'
        : tone === 'negative'
          ? 'text-rose-300'
          : 'text-white';
  return (
    <div className="rounded-lg border border-steel-700/50 bg-ink-950/60 p-3">
      <dt className="text-[10px] uppercase tracking-[0.16em] text-steel-400">{label}</dt>
      <dd className={`mt-1 font-display text-base ${valueClass}`}>{value}</dd>
    </div>
  );
}

function formatTime(
  seconds: number,
  secLabel: string,
  minLabel: string,
  hourLabel: string,
): string {
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
