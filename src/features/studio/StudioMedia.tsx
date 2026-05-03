import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';

import { SectionHeading } from '@/components/ui/SectionHeading';
import { Icon } from '@/components/ui/Icon';
import { MEDIA_GALLERY } from '@/data/studio';

export function StudioMedia() {
  const { t } = useTranslation('studio');
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setActive(null); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [active]);

  return (
    <section className="space-y-6">
      <SectionHeading
        kicker={t('media.kicker') as string}
        title={t('media.title') as string}
        subtitle={t('media.subtitle') as string}
      />

      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {MEDIA_GALLERY.map((m, i) => (
          <motion.li
            key={m.id}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.4, delay: (i % 6) * 0.05 }}
          >
            <button
              type="button"
              onClick={() => setActive(m.file)}
              className="group relative block aspect-video w-full overflow-hidden rounded-2xl border border-steel-700/60 bg-ink-950 shadow-panel transition hover:-translate-y-0.5 hover:border-frost-400/60 hover:shadow-glow focus:outline-none focus:ring-2 focus:ring-frost-400/60"
            >
              <img
                src={m.file}
                alt=""
                loading="lazy"
                className="h-full w-full object-cover transition duration-700 group-hover:scale-105 group-hover:saturate-125"
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-ink-950/80 via-transparent to-transparent opacity-0 transition group-hover:opacity-100"
              />
              <span className="absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-full border border-frost-400/40 bg-ink-950/70 text-frost-200 opacity-0 backdrop-blur transition group-hover:opacity-100">
                <Icon name="search" size={14} />
              </span>
            </button>
          </motion.li>
        ))}
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
            <motion.img
              src={active}
              alt=""
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="max-h-[88vh] w-auto max-w-[92vw] rounded-2xl border border-steel-700/60 object-contain shadow-glow-strong"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
