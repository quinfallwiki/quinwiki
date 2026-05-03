import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import { SectionHeading } from '@/components/ui/SectionHeading';
import { Icon } from '@/components/ui/Icon';
import { loadItemDb, getIconPath } from '@/data/items';
import { getLanguage, isLanguageCode, FALLBACK_LANGUAGE, DEFAULT_LANGUAGE } from '@/i18n/languages';
import { getLocalized } from '@/data/types';
import {
  flattenDb,
  gradeTier,
  GRADE_TONE,
  GRADE_GLOW,
  SLOT_GROUPS,
  type CategorisedItem,
  type EquipmentSlot,
} from '@/features/items/itemTaxonomy';
import { ItemDetailModal } from '@/features/items/ItemDetailModal';

type SlotFilter = EquipmentSlot | 'all';

const PAGE_SIZE = 60;

export function ItemsExplorer() {
  const { t } = useTranslation('items');
  const { lang } = useParams();
  const langCode = lang && isLanguageCode(lang) ? lang : DEFAULT_LANGUAGE;
  const language = getLanguage(langCode);
  const fallback = getLanguage(FALLBACK_LANGUAGE);

  const [allItems, setAllItems] = useState<CategorisedItem[] | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [groupId, setGroupId] = useState<string>('gear');
  const [slotFilter, setSlotFilter] = useState<SlotFilter>('all');
  const [familyFilter, setFamilyFilter] = useState<string | 'all'>('all');
  const [query, setQuery] = useState('');
  const [pageSize, setPageSize] = useState(PAGE_SIZE);
  const [activeItem, setActiveItem] = useState<CategorisedItem | null>(null);

  /* ---------- load DB ---------- */
  useEffect(() => {
    let alive = true;
    loadItemDb()
      .then((db) => {
        if (alive) setAllItems(flattenDb(db));
      })
      .catch((err) => {
        if (alive) setLoadError(err instanceof Error ? err.message : String(err));
      });
    return () => {
      alive = false;
    };
  }, []);

  /* ---------- group / slot / family / query change → reset page ---------- */
  useEffect(() => {
    setSlotFilter('all');
    setFamilyFilter('all');
    setPageSize(PAGE_SIZE);
  }, [groupId]);

  useEffect(() => {
    setFamilyFilter('all');
    setPageSize(PAGE_SIZE);
  }, [slotFilter]);

  /* ---------- slots in current group ---------- */
  const slotsInGroup = useMemo(() => {
    return SLOT_GROUPS.find((g) => g.id === groupId)?.slots ?? [];
  }, [groupId]);

  /* ---------- families available for current slot, plus localized labels ---------- */
  const familiesForSlot = useMemo(() => {
    if (slotFilter === 'all') return [] as { family: string; sample: CategorisedItem }[];
    const map = new Map<string, CategorisedItem>();
    for (const c of allItems ?? []) {
      if (c.slot !== slotFilter) continue;
      if (c.family && !map.has(c.family)) map.set(c.family, c);
    }
    return Array.from(map.entries()).map(([family, sample]) => ({ family, sample }));
  }, [allItems, slotFilter]);

  /* ---------- apply filters ---------- */
  const filtered = useMemo(() => {
    if (!allItems) return [];
    const q = query.trim().toLowerCase();
    return allItems.filter((c) => {
      // Group restriction (when no specific slot picked, still narrow to group)
      if (!slotsInGroup.includes(c.slot)) return false;
      if (slotFilter !== 'all' && c.slot !== slotFilter) return false;
      if (familyFilter !== 'all' && c.family !== familyFilter) return false;
      if (q) {
        const title = getLocalized(c.item, 'baslik', language, fallback).toLowerCase();
        const titleEn = (c.item.baslik_loc_English ?? '').toLowerCase();
        if (!title.includes(q) && !titleEn.includes(q)) return false;
      }
      return true;
    });
  }, [allItems, slotsInGroup, slotFilter, familyFilter, query, language, fallback]);

  const visible = useMemo(() => filtered.slice(0, pageSize), [filtered, pageSize]);
  const total = filtered.length;
  const dbTotal = allItems?.length ?? 0;

  return (
    <section className="space-y-6">
      <SectionHeading
        kicker={t('explorer.kicker', { total: dbTotal || '…' }) as string}
        title={t('explorer.title') as string}
        subtitle={t('explorer.subtitle') as string}
      />

      {/* FILTER BAR */}
      <div className="space-y-4 rounded-2xl border border-steel-700/60 bg-ink-900/60 p-4 shadow-panel backdrop-blur">
        {/* group tabs */}
        <div className="flex flex-wrap gap-2">
          {SLOT_GROUPS.map((g) => (
            <FilterChip
              key={g.id}
              size="lg"
              active={groupId === g.id}
              onClick={() => setGroupId(g.id)}
              label={t(`groups.${g.id}`) as string}
            />
          ))}
        </div>

        {/* slot chips (within group) */}
        <div className="flex flex-wrap gap-2 border-t border-steel-700/40 pt-3">
          <FilterChip
            active={slotFilter === 'all'}
            onClick={() => setSlotFilter('all')}
            label={t('explorer.all') as string}
          />
          {slotsInGroup.map((s) => (
            <FilterChip
              key={s}
              active={slotFilter === s}
              onClick={() => setSlotFilter(s)}
              label={t(`slots.${s}`) as string}
            />
          ))}
        </div>

        {/* family filter (when slot picked) */}
        {familiesForSlot.length > 1 && (
          <div className="flex flex-wrap gap-2 border-t border-steel-700/40 pt-3">
            <FilterChip
              compact
              active={familyFilter === 'all'}
              onClick={() => setFamilyFilter('all')}
              label={t('explorer.all') as string}
            />
            {familiesForSlot.map(({ family, sample }) => (
              <FilterChip
                key={family}
                compact
                active={familyFilter === family}
                onClick={() => setFamilyFilter(family)}
                label={familyLabel(slotFilter, family, sample, language, fallback, t)}
              />
            ))}
          </div>
        )}

        {/* search + count */}
        <div className="flex flex-col gap-3 border-t border-steel-700/40 pt-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full sm:max-w-xs">
            <Icon
              name="search"
              size={14}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-steel-400"
            />
            <input
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setPageSize(PAGE_SIZE);
              }}
              placeholder={t('explorer.search') as string}
              className="w-full rounded-lg border border-steel-700/60 bg-ink-950/70 py-2 pl-9 pr-3 text-sm text-steel-100 placeholder:text-steel-500 focus:border-frost-400/60 focus:outline-none focus:ring-2 focus:ring-frost-400/30"
            />
          </div>
          <div className="text-xs text-steel-400">
            {allItems
              ? t('explorer.showing', { shown: visible.length, total })
              : t('explorer.loading')}
          </div>
        </div>
      </div>

      {/* ERROR */}
      {loadError && (
        <div className="rounded-lg border border-rose-500/40 bg-rose-500/10 p-4 text-sm text-rose-200">
          {t('explorer.error')} {loadError}
        </div>
      )}

      {/* GRID */}
      {allItems && (
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {visible.map((cat, i) => (
            <ItemCard
              key={`${cat.source}:${cat.item.id}`}
              cat={cat}
              i={i}
              language={language}
              fallback={fallback}
              onSelect={() => setActiveItem(cat)}
              t={t}
            />
          ))}
        </ul>
      )}

      {allItems && total === 0 && (
        <div className="rounded-2xl border border-steel-700/60 bg-ink-900/40 p-8 text-center text-sm text-steel-400">
          {t('explorer.noResults')}
        </div>
      )}

      {allItems && pageSize < total && (
        <div className="flex justify-center">
          <button
            type="button"
            onClick={() => setPageSize((s) => s + PAGE_SIZE)}
            className="rounded-full border border-frost-400/40 bg-frost-500/10 px-5 py-2 text-sm font-semibold text-frost-100 transition hover:border-frost-300/70 hover:bg-frost-500/20 hover:text-white"
          >
            {t('explorer.loadMore')}
          </button>
        </div>
      )}

      <ItemDetailModal cat={activeItem} onClose={() => setActiveItem(null)} />
    </section>
  );
}

