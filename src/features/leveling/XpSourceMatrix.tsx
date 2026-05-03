import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

import { SectionHeading } from '@/components/ui/SectionHeading';
import { Icon } from '@/components/ui/Icon';
import { XP_SOURCES } from '@/data/leveling';

export function XpSourceMatrix() {
  const { t } = useTranslation('leveling');

  return (
    <section className="space-y-6">
      <SectionHeading
        kicker={t('xpSources.kicker') as string}
        title={t('xpSources.title') as string}
        subtitle={t('xpSources.subtitle') as string}
      />

      <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {XP_SOURCES.map((src, i) => (
          <motion.li
            key={src.id}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-30px' }}
            transition={{ duration: 0.35, delay: (i % 4) * 0.05 }}
            className="relative overflow-hidden rounded-2xl border border-steel-700/60 bg-ink-900/70 p-5 shadow-panel transition hover:-translate-y-0.5 hover:border-frost-400/55 hover:shadow-glow"
          >
            <div className="flex items-start justify-between">
              <span className="grid h-11 w-11 place-items-center rounded-xl border border-steel-700/60 bg-ink-950/80 text-frost-200">
                <Icon name={src.icon} size={18} />
              </span>
              {src.multiplier && (
                <span className="rounded-full border border-ember-400/55 bg-ember-500/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.16em] text-ember-200">
                  {src.multiplier}
                </span>
              )}
            </div>
            <h3 className="mt-3 font-display text-base text-white">
              {t(`xpSources.list.${src.id}.name`)}
            </h3>
            <div className="mt-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-steel-400">
              Lvl {src.rangeFrom}–{src.rangeTo}
            </div>
            <p className="mt-3 text-sm leading-relaxed text-steel-300/95">
              {t(`xpSources.list.${src.id}.body`)}
            </p>
          </motion.li>
        ))}
      </ul>
    </section>
  );
}
