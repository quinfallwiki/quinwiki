import { useTranslation } from 'react-i18next';

import { Icon } from '@/components/ui/Icon';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { PET_EVOLUTION_STEPS, PET_SKILL_TREES } from '@/data/mountsAndPets';

export function PetEvolution() {
  const { t } = useTranslation('mounts');

  return (
    <section className="space-y-6">
      <SectionHeading
        kicker={t('evolution.kicker') as string}
        title={t('evolution.title') as string}
        subtitle={t('evolution.subtitle') as string}
      />

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <div className="rounded-2xl border border-purple-400/30 bg-gradient-to-br from-purple-500/10 via-ink-900/60 to-transparent p-6">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-purple-400/40 bg-purple-500/10 text-purple-200">
              <Icon name="spark" size={18} />
            </span>
            <h3 className="font-display text-base text-white">
              {t('evolution.requirements.title')}
            </h3>
          </div>
          <ol className="mt-5 space-y-3">
            {PET_EVOLUTION_STEPS.map((s, i) => (
              <li key={s} className="flex gap-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-purple-400/40 bg-purple-500/10 font-display text-xs text-purple-200">
                  {i + 1}
                </span>
                <div>
                  <div className="font-display text-sm text-white">
                    {t(`evolution.requirements.list.${s}.title`)}
                  </div>
                  <p className="mt-0.5 text-xs leading-relaxed text-steel-400">
                    {t(`evolution.requirements.list.${s}.body`)}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className="rounded-2xl border border-frost-400/30 bg-gradient-to-br from-frost-500/10 via-ink-900/60 to-transparent p-6">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-frost-400/40 bg-frost-500/10 text-frost-200">
              <Icon name="anvil" size={18} />
            </span>
            <h3 className="font-display text-base text-white">
              {t('evolution.skills.title')}
            </h3>
          </div>
          <p className="mt-2 text-sm text-steel-300">
            {t('evolution.skills.intro')}
          </p>
          <ul className="mt-4 space-y-3">
            {PET_SKILL_TREES.map((s) => (
              <li
                key={s}
                className="rounded-xl border border-frost-400/20 bg-ink-800/40 p-3"
              >
                <div className="font-display text-sm text-white">
                  {t(`evolution.skills.list.${s}.title`)}
                </div>
                <p className="mt-1 text-xs leading-relaxed text-steel-400">
                  {t(`evolution.skills.list.${s}.body`)}
                </p>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs text-frost-200/80">
            {t('evolution.skills.note')}
          </p>
        </div>
      </div>
    </section>
  );
}
