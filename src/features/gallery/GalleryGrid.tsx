import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';

import { Icon } from '@/components/ui/Icon';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { GALLERY_BASE, GALLERY_ITEMS, type GalleryItem } from '@/data/gallery';

const CARD_ASPECT = 'aspect-video';

const TYPE_TONE: Record<string, string> = {
  landscape:  'border-emerald-400/50 bg-emerald-500/15 text-emerald-200',
  town:       'border-amber-400/50 bg-amber-500/15 text-amber-200',
  underwater: 'border-cyan-400/50 bg-cyan-500/15 text-cyan-200',
  fishing:    'border-cyan-400/50 bg-cyan-500/15 text-cyan-200',
  mining:     'border-amber-400/50 bg-amber-500/15 text-amber-200',
  gathering:  'border-lime-400/50 bg-lime-500/15 text-lime-200',
  farm:       'border-lime-400/50 bg-lime-500/15 text-lime-200',
  building:   'border-steel-400/50 bg-steel-500/15 text-steel-200',
  dungeon:    'border-purple-400/50 bg-purple-500/15 text-purple-200',
  pvp:        'border-rose-400/50 bg-rose-500/15 text-rose-200',
  pve:        'border-frost-400/50 bg-frost-500/15 text-frost-200',
  mount:      'border-ember-400/50 bg-ember-500/15 text-ember-200',
  naval:      'border-frost-400/50 bg-frost-500/15 text-frost-200',
};

export function GalleryGrid() {
  const { t } = useTranslation('gallery');
  const [active, setActive] = useState<GalleryItem | null>(null);

  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActive(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [active]);

  return (
    <section className="space-y-6">
      <SectionHeading
        kicker={t('grid.kicker') as string}
        title={t('grid.title') as string}
        subtitle={t('grid.subtitle') as string}
      />

      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {GALLERY_ITEMS.map((item, i) => {
          return (
            <motion.li
              key={item.id}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.4, delay: (i % 3) * 0.06 }}
            >
              <button
                type="button"
                onClick={() => setActive(item)}
                className="group relative block h-full w-full overflow-hidden rounded-2xl border border-steel-700/60 bg-ink-950 shadow-panel transition hover:-translate-y-0.5 hover:border-frost-400/60 hover:shadow-glow focus:outline-none focus:ring-2 focus:ring-frost-400/60"
              >
                <div className={`relative ${CARD_ASPECT}`}>
                  <img
                    src={`${GALLERY_BASE}${item.file}`}
                    alt={t(`items.${item.id}.title`, { defaultValue: item.id }) as string}
                    loading="lazy"
                    className="h-full w-full object-contain transition duration-700 group-hover:scale-105 group-hover:saturate-125"
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0"
                    style={{
                      background:
                        'linear-gradient(180deg, rgba(5,7,13,0) 30%, rgba(5,7,13,0.45) 65%, rgba(5,7,13,0.92) 100%)',
                    }}
                  />
                  <span
                    className={`absolute left-3 top-3 rounded-full border px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.18em] backdrop-blur ${TYPE_TONE[item.type]}`}
                  >
                    {t(`types.${item.type}`)}
                  </span>
                  <span className="absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-full border border-frost-400/40 bg-ink-950/70 text-frost-200 opacity-0 backdrop-blur transition group-hover:opacity-100">
                    <Icon name="search" size={14} />
                  </span>
                  <div className="absolute inset-x-0 bottom-0 p-4">
                    <div className="font-display text-base text-white">
                      {t(`items.${item.id}.title`, { defaultValue: item.id })}
                    </div>
                    <p className="mt-1 line-clamp-2 text-xs text-steel-200/90">
                      {t(`items.${item.id}.body`, { defaultValue: '' })}
                    </p>
                  </div>
                </div>
              </button>
            </motion.li>
          );
        })}
      </ul>

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-ink-950/85 p-4 backdrop-blur-sm"
            onClick={() => setActive(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 6 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="relative max-h-[90vh] w-full max-w-6xl overflow-hidden rounded-2xl border border-steel-700/60 bg-ink-950 shadow-glow-strong"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setActive(null)}
                className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-steel-700/60 bg-ink-950/80 text-steel-200 backdrop-blur transition hover:border-frost-400/60 hover:text-white"
                aria-label={t('lightbox.close', { defaultValue: 'Kapat' }) as string}
              >
                <Icon name="close" size={18} />
              </button>
              <img
                src={`${GALLERY_BASE}${active.file}`}
                alt={t(`items.${active.id}.title`, { defaultValue: active.id }) as string}
                className="block max-h-[80vh] w-full object-contain"
              />
              <div className="border-t border-steel-700/60 bg-ink-900/80 p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.18em] ${TYPE_TONE[active.type]}`}
                    >
                      {t(`types.${active.type}`)}
                    </span>
                    <div className="mt-2 font-display text-lg text-white">
                      {t(`items.${active.id}.title`, { defaultValue: active.id })}
                    </div>
                  </div>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-steel-300">
                  {t(`items.${active.id}.body`, { defaultValue: '' })}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
