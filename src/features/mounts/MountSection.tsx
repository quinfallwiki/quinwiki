import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

import { AssetIcon } from '@/components/ui/AssetIcon';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { MOUNTS, type MountEntry } from '@/data/mountsAndPets';
import { StatBar } from '@/features/mounts/StatBar';

const STAT_ACCENT: Record<keyof MountEntry['stats'], string> = {
  speed: 'bg-ember-400',
  capacity: 'bg-frost-400',
  combat: 'bg-rose-400',
  stamina: 'bg-emerald-400',
};

const SOURCE_BADGE: Record<MountEntry['source'], string> = {
  tameable: 'border-emerald-400/50 bg-emerald-500/10 text-emerald-200',
  caravanRental: 'border-frost-400/50 bg-frost-500/10 text-frost-200',
};

export function MountSection() {
  const { t } = useTranslation('mounts');

  return (
    <section className="space-y-6">
      <SectionHeading
        kicker={t('mounts.kicker') as string}
        title={t('mounts.title') as string}
        subtitle={t('mounts.subtitle') as string}
      />

      <ul className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {MOUNTS.map((m, i) => (
          <motion.li
            key={m.id}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.45, delay: (i % 2) * 0.06 }}
            className="group flex flex-col overflow-hidden rounded-2xl border border-steel-700/60 bg-ink-900/70 transition hover:-translate-y-0.5 hover:border-ember-400/50 hover:shadow-glow"
            style={{ borderTopColor: m.accent, borderTopWidth: 3 }}
          >
            <div
              className="relative flex items-center justify-center overflow-hidden bg-ink-950 py-6"
              style={{ background: `radial-gradient(ellipse at center, ${m.accent}1f 0%, transparent 70%)` }}
            >
              <AssetIcon
                code={m.iconCode}
                size={132}
                glow
                alt={t(`mounts.list.${m.id}.name`) as string}
                className="transition duration-500 group-hover:scale-110"
              />
              <span
                className={`absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] backdrop-blur ${SOURCE_BADGE[m.source]}`}
              >
                <span className="h-1 w-1 rounded-full bg-current" />
                {t(`mounts.source.${m.source}`)}
              </span>
            </div>

            <div className="flex flex-1 flex-col gap-4 p-5">
              <div>
                <h3 className="font-display text-lg text-white">
                  {t(`mounts.list.${m.id}.name`)}
                </h3>
                <div className="mt-0.5 text-xs uppercase tracking-[0.18em] text-steel-400">
                  {t(`mounts.list.${m.id}.tag`)}
                </div>
              </div>

              <p className="text-sm leading-relaxed text-steel-300">
                {t(`mounts.list.${m.id}.body`)}
              </p>

              <div className="grid grid-cols-2 gap-x-4 gap-y-2 border-t border-steel-700/60 pt-4">
                {(['speed', 'capacity', 'combat', 'stamina'] as const).map((s) => (
                  <StatBar
                    key={s}
                    label={t(`mounts.statLabels.${s}`) as string}
                    value={m.stats[s]}
                    accent={STAT_ACCENT[s]}
                  />
                ))}
              </div>

              <div className="rounded-xl border border-steel-700/60 bg-ink-800/40 p-3">
                <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-ember-300/90">
                  {t('mounts.tipLabel')}
                </div>
                <div className="mt-1 text-sm text-steel-200">
                  {t(`mounts.list.${m.id}.tip`)}
                </div>
              </div>
            </div>
          </motion.li>
        ))}
      </ul>
    </section>
  );
}
