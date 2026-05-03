import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

import { SectionHeading } from '@/components/ui/SectionHeading';
import { Icon } from '@/components/ui/Icon';
import { PERFORMANCE_TIPS } from '@/data/system';

export function PerformanceTips() {
  const { t } = useTranslation('system');

  return (
    <section className="space-y-6">
      <SectionHeading
        kicker={t('tips.kicker') as string}
        title={t('tips.title') as string}
        subtitle={t('tips.subtitle') as string}
      />

      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {PERFORMANCE_TIPS.map((tip, i) => (
          <motion.li
            key={tip.id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-30px' }}
            transition={{ duration: 0.4, delay: (i % 3) * 0.06 }}
            className={`group relative overflow-hidden rounded-2xl border bg-gradient-to-br to-transparent p-5 shadow-panel transition hover:-translate-y-1 hover:shadow-glow ${tip.accent}`}
          >
            {/* Animated corner glow that wakes up on hover */}
            <span
              aria-hidden
              className={`pointer-events-none absolute -top-12 -right-12 h-32 w-32 rounded-full bg-gradient-to-br opacity-50 blur-2xl transition-opacity duration-500 group-hover:opacity-90 ${tip.accent.split(' ').filter((c) => c.startsWith('from-')).join(' ')}`}
            />

            <div className="relative flex items-center gap-3">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-steel-700/60 bg-ink-950/80 text-white">
                <Icon name={tip.icon} size={18} />
              </span>
              <h3 className="font-display text-base text-white sm:text-lg">
                {t(`tips.list.${tip.id}.name`)}
              </h3>
            </div>
            <p className="relative mt-3 text-sm leading-relaxed text-steel-200/95">
              {t(`tips.list.${tip.id}.body`)}
            </p>

            {/* Bottom progress sweep */}
            <span
              aria-hidden
              className="pointer-events-none absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-transparent via-frost-400/70 to-transparent transition-all duration-700 group-hover:w-full"
            />
          </motion.li>
        ))}
      </ul>
    </section>
  );
}
