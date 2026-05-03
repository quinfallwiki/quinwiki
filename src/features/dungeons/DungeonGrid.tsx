import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

import { SectionHeading } from '@/components/ui/SectionHeading';
import { INSTANCED_DUNGEONS, type DungeonEntry } from '@/data/dungeons';

const ACCENT: Record<DungeonEntry['themeAccent'], string> = {
  cave: 'border-t-emerald-500',
  stone: 'border-t-frost-400',
  tomb: 'border-t-ember-400',
  volcanic: 'border-t-rose-500',
  locked: 'border-t-steel-700',
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
          return (
            <motion.li
              key={d.id}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.4, delay: (i % 3) * 0.06 }}
              className={`panel border-t-[3px] ${ACCENT[d.themeAccent]} ${
                locked ? 'opacity-60' : 'panel-hover'
              } flex flex-col gap-3 p-5`}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-display text-lg text-white">
                    {locked ? t('instanced.lockedTitle') : t(`instanced.list.${d.id}.name`)}
                  </h3>
                  <div className="mt-0.5 text-[11px] uppercase tracking-[0.18em] text-steel-400">
                    {locked ? t('instanced.lockedTag') : t(`instanced.list.${d.id}.theme`)}
                  </div>
                </div>
                {!locked && (
                  <span className="rounded-full border border-ember-400/40 bg-ember-500/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-ember-200">
                    {d.drops.soloVeryHard} {t('instanced.itemBadge')}
                  </span>
                )}
              </div>
              <p className="text-sm leading-relaxed text-steel-300">
                {locked ? t('instanced.lockedBody') : t(`instanced.list.${d.id}.body`)}
              </p>
            </motion.li>
          );
        })}
      </ul>
    </section>
  );
}
