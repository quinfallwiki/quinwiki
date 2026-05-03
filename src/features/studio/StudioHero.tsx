import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

import { STUDIO_ASSETS } from '@/data/studio';

const HERO_STATS = [
  { id: 'founded', accent: 'text-frost-300' },
  { id: 'lineage', accent: 'text-ember-300' },
  { id: 'scope',   accent: 'text-emerald-300' },
  { id: 'country', accent: 'text-purple-300' },
] as const;

export function StudioHero() {
  const { t } = useTranslation('studio');

  return (
    <section className="relative overflow-hidden rounded-3xl border border-frost-400/40 bg-gradient-to-br from-ink-950 via-ink-900 to-ink-950 shadow-glow">
      {/* Animated radial glow that softly breathes */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -top-32 -right-32 h-96 w-96 rounded-full bg-gradient-to-br from-frost-500/30 via-purple-500/15 to-transparent blur-3xl"
        animate={{ scale: [1, 1.15, 1], opacity: [0.55, 0.85, 0.55] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-gradient-to-br from-ember-500/25 via-rose-500/10 to-transparent blur-3xl"
        animate={{ scale: [1.1, 1, 1.1], opacity: [0.45, 0.75, 0.45] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Subtle dot grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage:
            'radial-gradient(circle, rgba(126,196,255,0.6) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
          maskImage: 'linear-gradient(180deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)',
          WebkitMaskImage: 'linear-gradient(180deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)',
        }}
      />

      <div className="relative grid grid-cols-1 items-center gap-8 p-6 sm:p-10 lg:grid-cols-[1.5fr_1fr]">
        <div>
          <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-frost-300/95">
            {t('hero.kicker')}
          </div>
          <h2 className="mt-2 font-display text-3xl text-white drop-shadow-[0_2px_14px_rgba(0,0,0,0.6)] sm:text-4xl lg:text-5xl">
            {t('hero.title')}
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-steel-300 sm:text-lg">
            {t('hero.subtitle')}
          </p>

          <ul className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {HERO_STATS.map((s, i) => (
              <motion.li
                key={s.id}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="rounded-2xl border border-steel-700/60 bg-ink-950/70 p-3 text-center backdrop-blur"
              >
                <div className={`font-display text-base sm:text-lg ${s.accent}`}>
                  {t(`hero.values.${s.id}`)}
                </div>
                <div className="mt-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-steel-400">
                  {t(`hero.stats.${s.id}`)}
                </div>
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Logo block — slow gentle float */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative mx-auto flex w-full max-w-sm items-center justify-center"
        >
          <motion.div
            aria-hidden
            className="absolute inset-0 rounded-full bg-gradient-to-br from-frost-500/30 via-purple-500/20 to-transparent blur-3xl"
            animate={{ scale: [1, 1.08, 1] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.img
            src={STUDIO_ASSETS.vawraekLogo}
            alt="Vawraek Technology"
            className="relative h-auto w-3/4 object-contain drop-shadow-[0_8px_30px_rgba(126,196,255,0.45)]"
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>
      </div>
    </section>
  );
}
