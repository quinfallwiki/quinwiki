import { useTranslation } from 'react-i18next';

import { Icon } from '@/components/ui/Icon';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { HARBORS, SEA_CARAVAN_FACTS } from '@/data/caravan';

export function SeaCaravan() {
  const { t } = useTranslation('caravan');

  const sortedHarbors = [...HARBORS].sort((a, b) => a.payoutGold - b.payoutGold);

  return (
    <section className="space-y-6">
      <SectionHeading
        kicker={t('sea.kicker') as string}
        title={t('sea.title') as string}
        subtitle={t('sea.subtitle') as string}
      />

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1.1fr_1fr]">
        <div className="overflow-hidden rounded-2xl border border-frost-400/30 bg-ink-900/60">
          <div className="border-b border-frost-400/30 bg-frost-500/5 p-4">
            <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-frost-200">
              {t('sea.harborTable.label')}
            </div>
            <div className="mt-1 font-display text-lg text-white">
              {t('sea.harborTable.title')}
            </div>
          </div>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-[10px] uppercase tracking-[0.18em] text-steel-400">
                <th className="border-b border-steel-700/60 p-3 font-semibold">{t('sea.harborTable.harbor')}</th>
                <th className="border-b border-steel-700/60 p-3 text-right font-semibold">{t('sea.harborTable.payout')}</th>
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
            {t('sea.harborTable.note')}
          </div>
        </div>

        <ul className="grid grid-cols-1 gap-3">
          {SEA_CARAVAN_FACTS.map((f) => (
            <li
              key={f}
              className="rounded-2xl border border-steel-700/60 bg-ink-900/60 p-4"
            >
              <div className="flex items-start gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-frost-400/40 bg-frost-500/10 text-frost-200">
                  <Icon name="ship" size={16} />
                </span>
                <div>
                  <div className="font-display text-sm text-white">{t(`sea.facts.${f}.title`)}</div>
                  <p className="mt-1 text-xs leading-relaxed text-steel-400">
                    {t(`sea.facts.${f}.body`)}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
