import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

import { Icon } from '@/components/ui/Icon';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { PHASE_BGS, PROGRESSION_PHASES } from '@/data/guide';

const TONE: Record<string, string> = {
  emerald: 'border-emerald-400/50 text-emerald-200',
  frost:   'border-frost-400/50 text-frost-200',
  ember:   'border-ember-400/50 text-ember-200',
  amber:   'border-amber-400/50 text-amber-200',
  rose:    'border-rose-400/50 text-rose-200',
};

const ICON: Record<string, 'book' | 'sword' | 'skull' | 'shield' | 'spark'> = {
  tutorial: 'book',
  build:    'sword',
  dungeon:  'skull',
  guild:    'shield',
  endgame:  'spark',
};

export function PhaseTimeline() {
  const { t } = useTranslation('guide');

  return (
    <section className="space-y-6">
      <SectionHeading
        kicker={t('phases.kicker') as string}
        title={t('phases.title') as string}
        subtitle={t('phases.subtitle') as string}
      />

      <ol className="space-y-4">
        {PROGRESSION_PHASES.map((p, i) => (
          <motion.li
            key={p.id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.45, delay: i * 0.05 }}
            className="relative overflow-hidden rounded-3xl border border-steel-700/60 bg-ink-900/60"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-15"
              style={{ backgroundImage: `url(${PHASE_BGS[p.id]})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
            />
            <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-r from-ink-950/95 via-ink-900/80 to-ink-900/30" />

            <div className="relative grid grid-cols-1 gap-4 p-6 sm:p-7 md:grid-cols-[auto_1fr_auto] md:items-start md:gap-6">
              <div className={`flex h-14 w-14 items-center justify-center rounded-2xl border bg-ink-900/70 ${TONE[p.tone]}`}>
                <Icon name={ICON[p.id]} size={26} />
              </div>

              <div>
                <div className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] backdrop-blur ${TONE[p.tone]}`}>
                  {t(`phases.list.${p.id}.tag`)} · {String(i + 1).padStart(2, '0')}
                </div>
                <h3 className="mt-3 font-display text-xl text-white sm:text-2xl">
                  {t(`phases.list.${p.id}.title`)}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-steel-300">
                  {t(`phases.list.${p.id}.body`)}
                </p>
                <ul className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {(t(`phases.list.${p.id}.bullets`, { returnObjects: true }) as string[])?.map((b, idx) => (
                    <li
                      key={idx}
                      className="flex gap-2 rounded-lg border border-steel-700/60 bg-ink-800/40 px-3 py-2 text-xs text-steel-200"
                    >
                      <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-frost-300" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <aside className="flex shrink-0 flex-col items-end gap-2 text-right">
                <div className="rounded-xl border border-steel-700/60 bg-ink-900/80 px-3 py-2">
                  <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-steel-400">
                    {t('phases.levelLabel')}
                  </div>
                  <div className={`font-display text-lg ${TONE[p.tone].split(' ')[1]}`}>
                    {p.levelFrom} → {p.levelTo}
                  </div>
                </div>
                <div className="rounded-xl border border-steel-700/60 bg-ink-900/80 px-3 py-2">
                  <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-steel-400">
                    {t('phases.hoursLabel')}
                  </div>
                  <div className="font-display text-lg text-white">
                    {p.hours}{p.id !== 'endgame' && 'h'}
                  </div>
                </div>
              </aside>
            </div>
          </motion.li>
        ))}
      </ol>
    </section>
  );
}
