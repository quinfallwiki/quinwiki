import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

import { Icon } from '@/components/ui/Icon';
import { SYSTEM_HIGHLIGHTS } from '@/data/system';

export function SystemHero() {
  const { t } = useTranslation('system');

  return (
    <section className="relative overflow-hidden rounded-3xl border border-frost-400/40 bg-gradient-to-br from-ink-950 via-ink-900 to-ink-950 p-6 shadow-glow sm:p-10">
      {/* Animated grid background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(126,196,255,0.45) 1px, transparent 1px), linear-gradient(90deg, rgba(126,196,255,0.45) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
          maskImage:
            'radial-gradient(ellipse 60% 70% at 80% 50%, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 80%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 60% 70% at 80% 50%, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 80%)',
        }}
      />

      {/* Animated pulse rings on the right — feels like a CPU heartbeat */}
      <div aria-hidden className="pointer-events-none absolute right-6 top-1/2 hidden h-80 w-80 -translate-y-1/2 sm:block">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="absolute inset-0 rounded-full border border-frost-400/40"
            initial={{ scale: 0.4, opacity: 0.6 }}
            animate={{ scale: [0.4, 1, 1], opacity: [0.6, 0, 0] }}
            transition={{
              duration: 3.2,
              repeat: Infinity,
              delay: i * 1.05,
              ease: 'easeOut',
            }}
          />
        ))}
        <motion.span
          className="absolute left-1/2 top-1/2 grid h-20 w-20 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-2xl border border-frost-400/60 bg-ink-950/85 text-frost-200 shadow-glow"
          animate={{ boxShadow: ['0 0 0px rgba(126,196,255,0.0)', '0 0 32px rgba(126,196,255,0.55)', '0 0 0px rgba(126,196,255,0.0)'] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Icon name="cpu" size={36} />
        </motion.span>
      </div>

      <div className="relative max-w-2xl">
        <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-frost-300/95">
          {t('hero.kicker')}
        </div>
        <h2 className="mt-2 font-display text-3xl text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)] sm:text-4xl">
          {t('hero.title')}
        </h2>
        <p className="mt-4 text-base leading-relaxed text-steel-300 sm:text-lg">
          {t('hero.subtitle')}
        </p>
      </div>

      <ul className="relative mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {SYSTEM_HIGHLIGHTS.map((h, i) => (
          <motion.li
            key={h.id}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-30px' }}
            transition={{ duration: 0.4, delay: i * 0.06 }}
            className="rounded-2xl border border-steel-700/60 bg-ink-950/70 p-4 backdrop-blur-md"
          >
            <div className={`font-display text-2xl ${h.accent}`}>{h.value}</div>
            <div className="mt-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-steel-300">
              {t(`highlights.${h.id}`)}
            </div>
          </motion.li>
        ))}
      </ul>
    </section>
  );
}
