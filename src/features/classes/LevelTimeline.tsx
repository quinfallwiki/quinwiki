import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

import type { ClassDef } from '@/data/classes';

interface LevelTimelineProps {
  cls: ClassDef;
}

export function LevelTimeline({ cls }: LevelTimelineProps) {
  const { t } = useTranslation('classes');
  return (
    <div className="relative">
      <div className="pointer-events-none absolute left-0 right-0 top-5 h-px bg-gradient-to-r from-transparent via-frost-400/40 to-transparent" />
      <ol className="relative grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {cls.milestoneLevels.map((level, i) => (
          <motion.li
            key={level}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.4, delay: i * 0.06 }}
            className="flex flex-col items-start gap-3"
          >
            <div className="relative">
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-frost-400/60 bg-ink-900 text-sm font-semibold text-frost-200 shadow-glow">
                {level}
              </div>
              {level === cls.maxLevel && (
                <span className="absolute -right-1 -top-1 h-3 w-3 animate-pulse-glow rounded-full bg-ember-400" />
              )}
            </div>
            <div>
              <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-frost-300/90">
                {t(`milestones.headings.${level}`)}
              </div>
              <p className="mt-1 text-sm leading-snug text-steel-200">
                {t(`weapons.${cls.weaponKey}.milestones.${level}`)}
              </p>
            </div>
          </motion.li>
        ))}
      </ol>
    </div>
  );
}
