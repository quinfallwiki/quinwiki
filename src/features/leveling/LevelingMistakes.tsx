import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

import { SectionHeading } from '@/components/ui/SectionHeading';
import { Icon } from '@/components/ui/Icon';
import { LEVELING_MISTAKES } from '@/data/leveling';

export function LevelingMistakes() {
  const { t } = useTranslation('leveling');

  return (
    <section className="space-y-6">
      <SectionHeading
        kicker={t('mistakes.kicker') as string}
        title={t('mistakes.title') as string}
        subtitle={t('mistakes.subtitle') as string}
      />

      <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {LEVELING_MISTAKES.map((m, i) => (
          <motion.li
            key={m.id}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-30px' }}
            transition={{ duration: 0.35, delay: (i % 3) * 0.05 }}
            className="relative flex gap-3 overflow-hidden rounded-2xl border border-rose-500/30 bg-ink-900/70 p-4 shadow-panel"
          >
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-rose-500/40 bg-rose-500/10 text-rose-200">
              <Icon name="skull" size={16} />
            </span>
            <div className="min-w-0 flex-1">
              <h3 className="font-display text-base text-white">
                {t(`mistakes.list.${m.id}.name`)}
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-steel-300/95">
                {t(`mistakes.list.${m.id}.body`)}
              </p>
            </div>
          </motion.li>
        ))}
      </ul>
    </section>
  );
}
