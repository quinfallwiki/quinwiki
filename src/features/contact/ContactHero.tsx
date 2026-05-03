import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

import { Icon } from '@/components/ui/Icon';
import { EXTERNAL_LINKS } from '@/data/external';
import { BrandIcon } from '@/features/contact/BrandIcon';

export function ContactHero() {
  const { t } = useTranslation('contact');

  return (
    <section className="relative overflow-hidden rounded-3xl border border-[#5865F2]/35 bg-gradient-to-br from-ink-950 via-ink-900 to-ink-950 p-6 shadow-glow sm:p-10">
      {/* Animated discord-purple glow */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -top-32 -right-32 h-96 w-96 rounded-full bg-gradient-to-br from-[#5865F2]/35 via-purple-500/15 to-transparent blur-3xl"
        animate={{ scale: [1, 1.18, 1], opacity: [0.55, 0.85, 0.55] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-gradient-to-br from-frost-500/25 via-emerald-500/10 to-transparent blur-3xl"
        animate={{ scale: [1.1, 1, 1.1], opacity: [0.45, 0.75, 0.45] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Subtle dot grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage:
            'radial-gradient(circle, rgba(88,101,242,0.55) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
          maskImage: 'linear-gradient(180deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)',
          WebkitMaskImage: 'linear-gradient(180deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)',
        }}
      />

      <div className="relative grid grid-cols-1 items-center gap-8 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#9aa6ff]">
            {t('hero.kicker')}
          </div>
          <h2 className="mt-2 font-display text-3xl text-white drop-shadow-[0_2px_14px_rgba(0,0,0,0.6)] sm:text-4xl lg:text-5xl">
            {t('hero.title')}
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-steel-300 sm:text-lg">
            {t('hero.subtitle')}
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <a
              href={EXTERNAL_LINKS.discord}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-full border border-[#5865F2]/55 bg-[#5865F2] px-5 py-2.5 text-sm font-semibold text-white shadow-glow transition hover:-translate-y-0.5 hover:bg-[#6B77F4]"
            >
              <BrandIcon brand="discord" size={18} />
              {t('hero.primaryCta')}
              <Icon name="arrow-right" size={14} className="transition group-hover:translate-x-0.5" />
            </a>
            <a
              href="#channels"
              className="inline-flex items-center gap-2 rounded-full border border-steel-700/60 bg-ink-900/70 px-5 py-2.5 text-sm font-semibold text-steel-200 backdrop-blur transition hover:border-frost-400/50 hover:text-white"
            >
              {t('hero.secondaryCta')}
            </a>
          </div>
        </div>

        {/* Discord brand mark — slow gentle float + ambient glow */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative mx-auto flex h-44 w-44 items-center justify-center sm:h-56 sm:w-56"
        >
          <motion.div
            aria-hidden
            className="absolute inset-0 rounded-full bg-gradient-to-br from-[#5865F2]/45 via-purple-500/25 to-transparent blur-3xl"
            animate={{ scale: [1, 1.12, 1] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="relative grid h-full w-full place-items-center rounded-3xl border border-[#5865F2]/55 bg-ink-950/85 text-[#9aa6ff]"
            animate={{ y: [0, -6, 0], boxShadow: ['0 0 0px rgba(88,101,242,0)', '0 0 36px rgba(88,101,242,0.55)', '0 0 0px rgba(88,101,242,0)'] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          >
            <BrandIcon brand="discord" size={88} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
