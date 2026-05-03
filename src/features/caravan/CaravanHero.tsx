import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

import { Icon } from '@/components/ui/Icon';

const STATS = [
  { id: 'cities',   value: 12,    accent: 'text-ember-300' },
  { id: 'harbors',  value: 8,     accent: 'text-frost-300' },
  { id: 'pvpBonus', value: '+20%', accent: 'text-rose-300' },
] as const;

// Quinfall caravan official video — autoplayed, muted, looped via the playlist trick.
const YT_VIDEO_ID = 't2lp4z4EKJM';
const YT_EMBED_SRC =
  `https://www.youtube-nocookie.com/embed/${YT_VIDEO_ID}` +
  `?autoplay=1&mute=1&controls=0&loop=1&playlist=${YT_VIDEO_ID}` +
  `&playsinline=1&modestbranding=1&rel=0&iv_load_policy=3&disablekb=1&showinfo=0`;

const PAGE_BG = 'rgb(5,7,13)';

export function CaravanHero() {
  const { t } = useTranslation('caravan');

  return (
    <section className="relative">
      {/* Cinematic 16:9 video stage — borderless, fades into the page */}
      <div className="relative aspect-video w-full overflow-hidden">
        <iframe
          src={YT_EMBED_SRC}
          title="Quinfall Caravan System"
          allow="autoplay; encrypted-media; picture-in-picture"
          allowFullScreen={false}
          loading="lazy"
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 h-[112%] w-[112%] -translate-x-1/2 -translate-y-1/2 border-0 opacity-70"
        />

        {/* Soft darkening so the video sits as backdrop, not focus */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{ background: 'rgba(5,7,13,0.42)' }}
        />

        {/* Edge fades — left/right/top/bottom dissolve into page bg */}
        <div aria-hidden className="pointer-events-none absolute inset-y-0 left-0 w-[14%]"
             style={{ background: `linear-gradient(to right, ${PAGE_BG} 0%, transparent 100%)` }} />
        <div aria-hidden className="pointer-events-none absolute inset-y-0 right-0 w-[14%]"
             style={{ background: `linear-gradient(to left, ${PAGE_BG} 0%, transparent 100%)` }} />
        <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-[42%]"
             style={{ background: `linear-gradient(to top, ${PAGE_BG} 0%, rgba(5,7,13,0.6) 45%, transparent 100%)` }} />
        <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-[22%]"
             style={{ background: `linear-gradient(to bottom, ${PAGE_BG} 0%, transparent 100%)` }} />

        {/* Title block — bottom-centered, cinematic poster style */}
        <div className="absolute inset-x-0 bottom-0 mx-auto max-w-3xl px-6 pb-10 text-center sm:pb-14">
          <div className="inline-flex items-center gap-2 rounded-full border border-ember-400/55 bg-ember-500/15 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-ember-200 backdrop-blur">
            <Icon name="wagon" size={12} />
            {t('hero.badge')}
          </div>
          <h2 className="mt-3 font-display text-3xl text-white drop-shadow-[0_2px_18px_rgba(0,0,0,0.95)] sm:text-5xl">
            {t('hero.title')}
          </h2>
          <p className="mx-auto mt-3 hidden max-w-2xl text-base leading-relaxed text-steel-100/95 drop-shadow-[0_1px_10px_rgba(0,0,0,0.9)] sm:block sm:text-lg">
            {t('hero.body')}
          </p>
        </div>
      </div>

      {/* Mobile body */}
      <p className="mt-4 block text-center text-sm leading-relaxed text-steel-300 sm:hidden">
        {t('hero.body')}
      </p>

      {/* Stat strip — sits naturally below */}
      <ul className="mt-6 grid grid-cols-3 gap-3">
        {STATS.map((s, i) => (
          <motion.li
            key={s.id}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            className="rounded-2xl border border-steel-700/60 bg-ink-900/70 p-4 text-center backdrop-blur"
          >
            <div className={`font-display text-3xl ${s.accent}`}>{s.value}</div>
            <div className="mt-1 text-[11px] font-medium uppercase tracking-[0.18em] text-steel-400">
              {t(`hero.stats.${s.id}`)}
            </div>
          </motion.li>
        ))}
      </ul>
    </section>
  );
}
