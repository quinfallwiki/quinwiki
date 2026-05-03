import { useTranslation } from 'react-i18next';

import { SectionHeading } from '@/components/ui/SectionHeading';
import { CARAVAN_FLOW_STEPS } from '@/data/caravan';

export function CaravanFlow() {
  const { t } = useTranslation('caravan');

  return (
    <section className="space-y-6">
      <SectionHeading
        kicker={t('flow.kicker') as string}
        title={t('flow.title') as string}
        subtitle={t('flow.subtitle') as string}
      />

      <ol className="grid grid-cols-1 gap-3 md:grid-cols-3 xl:grid-cols-5">
        {CARAVAN_FLOW_STEPS.map((s, i) => (
          <li key={s} className="relative rounded-2xl border border-steel-700/60 bg-ink-900/60 p-5">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-ember-400/40 bg-ember-500/10 font-display text-sm text-ember-200">
              {String(i + 1).padStart(2, '0')}
            </span>
            <div className="mt-3 font-display text-sm text-white">
              {t(`flow.steps.${s}.title`)}
            </div>
            <p className="mt-1 text-xs leading-relaxed text-steel-400">
              {t(`flow.steps.${s}.body`)}
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
}
