import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

import { SectionHeading } from '@/components/ui/SectionHeading';
import { Icon } from '@/components/ui/Icon';

const STATS = [
  { id: 'teamSize', value: '3v3',  accent: 'text-rose-300'    },
  { id: 'mode',     value: 'PvP',  accent: 'text-ember-300'   },
  { id: 'queue',    value: '24/7', accent: 'text-frost-300'   },
  { id: 'season',   value: 'v1.0.0.27', accent: 'text-purple-300' },
];

const FEATURES = ['team', 'matchmaking', 'rewards', 'season'] as const;

/**
 * Trio Arena 3v3 — added in Major Update v1.0.0.27 (May 2026).
 * Source: Steam patch notes "Major Update 3v3 Arena (v1.0.0.27)".
 */
export function ArenaPanel() {
  const { t } = useTranslation('dungeons');

  return (
    <section className="relative space-y-6">
      <SectionHeading
        kicker={t('arena.kicker') as string}
        title={t('arena.title') as string}
        subtitle={t('arena.subtitle') as string}
      />

      <div className="relative overflow-hidden rounded-3xl border border-rose-400/40 bg-gradient-to-br from-rose-500/10 via-ink-900/70 to-ember-500/10 p-6 shadow-glow sm:p-10">
        {/* Animated breathers */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute -top-32 -right-32 h-96 w-96 rounded-full bg-gradient-to-br from-rose-500/30 via-ember-500/15 to-transparent blur-3xl"
          animate={{ scale: [1, 1.18, 1], opacity: [0.45, 0.7, 0.45] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          aria-hidden
          className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-gradient-to-br from-frost-500/20 to-transparent blur-3xl"
          animate={{ scale: [1.1, 1, 1.1], opacity: [0.4, 0.65, 0.4] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />

        <div className="relative grid grid-cols-1 gap-8 lg:grid-cols-[1.5fr_1fr] lg:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-rose-400/55 bg-rose-500/15 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-rose-200">
              <Icon name="spark" size={12} />
              {t('arena.badge')}
            </div>
            <h3 className="mt-3 font-display text-2xl text-white drop-shadow-[0_2px_14px_rgba(0,0,0,0.6)] sm:text-3xl lg:text-4xl">
              {t('arena.headline')}
            </h3>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-steel-300 sm:text-base">
              {t('arena.body')}
            </p>

            <ul className="mt-5 space-y-2">
              {FEATURES.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-steel-200">
                  <span className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-rose-400/80" />
                  <span>{t(`arena.features.${f}`)}</span>
                </li>
              ))}
            </ul>
          </div>

          <ul className="grid grid-cols-2 gap-3">
            {STATS.map((s, i) => (
              <motion.li
                key={s.id}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.35, delay: i * 0.05 }}
                className="rounded-2xl border border-steel-700/60 bg-ink-950/70 p-4 text-center backdrop-blur"
              >
                <div className={`font-display text-xl ${s.accent}`}>{s.value}</div>
                <div className="mt-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-steel-300">
                  {t(`arena.stats.${s.id}`)}
                </div>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
