import { useTranslation } from 'react-i18next';

import { Icon } from '@/components/ui/Icon';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { NAVAL_COMBAT_FACTS } from '@/data/sailing';

const FACT_ICON: Record<typeof NAVAL_COMBAT_FACTS[number], 'sword' | 'shield' | 'spark' | 'ship' | 'skull' | 'flag'> = {
  pvpOnly:           'sword',
  mannedCannons:     'spark',
  durability:        'shield',
  channelSwitch:     'ship',
  piracy:            'skull',
  cannonRestriction: 'flag',
};

const FACT_TONE: Record<typeof NAVAL_COMBAT_FACTS[number], string> = {
  pvpOnly:           'border-rose-400/40 text-rose-200',
  mannedCannons:     'border-ember-400/40 text-ember-200',
  durability:        'border-emerald-400/40 text-emerald-200',
  channelSwitch:     'border-frost-400/40 text-frost-200',
  piracy:            'border-purple-400/40 text-purple-200',
  cannonRestriction: 'border-amber-400/40 text-amber-200',
};

export function NavalCombat() {
  const { t } = useTranslation('sailing');

  return (
    <section className="space-y-6">
      <SectionHeading
        kicker={t('combat.kicker') as string}
        title={t('combat.title') as string}
        subtitle={t('combat.subtitle') as string}
      />

      <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {NAVAL_COMBAT_FACTS.map((f) => (
          <li
            key={f}
            className="rounded-2xl border border-steel-700/60 bg-ink-900/60 p-5"
          >
            <div className="flex items-center gap-3">
              <span className={`flex h-10 w-10 items-center justify-center rounded-xl border bg-ink-800/80 ${FACT_TONE[f]}`}>
                <Icon name={FACT_ICON[f]} size={18} />
              </span>
              <h3 className="font-display text-base text-white">
                {t(`combat.facts.${f}.title`)}
              </h3>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-steel-300">
              {t(`combat.facts.${f}.body`)}
            </p>
            {f === 'cannonRestriction' && (
              <div className="mt-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-amber-300/80">
                {t('combat.facts.cannonRestriction.source')}
              </div>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
