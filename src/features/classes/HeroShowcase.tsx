import { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';

import { Container } from '@/components/ui/Container';
import { Icon } from '@/components/ui/Icon';
import { CLASSES, MAX_WEAPON_LEVEL } from '@/data/classes';
import { StatRadar } from '@/features/classes/StatRadar';
import { WeaponIcon } from '@/features/classes/WeaponIcon';

const ROLE_RADAR_COLOR: Record<string, string> = {
  tank: '#33a6ff',
  melee: '#f7b955',
  ranged: '#4ade80',
  magic: '#a855f7',
  healer: '#fb7185',
};

const ROLE_GLOW_RGB: Record<string, string> = {
  tank: '51,166,255',
  melee: '247,185,85',
  ranged: '74,222,128',
  magic: '168,85,247',
  healer: '244,114,182',
};

export function HeroShowcase() {
  const { t } = useTranslation('classes');
  const { lang } = useParams();
  const langPrefix = `/${lang ?? 'tr'}`;
  const [index, setIndex] = useState(0);
  const featured = useMemo(() => CLASSES[index], [index]);

  const glow = ROLE_GLOW_RGB[featured.role] ?? '51,166,255';

  return (
    <section className="relative overflow-hidden border-b border-steel-700/40">
      <div className="pointer-events-none absolute inset-0 bg-hero-radial" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 transition-opacity duration-700"
        style={{
          background: `radial-gradient(ellipse at 70% 50%, rgba(${glow},0.18) 0%, transparent 60%)`,
        }}
      />
      <div className="pointer-events-none absolute inset-0 bg-rune-grain opacity-25 mix-blend-overlay" />
      <Container size="xl" className="relative py-12 sm:py-20">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1.1fr_1fr_1fr]">
          <AnimatePresence mode="wait">
            <motion.div
              key={featured.id + '-art'}
              initial={{ opacity: 0, scale: 0.9, rotate: -4 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.92, rotate: 4 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="relative flex items-center justify-center"
            >
              <div
                className="absolute inset-0 -z-10 rounded-full blur-3xl"
                style={{ background: `radial-gradient(circle at 50% 50%, rgba(${glow},0.45) 0%, transparent 65%)` }}
              />
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              >
                <WeaponIcon cls={featured} size={300} />
              </motion.div>
            </motion.div>
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.div
              key={featured.id}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 16 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            >
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full border border-frost-400/30 bg-frost-500/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-frost-200">
                  {t('hero.featured')}
                </span>
                <span className="rounded-full border border-steel-700 bg-ink-900/60 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-steel-300">
                  {t(`filter.${featured.role}`)}
                </span>
                <span className="rounded-full border border-steel-700 bg-ink-900/60 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-steel-300">
                  1 — {MAX_WEAPON_LEVEL}
                </span>
              </div>
              <h2 className="mt-3 font-display text-3xl text-balance heading-gradient sm:text-5xl">
                {t(`weapons.${featured.weaponKey}.name`)}
              </h2>
              <p className="mt-2 text-base text-frost-300/90 sm:text-lg">
                {t(`weapons.${featured.weaponKey}.tagline`)}
              </p>
              <p className="mt-5 max-w-xl text-sm leading-relaxed text-steel-200 sm:text-base">
                {t(`weapons.${featured.weaponKey}.summary`)}
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Link
                  to={`${langPrefix}/siniflar/${featured.slug}`}
                  className="btn-primary h-11 px-5 text-sm"
                >
                  {t('hero.viewClass')}
                  <Icon name="arrow-right" size={14} />
                </Link>
                <button
                  type="button"
                  onClick={() => setIndex((i) => (i + 1) % CLASSES.length)}
                  className="btn-ghost h-11 px-5 text-sm"
                >
                  {t('hero.next')}
                </button>
              </div>
            </motion.div>
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.div
              key={featured.id + '-radar'}
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.45 }}
              className="flex justify-center"
            >
              <div className="panel relative overflow-hidden p-6">
                <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_50%,rgba(51,166,255,0.14),transparent_70%)]" />
                <StatRadar stats={featured.stats} size={300} color={ROLE_RADAR_COLOR[featured.role]} />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
          {CLASSES.map((c, i) => {
            const active = i === index;
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={t(`weapons.${c.weaponKey}.name`) as string}
                className={`group flex items-center gap-2 rounded-full border py-1 pl-1 pr-3 text-xs font-medium transition ${
                  active
                    ? 'border-frost-400/80 bg-frost-500/15 text-white shadow-glow'
                    : 'border-steel-700 text-steel-300 hover:border-frost-400/50 hover:text-white'
                }`}
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-ink-900/80">
                  <WeaponIcon cls={c} size={22} />
                </span>
                {t(`weapons.${c.weaponKey}.name`)}
              </button>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
