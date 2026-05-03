import { useTranslation } from 'react-i18next';

import { SectionHeading } from '@/components/ui/SectionHeading';
import { DIFFICULTY_TIERS } from '@/data/dungeons';

const TIER_COLOR: Record<(typeof DIFFICULTY_TIERS)[number], string> = {
  easy: 'border-emerald-400/40 text-emerald-200 bg-emerald-500/5',
  normal: 'border-frost-400/40 text-frost-200 bg-frost-500/5',
  hard: 'border-ember-400/40 text-ember-200 bg-ember-500/5',
  veryHard: 'border-rose-400/50 text-rose-200 bg-rose-500/5',
};

export function DifficultyMatrix() {
  const { t } = useTranslation('dungeons');

  return (
    <section className="space-y-6">
      <SectionHeading
        kicker={t('difficulty.kicker') as string}
        title={t('difficulty.title') as string}
        subtitle={t('difficulty.subtitle') as string}
      />

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {DIFFICULTY_TIERS.map((tier) => (
          <div
            key={tier}
            className={`rounded-xl border p-4 ${TIER_COLOR[tier]}`}
          >
            <div className="font-display text-base">{t(`difficulty.tiers.${tier}.name`)}</div>
            <p className="mt-2 text-xs leading-relaxed text-steel-300">
              {t(`difficulty.tiers.${tier}.description`)}
            </p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        <div className="panel p-5">
          <div className="font-display text-base text-white">
            {t('difficulty.notes.solo.title')}
          </div>
          <p className="mt-2 text-sm leading-relaxed text-steel-300">
            {t('difficulty.notes.solo.body')}
          </p>
        </div>
        <div className="panel p-5">
          <div className="font-display text-base text-white">
            {t('difficulty.notes.party.title')}
          </div>
          <p className="mt-2 text-sm leading-relaxed text-steel-300">
            {t('difficulty.notes.party.body')}
          </p>
        </div>
      </div>
    </section>
  );
}
