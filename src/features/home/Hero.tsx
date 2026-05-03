import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { HERO_LIBRARY_BG } from '@/data/homeAssets';

export function Hero() {
  const { t } = useTranslation('home');
  const { t: tc } = useTranslation();
  const { lang } = useParams();
  const langPrefix = `/${lang ?? 'tr'}`;

  return (
    <section className="relative overflow-hidden">
      <BackgroundLayers />

      <Container size="xl" className="relative z-10 flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center py-16 text-center sm:py-24">
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
        >
          <div className="absolute inset-0 -z-10 blur-3xl">
            <div className="mx-auto h-40 w-72 bg-frost-500/30" />
          </div>
          <img
            src="/logo.webp"
            alt={tc('brand.title')}
            className="h-32 w-auto select-none drop-shadow-[0_0_32px_rgba(51,166,255,0.45)] sm:h-44"
            loading="eager"
            decoding="async"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
          className="mt-3 text-xs font-semibold uppercase tracking-[0.4em] text-frost-300/90 sm:text-sm"
        >
          {t('hero.kicker')}
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.45, ease: 'easeOut' }}
          className="mt-4 max-w-4xl font-display text-4xl font-semibold text-balance heading-gradient sm:text-6xl lg:text-7xl"
        >
          {t('hero.title')}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.6, ease: 'easeOut' }}
          className="mt-6 max-w-2xl text-base text-steel-200 sm:text-lg"
        >
          {t('hero.subtitle')}
        </motion.p>

        <FeatureTags />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.95, ease: 'easeOut' }}
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
        >
          <Button
            size="lg"
            onClick={() => {
              document.getElementById('sections')?.scrollIntoView({ behavior: 'smooth' });
            }}
            rightIcon={<Icon name="arrow-right" size={18} />}
          >
            {t('hero.ctaPrimary')}
          </Button>
          <a href={`${langPrefix}/rehber`} className="btn-ghost h-12 px-6 text-base">
            {t('hero.ctaSecondary')}
          </a>
        </motion.div>
      </Container>

      <ScrollIndicator />
    </section>
  );
}

function FeatureTags() {
  const { t } = useTranslation('home');
  const tags = (t('hero.tags', { returnObjects: true }) as string[]) ?? [];
  if (!Array.isArray(tags) || tags.length === 0) return null;

  return (
    <motion.ul
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, delay: 0.8, ease: 'easeOut' }}
      className="mt-7 flex max-w-3xl flex-wrap items-center justify-center gap-2"
    >
      {tags.map((tag) => (
        <li
          key={tag}
          className="rounded-full border border-frost-400/30 bg-ink-900/60 px-3 py-1.5 text-xs font-medium text-frost-100 backdrop-blur transition hover:border-frost-300/60 hover:bg-frost-500/10 sm:text-sm"
        >
          {tag}
        </li>
      ))}
    </motion.ul>
  );
}

function BackgroundLayers() {
  return (
    <>
      {/* Cinematic Steam library hero — full bleed */}
      <div
        aria-hidden
        className="absolute inset-0 -z-20"
        style={{
          backgroundImage: `url(${HERO_LIBRARY_BG})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      {/* Dark vignette so the wordmark/CTAs stay readable */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            'linear-gradient(180deg, rgba(5,7,13,0.65) 0%, rgba(5,7,13,0.55) 35%, rgba(10,14,26,0.75) 70%, rgba(10,14,26,0.95) 100%)',
        }}
      />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-rune-grain opacity-15 mix-blend-overlay" />
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[60vh] bg-[radial-gradient(ellipse_at_50%_0%,rgba(51,166,255,0.18),transparent_60%)]" />
      <Particles />
      <ConicGlow />
    </>
  );
}

function ConicGlow() {
  return (
    <motion.div
      aria-hidden
      className="pointer-events-none absolute left-1/2 top-1/3 -z-10 h-[60vmin] w-[60vmin] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-30"
      style={{
        background:
          'conic-gradient(from 0deg, rgba(51,166,255,0.0), rgba(51,166,255,0.5), rgba(51,166,255,0.0), rgba(247,185,85,0.3), rgba(51,166,255,0.0))',
        filter: 'blur(60px)',
      }}
      animate={{ rotate: 360 }}
      transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
    />
  );
}

function Particles() {
  const particles = Array.from({ length: 18 }, (_, i) => i);
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {particles.map((i) => {
        const left = (i * 53) % 100;
        const delay = (i * 0.4) % 6;
        const dur = 8 + ((i * 7) % 10);
        const size = 2 + (i % 3);
        return (
          <motion.span
            key={i}
            className="absolute rounded-full bg-frost-300/60"
            style={{ left: `${left}%`, bottom: '-10%', width: size, height: size }}
            animate={{ y: ['0vh', '-110vh'], opacity: [0, 0.8, 0] }}
            transition={{ duration: dur, delay, repeat: Infinity, ease: 'linear' }}
          />
        );
      })}
    </div>
  );
}

function ScrollIndicator() {
  return (
    <div className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 text-steel-400">
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
        className="flex h-10 w-6 items-start justify-center rounded-full border border-steel-600/80 p-1"
      >
        <span className="h-2 w-1 rounded-full bg-frost-300" />
      </motion.div>
    </div>
  );
}
