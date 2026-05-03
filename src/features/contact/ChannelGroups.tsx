import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

import { Icon } from '@/components/ui/Icon';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { CONTACT_CHANNELS, CONTACT_GROUPS, type ContactChannel } from '@/data/contact';
import { BrandIcon } from '@/features/contact/BrandIcon';

const BRAND_FOR: Record<ContactChannel['id'], React.ComponentProps<typeof BrandIcon>['brand']> = {
  discord:      'discord',
  twitter:      'twitter',
  youtube:      'youtube',
  steam:        'steam',
  officialSite: 'globe',
  studioSite:   'globe',
  linkedin:     'linkedin',
  instagram:    'instagram',
};

export function ChannelGroups() {
  const { t } = useTranslation('contact');

  return (
    <section id="channels" className="space-y-12">
      {CONTACT_GROUPS.map((g, gi) => {
        const channels = g.channels
          .map((id) => CONTACT_CHANNELS.find((c) => c.id === id))
          .filter((c): c is ContactChannel => Boolean(c));
        return (
          <div key={g.id} className="space-y-5">
            <SectionHeading
              kicker={`0${gi + 1}`}
              title={t(`groups.${g.id}.title`) as string}
              subtitle={t(`groups.${g.id}.subtitle`) as string}
            />
            <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {channels.map((c, i) => (
                <motion.li
                  key={c.id}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-30px' }}
                  transition={{ duration: 0.4, delay: (i % 3) * 0.06 }}
                >
                  <a
                    href={c.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative block h-full overflow-hidden rounded-2xl border border-steel-700/60 bg-ink-900/70 p-5 shadow-panel transition hover:-translate-y-1 hover:bg-ink-800/80 hover:shadow-glow"
                    style={{ borderTopColor: c.color, borderTopWidth: 3 }}
                  >
                    {/* Brand glow that wakes up on hover */}
                    <span
                      aria-hidden
                      className="pointer-events-none absolute -top-12 -right-12 h-32 w-32 rounded-full opacity-30 blur-3xl transition-opacity duration-500 group-hover:opacity-90"
                      style={{ background: c.color }}
                    />

                    {/* Brand icon header */}
                    <div className="relative flex items-center gap-3">
                      <span
                        className="grid h-12 w-12 shrink-0 place-items-center rounded-xl border border-steel-700/60 bg-ink-950/80"
                        style={{ color: c.color }}
                      >
                        <BrandIcon brand={BRAND_FOR[c.id]} size={22} />
                      </span>
                      <div className="min-w-0 flex-1">
                        <h3 className="font-display text-lg text-white">
                          {t(`channels.${c.id}.name`)}
                        </h3>
                        <div className="truncate text-[11px] font-semibold uppercase tracking-[0.16em] text-steel-400">
                          {c.handle}
                        </div>
                      </div>
                      {c.primary && (
                        <span className="rounded-full border border-ember-400/55 bg-ember-500/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.18em] text-ember-200">
                          ★
                        </span>
                      )}
                    </div>

                    <p className="relative mt-4 text-sm leading-relaxed text-steel-300/95">
                      {t(`channels.${c.id}.description`)}
                    </p>

                    <div className="relative mt-5 inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-frost-300/95">
                      {t('actions.openLink')}
                      <Icon name="arrow-right" size={12} className="transition group-hover:translate-x-1" />
                    </div>

                    {/* Bottom shimmer that draws on hover */}
                    <span
                      aria-hidden
                      className="pointer-events-none absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-transparent via-frost-400/70 to-transparent transition-all duration-700 group-hover:w-full"
                    />
                  </a>
                </motion.li>
              ))}
            </ul>
          </div>
        );
      })}
    </section>
  );
}
