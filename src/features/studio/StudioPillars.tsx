import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

import { SectionHeading } from '@/components/ui/SectionHeading';
import { Icon } from '@/components/ui/Icon';
import { STUDIO_PILLARS } from '@/data/studio';

export function StudioPillars() {
  const { t } = useTranslation('studio');

  return (
    <section className="space-y-6">
      <SectionHeading
        kicker={t('pillars.kicker') as string}
        title={t('pillars.title') as string}
        subtitle={t('pillars.subtitle') as string}
      />

      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {STUDIO_PILLARS.map((p, i) => (
          <motion.li
            key={p.id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-30px' }}
            transition={{ duration: 0.45, delay: i * 0.08 }}
            className={`group relative overflow-hidden rounded-2xl border bg-gradient-to-br to-transparent p-5 shadow-panel transition hover:-translate-y-1 hover:shadow-glow ${p.accent}`}
          >
            <span
              aria-hidden
              className={`pointer-events-none absolute -top-12 -right-12 h-32 w-32 rounded-full bg-gradient-to-br opacity-50 blur-2xl transition-opacity duration-500 group-hover:opacity-90 ${p.accent.split(' ').filter((c) => c.startsWith('from-')).join(' ')}`}
            />
            <span className="relative grid h-12 w-12 place-items-center rounded-xl border border-steel-700/60 bg-ink-950/80 text-white">
              <Icon name={p.icon} size={20} />
            </span>
            <h3 className="relative mt-4 font-display text-lg text-white">
              {t(`pillars.list.${p.id}.name`)}
            </h3>
            <p className="relative mt-2 text-sm leading-relaxed text-steel-300/95">
              {t(`pillars.list.${p.id}.body`)}
            </p>
          </motion.li>
        ))}
      </ul>
    </section>
  );
}
