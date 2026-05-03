import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

import { AssetIcon } from '@/components/ui/AssetIcon';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { HORSE_GEAR, PREMIUM_CARAVANS, PREMIUM_HORSES } from '@/data/mountsAndPets';

export function PremiumGallery() {
  const { t } = useTranslation('mounts');

  return (
    <section className="space-y-8">
      <SectionHeading
        kicker={t('premium.kicker') as string}
        title={t('premium.title') as string}
        subtitle={t('premium.subtitle') as string}
      />

      <div>
        <div className="mb-3 flex items-baseline justify-between">
          <h3 className="font-display text-lg text-white">{t('premium.horses.title')}</h3>
          <span className="text-xs uppercase tracking-[0.18em] text-steel-400">
            {PREMIUM_HORSES.length} {t('premium.horses.unit')}
          </span>
        </div>
        <p className="mb-4 text-sm text-steel-300">{t('premium.horses.body')}</p>
        <ul className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 xl:grid-cols-10">
          {PREMIUM_HORSES.map((h, i) => (
            <motion.li
              key={h.id}
              initial={{ opacity: 0, y: 6 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-20px' }}
              transition={{ duration: 0.25, delay: (i % 10) * 0.02 }}
              className={`group flex aspect-square items-center justify-center overflow-hidden rounded-xl border bg-ink-900/70 transition hover:-translate-y-0.5 hover:shadow-glow ${h.tone}`}
              title={t(`premium.horses.list.${h.id}`, { defaultValue: h.id }) as string}
            >
              <AssetIcon
                code={h.iconCode}
                size={56}
                alt={t(`premium.horses.list.${h.id}`, { defaultValue: h.id }) as string}
                className="transition duration-300 group-hover:scale-110"
              />
            </motion.li>
          ))}
        </ul>
      </div>

      <div>
        <div className="mb-3 flex items-baseline justify-between">
          <h3 className="font-display text-lg text-white">{t('premium.caravans.title')}</h3>
          <span className="text-xs uppercase tracking-[0.18em] text-steel-400">
            {PREMIUM_CARAVANS.length} {t('premium.caravans.unit')}
          </span>
        </div>
        <p className="mb-4 text-sm text-steel-300">{t('premium.caravans.body')}</p>
        <ul className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {PREMIUM_CARAVANS.map((c) => (
            <li
              key={c.id}
              className={`flex items-center gap-4 rounded-xl border bg-ink-900/70 p-4 ${c.tone}`}
            >
              <AssetIcon
                code={c.iconCode}
                size={64}
                alt={t(`premium.caravans.list.${c.id}`, { defaultValue: c.id }) as string}
              />
              <div>
                <div className="font-display text-sm text-white">
                  {t(`premium.caravans.list.${c.id}`, { defaultValue: c.id })}
                </div>
                <p className="mt-1 text-xs text-steel-400">
                  {t(`premium.caravans.descriptions.${c.id}`, { defaultValue: '' })}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <div className="mb-3 flex items-baseline justify-between">
          <h3 className="font-display text-lg text-white">{t('premium.gear.title')}</h3>
          <span className="text-xs uppercase tracking-[0.18em] text-steel-400">
            {HORSE_GEAR.length} {t('premium.gear.unit')}
          </span>
        </div>
        <p className="mb-4 text-sm text-steel-300">{t('premium.gear.body')}</p>
        <ul className="grid grid-cols-3 gap-3 sm:grid-cols-6">
          {HORSE_GEAR.map((g) => (
            <li
              key={g.id}
              className="flex flex-col items-center gap-2 rounded-xl border border-steel-700/60 bg-ink-900/70 p-3 text-center"
            >
              <AssetIcon code={g.iconCode} size={48} alt={g.id} />
              <div className="font-display text-xs text-white">
                {t(`premium.gear.list.${g.id}`, { defaultValue: g.id })}
              </div>
              <span
                className={`rounded-full border px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-[0.14em] ${
                  g.quality === 'low'
                    ? 'border-steel-600/60 text-steel-400'
                    : g.quality === 'medium'
                      ? 'border-frost-400/40 text-frost-200'
                      : 'border-ember-400/40 text-ember-200'
                }`}
              >
                {t(`premium.gear.quality.${g.quality}`)}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
