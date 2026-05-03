import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

import { AssetIcon } from '@/components/ui/AssetIcon';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { CARAVAN_PREMIUMS, CARAVAN_RENTAL_ANIMALS } from '@/data/caravan';

const TIER_TONE: Record<string, string> = {
  starter: 'border-emerald-400/40 text-emerald-200',
  mid:     'border-frost-400/40 text-frost-200',
  top:     'border-ember-400/40 text-ember-200',
};

export function AnimalRoster() {
  const { t } = useTranslation('caravan');

  return (
    <section className="space-y-8">
      <SectionHeading
        kicker={t('animals.kicker') as string}
        title={t('animals.title') as string}
        subtitle={t('animals.subtitle') as string}
      />

      <div>
        <div className="mb-3 flex items-baseline justify-between">
          <h3 className="font-display text-lg text-white">{t('animals.standard.title')}</h3>
          <span className="text-xs uppercase tracking-[0.18em] text-steel-400">
            {CARAVAN_RENTAL_ANIMALS.length} {t('animals.standard.unit')}
          </span>
        </div>
        <p className="mb-4 text-sm text-steel-300">{t('animals.standard.body')}</p>
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {CARAVAN_RENTAL_ANIMALS.map((a, i) => (
            <motion.li
              key={a.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: (i % 4) * 0.06 }}
              className={`group flex flex-col overflow-hidden rounded-2xl border bg-ink-900/70 transition hover:-translate-y-0.5 hover:shadow-glow ${TIER_TONE[a.tier]}`}
              style={{ borderTopColor: a.accent, borderTopWidth: 3 }}
            >
              <div
                className="relative flex aspect-square items-center justify-center overflow-hidden bg-ink-950"
                style={{ background: `radial-gradient(ellipse at center, ${a.accent}22 0%, transparent 70%)` }}
              >
                <AssetIcon
                  code={a.iconCode}
                  size={108}
                  glow
                  alt={t(`animals.list.${a.id}.name`) as string}
                  className="transition duration-500 group-hover:scale-110"
                />
                <span className={`absolute right-2 top-2 rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.16em] backdrop-blur ${TIER_TONE[a.tier]}`}>
                  {t(`animals.tiers.${a.tier}`)}
                </span>
              </div>
              <div className="p-4">
                <div className="font-display text-base text-white">
                  {t(`animals.list.${a.id}.name`)}
                </div>
                <div className="mt-0.5 text-[11px] uppercase tracking-[0.18em] text-steel-400">
                  {t(`animals.list.${a.id}.tag`)}
                </div>
                <p className="mt-3 text-sm leading-relaxed text-steel-300">
                  {t(`animals.list.${a.id}.body`)}
                </p>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>

      <div>
        <div className="mb-3 flex items-baseline justify-between">
          <h3 className="font-display text-lg text-white">{t('animals.premium.title')}</h3>
          <span className="text-xs uppercase tracking-[0.18em] text-steel-400">
            {CARAVAN_PREMIUMS.length} {t('animals.premium.unit')}
          </span>
        </div>
        <p className="mb-4 text-sm text-steel-300">{t('animals.premium.body')}</p>
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {CARAVAN_PREMIUMS.map((p) => (
            <li
              key={p.id}
              className="group flex flex-col items-center gap-3 rounded-2xl border border-steel-700/60 bg-ink-900/70 p-4 text-center transition hover:-translate-y-0.5 hover:shadow-glow"
              style={{ borderTopColor: p.accent, borderTopWidth: 3 }}
            >
              <div
                className="flex h-24 w-24 items-center justify-center rounded-2xl"
                style={{ background: `radial-gradient(circle, ${p.accent}28, transparent 70%)` }}
              >
                <AssetIcon
                  code={p.iconCode}
                  size={84}
                  alt={t(`animals.premiums.${p.id}.name`) as string}
                  className="transition duration-300 group-hover:scale-110"
                />
              </div>
              <div>
                <div className="font-display text-sm text-white">
                  {t(`animals.premiums.${p.id}.name`)}
                </div>
                <p className="mt-1 text-xs leading-relaxed text-steel-400">
                  {t(`animals.premiums.${p.id}.body`)}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
