import { useTranslation } from 'react-i18next';

import { AssetIcon } from '@/components/ui/AssetIcon';
import { Icon } from '@/components/ui/Icon';
import { SectionHeading } from '@/components/ui/SectionHeading';
import {
  BREEDING_FACTS,
  BREEDING_HOURS,
  BREEDING_MEDALLIONS,
  BREEDING_SHOP_ITEMS,
  FEMALE_BREEDING_CHARGES,
  HORSE_RARITIES,
  HORSE_RARITY_META,
  REDUCTION_STONE_HOURS,
  STABLE_CAP,
} from '@/data/mountsAndPets';

const FACT_VALUES: Record<typeof BREEDING_FACTS[number], string | number> = {
  duration: BREEDING_HOURS,
  femaleCharges: FEMALE_BREEDING_CHARGES,
  maleUnlimited: '∞',
  lockDuring: BREEDING_HOURS,
  stableCap: STABLE_CAP,
  rngStats: '?',
};

const SHOP_TONE: Record<typeof BREEDING_SHOP_ITEMS[number], string> = {
  resetStone: 'border-purple-400/40 bg-purple-500/10 text-purple-200',
  reductionStone: 'border-ember-400/40 bg-ember-500/10 text-ember-200',
};

export function BreedingFlow() {
  const { t } = useTranslation('mounts');

  return (
    <section className="space-y-6">
      <SectionHeading
        kicker={t('breeding.kicker') as string}
        title={t('breeding.title') as string}
        subtitle={t('breeding.subtitle') as string}
      />

      <div className="rounded-2xl border border-steel-700/60 bg-ink-900/60 p-5">
        <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-steel-400">
          {t('breeding.rarityLabel')}
        </div>
        <ol className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {HORSE_RARITIES.map((r, i) => {
            const meta = HORSE_RARITY_META[r];
            return (
              <li
                key={r}
                className={`relative overflow-hidden rounded-xl border p-4 ${meta.border} ${meta.bg}`}
              >
                <div className="absolute right-3 top-3 text-[9px] font-semibold uppercase tracking-[0.18em] text-steel-300/80">
                  {t(`breeding.obtainShort.${meta.obtain}`)}
                </div>
                <div className="flex items-start gap-3">
                  <AssetIcon
                    code={meta.iconCode}
                    size={56}
                    alt={t(`breeding.rarities.${r}.name`) as string}
                    className="shrink-0"
                  />
                  <div>
                    <div className={`text-[10px] font-semibold uppercase tracking-[0.18em] ${meta.color}`}>
                      Tier {i + 1}
                    </div>
                    <div className={`mt-0.5 font-display text-base ${meta.color}`}>
                      {t(`breeding.rarities.${r}.name`)}
                    </div>
                  </div>
                </div>
                <p className="mt-3 text-[11px] leading-relaxed text-steel-300">
                  {t(`breeding.rarities.${r}.body`)}
                </p>
              </li>
            );
          })}
        </ol>
        <div className="mt-4 rounded-xl border border-purple-400/30 bg-purple-500/5 p-3 text-sm text-steel-200">
          <span className="font-display text-purple-200">
            {t('breeding.formula')}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
        {BREEDING_FACTS.map((f) => (
          <div
            key={f}
            className="rounded-2xl border border-steel-700/60 bg-ink-900/60 p-5"
          >
            <div className="flex items-baseline gap-3">
              <span className="font-display text-2xl text-ember-300">
                {FACT_VALUES[f]}
              </span>
              <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-steel-400">
                {t(`breeding.facts.${f}.unit`)}
              </span>
            </div>
            <div className="mt-2 font-display text-sm text-white">
              {t(`breeding.facts.${f}.title`)}
            </div>
            <p className="mt-1 text-xs leading-relaxed text-steel-400">
              {t(`breeding.facts.${f}.body`)}
            </p>
          </div>
        ))}
      </div>

      <div className="space-y-4">
        <div>
          <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-frost-300/90">
            {t('breeding.medallionLabel')}
          </div>
          <div className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-2">
            {BREEDING_MEDALLIONS.map((m) => (
              <div
                key={m}
                className="flex items-center gap-3 rounded-2xl border border-steel-700/60 bg-ink-900/60 p-4"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-frost-400/40 bg-frost-500/10 text-frost-200">
                  <Icon name="anvil" size={18} />
                </span>
                <div>
                  <div className="font-display text-sm text-white">
                    {t(`breeding.medallions.${m}.name`)}
                  </div>
                  <p className="mt-0.5 text-xs text-steel-400">
                    {t(`breeding.medallions.${m}.body`)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ember-300/90">
            {t('breeding.shopLabel')}
          </div>
          <div className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-2">
            {BREEDING_SHOP_ITEMS.map((s) => {
              const value = s === 'resetStone' ? FEMALE_BREEDING_CHARGES : REDUCTION_STONE_HOURS;
              const unit = s === 'resetStone'
                ? (t('breeding.unit.charges') as string)
                : (t('breeding.unit.hours') as string);
              return (
                <div
                  key={s}
                  className={`rounded-2xl border p-5 ${SHOP_TONE[s]}`}
                >
                  <div className="flex items-baseline gap-2">
                    <span className="font-display text-2xl">
                      {s === 'resetStone' ? `${value}/${value}` : `−${value}h`}
                    </span>
                    <span className="text-[10px] font-semibold uppercase tracking-[0.18em] opacity-80">
                      {unit}
                    </span>
                  </div>
                  <div className="mt-2 font-display text-sm text-white">
                    {t(`breeding.shop.${s}.name`)}
                  </div>
                  <p className="mt-1 text-xs leading-relaxed text-steel-300">
                    {t(`breeding.shop.${s}.body`)}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
