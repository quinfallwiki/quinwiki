import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

import { SectionHeading } from '@/components/ui/SectionHeading';
import { LEVELING_PHASES } from '@/data/leveling';

export function PhaseTimeline() {
  const { t } = useTranslation('leveling');

  return (
    <section className="space-y-6">
      <SectionHeading
        kicker={t('phases.kicker') as string}
        title={t('phases.title') as string}
        subtitle={t('phases.subtitle') as string}
      />

      {/* Level bar */}
      <div className="relative h-3 overflow-hidden rounded-full border border-steel-700/60 bg-ink-900/60">
        {LEVELING_PHASES.map((p) => {
          const left = p.fromLevel;
          const width = p.toLevel - p.fromLevel;
          return (
            <div
              key={p.id}
              className={`absolute top-0 h-full bg-gradient-to-r to-transparent ${p.accent.split(' ')[0]}`}
              style={{ left: `${left}%`, width: `${width}%` }}
            />
          );
        })}
        {[0, 25, 50, 75, 100].map((tick) => (
          <div
            key={tick}
            className="absolute top-0 h-full w-px bg-steel-700/60"
            style={{ left: `${tick}%` }}
          />
        ))}
      </div>
      <div className="flex justify-between text-[10px] font-semibold uppercase tracking-[0.18em] text-steel-400">
        {[1, 25, 50, 75, 100].map((n) => (
          <span key={n}>Lvl {n}</span>
        ))}
      </div>

      {/* Phase cards */}
      <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-5">
        {LEVELING_PHASES.map((p, i) => (
          <motion.li
            key={p.id}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.4, delay: i * 0.06 }}
            className={`relative overflow-hidden rounded-2xl border bg-ink-900/70 p-5 shadow-panel transition hover:-translate-y-0.5 hover:shadow-glow ${p.accent.split(' ').slice(1).join(' ')}`}
          >
            <div
              aria-hidden
              className={`pointer-events-none absolute -top-12 -right-12 h-32 w-32 rounded-full bg-gradient-to-br opacity-50 blur-2xl ${p.accent.split(' ')[0]}`}
            />
            <div className="text-[10px] font-semibold uppercase tracking-[0.18em]">
              Lvl {p.fromLevel}–{p.toLevel}
            </div>
            <h3 className="mt-1 font-display text-lg text-white">
              {t(`phases.list.${p.id}.name`)}
            </h3>
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-frost-200/90">
              {t(`phases.list.${p.id}.headline`)}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-steel-300/95">
              {t(`phases.list.${p.id}.body`)}
            </p>
          </motion.li>
        ))}
      </ul>
    </section>
  );
}
