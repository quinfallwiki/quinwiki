import { useTranslation } from 'react-i18next';

import { Icon } from '@/components/ui/Icon';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { CARAVAN_FACTS } from '@/data/mountsAndPets';

export function CaravanRental() {
  const { t } = useTranslation('mounts');

  return (
    <section className="space-y-6">
      <SectionHeading
        kicker={t('caravan.kicker') as string}
        title={t('caravan.title') as string}
        subtitle={t('caravan.subtitle') as string}
      />

      <div className="rounded-2xl border border-frost-400/30 bg-gradient-to-br from-frost-500/10 via-ink-900/60 to-transparent p-6">
        <div className="flex flex-col gap-5 md:flex-row md:items-start">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-frost-400/40 bg-frost-500/10 text-frost-200">
            <Icon name="wagon" size={22} />
          </span>
          <div className="flex-1">
            <h3 className="font-display text-lg text-white">
              {t('caravan.vendorTitle')}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-steel-300">
              {t('caravan.vendorBody')}
            </p>
          </div>
        </div>

        <ol className="mt-6 grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-5">
          {CARAVAN_FACTS.map((f, i) => (
            <li
              key={f}
              className="rounded-xl border border-steel-700/60 bg-ink-800/50 p-4"
            >
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-md border border-frost-400/40 bg-frost-500/10 font-display text-[10px] text-frost-200">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div className="mt-2 font-display text-sm text-white">
                {t(`caravan.facts.${f}.title`)}
              </div>
              <p className="mt-1 text-xs leading-relaxed text-steel-400">
                {t(`caravan.facts.${f}.body`)}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