/* -------------------------------------------------------------------------- */

function ItemCard({
  cat,
  i,
  language,
  fallback,
  onSelect,
  t,
}: {
  cat: CategorisedItem;
  i: number;
  language: ReturnType<typeof getLanguage>;
  fallback: ReturnType<typeof getLanguage>;
  onSelect: () => void;
  t: (k: string, opts?: Record<string, unknown>) => string;
}) {
  const { item } = cat;
  const title = getLocalized(item, 'baslik', language, fallback);
  const tier = gradeTier(item.default_grade);
  const showLevel = (item.level ?? 0) > 0;

  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, delay: Math.min(i, 12) * 0.02 }}
    >
      <button
        type="button"
        onClick={onSelect}
        className={`group relative flex h-full w-full flex-col overflow-hidden rounded-xl border bg-ink-900/70 p-3 text-left transition hover:-translate-y-0.5 hover:bg-ink-800/80 hover:shadow-glow focus:outline-none focus:ring-2 focus:ring-frost-400/60 ${GRADE_TONE[tier]}`}
      >
        <div
          aria-hidden
          className={`pointer-events-none absolute -top-8 -right-8 h-20 w-20 rounded-full bg-gradient-to-br opacity-50 blur-2xl ${GRADE_GLOW[tier]}`}
        />

        <div
          className={`relative grid aspect-square w-full place-items-center overflow-hidden rounded-lg border bg-ink-950 ${GRADE_TONE[tier]}`}
        >
          <img
            src={getIconPath(item.icon1)}
            alt=""
            loading="lazy"
            className="h-[88%] w-[88%] object-contain transition duration-500 group-hover:scale-105"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.visibility = 'hidden';
            }}
          />
          {showLevel && (
            <span className="absolute left-1.5 top-1.5 rounded-md border border-steel-700/60 bg-ink-950/80 px-1.5 py-0.5 text-[10px] font-semibold text-steel-200">
              {t('explorer.level')} {item.level}
            </span>
          )}
        </div>

        <div className="mt-2 min-h-[2.6rem] text-xs leading-tight">
          <div className="line-clamp-2 font-medium text-white">{title || item.id}</div>
        </div>
        <div className="mt-1 flex items-center justify-between text-[10px] uppercase tracking-[0.12em] text-steel-400">
          <span className="truncate">{getLocalized(item, 'tip', language, fallback) || item.tip_loc_English}</span>
          {(item.default_grade ?? 0) > 0 && (
            <span className={`shrink-0 ${GRADE_TONE[tier].split(' ').slice(-1)[0]}`}>
              {item.default_grade ?? 0}
            </span>
          )}
        </div>
      </button>
    </motion.li>
  );
}

