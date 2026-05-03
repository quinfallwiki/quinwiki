import { useTranslation } from 'react-i18next';

import { Icon } from '@/components/ui/Icon';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { CARAVAN_STRATEGIES } from '@/data/caravan';

const ICONS: Record<typeof CARAVAN_STRATEGIES[number], 'spark' | 'wagon' | 'sword' | 'shield'> = {
  starter:  'spark',
  midGame:  'wagon',
  pvpHigh:  'sword',
  guildOps: 'shield',
};

const TONE: Record<typeof CARAVAN_STRATEGIES[number], string> = {
  starter:  'border-emerald-400/40 text-emerald-200',
  midGame:  'border-frost-400/40 text-frost-200',
  pvpHigh:  'border-rose-400/40 text-rose-200',
  guildOps: 'border-ember-400/40 text-ember-200',
};

export function StrategyGrid() {
  const { t } = useTranslation('caravan');

  return (
    <section className="space-y-6">
      <SectionHeading
        kicker={t('strategy.kicker') as string}
        title={t('strategy.title') as string}
        subtitle={t('strategy.subtitle') as string}
      />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {CARAVAN_STRATEGIES.map((s) => (
          <article key={s} className="rounded-2xl border border-steel-700/60 bg-ink-900/60 p-5">
            <div className="flex items-center gap-3">
              <span className={`flex h-10 w-10 items-center justify-center rounded-xl border bg-ink-800/80 ${TONE[s]}`}>
                <Icon name={ICONS[s]} size={18} />
              </span>
              <h3 className="font-display text-base text-white">
                {t(`strategy.list.${s}.title`)}
              </h3>
            </div>
            <ul className="mt-4 space-y-2 text-sm text-steel-300">
              {(t(`strategy.list.${s}.bullets`, { returnObjects: true }) as string[])?.map((b, i) => (
                <li key={i} className="flex gap-2">
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-frost-300" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
