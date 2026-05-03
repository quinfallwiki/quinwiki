import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

import { SectionHeading } from '@/components/ui/SectionHeading';
import { INSTANCED_DUNGEONS, type DungeonEntry } from '@/data/dungeons';

const THEME: Record<DungeonEntry['themeAccent'], { ring: string; glow: string; bg: string; chip: string; icon: string }> = {
  cave:     { ring: 'border-emerald-400/55', glow: 'from-emerald-500/25', bg: 'from-emerald-500/15', chip: 'bg-emerald-500/15 text-emerald-200 border-emerald-400/55', icon: '◐' },
  stone:    { ring: 'border-frost-400/55',   glow: 'from-frost-500/25',   bg: 'from-frost-500/15',   chip: 'bg-frost-500/15 text-frost-200 border-frost-400/55',     icon: '◇' },
  tomb:     { ring: 'border-ember-400/55',   glow: 'from-ember-500/25',   bg: 'from-ember-500/15',   chip: 'bg-ember-500/15 text-ember-200 border-ember-400/55',     icon: '☥' },
  volcanic: { ring: 'border-rose-400/55',    glow: 'from-rose-500/25',    bg: 'from-rose-500/15',    chip: 'bg-rose-500/15 text-rose-200 border-rose-400/55',         icon: '✶' },
  locked:   { ring: 'border-steel-700/60',   glow: 'from-steel-500/15',   bg: 'from-steel-500/10',   chip: 'bg-steel-500/15 text-steel-300 border-steel-500/55',     icon: '⊘' },
};

export function DungeonGrid() {
  const { t } = useTranslation('dungeons');

  return (
    <section className="space-y-6">
      <SectionHeading
        kicker={t('instanced.kicker') as string}
        title={t('instanced.title') as string}
        subtitle={t('instanced.subtitle') as string}
      />

      <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {INSTANCED_DUNGEONS.map((d, i) => {
          const locked = d.status === 'locked';
          const tone = THEME[d.themeAccent];
          const tiers = [
            { id: 'soloEasy',     value: d.drops.soloEasy,     label: t('difficulty.tiers.easy.name')     },
            { id: 'soloNormal',   value: d.drops.soloNormal,   label: t('difficulty.tiers.normal.name')   },
            { id: 'soloHard',     value: d.drops.soloHard,     label: t('difficulty.tiers.hard.name')     },
            { id: 'soloVeryHard', value: d.drops.soloVeryHard, label: t('difficulty.tiers.veryHard.name') },
            { id: 'party',        value: d.drops.party,        label: t('difficulty.tiers.party.name', { defaultValue: 'Party' }) },
          ];
          const maxDrop = Math.max(...tiers.map((t) => t.value), 1);

          return (
            <motion.li
              key={d.id}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.4, delay: (i % 3) * 0.06 }}
              className={`group relative overflow-hidden rounded-2xl border bg-gradient-to-br to-transparent shadow-panel transition ${tone.ring} ${tone.bg} ${
                locked ? 'opacity-75' : 'hover:-translate-y-0.5 hover:shadow-glow'
              }`}
            >
              {/* Animated corner glow */}
              <span
                aria-hidden
                className={`pointer-events-none absolute -top-16 -right-16 h-40 w-40 rounded-full bg-gradient-to-br opacity-50 blur-3xl transition-opacity duration-500 group-hover:opacity-90 ${tone.glow}`}
              />

              <div className="relative space-y-4 p-5 sm:p-6">
                {/* Header — symbol + name + status */}
                <div className="flex items-start gap-3">
                  <span className={`grid h-12 w-12 shrink-0 place-items-center rounded-xl border bg-ink-950/80 text-2xl ${tone.ring}`}>
                    {tone.icon}
                  </span>
                  <div className="min-w-0 flex-1">
                    <h3 className={`font-display text-lg leading-tight sm:text-xl ${locked ? 'text-steel-400' : 'text-white'}`}>
                      {locked ? t('instanced.lockedTitle') : t(`instanced.list.${d.id}.name`)}
                    </h3>
                    <p className="mt-0.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-frost-300/95">
                      {locked ? t('instanced.lockedTag') : t(`instanced.list.${d.id}.theme`)}
                    </p>
                  </div>
                  <span className={`rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.18em] backdrop-blur ${tone.chip}`}>
                    {locked ? t('instanced.lockedTag') : t('instanced.statusLive', { defaultValue: 'AKTİF' })}
                  </span>
                </div>

                {/* Body */}
                <p className={`text-sm leading-relaxed ${locked ? 'text-steel-400' : 'text-steel-300/95'}`}>
                  {locked ? t('instanced.lockedBody') : t(`instanced.list.${d.id}.body`)}
                </p>

                {!locked && (
                  <>
                    {/* Drop tier breakdown — tiny bar chart */}
                    <div className="mt-4 space-y-1.5 rounded-xl border border-steel-700/50 bg-ink-950/50 p-3">
                      <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-steel-400">
                        {t('instanced.dropPerRun', { defaultValue: 'KOŞU BAŞINA DROP' })}
                      </div>
                      {tiers.map((tier) => (
                        <div key={tier.id} className="grid grid-cols-[60px_1fr_28px] items-center gap-2 text-[11px]">
                          <span className="text-steel-300">{tier.label}</span>
                          <span className="h-1.5 overflow-hidden rounded-full bg-ink-950/80">
                            <span
                              className="block h-full rounded-full bg-gradient-to-r from-frost-400/60 to-ember-400/60"
                              style={{ width: `${(tier.value / maxDrop) * 100}%` }}
                            />
                          </span>
                          <span className="text-right font-display text-sm text-white">{tier.value}</span>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </motion.li>
          );
        })}
      </ul>
    </section>
  );
}