function FilterChip({
  active,
  onClick,
  label,
  compact,
  size,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  compact?: boolean;
  size?: 'lg';
}) {
  const padding = size === 'lg'
    ? 'px-4 py-2 text-xs'
    : compact
      ? 'px-2.5 py-1 text-[10px]'
      : 'px-3 py-1.5 text-[11px]';
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border font-semibold uppercase tracking-[0.14em] transition ${padding} ${
        active
          ? 'border-frost-400/70 bg-frost-500/20 text-white shadow-glow'
          : 'border-steel-700/60 bg-ink-950/70 text-steel-300 hover:border-frost-400/50 hover:text-white'
      }`}
    >
      {label}
    </button>
  );
}

function familyLabel(
  slot: SlotFilter,
  family: string,
  sample: CategorisedItem,
  language: ReturnType<typeof getLanguage>,
  fallback: ReturnType<typeof getLanguage>,
  t: (k: string) => string,
): string {
  if (slot === 'weapon')      return t(`weapons.${family}.name`);
  if (slot === 'armor')       return t(`armorWeights.${family}.name`);
  if (slot === 'accessory')   return t(`accessories.${family}.name`);
  if (slot === 'tool')        return t(`tools.${family}.name`);
  if (slot === 'material')    return t(`materialKinds.${family}`);
  if (slot === 'foodPotion')  return t(`materialKinds.${family}`);
  if (slot === 'enhancement') return t(`materialKinds.${family}`);
  if (slot === 'ammo')        return t(`materialKinds.${family}`);
  if (slot === 'farm')        return t(`materialKinds.${family}`);
  // For workbench / skillBook / costume we localise from the sample item's
  // own type field — that data is already translated in items.json.
  return getLocalized(sample.item, 'tip', language, fallback) || family;
}
