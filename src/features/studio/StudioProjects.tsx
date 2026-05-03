import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

import { SectionHeading } from '@/components/ui/SectionHeading';
import { Icon } from '@/components/ui/Icon';
import { STUDIO_PROJECTS } from '@/data/studio';

const STATUS_TONE: Record<string, string> = {
  live:          'border-emerald-400/55 bg-emerald-500/15 text-emerald-200',
  inDevelopment: 'border-frost-400/55 bg-frost-500/15 text-frost-200',
};

export function StudioProjects() {
  const { t } = useTranslation('studio');

  return (
    <section className="space-y-6">
      <SectionHeading
        kicker={t('projects.kicker') as string}
        title={t('projects.title') as string}
        subtitle={t('projects.subtitle') as string}
      />

      <ul className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        {STUDIO_PROJECTS.map((proj, i) => (
          <motion.li
            key={proj.id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className={`group relative overflow-hidden rounded-2xl border bg-ink-900/70 shadow-panel transition hover:-translate-y-1 hover:shadow-glow ${proj.accent}`}
          >
            {/* Cover image */}
            <div className="relative aspect-[16/8] overflow-hidden bg-ink-950">
              <img
                src={proj.cover}
                alt=""
                loading="lazy"
                className="h-full w-full object-cover transition duration-700 group-hover:scale-105 group-hover:saturate-125"
              />
              <div
                aria-hidden
                className="absolute inset-0"
                style={{
                  background:
                    'linear-gradient(180deg, rgba(5,7,13,0) 30%, rgba(5,7,13,0.55) 65%, rgba(5,7,13,0.95) 100%)',
                }}
              />
              <span className={`absolute left-4 top-4 rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.18em] backdrop-blur ${STATUS_TONE[proj.status] ?? STATUS_TONE.live}`}>
                {t(`projects.status.${proj.status}`)}
              </span>
            </div>

            {/* Body */}
            <div className="space-y-3 p-5 sm:p-6">
              <div>
                <h3 className="font-display text-2xl text-white">
                  {t(`projects.list.${proj.id}.name`)}
                </h3>
                <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-frost-300/95">
                  {t(`projects.list.${proj.id}.tagline`)}
                </p>
              </div>
              <p className="text-sm leading-relaxed text-steel-300">
                {t(`projects.list.${proj.id}.body`)}
              </p>

              {proj.link ? (
                <a
                  href={proj.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-frost-400/45 bg-frost-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-frost-100 transition hover:border-frost-300/70 hover:bg-frost-500/25 hover:text-white"
                >
                  {t(`projects.list.${proj.id}.cta`)}
                  <Icon name="arrow-right" size={12} />
                </a>
              ) : (
                <span className="inline-flex items-center gap-2 rounded-full border border-steel-700/60 bg-ink-950/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-steel-400">
                  {t(`projects.list.${proj.id}.cta`)}
                </span>
              )}
            </div>
          </motion.li>
        ))}
      </ul>
    </section>
  );
}
