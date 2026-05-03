import { useTranslation } from 'react-i18next';

import { Icon } from '@/components/ui/Icon';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { HARBORS, HARBOR_SERVICES } from '@/data/sailing';

const REGION_TONE: Record<string, string> = {
  east:    'border-frost-400/40 text-frost-200',
  central: 'border-ember-400/40 text-ember-200',
  west:    'border-emerald-400/40 text-emerald-200',
  mist:    'border-purple-400/40 text-purple-200',
  south:   'border-amber-400/40 text-amber-200',
  north:   'border-cyan-400/40 text-cyan-200',
};

const SERVICE_ICON: Record<typeof HARBOR_SERVICES[number], 'ship' | 'wagon' | 'spark' | 'anvil' | 'sword' | 'shield'> = {
  shipsInHarbor:   'ship',
  shipTrading:     'spark',
  barter:          'anvil',
  caravanPackages: 'wagon',
  shipBuilding:    'shield',
  towing:          'sword',
};

export function HarborServices() {
  const { t } = useTranslation('sailing');
  const sortedHarbors = [...HARBORS].sort((a, b) => a.payoutGold - b.payoutGold);

  return (
    <section className="space-y-6">
      <SectionHeading
        kicker={t('harbors.kicker') as string}
        title={t('harbors.title') as string}
        subtitle={t('harbors.subtitle') as string}
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {HARBORS.map((h) => (
          <div
            key={h.id}
            className="rounded-2xl border border-steel-700/60 bg-ink-900/60 p-5"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-frost-400/40 bg-frost-500/10 text-frost-200">
                  <Icon name="ship" size={18} />
                </span>
                <div>
                  <div className="font-display text-base text-white">{h.baslik}</div>
                  <div className="mt-0.5 text-[11px] uppercase tracking-[0.18em] text-steel-400">
                    {t(`harbors.tags.${h.id}`)}
                  </div>
                </div>
              </div>
              <span className={`rounded-full border px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.16em] ${REGION_TONE[h.region]}`}>
                {t(`harbors.regions.${h.region}`)}
              </span>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-steel-300">
              {t(`harbors.list.${h.id}.body`)}
            </p>
          </div>
        ))}
      </div>

      <div>
        <h3 className="mb-3 font-display text-lg text-white">{t('harbors.servicesTitle')}</h3>
        <p className="mb-4 text-sm text-steel-300">{t('harbors.servicesSubtitle')}</p>
        <ul className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
          {HARBOR_SERVICES.map((s) => (
            <li key={s} className="rounded-2xl border border-steel-700/60 bg-ink-900/60 p-5">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-ember-400/40 bg-ember-500/10 text-ember-200">
                  <Icon name={SERVICE_ICON[s]} size={16} />
                </span>
                <div className="font-display text-sm text-white">
                  {t(`harbors.services.${s}.title`)}
                </div>
              </div>
              <p className="mt-2 text-xs leading-relaxed text-steel-400">
                {t(`harbors.services.${s}.body`)}
              </p>
            </li>
          ))}
        </ul>
      </div>

      <div className="overflow-hidden rounded-2xl border border-frost-400/30 bg-ink-900/60">
        <div className="border-b border-frost-400/30 bg-frost-500/5 p-4">
          <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-frost-200">
            {t('harbors.payoutTable.label')}
          </div>
          <div className="mt-1 font-display text-lg text-white">
            {t('harbors.payoutTable.title')}
          </div>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-[10px] uppercase tracking-[0.18em] text-steel-400">
              <th className="border-b border-steel-700/60 p-3">{t('harbors.payoutTable.harbor')}</th>
              <th className="border-b border-steel-700/60 p-3 text-right">{t('harbors.payoutTable.payout')}</th>
            </tr>
          </thead>
          <tbody>
            {sortedHarbors.map((h, i) => {
              const isTop = i === sortedHarbors.length - 1;
              const isLow = i < 2;
              return (
                <tr key={h.id} className="text-steel-200 transition hover:bg-ink-800/40">
                  <td className="border-b border-steel-700/40 p-3">
                    <div className="flex items-center gap-2">
                      <Icon name="ship" size={14} className="text-frost-300" />
                      {h.baslik}
                    </div>
                  </td>
                  <td className={`border-b border-steel-700/40 p-3 text-right font-display ${
                    isTop ? 'text-ember-200' : isLow ? 'text-steel-400' : 'text-frost-200'
                  }`}>
                    ~{h.payoutGold.toLocaleString('en-US')}g
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="border-t border-steel-700/60 bg-ink-800/40 px-4 py-3 text-xs text-steel-400">
          {t('harbors.payoutTable.note')}
        </div>
      </div>
    </section>
  );
}
