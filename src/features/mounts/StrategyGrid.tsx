import { useTranslation } from 'react-i18next';

import { Icon } from '@/components/ui/Icon';
import { SectionHeading } from '@/components/ui/SectionHeading';

const STRATS = [
  { id: 'beginner', icon: 'spark' as const, accent: 'border-emerald-400/40 text-emerald-200' },
  { id: 'economy', icon: 'anvil' as const, accent: 'border-ember-400/40 text-ember-200' },
  { id: 'siege', icon: 'shield' as const, accent: 'border-rose-400/40 text-rose-200' },
  { id: 'profession', icon: 'wagon' as const, accent: 'border-frost-400/40 text-frost-200' },
];

export function StrategyGrid() {
  const { t } = useTranslation('mounts');

  return (
    <section className="space-y-6">
      <SectionHeading
        kicker={t('strategy.kicker') as string}
        title={t('strategy.title') as string}
        subtitle={t('strategy.subtitle') as string}
      />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {STRATS.map((s) => (
          <article
            key={s.id}
            className="rounded-2xl border border-steel-700/60 bg-ink-900/60 p-5"
          >
            <div className="flex items-center gap-3">
              <span
                className={`flex h-10 w-10 items-center justify-center rounded-xl border bg-ink-800/80 ${s.accent}`}
              >
                <Icon name={s.icon} size={18} />
              </span>
              <h3 className="font-display text-base text-white">
                {t(`strategy.list.${s.id}.title`)}
              </h3>
            </div>
            <ul className="mt-4 space-y-2 text-sm text-steel-300">
              {(t(`strategy.list.${s.id}.bullets`, { returnObjects: true }) as string[])?.map(
                (b, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-frost-300" />
                    <span>{b}</span>
                  </li>
                ),
              )}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
