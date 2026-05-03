import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

import { AssetIcon } from '@/components/ui/AssetIcon';
import { Icon } from '@/components/ui/Icon';
import type { ProfessionDef, ProfessionFamily, IncomeTier } from '@/data/professions';
import { findProfession } from '@/data/professions';

interface ProfessionCardProps {
  prof: ProfessionDef;
  index: number;
}

const FAMILY_TINT: Record<ProfessionFamily, string> = {
  crafting: 'border-frost-400/40 group-hover:border-frost-400/80',
  gathering: 'border-emerald-400/40 group-hover:border-emerald-400/80',
  land: 'border-ember-400/40 group-hover:border-ember-400/80',
  caravan: 'border-purple-400/40 group-hover:border-purple-400/80',
  other: 'border-rose-400/40 group-hover:border-rose-400/80',
};

const FAMILY_GLOW: Record<ProfessionFamily, string> = {
  crafting: 'rgba(51,166,255,0.18)',
  gathering: 'rgba(74,222,128,0.16)',
  land: 'rgba(247,185,85,0.16)',
  caravan: 'rgba(168,85,247,0.16)',
  other: 'rgba(244,114,182,0.16)',
};

const INCOME_PIPS: Record<IncomeTier, number> = {
  low: 1,
  mid: 2,
  high: 3,
  top: 4,
};

export function ProfessionCard({ prof, index }: ProfessionCardProps) {
  const { t } = useTranslation('crafting');
  const incomePips = INCOME_PIPS[prof.income];

  return (
    <motion.article
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.45, delay: (index % 6) * 0.04, ease: 'easeOut' }}
      className={`group relative flex h-full flex-col overflow-hidden rounded-2xl border bg-panel-grad p-5 shadow-panel transition duration-300 hover:-translate-y-0.5 hover:shadow-glow ${FAMILY_TINT[prof.family]}`}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(circle at 30% 0%, ${FAMILY_GLOW[prof.family]} 0%, transparent 60%)`,
        }}
      />

      <header className="relative flex items-start gap-4">
        <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl border border-steel-700/60 bg-ink-900/60 p-2 transition-transform duration-500 group-hover:scale-105">
          <AssetIcon code={prof.iconCode} size={64} alt={t(`professions.${prof.id}.name`) as string} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="rounded-full border border-steel-700/60 bg-ink-900/70 px-2 py-0.5 text-[10px] uppercase tracking-[0.18em] text-steel-300">
              {t(`families.${prof.family}`)}
            </span>
            <span className="rounded-full border border-steel-700/60 bg-ink-900/70 px-2 py-0.5 text-[10px] uppercase tracking-[0.18em] text-steel-300">
              {t(`pace.${prof.pace}`)}
            </span>
          </div>
          <h3 className="mt-2 font-display text-xl text-white">{t(`professions.${prof.id}.name`)}</h3>
          <p className="mt-0.5 text-sm text-frost-300/90">{t(`professions.${prof.id}.tagline`)}</p>
        </div>
      </header>

      <p className="relative mt-4 text-sm leading-relaxed text-steel-200">
        {t(`professions.${prof.id}.summary`)}
      </p>

      <div className="relative mt-4 grid grid-cols-2 gap-2 border-t border-steel-700/40 pt-4 text-xs">
        <Stat label={t('labels.income') as string} value={t(`income.${prof.income}`) as string} pips={incomePips} max={4} />
        <Stat label={t('labels.difficulty') as string} value={`${prof.difficulty}/5`} pips={prof.difficulty} max={5} />
      </div>

      <div className="relative mt-4 space-y-3 text-xs">
        <DepRow
          label={t('labels.needs')}
          ids={prof.needs}
          empty={t('labels.needsNothing') as string}
          tone="ember"
        />
        <DepRow
          label={t('labels.feedsInto')}
          ids={prof.feedsInto}
          empty={t('labels.feedsNothing') as string}
          tone="frost"
        />
      </div>

      <details className="relative mt-4 group/det rounded-xl border border-steel-700/40 bg-ink-900/40 p-3 text-xs text-steel-300 [&_summary::-webkit-details-marker]:hidden">
        <summary className="flex cursor-pointer items-center gap-2 font-semibold uppercase tracking-[0.16em] text-frost-300/90">
          <Icon name="spark" size={12} />
          <span>{t('details.openLabel')}</span>
          <span className="ml-auto text-steel-400 transition group-open/det:rotate-90">›</span>
        </summary>
        <div className="mt-3 space-y-3 leading-relaxed">
          <Detail kicker="—" label={t('details.outputs') as string} text={t(`professions.${prof.id}.outputs`)} />
          <Detail kicker="↑" label={t('details.leveling') as string} text={t(`professions.${prof.id}.leveling`)} />
          <Detail kicker="$" label={t('details.moneyTip') as string} text={t(`professions.${prof.id}.moneyTip`)} />
        </div>
      </details>
    </motion.article>
  );
}

function Stat({ label, value, pips, max }: { label: string; value: string; pips: number; max: number }) {
  return (
    <div className="rounded-lg border border-steel-700/50 bg-ink-900/60 px-3 py-2">
      <div className="text-[10px] uppercase tracking-[0.16em] text-steel-400">{label}</div>
      <div className="mt-1 flex items-center justify-between gap-2">
        <span className="text-sm font-semibold text-white">{value}</span>
        <span className="flex gap-0.5">
          {Array.from({ length: max }).map((_, i) => (
            <span
              key={i}
              className={`h-1 w-1.5 rounded-full ${i < pips ? 'bg-frost-400' : 'bg-steel-700'}`}
            />
          ))}
        </span>
      </div>
    </div>
  );
}

function DepRow({
  label,
  ids,
  empty,
  tone,
}: {
  label: string;
  ids: string[];
  empty: string;
  tone: 'ember' | 'frost';
}) {
  const { t } = useTranslation('crafting');
  const tColor = tone === 'ember' ? 'text-ember-300' : 'text-frost-300';
  return (
    <div>
      <div className={`text-[10px] font-semibold uppercase tracking-[0.16em] ${tColor}`}>{label}</div>
      {ids.length === 0 ? (
        <div className="mt-1.5 text-steel-400 italic">{empty}</div>
      ) : (
        <div className="mt-1.5 flex flex-wrap gap-1.5">
          {ids.map((id) => {
            const dep = findProfession(id);
            if (!dep) return null;
            return (
              <span
                key={id}
                className="inline-flex items-center gap-1.5 rounded-full border border-steel-700/60 bg-ink-900/70 px-2 py-0.5 text-[10px] text-steel-200"
              >
                <span className="flex h-4 w-4 items-center justify-center">
                  <AssetIcon code={dep.iconCode} size={16} />
                </span>
                {t(`professions.${dep.id}.name`)}
              </span>
            );
          })}
        </div>
      )}
    </div>
  );
}

function Detail({ label, text, kicker }: { label: string; text: string; kicker: string }) {
  return (
    <div className="flex items-start gap-2">
      <span className="mt-0.5 inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-frost-400/40 bg-frost-500/10 text-[10px] font-semibold text-frost-200">
        {kicker}
      </span>
      <span>
        <span className="font-semibold text-white">{label}: </span>
        {text}
      </span>
    </div>
  );
}
