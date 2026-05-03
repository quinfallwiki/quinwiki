import { useTranslation } from 'react-i18next';

import { Icon } from '@/components/ui/Icon';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { STATS, STAT_FACTS, STAT_META } from '@/data/guide';
import { SectionBackdrop } from '@/features/guide/SectionBackdrop';

const FACT_VALUES: Record<typeof STAT_FACTS[number], string | number> = {
  perLevel:    2,
  totalAtCap:  100,
  mastery90:   90,
  sixStats:    6,
  twoWeapons:  2,
  noClassLock: '∞',
};

const FACT_UNIT: Record<typeof STAT_FACTS[number], string> = {
  perLevel:    'puanLevel',
  totalAtCap:  'puanGrade100',
  mastery90:   'silahBasi',
  sixStats:    'stat',
  twoWeapons:  'silah',
  noClassLock: 'sinifKilidi',
};

export function StatMastery() {
  const { t } = useTranslation('guide');

  return (
    <SectionBackdrop bgKey="stats" accent="bg-ember-500/15">
      <SectionHeading
        kicker={t('stats.kicker') as string}
        title={t('stats.title') as string}
        subtitle={t('stats.subtitle') as string}
      />

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6">
        {STATS.map((s) => (
          <div
            key={s}
            className="rounded-2xl border border-steel-700/60 bg-ink-900/60 p-4 text-center"
          >
            <div className={`font-display text-2xl ${STAT_META[s].color}`}>
              {t(`stats.list.${s}.abbr`)}
            </div>
            <div className="mt-1 font-display text-sm text-white">
              {t(`stats.list.${s}.name`)}
            </div>
            <p className="mt-2 text-[11px] leading-relaxed text-steel-400">
              {t(`stats.list.${s}.body`)}
            </p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
        {STAT_FACTS.map((f) => (
          <div
            key={f}
            className="rounded-2xl border border-steel-700/60 bg-ink-900/60 p-5"
          >
            <div className="flex items-baseline gap-3">
              <span className="font-display text-2xl text-ember-300">
                {FACT_VALUES[f]}
              </span>
              <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-steel-400">
                {t(`stats.units.${FACT_UNIT[f]}`)}
              </span>
            </div>
            <div className="mt-2 font-display text-sm text-white">
              {t(`stats.facts.${f}.title`)}
            </div>
            <p className="mt-1 text-xs leading-relaxed text-steel-400">
              {t(`stats.facts.${f}.body`)}
            </p>
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-rose-400/30 bg-rose-500/5 p-5">
        <div className="flex items-start gap-3">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-rose-400/40 bg-rose-500/10 text-rose-200">
            <Icon name="sword" size={16} />
          </span>
          <div>
            <div className="font-display text-sm text-white">{t('stats.respec.title')}</div>
            <p className="mt-1 text-sm leading-relaxed text-steel-300">
              {t('stats.respec.body')}
            </p>
          </div>
        </div>
      </div>
    </SectionBackdrop>
  );
}
