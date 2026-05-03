import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

import { Icon } from '@/components/ui/Icon';
import { HUNTING_ZONES, TOTAL_HUNTING_ZONES } from '@/data/leveling';

const HERO_STATS = [
  { id: 'maxLevel',     value: '100', accent: 'text-ember-300',   icon: 'spark'  as const },
  { id: 'questCap',     value: '50',  accent: 'text-emerald-300', icon: 'flag'   as const },
  { id: 'huntingZones', value: String(TOTAL_HUNTING_ZONES), accent: 'text-frost-300', icon: 'globe' as const },
  { id: 'endgameZones', value: String(HUNTING_ZONES.find((b) => b.label === '100')?.zones.length ?? 0), accent: 'text-rose-300', icon: 'skull' as const },
];

// Quinfall official trailer — autoplayed, muted, looped via the playlist trick.
const YT_VIDEO_ID = 'GO-_5fOTHqQ';
const YT_EMBED_SRC =
  `https://www.youtube-nocookie.com/embed/${YT_VIDEO_ID}` +
  `?autoplay=1&mute=1&controls=0&loop=1&playlist=${YT_VIDEO_ID}` +
  `&playsinline=1&modestbranding=1&rel=0&iv_load_policy=3&disablekb=1&showinfo=0`;

/** Page background — sides/bottom fade to this so the video dissolves into it. */
const PAGE_BG = 'rgb(5,7,13)';

export function LevelingHero() {
  const { t } = useTranslation('leveling');

  return (
    <section className="relative">
      {/* Cinematic stage — no border, no rounded card. Video bleeds out. */}
      <div className="relative aspect-video w-full overflow-hidden">
        <iframe
          src={YT_EMBED_SRC}
          title="Quinfall Trailer"
          allow="autoplay; encrypted-media; picture-in-picture"
          allowFullScreen={false}
          loading="lazy"
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 h-[112%] w-[112%] -translate-x-1/2 -translate-y-1/2 border-0 opacity-70"
        />

        {/* Atmospheric darkening layer — video reads as backdrop, not the focus */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{ background: 'rgba(5,7,13,0.42)' }}
        />

        {/* Side fade — left edge dissolves into page bg */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 w-[14%]"
          style={{ background: `linear-gradient(to right, ${PAGE_BG} 0%, transparent 100%)` }}
        />
        {/* Side fade — right edge dissolves into page bg */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 w-[14%]"
          style={{ background: `linear-gradient(to left, ${PAGE_BG} 0%, transparent 100%)` }}
        />
        {/* Bottom fade — pulls the video into the section beneath */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[42%]"
          style={{ background: `linear-gradient(to top, ${PAGE_BG} 0%, rgba(5,7,13,0.6) 45%, transparent 100%)` }}
        />
        {/* Top fade — softens the entry into the video */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-[22%]"
          style={{ background: `linear-gradient(to bottom, ${PAGE_BG} 0%, transparent 100%)` }}
        />

        {/* Title — sits over the bright middle of the video */}
        <div className="absolute inset-x-0 bottom-0 mx-auto max-w-3xl px-6 pb-10 text-center sm:pb-14">
          <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-frost-300/95 drop-shadow-[0_1px_8px_rgba(0,0,0,0.85)]">
            {t('hero.kicker')}
          </div>
          <h2 className="mt-2 font-display text-3xl text-white drop-shadow-[0_2px_18px_rgba(0,0,0,0.95)] sm:text-5xl">
            {t('hero.title')}
          </h2>
          <p className="mx-auto mt-3 hidden max-w-2xl text-base leading-relaxed text-steel-100/95 drop-shadow-[0_1px_10px_rgba(0,0,0,0.9)] sm:block sm:text-lg">
            {t('hero.subtitle')}
          </p>
        </div>
      </div>

      {/* Mobile subtitle — desktop has it overlaid */}
      <p className="mt-4 block text-center text-sm leading-relaxed text-steel-300 sm:hidden">
        {t('hero.subtitle')}
      </p>

      {/* Stat strip — sits naturally below, no card chrome */}
      <ul className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {HERO_STATS.map((s, i) => (
          <motion.li
            key={s.id}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-30px' }}
            transition={{ duration: 0.35, delay: i * 0.05 }}
            className="rounded-2xl border border-steel-700/60 bg-ink-900/70 p-4 backdrop-blur"
          >
            <div className="flex items-center gap-2">
              <span className={`grid h-9 w-9 place-items-center rounded-xl border border-steel-700/60 bg-ink-800/80 ${s.accent}`}>
                <Icon name={s.icon} size={16} />
              </span>
              <div className={`font-display text-2xl ${s.accent}`}>{s.value}</div>
            </div>
            <div className="mt-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-steel-300">
              {t(`hero.stats.${s.id}`)}
            </div>
          </motion.li>
        ))}
      </ul>
    </section>
  );
}
