import { useTranslation } from 'react-i18next';

import { Icon } from '@/components/ui/Icon';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { KRAKEN_PHASES, KRAKEN_REWARDS } from '@/data/sailing';

export function KrakenHunt() {
  const { t } = useTranslation('sailing');

  return (
    <section className="space-y-6">
      <SectionHeading
        kicker={t('kraken.kicker') as string}
        title={t('kraken.title') as string}
        subtitle={t('kraken.subtitle') as string}
      />

      <article className="relative overflow-hidden rounded-3xl border border-purple-400/30 bg-gradient-to-br from-purple-500/10 via-ink-900/80 to-frost-500/5 p-6 sm:p-8">
        <div aria-hidden className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-purple-500/15 blur-3xl" />
        <div className="relative grid grid-cols-1 gap-6 lg:grid-cols-[auto_1fr] lg:items-center">
          <div className="flex justify-center">
            <div className="relative flex h-44 w-44 items-center justify-center overflow-hidden rounded-3xl border border-purple-400/30 bg-ink-950/60 shadow-glow">
              <img
                src="/assets/quinfall/bosses-panel/kraken.png"
                alt="Kraken"
                loading="eager"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-purple-400/40 bg-purple-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-purple-200">
              <Icon name="skull" size={12} />
              {t('kraken.spotlight.tag')}
            </div>
            <h3 className="mt-3 font-display text-2xl text-white sm:text-3xl">
              {t('kraken.spotlight.title')}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-steel-300">
              {t('kraken.spotlight.body')}
            </p>
            <ul className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-3">
              {(['location', 'spawn', 'access'] as const).map((k) => (
                <li
                  key={k}
                  className="rounded-xl border border-steel-700/60 bg-ink-800/60 p-3 text-center"
                >
                  <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-frost-300/80">
                    {t(`kraken.spotlight.meta.${k}.label`)}
                  </div>
                  <div className="mt-1 font-display text-sm text-white">
                    {t(`kraken.spotlight.meta.${k}.value`)}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </article>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <div className="rounded-2xl border border-steel-700/60 bg-ink-900/60 p-5">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-rose-400/40 bg-rose-500/10 text-rose-200">
              <Icon name="sword" size={18} />
            </span>
            <h3 className="font-display text-base text-white">
              {t('kraken.phases.title')}
            </h3>
          </div>
          <p className="mt-2 text-xs text-steel-500">{t('kraken.phases.note')}</p>
          <ol className="mt-4 space-y-3">
            {KRAKEN_PHASES.map((p, i) => (
              <li key={p} className="flex gap-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-rose-400/40 bg-rose-500/10 font-display text-xs text-rose-200">
                  {i + 1}
                </span>
                <div>
                  <div className="font-display text-sm text-white">
                    {t(`kraken.phases.list.${p}.title`)}
                  </div>
                  <p className="mt-0.5 text-xs leading-relaxed text-steel-400">
                    {t(`kraken.phases.list.${p}.body`)}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className="rounded-2xl border border-ember-400/30 bg-gradient-to-br from-ember-500/10 via-ink-900/60 to-transparent p-5">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-ember-400/40 bg-ember-500/10 text-ember-200">
              <Icon name="spark" size={18} />
            </span>
            <h3 className="font-display text-base text-white">
              {t('kraken.rewards.title')}
            </h3>
          </div>
          <p className="mt-2 text-xs text-steel-500">{t('kraken.rewards.note')}</p>
          <ul className="mt-4 space-y-3">
            {KRAKEN_REWARDS.map((r) => (
              <li key={r} className="rounded-xl border border-ember-400/20 bg-ink-800/40 p-3">
                <div className="font-display text-sm text-white">
                  {t(`kraken.rewards.list.${r}.title`)}
                </div>
                <p className="mt-1 text-xs leading-relaxed text-steel-400">
                  {t(`kraken.rewards.list.${r}.body`)}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
