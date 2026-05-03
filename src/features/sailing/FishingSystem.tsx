import { useTranslation } from 'react-i18next';

import { Icon } from '@/components/ui/Icon';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ENHANCEMENT_MATERIALS, FISHING_CATEGORIES, FISHING_FACTS, type FishingCategory } from '@/data/sailing';

const CATEGORY_TONE: Record<FishingCategory, string> = {
  freshwater: 'border-emerald-400/40 text-emerald-200 bg-emerald-500/10',
  saltwater:  'border-frost-400/40 text-frost-200 bg-frost-500/10',
  deepSea:    'border-purple-400/40 text-purple-200 bg-purple-500/10',
};

const FACT_ICON: Record<typeof FISHING_FACTS[number], 'spark' | 'horse' | 'anvil' | 'shield'> = {
  activeMode:  'spark',
  afkMode:     'horse',
  tokens:      'anvil',
  enhancement: 'shield',
};

export function FishingSystem() {
  const { t } = useTranslation('sailing');

  return (
    <section className="space-y-6">
      <SectionHeading
        kicker={t('fishing.kicker') as string}
        title={t('fishing.title') as string}
        subtitle={t('fishing.subtitle') as string}
      />

      <div>
        <h3 className="mb-3 font-display text-lg text-white">{t('fishing.categories.title')}</h3>
        <p className="mb-4 text-sm text-steel-300">{t('fishing.categories.body')}</p>
        <ul className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {FISHING_CATEGORIES.map((c) => (
            <li
              key={c}
              className={`rounded-2xl border p-5 ${CATEGORY_TONE[c]}`}
            >
              <div className="font-display text-base text-white">
                {t(`fishing.categories.list.${c}.name`)}
              </div>
              <div className="mt-0.5 text-[11px] uppercase tracking-[0.18em]">
                {t(`fishing.categories.list.${c}.tag`)}
              </div>
              <p className="mt-3 text-sm leading-relaxed text-steel-300">
                {t(`fishing.categories.list.${c}.body`)}
              </p>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="mb-3 font-display text-lg text-white">{t('fishing.mechanics.title')}</h3>
        <ul className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {FISHING_FACTS.map((f) => (
            <li key={f} className="rounded-2xl border border-steel-700/60 bg-ink-900/60 p-5">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-frost-400/40 bg-frost-500/10 text-frost-200">
                  <Icon name={FACT_ICON[f]} size={16} />
                </span>
                <div className="font-display text-sm text-white">
                  {t(`fishing.mechanics.list.${f}.title`)}
                </div>
              </div>
              <p className="mt-2 text-xs leading-relaxed text-steel-400">
                {t(`fishing.mechanics.list.${f}.body`)}
              </p>
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-2xl border border-ember-400/30 bg-gradient-to-br from-ember-500/10 via-ink-900/60 to-transparent p-5">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-ember-400/40 bg-ember-500/10 text-ember-200">
            <Icon name="anvil" size={18} />
          </span>
          <h3 className="font-display text-base text-white">
            {t('fishing.tokenEconomy.title')}
          </h3>
        </div>
        <p className="mt-3 text-sm leading-relaxed text-steel-300">
          {t('fishing.tokenEconomy.body')}
        </p>
        <div className="mt-4">
          <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-ember-300/80">
            {t('fishing.tokenEconomy.materialsLabel')}
          </div>
          <ul className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4">
            {ENHANCEMENT_MATERIALS.map((m) => (
              <li
                key={m}
                className="rounded-lg border border-ember-400/20 bg-ink-800/40 p-3 text-center"
              >
                <div className="font-display text-sm text-ember-200">
                  {t(`fishing.tokenEconomy.materials.${m}`)}
                </div>
              </li>
            ))}
          </ul>
        </div>
        <p className="mt-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-ember-300/80">
          {t('fishing.tokenEconomy.source')}
        </p>
      </div>
    </section>
  );
}
