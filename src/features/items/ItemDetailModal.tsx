import { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router-dom';

import { Icon } from '@/components/ui/Icon';
import { getIconPath } from '@/data/items';
import { getLanguage, isLanguageCode, FALLBACK_LANGUAGE, DEFAULT_LANGUAGE } from '@/i18n/languages';
import { getLocalized, type RawItem, type RawCraftRecipe } from '@/data/types';
import {
  activeStats,
  classify,
  cleanDescription,
  gradeTier,
  GRADE_TONE,
  GRADE_GLOW,
  type CategorisedItem,
  type CombatStatKey,
  type ItemSource,
} from '@/features/items/itemTaxonomy';
import {
  loadRecipeIndex,
  resolveMaterials,
  professionIdForMeslek,
  professionMeta,
  type MaterialEntry,
  type RecipeIndex,
} from '@/data/recipes';

const HIGHLIGHT_KEYS: CombatStatKey[] = [
  'physical_ap', 'physical_dp', 'magic_ap', 'magic_dp', 'hp', 'mp',
];

interface ItemDetailModalProps {
  cat: CategorisedItem | null;
  onClose: () => void;
}

export function ItemDetailModal({ cat, onClose }: ItemDetailModalProps) {
  const { t } = useTranslation('items');
  const { lang } = useParams();
  const langCode = lang && isLanguageCode(lang) ? lang : DEFAULT_LANGUAGE;
  const language = getLanguage(langCode);
  const fallback = getLanguage(FALLBACK_LANGUAGE);
  const langPrefix = `/${langCode}`;

  // History stack so material clicks deep-dive but Back returns to source
  const [history, setHistory] = useState<CategorisedItem[]>([]);
  const [active, setActive] = useState<CategorisedItem | null>(null);
  const [recipeIndex, setRecipeIndex] = useState<RecipeIndex | null>(null);

  // Reset stack whenever the parent opens / closes the modal
  useEffect(() => {
    if (cat) {
      setHistory([cat]);
      setActive(cat);
    } else {
      setHistory([]);
      setActive(null);
    }
  }, [cat]);

  // Load recipe index on first open
  useEffect(() => {
    if (!cat) return;
    loadRecipeIndex().then(setRecipeIndex).catch(() => {});
  }, [cat]);

  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (history.length > 1) goBack();
        else onClose();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, history.length, onClose]);

  function goBack() {
    setHistory((h) => {
      const next = h.slice(0, -1);
      setActive(next[next.length - 1] ?? null);
      return next;
    });
  }

  function pushItem(target: RawItem, source: ItemSource) {
    const newCat = classify(source, target);
    setHistory((h) => [...h, newCat]);
    setActive(newCat);
  }

  if (!active) {
    return (
      <AnimatePresence>{null}</AnimatePresence>
    );
  }

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink-950/85 p-4 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            key={active.item.id}
            initial={{ opacity: 0, scale: 0.96, y: 8 }}
            animate={{ opacity: 1, scale: 1,    y: 0 }}
            exit={{    opacity: 0, scale: 0.97, y: 6 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-steel-700/60 bg-ink-950 shadow-glow-strong"
            onClick={(e) => e.stopPropagation()}
          >
            <ItemDetailBody
              cat={active}
              t={t}
              langPrefix={langPrefix}
              language={language}
              fallback={fallback}
              recipeIndex={recipeIndex}
              onPushItem={pushItem}
              onClose={onClose}
            />

            {history.length > 1 && (
              <button
                type="button"
                onClick={goBack}
                className="absolute left-3 top-3 z-10 inline-flex h-9 items-center gap-1.5 rounded-full border border-steel-700/60 bg-ink-950/80 px-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-steel-200 backdrop-blur transition hover:border-frost-400/60 hover:text-white"
                aria-label={t('detail.back', { defaultValue: 'Geri' }) as string}
              >
                <Icon name="arrow-right" size={12} className="rotate-180" />
                {t('detail.back', { defaultValue: 'Geri' })}
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-steel-700/60 bg-ink-950/80 text-steel-200 backdrop-blur transition hover:border-frost-400/60 hover:text-white"
              aria-label="Close"
            >
              <Icon name="close" size={18} />
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function ItemDetailBody({
  cat, t, langPrefix, language, fallback, recipeIndex, onPushItem, onClose,
}: {
  cat: CategorisedItem;
  t: (k: string, opts?: Record<string, unknown>) => string;
  langPrefix: string;
  language: ReturnType<typeof getLanguage>;
  fallback: ReturnType<typeof getLanguage>;
  recipeIndex: RecipeIndex | null;
  onPushItem: (item: RawItem, source: ItemSource) => void;
  onClose: () => void;
}) {
  const { item } = cat;
  const title = getLocalized(item, 'baslik', language, fallback);
  const typeLabel = getLocalized(item, 'tip', language, fallback);
  const description = cleanDescription(getLocalized(item, 'aciklama', language, fallback));
  const tier = gradeTier(item.default_grade);
  const stats = activeStats(item);
  const showLevel = (item.level ?? 0) > 0;

  // Recipe lookup
  const recipe: RawCraftRecipe | undefined = recipeIndex?.byOutputId.get(item.id);
  const profId = recipe ? professionIdForMeslek(recipe.meslek_no) : undefined;
  const profMeta = professionMeta(profId);
  const materials: MaterialEntry[] = useMemo(() => {
    if (!recipe || !recipeIndex) return [];
    return resolveMaterials(recipe, recipeIndex.db);
  }, [recipe, recipeIndex]);

  return (
    <div className="flex flex-col">
      {/* Header */}
      <div
        className={`relative flex items-center gap-4 border-b border-steel-700/50 bg-gradient-to-br ${GRADE_GLOW[tier]} to-transparent p-5 pl-24`}
      >
        <div
          className={`grid h-20 w-20 shrink-0 place-items-center rounded-xl border-2 bg-ink-950/80 ${GRADE_TONE[tier]}`}
        >
          <img
            src={getIconPath(item.icon1)}
            alt=""
            className="h-16 w-16 object-contain"
            onError={(e) => { (e.currentTarget as HTMLImageElement).style.visibility = 'hidden'; }}
          />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.18em]">
            {(item.default_grade ?? 0) > 0 && (
              <span className={`rounded-full border px-2 py-0.5 ${GRADE_TONE[tier]}`}>
                {t(`tiers.${tier}`)} · {item.default_grade ?? 0}
              </span>
            )}
            {showLevel && (
              <span className="rounded-full border border-steel-700/60 bg-ink-900/80 px-2 py-0.5 text-steel-300">
                {t('explorer.level')} {item.level}
              </span>
            )}
            <span className="rounded-full border border-steel-700/60 bg-ink-900/80 px-2 py-0.5 text-steel-300">
              {t(`slots.${cat.slot}`)}
            </span>
          </div>
          <h2 className="mt-2 font-display text-2xl text-white">{title || item.id}</h2>
          <p className="mt-0.5 text-sm text-steel-300">{typeLabel}</p>
        </div>
      </div>

      {/* In-game description */}
      {description && (
        <div className="border-b border-steel-700/40 bg-ink-900/40 p-5">
          <div className="mb-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-frost-300/90">
            {t('detail.description')}
          </div>
          <p className="whitespace-pre-line text-sm leading-relaxed text-steel-200">
            {description}
          </p>
        </div>
      )}

      {/* RECIPE — who makes this + materials --------------------------------- */}
      {recipe && (
        <div className="border-b border-steel-700/40 bg-ink-900/40 p-5">
          <div className="mb-2 flex items-center justify-between gap-2">
            <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-frost-300/90">
              {t('detail.recipe', { defaultValue: 'TARİF' })}
            </div>
            <Link
              to={`${langPrefix}/crafting`}
              onClick={onClose}
              className="inline-flex items-center gap-1 rounded-full border border-frost-400/45 bg-frost-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-frost-100 transition hover:border-frost-300/70 hover:bg-frost-500/20 hover:text-white"
            >
              {t('detail.gotoProfession', { defaultValue: 'Mesleği Aç' })}
              <Icon name="arrow-right" size={11} />
            </Link>
          </div>

          {/* Profession + tier + level + xp + time strip */}
          <div className="flex flex-wrap items-center gap-2 text-[11px]">
            {profMeta?.iconCode && (
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-steel-700/60 bg-ink-950/80 p-1">
                <img
                  src={getIconPath(profMeta.iconCode)}
                  alt=""
                  className="h-7 w-7 object-contain"
                  onError={(e) => { (e.currentTarget as HTMLImageElement).style.visibility = 'hidden'; }}
                />
              </span>
            )}
            <div className="font-semibold text-white">
              {profId ? t(`professionsList.${profId}.name`, { ns: 'crafting', defaultValue: profId }) : t('detail.unknownProfession', { defaultValue: '?' })}
            </div>
            <Pill tone="emerald">{`T${recipe.tier}`}</Pill>
            <Pill tone="frost">{t('detail.minLevel', { defaultValue: 'Lvl' })} {recipe.min_meslek_level}</Pill>
            <Pill tone="ember">{`+${recipe.exp} XP`}</Pill>
            <Pill tone="steel">{`${recipe.time}s`}</Pill>
          </div>

          {/* Materials list — clickable */}
          {materials.length > 0 && (
            <>
              <div className="mt-4 mb-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-steel-400">
                {t('detail.materials', { defaultValue: 'MALZEMELER' })} · {materials.length}
              </div>
              <ul className="grid grid-cols-1 gap-1.5 sm:grid-cols-2">
                {materials.map((m) => {
                  const mTitle = m.entry
                    ? getLocalized(m.entry as RawItem, 'baslik', language, fallback)
                    : m.id;
                  // Determine source table
                  const source: ItemSource | undefined = !recipeIndex ? undefined :
                    recipeIndex.db.material_tablosu.find((x) => x.id === m.id) ? 'material' :
                    recipeIndex.db.item_tablosu.find((x) => x.id === m.id)     ? 'item'     :
                    recipeIndex.db.prop_tablosu.find((x) => x.id === m.id)     ? 'prop'     :
                    undefined;
                  const clickable = !!(m.entry && source);
                  const Wrapper: React.ElementType = clickable ? 'button' : 'div';
                  return (
                    <li key={m.id}>
                      <Wrapper
                        type={clickable ? 'button' : undefined}
                        onClick={clickable ? () => onPushItem(m.entry as RawItem, source!) : undefined}
                        className={`flex w-full items-center gap-3 rounded-lg border px-3 py-2 text-left text-sm transition ${
                          clickable
                            ? 'border-steel-700/60 bg-ink-950/40 text-steel-100 hover:-translate-y-0.5 hover:border-frost-400/55 hover:bg-frost-500/10 hover:text-white cursor-pointer'
                            : 'border-steel-700/40 bg-ink-950/30 text-steel-400'
                        }`}
                      >
                        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-md border border-steel-700/60 bg-ink-950/80 p-1">
                          {m.iconUrl ? (
                            <img
                              src={m.iconUrl}
                              alt=""
                              className="h-7 w-7 object-contain"
                              onError={(e) => { (e.currentTarget as HTMLImageElement).style.visibility = 'hidden'; }}
                            />
                          ) : (
                            <Icon name="search" size={12} className="text-steel-500" />
                          )}
                        </span>
                        <span className="min-w-0 flex-1 truncate">{mTitle}</span>
                        <span className="shrink-0 rounded-full border border-frost-400/40 bg-frost-500/10 px-2 py-0.5 text-[10px] font-bold text-frost-200">
                          ×{m.quantity}
                        </span>
                      </Wrapper>
                    </li>
                  );
                })}
              </ul>
            </>
          )}
        </div>
      )}

      {/* Stats grid */}
      {stats.length > 0 && (
        <div className="grid grid-cols-2 gap-2 p-5 sm:grid-cols-3">
          {stats.map(({ key, value }) => {
            const isHighlight = HIGHLIGHT_KEYS.includes(key);
            return (
              <div
                key={key}
                className={`rounded-lg border px-3 py-2 ${
                  isHighlight
                    ? 'border-frost-400/40 bg-frost-500/10'
                    : 'border-steel-700/60 bg-ink-900/60'
                }`}
              >
                <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-steel-300">
                  {t(`stats.${key}`)}
                </div>
                <div className={`mt-1 font-display text-lg ${isHighlight ? 'text-frost-100' : 'text-white'}`}>
                  {value > 0 ? '+' : ''}{value}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Footer meta */}
      <div className="grid grid-cols-2 gap-2 border-t border-steel-700/60 bg-ink-900/40 p-4 text-xs text-steel-300 sm:grid-cols-4">
        <Meta label={t('stats.weight')} value={numericField(item.weight)} />
        {numericField(item.armor_weight) > 0 && (
          <Meta label={t('stats.armor_weight')} value={numericField(item.armor_weight)} />
        )}
        <Meta label={t('stats.repair_price')} value={numericField(item.repair_price)} />
        <Meta label={t('stats.sale_price')} value={numericField(item.sale_price)} />
      </div>
    </div>
  );
}

function Pill({ tone, children }: { tone: 'emerald' | 'frost' | 'ember' | 'steel'; children: React.ReactNode }) {
  const TONE: Record<string, string> = {
    emerald: 'border-emerald-400/55 bg-emerald-500/15 text-emerald-200',
    frost:   'border-frost-400/55 bg-frost-500/15 text-frost-200',
    ember:   'border-ember-400/55 bg-ember-500/15 text-ember-200',
    steel:   'border-steel-500/55 bg-steel-500/15 text-steel-200',
  };
  return (
    <span className={`rounded-full border px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.14em] ${TONE[tone]}`}>
      {children}
    </span>
  );
}

function numericField(v: unknown): number {
  if (typeof v === 'number') return v;
  if (typeof v === 'string' && v.trim() !== '') {
    const n = Number(v);
    return Number.isFinite(n) ? n : 0;
  }
  return 0;
}

function Meta({ label, value }: { label: string; value: number | undefined }) {
  if (value === undefined || value === null || value === 0) return null;
  return (
    <div>
      <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-steel-400">{label}</div>
      <div className="mt-0.5 text-sm text-steel-200">{value.toLocaleString()}</div>
    </div>
  );
}
