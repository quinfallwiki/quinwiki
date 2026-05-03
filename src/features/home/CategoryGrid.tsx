import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Icon } from '@/components/ui/Icon';
import { PAGES } from '@/routes/pages';
import { PAGE_ACCENT, PAGE_BG, PAGE_TOPIC_ASSET } from '@/data/homeAssets';

export function CategoryGrid() {
  const { t } = useTranslation('home');
  const { t: tc } = useTranslation();
  const { lang } = useParams();
  const langPrefix = `/${lang ?? 'tr'}`;

  const cards = PAGES.filter((p) => p.key !== 'home');

  return (
    <section id="sections" className="relative py-16 sm:py-24">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-72 bg-gradient-to-b from-frost-500/[0.04] to-transparent"
      />

      <Container size="xl">
        <SectionHeading
          kicker={t('categories.title') as string}
          title={t('categories.title')}
          subtitle={t('categories.subtitle')}
        />

        <ul className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {cards.map((page, i) => {
            const bg = PAGE_BG[page.key];
            const topicAsset = PAGE_TOPIC_ASSET[page.key];
            const accent = PAGE_ACCENT[page.key] ?? 'border-steel-700/60 from-steel-700/20';
            const [borderClass, glowClass] = accent.split(' ');

            return (
              <motion.li
                key={page.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.45, delay: (i % 8) * 0.04, ease: 'easeOut' }}
              >
                <Link
                  to={`${langPrefix}/${page.slug}`}
                  className={`group relative flex h-full flex-col overflow-hidden rounded-2xl border bg-ink-900/70 shadow-panel transition duration-300 hover:-translate-y-1 hover:shadow-glow ${borderClass}`}
                >
                  {/* Image header */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-ink-950">
                    {bg && (
                      <div
                        aria-hidden
                        className="absolute inset-0 bg-cover bg-center transition duration-700 group-hover:scale-110 group-hover:saturate-125"
                        style={{ backgroundImage: `url(${bg})` }}
                      />
                    )}
                    <div
                      aria-hidden
                      className="absolute inset-0"
                      style={{
                        background:
                          'linear-gradient(180deg, rgba(5,7,13,0.15) 0%, rgba(5,7,13,0.55) 65%, rgba(10,14,26,0.95) 100%)',
                      }}
                    />
                    <div
                      aria-hidden
                      className={`absolute -top-10 -right-10 h-32 w-32 rounded-full bg-gradient-to-br opacity-60 blur-2xl ${glowClass ?? ''}`}
                    />

                    {/* Topic anchor — real game asset overlay (mount, ship, kraken …) */}
                    {topicAsset && (
                      <div
                        aria-hidden
                        className="pointer-events-none absolute inset-0 flex items-center justify-end pr-4 sm:pr-6"
                      >
                        <img
                          src={topicAsset}
                          alt=""
                          loading="lazy"
                          className="h-[80%] max-h-[180px] w-auto object-contain drop-shadow-[0_8px_18px_rgba(0,0,0,0.7)] transition duration-500 group-hover:scale-110"
                        />
                      </div>
                    )}

                    {/* Floating icon badge */}
                    <span
                      className={`absolute bottom-3 left-3 flex h-11 w-11 items-center justify-center rounded-xl border bg-ink-950/80 text-frost-200 backdrop-blur transition group-hover:text-white group-hover:shadow-glow ${borderClass}`}
                    >
                      <Icon
                        name={page.iconKey as Parameters<typeof Icon>[0]['name']}
                        size={20}
                      />
                    </span>
                    <span className="absolute bottom-3 right-3 inline-flex items-center gap-1 rounded-full border border-frost-400/30 bg-ink-950/70 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-frost-200 backdrop-blur transition group-hover:border-frost-300/60 group-hover:text-white">
                      {tc('actions.explore', { defaultValue: 'Keşfet' })}
                      <Icon name="arrow-right" size={12} className="transition group-hover:translate-x-0.5" />
                    </span>
                  </div>

                  {/* Body */}
                  <div className="flex flex-1 flex-col gap-2 p-5">
                    <h3 className="font-display text-lg leading-tight text-white transition group-hover:text-frost-100">
                      {tc(page.navKey)}
                    </h3>
                    <p className="text-sm leading-relaxed text-steel-300/90">
                      {tc(`pages.${page.key}.summary`, { defaultValue: '—' })}
                    </p>
                  </div>
                </Link>
              </motion.li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
