import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

import { SectionHeading } from '@/components/ui/SectionHeading';
import { Icon } from '@/components/ui/Icon';
import { STUDIO_SOCIAL } from '@/data/studio';

const ICON_MAP = {
  web:       'globe',
  linkedin:  'flag',
  instagram: 'image',
  twitter:   'discord',
} as const;

export function StudioSocial() {
  const { t } = useTranslation('studio');

  return (
    <section className="space-y-6">
      <SectionHeading
        kicker={t('social.kicker') as string}
        title={t('social.title') as string}
        subtitle={t('social.subtitle') as string}
      />

      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {STUDIO_SOCIAL.map((s, i) => (
          <motion.li
            key={s.id}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-30px' }}
            transition={{ duration: 0.35, delay: i * 0.05 }}
          >
            <a
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex h-full items-center gap-3 overflow-hidden rounded-2xl border border-steel-700/60 bg-ink-900/70 px-4 py-3 transition hover:-translate-y-0.5 hover:bg-ink-800/80 hover:shadow-glow"
              style={{ borderTopColor: s.color, borderTopWidth: 2 }}
            >
              <span
                aria-hidden
                className="pointer-events-none absolute -top-10 -right-10 h-24 w-24 rounded-full opacity-30 blur-2xl transition-opacity duration-500 group-hover:opacity-70"
                style={{ background: s.color }}
              />
              <span
                className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-steel-700/60 bg-ink-950/80 text-white"
                style={{ color: s.color }}
              >
                <Icon name={ICON_MAP[s.id]} size={18} />
              </span>
              <div className="min-w-0 flex-1">
                <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-steel-400">
                  {t(`social.labels.${s.id}`)}
                </div>
                <div className="truncate font-display text-sm text-white">
                  {s.url.replace(/^https?:\/\//, '')}
                </div>
              </div>
              <Icon name="arrow-right" size={14} className="text-steel-400 transition group-hover:translate-x-0.5 group-hover:text-frost-200" />
            </a>
          </motion.li>
        ))}
      </ul>
    </section>
  );
}
