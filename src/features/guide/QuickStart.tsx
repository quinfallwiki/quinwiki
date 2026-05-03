import { useTranslation } from 'react-i18next';

import { SectionHeading } from '@/components/ui/SectionHeading';
import { QUICK_START_STEPS } from '@/data/guide';
import { SectionBackdrop } from '@/features/guide/SectionBackdrop';

export function QuickStart() {
  const { t } = useTranslation('guide');

  return (
    <SectionBackdrop bgKey="quickStart" accent="bg-emerald-500/15">
      <SectionHeading
        kicker={t('quickStart.kicker') as string}
        title={t('quickStart.title') as string}
        subtitle={t('quickStart.subtitle') as string}
      />

      <ol className="grid grid-cols-1 gap-3 md:grid-cols-2">
        {QUICK_START_STEPS.map((s, i) => (
          <li
            key={s}
            className="flex gap-4 rounded-2xl border border-steel-700/60 bg-ink-900/60 p-4"
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-ember-400/40 bg-ember-500/10 font-display text-sm text-ember-200">
              {String(i + 1).padStart(2, '0')}
            </span>
            <div>
              <div className="font-display text-sm text-white">
                {t(`quickStart.list.${s}.title`)}
              </div>
              <p className="mt-1 text-xs leading-relaxed text-steel-400">
                {t(`quickStart.list.${s}.body`)}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </SectionBackdrop>
  );
}
