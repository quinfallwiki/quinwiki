import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

import { Icon } from '@/components/ui/Icon';
import { HERO_BG_URL } from '@/data/guide';

const STATS = [
  { id: 'maxLevel',   value: '100',    accent: 'text-ember-300' },
  { id: 'questCap',   value: '50',     accent: 'text-rose-300' },
  { id: 'mastery',    value: '90',     accent: 'text-frost-300' },
] as const;

export function GuideHero() {
  const { t } = useTranslation('guide');

  return (
    <section className="relative overflow-hidden rounded-3xl border border-ember-400/30 p-6 sm:p-10 shadow-glow">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `url(${HERO_BG_URL})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, rgba(5,7,13,0.45) 0%, rgba(5,7,13,0.7) 40%, rgba(10,14,26,0.92) 80%, rgba(10,14,26,0.95) 100%)',
        }}
      />
      <div aria-hidden className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-ember-500/25 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-frost-500/20 blur-3xl" />

      <div className="relative grid grid-cols-1 gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-center">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-ember-400/40 bg-ember-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-ember-200">
            <Icon name="book" size={14} />
            {t('hero.badge')}
          </div>
          <h2 className="mt-4 font-display text-3xl text-white sm:text-4xl">{t('hero.title')}</h2>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-steel-300 sm:text-base">
            {t('hero.body')}
          </p>
        </div>

        <ul className="grid grid-cols-3 gap-3">
          {STATS.map((s, i) => (
            <motion.li
              key={s.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="rounded-2xl border border-steel-700/60 bg-ink-800/70 p-4 text-center backdrop-blur"
            >
              <div className={`font-display text-3xl ${s.accent}`}>{s.value}</div>
              <div className="mt-1 text-[11px] font-medium uppercase tracking-[0.18em] text-steel-400">
                {t(`hero.stats.${s.id}`)}
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
