import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

import { SectionHeading } from '@/components/ui/SectionHeading';
import { HUNTING_ZONES } from '@/data/leveling';

const PARTY_TONE: Record<number, { ring: string; chip: string; bar: string; key: 'partySolo' | 'partySmall' | 'partyFull' }> = {
  1: { ring: 'border-emerald-400/40', chip: 'bg-emerald-500/15 text-emerald-200 border-emerald-400/40', bar: 'bg-emerald-400/60', key: 'partySolo'  },
  3: { ring: 'border-frost-400/45',   chip: 'bg-frost-500/15 text-frost-200 border-frost-400/45',     bar: 'bg-frost-400/65',   key: 'partySmall' },
  5: { ring: 'border-ember-400/50',   chip: 'bg-ember-500/15 text-ember-200 border-ember-400/50',     bar: 'bg-ember-400/70',   key: 'partyFull'  },
};

export function HuntingZones() {
  const { t } = useTranslation('leveling');

  return (
    <section className="space-y-6">
      <SectionHeading
        kicker={t('zones.kicker') as string}
        title={t('zones.title') as string}
        subtitle={t('zones.subtitle') as string}
      />

      <div className="space-y-4">
        {HUNTING_ZONES.map((bracket, i) => {
          const tone = PARTY_TONE[bracket.partySize] ?? PARTY_TONE[1];
          return (
            <motion.div
              key={bracket.id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.35, delay: Math.min(i, 8) * 0.04 }}
              className={`overflow-hidden rounded-2xl border bg-ink-900/65 shadow-panel ${tone.ring}`}
            >
              {/* Bracket header */}
              <div className="flex items-center gap-4 border-b border-steel-700/40 bg-ink-950/40 px-5 py-3">
                <div>
                  <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-steel-400">
                    {t('zones.level')}
                  </div>
                  <div className="font-display text-2xl text-white">{bracket.label}</div>
                </div>
                <div className={`h-1.5 flex-1 rounded-full ${tone.bar} opacity-70`} />
                <div className="flex items-center gap-2">
                  <span className={`rounded-full border px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.16em] ${tone.chip}`}>
                    {t(`zones.${tone.key}`)}
                  </span>
                  <span className="font-display text-xl text-white">
                    {bracket.zones.length}
                  </span>
                </div>
              </div>

              {/* Zone chips */}
              <ul className="flex flex-wrap gap-2 p-4">
                {bracket.zones.map((z) => (
                  <li
                    key={z.name}
                    className={`flex items-center gap-2 rounded-lg border bg-ink-950/60 px-3 py-1.5 text-sm transition hover:border-frost-400/55 ${
                      z.party
                        ? 'border-ember-500/40 text-white'
                        : 'border-steel-700/60 text-steel-200'
                    }`}
                  >
                    <span>{z.name}</span>
                    {z.party && (
                      <span className="rounded-md border border-ember-400/55 bg-ember-500/15 px-1.5 py-0 text-[9px] font-bold uppercase tracking-[0.14em] text-ember-200">
                        {t('zones.partyFlag')}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
