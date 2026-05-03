import { useTranslation } from 'react-i18next';

import { SectionHeading } from '@/components/ui/SectionHeading';
import { TIMELINE } from '@/data/guide';
import { SectionBackdrop } from '@/features/guide/SectionBackdrop';

export function FirstHundredHours() {
  const { t } = useTranslation('guide');

  return (
    <SectionBackdrop bgKey="timeline" accent="bg-amber-500/15">
      <SectionHeading
        kicker={t('timeline.kicker') as string}
        title={t('timeline.title') as string}
        subtitle={t('timeline.subtitle') as string}
      />

      <div className="overflow-x-auto rounded-2xl border border-steel-700/60 bg-ink-900/60">
        <table className="w-full min-w-[640px] border-collapse text-sm">
          <thead>
            <tr className="text-left text-[11px] uppercase tracking-[0.18em] text-steel-400">
              <th className="border-b border-steel-700/60 p-4 font-semibold">{t('timeline.col.hours')}</th>
              <th className="border-b border-steel-700/60 p-4 font-semibold">{t('timeline.col.level')}</th>
              <th className="border-b border-steel-700/60 p-4 font-semibold">{t('timeline.col.focus')}</th>
              <th className="border-b border-steel-700/60 p-4 font-semibold">{t('timeline.col.location')}</th>
            </tr>
          </thead>
          <tbody>
            {TIMELINE.map((row, i) => (
              <tr
                key={i}
                className="text-steel-200 transition hover:bg-ink-800/40"
              >
                <td className="border-b border-steel-700/40 p-4 font-display text-ember-200">
                  {row.hours}h
                </td>
                <td className="border-b border-steel-700/40 p-4 font-display text-frost-200">
                  {row.levelBand}
                </td>
                <td className="border-b border-steel-700/40 p-4">
                  {t(`timeline.focus.${row.focus}`)}
                </td>
                <td className="border-b border-steel-700/40 p-4 text-steel-300">
                  {t(`timeline.locations.${row.city}`)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </SectionBackdrop>
  );
}
