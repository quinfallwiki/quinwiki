import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

import { SectionHeading } from '@/components/ui/SectionHeading';
import { AssetIcon } from '@/components/ui/AssetIcon';
import { CRAFTING_TIERS, FAMILY_ORDER, type CraftingProfessionStats } from '@/data/craftingTiers';

const TIER_TONE: Record<number, string> = {
  1: 'border-emerald-400/55 bg-emerald-500/10 text-emerald-200',
  2: 'border-frost-400/55 bg-frost-500/10 text-frost-200',
  3: 'border-ember-400/60 bg-ember-500/15 text-ember-200',
};

type FamilyFilter = CraftingProfessionStats['family'] | 'all';

export function ProfessionTierGrid() {
  const { t } = useTranslation('crafting');
  const [filter, setFilter] = useState<FamilyFilter>('all');

  const items = useMemo(
    () => (filter === 'all' ? CRAFTING_TIERS : CRAFTING_TIERS.filter((p) => p.family === filter)),
    [filter],
  );

  return (
    <section className="space-y-6">
      <SectionHeading
        kicker={t('matrix.kicker') as string}
        title={t('matrix.title') as string}
        subtitle={t('matrix.subtitle') as string}
      />

      {/* Family chips */}
      <div className="flex flex-wrap gap-2">
        <Chip active={filter === 'all'} onClick={() => setFilter('all')} label={t('matrix.familyAll') as string} />
        {FAMILY_ORDER.map((f) => (
          <Chip
            key={f}
            active={filter === f}
            onClick={() => setFilter(f)}
            label={t(`matrix.family.${f}`) as string}
          />
        ))}
      </div>

      {/* Profession cards */}
      <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {items.map((p, i) => (
          <motion.li
            key={p.id}
            layout
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-30px' }}
            transition={{ duration: 0.4, delay: (i % 3) * 0.05 }}
            className="group relative overflow-hidden rounded-2xl border border-steel-700/60 bg-ink-900/70 p-5 shadow-panel transition hover:-translate-y-0.5 hover:border-frost-400/55 hover:shadow-glow"
          >
            {/* Header — icon + name + family chip */}
            <div className="flex items-center gap-3">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl border border-steel-700/60 bg-ink-950/80 p-1.5">
                <AssetIcon code={p.iconCode} size={36} />
              </span>
              <div className="min-w-0 flex-1">
                <h3 className="font-display text-lg text-white">
                  {t(`professionsList.${p.id}.name`)}
                </h3>
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-frost-300/95">
                  {t(`professionsList.${p.id}.tagline`)}
                </p>
              </div>
              <span className="rounded-full border border-steel-700/60 bg-ink-950/80 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-steel-300">
                {t(`matrix.family.${p.family}`)}
              </span>
            </div>

            {/* Description */}
            <p className="mt-3 text-sm leading-relaxed text-steel-300/95">
              {t(`professionsList.${p.id}.body`)}
            </p>

            {/* Recipe summary stripe */}
            <div className="mt-4 grid grid-cols-3 gap-2 rounded-xl border border-steel-700/40 bg-ink-950/40 p-2.5">
              <Stat
                label={t('matrix.stats.recipes') as string}
                value={String(p.totalRecipes)}
                accent="text-white"
              />
              <Stat
                label={t('matrix.stats.levelRange') as string}
                value={`${p.levelMin}–${p.levelMax}`}
                accent="text-frost-200"
              />
              <Stat
                label={t('matrix.stats.tiers') as string}
                value={String(p.tiers.length)}
                accent="text-ember-200"
              />
            </div>

            {/* Tier breakdown */}
            <div className="mt-4 space-y-2">
              {p.tiers.map((tier) => (
                <div
                  key={tier.tier}
                  className={`flex items-center gap-3 rounded-lg border px-3 py-2 ${TIER_TONE[tier.tier]}`}
                >
                  <span className="font-display text-base">T{tier.tier}</span>
                  <span className="flex-1 text-[11px] font-semibold uppercase tracking-[0.16em]">
                    {t('matrix.unlock', { level: tier.minLevel })}
                  </span>
                  <span className="rounded-full border border-steel-700/60 bg-ink-950/60 px-2 py-0.5 text-[10px] text-steel-200">
                    {tier.recipes} {t('matrix.stats.recipesShort')}
                  </span>
                </div>
              ))}
            </div>
          </motion.li>
        ))}
      </ul>
    </section>
  );
}

function Chip({ active, onClick, label }: { active: boolean; onClick: () => void; label: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] transition ${
        active
          ? 'border-frost-400/70 bg-frost-500/20 text-white shadow-glow'
          : 'border-steel-700/60 bg-ink-950/70 text-steel-300 hover:border-frost-400/50 hover:text-white'
      }`}
    >
      {label}
    </button>
  );
}

function Stat({ label, value, accent }: { label: string; value: string; accent: string }) {
  return (
    <div className="text-center">
      <div className={`font-display text-base ${accent}`}>{value}</div>
      <div className="mt-0.5 text-[9px] font-semibold uppercase tracking-[0.16em] text-steel-400">
        {label}
      </div>
    </div>
  );
}
