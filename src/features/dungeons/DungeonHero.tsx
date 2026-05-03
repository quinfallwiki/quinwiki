import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

import { Icon } from '@/components/ui/Icon';
import {
  DUNGEON_POINTS_CAP,
  ENDGAME_LEVEL_CAP,
  PARTY_MAX_SIZE,
  INSTANCED_DUNGEONS,
  WORLD_BOSSES,
} from '@/data/dungeons';

const HERO_BG = '/assets/quinfall/gallery/dungeon.png';
const PAGE_BG = 'rgb(5,7,13)';

const STATS = [
  { id: 'dungeons',  value: INSTANCED_DUNGEONS.filter((d) => d.status === 'live').length, accent: 'text-purple-300' },
  { id: 'bosses',    value: WORLD_BOSSES.filter((b) => b.status === 'live').length,        accent: 'text-rose-300' },
  { id: 'party',     value: PARTY_MAX_SIZE,                                                accent: 'text-frost-300' },
  { id: 'cap',       value: ENDGAME_LEVEL_CAP,                                             accent: 'text-ember-300' },
  { id: 'points',    value: DUNGEON_POINTS_CAP,                                            accent: 'text-emerald-300' },
];

export function DungeonHero() {
  const { t } = useTranslation('dungeons');

  return (
    <section className="relative">
      {/* Cinematic 16:9 stage — borderless, fades to page bg */}
      <div className="relative aspect-video w-full overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${HERO_BG})` }}
        />

        {/* Soft darkening so backdrop reads as ambient */}
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
          <div className="inline-flex items-center gap-2 rounded-full border border-purple-400/55 bg-purple-500/15 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-purple-200 backdrop-blur">
            <Icon name="skull" size={12} />
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

      {/* Stat strip — 5 tiles below the cinematic stage */}
      <ul className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {STATS.map((s, i) => (
          <motion.li
            key={s.id}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-30px' }}
            transition={{ duration: 0.35, delay: i * 0.05 }}
            className="rounded-2xl border border-steel-700/60 bg-ink-900/70 p-4 text-center backdrop-blur"
          >
            <div className={`font-display text-2xl ${s.accent}`}>{s.value}</div>
            <div className="mt-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-steel-300">
              {t(`hero.stats.${s.id}`)}
            </div>
          </motion.li>
        ))}
      </ul>
    </section>
  );
}
