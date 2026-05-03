import { useTranslation } from 'react-i18next';

import { Icon } from '@/components/ui/Icon';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { TAME_STEPS } from '@/data/mountsAndPets';

export function TameSystem() {
  const { t } = useTranslation('mounts');

  return (
    <section className="space-y-6">
      <SectionHeading
        kicker={t('tame.kicker') as string}
        title={t('tame.title') as string}
        subtitle={t('tame.subtitle') as string}
      />

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_1fr]">
        <article className="rounded-2xl border border-emerald-400/30 bg-gradient-to-br from-emerald-500/10 via-ink-900/60 to-transparent p-6">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-emerald-400/40 bg-emerald-500/10 text-emerald-200">
              <Icon name="horse" size={18} />
            </span>
            <h3 className="font-display text-base text-white">
              {t('tame.wildHorses.title')}
            </h3>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-steel-300">
            {t('tame.wildHorses.body')}
          </p>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className="rounded-xl border border-emerald-400/40 bg-emerald-500/10 p-3 text-center">
              <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-emerald-200">
                {t('tame.wildHorses.greenLabel')}
              </div>
              <div className="mt-1 font-display text-sm text-white">
                {t('tame.wildHorses.greenName')}
              </div>
            </div>
            <div className="rounded-xl border border-frost-400/40 bg-frost-500/10 p-3 text-center">
              <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-frost-200">
                {t('tame.wildHorses.blueLabel')}
              </div>
              <div className="mt-1 font-display text-sm text-white">
                {t('tame.wildHorses.blueName')}
              </div>
            </div>
          </div>
          <p className="mt-3 text-xs leading-relaxed text-emerald-200/80">
            {t('tame.wildHorses.note')}
          </p>
        </article>

        <article className="rounded-2xl border border-ember-400/30 bg-gradient-to-br from-ember-500/10 via-ink-900/60 to-transparent p-6">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-ember-400/40 bg-ember-500/10 text-ember-200">
              <Icon name="anvil" size={18} />
            </span>
            <h3 className="font-display text-base text-white">
              {t('tame.npc.title')}
            </h3>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-steel-300">
            {t('tame.npc.body')}
          </p>
          <ul className="mt-4 space-y-2 text-sm text-steel-200">
            <li className="flex gap-2">
              <span className="text-ember-300">•</span>
              <span>{t('tame.npc.bullet1')}</span>
            </li>
            <li className="flex gap-2">
              <span className="text-ember-300">•</span>
              <span>{t('tame.npc.bullet2')}</span>
            </li>
            <li className="flex gap-2">
              <span className="text-ember-300">•</span>
              <span>{t('tame.npc.bullet3')}</span>
            </li>
          </ul>
        </article>
      </div>

      <div className="rounded-2xl border border-steel-700/60 bg-ink-900/60 p-6">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-frost-400/40 bg-frost-500/10 text-frost-200">
            <Icon name="spark" size={18} />
          </span>
          <h3 className="font-display text-base text-white">{t('tame.steps.title')}</h3>
        </div>
        <ol className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
          {TAME_STEPS.map((s, i) => (
            <li
              key={s}
              className="flex gap-3 rounded-xl border border-steel-700/60 bg-ink-800/50 p-4"
            >
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-frost-400/40 bg-frost-500/10 font-display text-xs text-frost-200">
                {i + 1}
              </span>
              <div>
                <div className="font-display text-sm text-white">
                  {t(`tame.steps.list.${s}.title`)}
                </div>
                <p className="mt-1 text-xs leading-relaxed text-steel-400">
                  {t(`tame.steps.list.${s}.body`)}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
