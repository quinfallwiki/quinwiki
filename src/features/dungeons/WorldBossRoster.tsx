import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

import { SectionHeading } from '@/components/ui/SectionHeading';
import { BOSS_IMAGE_BASE, WORLD_BOSSES } from '@/data/dungeons';

export function WorldBossRoster() {
  const { t } = useTranslation('dungeons');

  return (
    <section className="space-y-6">
      <SectionHeading
        kicker={t('worldBossRoster.kicker') as string}
        title={t('worldBossRoster.title') as string}
        subtitle={t('worldBossRoster.subtitle') as string}
      />

      <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3">
        {WORLD_BOSSES.map((b, i) => {
          const locked = b.status === 'locked';
          return (
            <motion.li
              key={b.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: (i % 3) * 0.05 }}
              className={`group relative flex flex-col overflow-hidden rounded-2xl border bg-gradient-to-b from-ink-800/80 via-ink-900/90 to-ink-950/95 transition ${
                locked
                  ? 'border-steel-700/40'
                  : 'border-steel-700/60 hover:-translate-y-0.5 hover:border-ember-400/50 hover:shadow-glow'
              }`}
              style={
                locked
                  ? { borderTopWidth: 3, borderTopColor: '#3a3a4a' }
                  : { borderTopWidth: 3, borderTopColor: b.accent }
              }
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-ink-950">
                {b.imageFile && (
                  <img
                    src={`${BOSS_IMAGE_BASE}${b.imageFile}`}
                    alt={
                      locked
                        ? (t('worldBossRoster.lockedTitle') as string)
                        : (t(`worldBossRoster.list.${b.id}.name`) as string)
                    }
                    className={`h-full w-full object-cover transition duration-700 ${
                      locked
                        ? 'opacity-70 saturate-50'
                        : 'group-hover:scale-105 group-hover:saturate-125'
                    }`}
                    loading="lazy"
                  />
                )}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-ink-950 to-transparent"
                />
                {!locked && (
                  <span
                    className={`absolute right-2 top-2 rounded-full border px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.18em] backdrop-blur ${
                      b.spawnPerDay >= 3
                        ? 'border-frost-400/50 bg-frost-500/15 text-frost-100'
                        : 'border-ember-400/40 bg-ember-500/10 text-ember-100'
                    }`}
                  >
                    {t('worldBossRoster.spawnPerDay', { count: b.spawnPerDay })}
                  </span>
                )}
                {locked && (
                  <span className="absolute right-2 top-2 rounded-full border border-steel-700/60 bg-ink-900/80 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-steel-400 backdrop-blur">
                    {t('worldBossRoster.lockedTag')}
                  </span>
                )}
              </div>

              <div className="flex flex-col gap-2 p-4">
                <h4
                  className={`font-display text-lg leading-tight ${
                    locked ? 'text-steel-500' : 'text-white'
                  }`}
                >
                  {locked ? t('worldBossRoster.lockedTitle') : t(`worldBossRoster.list.${b.id}.name`)}
                </h4>
                <span className="text-[11px] uppercase tracking-[0.18em] text-steel-400">
                  {t(`worldBossRoster.kinds.${b.kind}`)}
                </span>
                <p className="text-sm leading-relaxed text-steel-300">
                  {locked
                    ? t('worldBossRoster.lockedBody')
                    : t(`worldBossRoster.list.${b.id}.body`)}
                </p>
              </div>
            </motion.li>
          );
        })}
      </ul>
    </section>
  );
}
