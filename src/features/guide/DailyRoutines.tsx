import { useTranslation } from 'react-i18next';

import { Icon } from '@/components/ui/Icon';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { DAILY_ROUTINES } from '@/data/guide';
import { SectionBackdrop } from '@/features/guide/SectionBackdrop';

const ROUTINE_ICON: Record<typeof DAILY_ROUTINES[number], 'flag' | 'spark' | 'shield' | 'sword' | 'skull' | 'anvil'> = {
  townBoard:       'flag',
  dungeonPoints:   'skull',
  quinfallsTower:  'spark',
  zenithConquest:  'sword',
  worldBoss:       'shield',
  statue:          'anvil',
};

const ROUTINE_TONE: Record<typeof DAILY_ROUTINES[number], string> = {
  townBoard:       'border-emerald-400/40 text-emerald-200',
  dungeonPoints:   'border-rose-400/40 text-rose-200',
  quinfallsTower:  'border-frost-400/40 text-frost-200',
  zenithConquest:  'border-purple-400/40 text-purple-200',
  worldBoss:       'border-amber-400/40 text-amber-200',
  statue:          'border-ember-400/40 text-ember-200',
};

export function DailyRoutines() {
  const { t } = useTranslation('guide');

  return (
    <SectionBackdrop bgKey="daily" accent="bg-frost-500/15">
      <SectionHeading
        kicker={t('daily.kicker') as string}
        title={t('daily.title') as string}
        subtitle={t('daily.subtitle') as string}
      />

      <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {DAILY_ROUTINES.map((r) => (
          <li
            key={r}
            className="rounded-2xl border border-steel-700/60 bg-ink-900/60 p-5"
          >
            <div className="flex items-center gap-3">
              <span className={`flex h-10 w-10 items-center justify-center rounded-xl border bg-ink-800/80 ${ROUTINE_TONE[r]}`}>
                <Icon name={ROUTINE_ICON[r]} size={18} />
              </span>
              <div>
                <div className="font-display text-base text-white">
                  {t(`daily.list.${r}.title`)}
                </div>
                <div className="mt-0.5 text-[11px] uppercase tracking-[0.18em] text-steel-400">
                  {t(`daily.list.${r}.cadence`)}
                </div>
              </div>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-steel-300">
              {t(`daily.list.${r}.body`)}
            </p>
            <div className="mt-3 rounded-lg border border-steel-700/60 bg-ink-800/40 px-3 py-2 text-xs">
              <span className="text-steel-500">{t('daily.gainLabel')}:</span>{' '}
              <span className="text-steel-200">{t(`daily.list.${r}.gain`)}</span>
            </div>
          </li>
        ))}
      </ul>
    </SectionBackdrop>
  );
}
