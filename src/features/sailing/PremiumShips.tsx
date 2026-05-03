import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

import { AssetIcon } from '@/components/ui/AssetIcon';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { SHIPS } from '@/data/sailing';

export function PremiumShips() {
  const { t } = useTranslation('sailing');
  const premiums = SHIPS.filter((s) => s.faction === 'premium');

  return (
    <section className="space-y-6">
      <SectionHeading
        kicker={t('premium.kicker') as string}
        title={t('premium.title') as string}
        subtitle={t('premium.subtitle') as string}
      />

      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {premiums.map((ship, i) => (
          <motion.li
            key={ship.id}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.4, delay: (i % 4) * 0.06 }}
            className="group flex flex-col overflow-hidden rounded-2xl border border-steel-700/60 bg-ink-900/70 transition hover:-translate-y-0.5 hover:shadow-glow"
            style={{ borderTopColor: ship.accent, borderTopWidth: 3 }}
          >
            <div
              className="relative flex aspect-square items-center justify-center overflow-hidden bg-ink-950"
              style={{ background: `radial-gradient(ellipse at center, ${ship.accent}28 0%, transparent 70%)` }}
            >
              <AssetIcon
                code={ship.iconCode}
                size={132}
                glow
                alt={t(`premium.list.${ship.id}.name`) as string}
                className="transition duration-500 group-hover:scale-110"
              />
              <span className="absolute right-2 top-2 rounded-full border border-purple-400/40 bg-purple-500/15 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.16em] text-purple-200 backdrop-blur">
                {t('premium.tag')}
              </span>
            </div>
            <div className="p-4">
              <div className="font-display text-base text-white">
                {t(`premium.list.${ship.id}.name`)}
              </div>
              <p className="mt-1 text-xs leading-relaxed text-steel-400">
                {t(`premium.list.${ship.id}.body`)}
              </p>
            </div>
          </motion.li>
        ))}
      </ul>

      <div className="rounded-2xl border border-steel-700/60 bg-ink-900/40 p-5 text-sm text-steel-300">
        <div className="font-display text-base text-white">{t('premium.note.title')}</div>
        <p className="mt-2 leading-relaxed">{t('premium.note.body')}</p>
      </div>
    </section>
  );
}
