import { useTranslation } from 'react-i18next';

import { Icon } from '@/components/ui/Icon';
import { SectionHeading } from '@/components/ui/SectionHeading';

export function ChannelRules() {
  const { t } = useTranslation('caravan');

  return (
    <section className="space-y-6">
      <SectionHeading
        kicker={t('channels.kicker') as string}
        title={t('channels.title') as string}
        subtitle={t('channels.subtitle') as string}
      />

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <article className="rounded-2xl border border-emerald-400/30 bg-gradient-to-br from-emerald-500/10 via-ink-900/60 to-transparent p-6">
          <div className="flex items-center gap-3">
            <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-emerald-400/40 bg-emerald-500/10 text-emerald-200">
              <Icon name="shield" size={22} />
            </span>
            <div>
              <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-emerald-200">
                {t('channels.pve.tag')}
              </div>
              <h3 className="font-display text-lg text-white">
                {t('channels.pve.title')}
              </h3>
            </div>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-steel-300">
            {t('channels.pve.body')}
          </p>
          <div className="mt-4 flex items-baseline gap-2 rounded-xl border border-steel-700/60 bg-ink-800/40 p-3">
            <span className="font-display text-3xl text-emerald-200">±0%</span>
            <span className="text-xs uppercase tracking-[0.18em] text-steel-400">
              {t('channels.pve.bonusLabel')}
            </span>
          </div>
        </article>

        <article className="rounded-2xl border border-rose-400/30 bg-gradient-to-br from-rose-500/10 via-ink-900/60 to-transparent p-6">
          <div className="flex items-center gap-3">
            <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-rose-400/40 bg-rose-500/10 text-rose-200">
              <Icon name="sword" size={22} />
            </span>
            <div>
              <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-rose-200">
                {t('channels.pvp.tag')}
              </div>
              <h3 className="font-display text-lg text-white">
                {t('channels.pvp.title')}
              </h3>
            </div>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-steel-300">
            {t('channels.pvp.body')}
          </p>
          <div className="mt-4 flex items-baseline gap-2 rounded-xl border border-rose-400/40 bg-rose-500/10 p-3">
            <span className="font-display text-3xl text-rose-200">+20%</span>
            <span className="text-xs uppercase tracking-[0.18em] text-rose-300">
              {t('channels.pvp.bonusLabel')}
            </span>
          </div>
        </article>
      </div>

      <div className="rounded-2xl border border-frost-400/30 bg-frost-500/5 p-5">
        <div className="flex items-start gap-3">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-frost-400/40 bg-frost-500/10 text-frost-200">
            <Icon name="spark" size={16} />
          </span>
          <div>
            <div className="font-display text-sm text-white">{t('channels.unattended.title')}</div>
            <p className="mt-1 text-sm leading-relaxed text-steel-300">
              {t('channels.unattended.body')}
            </p>
            <div className="mt-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-frost-300/80">
              {t('channels.unattended.source')}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
