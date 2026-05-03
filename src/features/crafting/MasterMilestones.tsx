import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

import { SectionHeading } from '@/components/ui/SectionHeading';
import { PROF_MILESTONES } from '@/data/craftingTools';

export function MasterMilestones() {
  const { t } = useTranslation('crafting');
  const max = 70;

  return (
    <section className="space-y-6">
      <SectionHeading
        kicker={t('milestones.kicker') as string}
        title={t('milestones.title') as string}
        subtitle={t('milestones.subtitle') as string}
      />

      <div className="relative rounded-2xl border border-steel-700/60 bg-ink-900/60 p-6 shadow-panel">
        {/* Horizontal level axis */}
        <div className="relative h-2 overflow-hidden rounded-full bg-ink-950/70">
          <div className="absolute inset-y-0 left-0 right-0 bg-gradient-to-r from-emerald-500/35 via-frost-500/40 to-ember-500/45" />
          {[0, 10, 20, 30, 40, 50, 60, 70].map((tick) => (
            <div
              key={tick}
              className="absolute top-0 h-full w-px bg-steel-700/60"
              style={{ left: `${(tick / max) * 100}%` }}
            />
          ))}
        </div>
        <div className="mt-1 flex justify-between text-[9px] font-semibold uppercase tracking-[0.18em] text-steel-400">
          {[0, 10, 20, 30, 40, 50, 60, 70].map((n) => (
            <span key={n}>Lvl {n}</span>
          ))}
        </div>

        {/* Milestone pills */}
        <ul className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {PROF_MILESTONES.map((m, i) => (
            <motion.li
              key={`${m.level}-${m.groupId}`}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-20px' }}
              transition={{ duration: 0.35, delay: (i % 5) * 0.04 }}
              className="rounded-xl border border-steel-700/60 bg-ink-950/60 p-3"
            >
              <div className="flex items-baseline justify-between">
                <span className="font-display text-2xl text-white">Lvl {m.level}</span>
                <span className="text-[9px] font-semibold uppercase tracking-[0.18em] text-frost-300/95">
                  {t(`milestones.list.${m.groupId}.tag`)}
                </span>
              </div>
              <p className="mt-1.5 text-[12px] leading-snug text-steel-300/95">
                {t(`milestones.list.${m.groupId}.body`)}
              </p>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
