import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

import { AssetIcon } from '@/components/ui/AssetIcon';
import { Icon } from '@/components/ui/Icon';
import { findProfession } from '@/data/professions';

interface ChainGroup {
  id: 'metal' | 'wood' | 'fabric' | 'leather' | 'consumable';
  steps: string[];
  glow: string;
}

const CHAINS: ChainGroup[] = [
  {
    id: 'metal',
    steps: ['mining', 'smelting', 'blacksmithing', 'caravan-trading'],
    glow: 'rgba(160,180,210,0.18)',
  },
  {
    id: 'wood',
    steps: ['logging', 'woodcrafting', 'carpentry'],
    glow: 'rgba(247,185,85,0.16)',
  },
  {
    id: 'fabric',
    steps: ['harvesting', 'thread-weaving', 'tailoring'],
    glow: 'rgba(168,85,247,0.16)',
  },
  {
    id: 'leather',
    steps: ['hunting', 'leatherworking'],
    glow: 'rgba(232,147,36,0.18)',
  },
  {
    id: 'consumable',
    steps: ['harvesting', 'farming', 'cooking', 'alchemy'],
    glow: 'rgba(74,222,128,0.16)',
  },
];

export function ProductionChain() {
  const { t } = useTranslation('crafting');

  return (
    <section>
      <div className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-frost-300/90">
        {t('chain.heading')}
      </div>
      <h2 className="font-display text-2xl heading-gradient sm:text-3xl">{t('chain.title')}</h2>
      <p className="mt-2 max-w-2xl text-sm text-steel-300 sm:text-base">{t('chain.subtitle')}</p>

      <div className="mt-8 space-y-4">
        {CHAINS.map((chain, idx) => (
          <motion.div
            key={chain.id}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.45, delay: idx * 0.06 }}
            className="relative overflow-hidden rounded-2xl border border-steel-700/60 bg-panel-grad p-5 shadow-panel"
          >
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background: `radial-gradient(ellipse at 0% 50%, ${chain.glow} 0%, transparent 60%)`,
              }}
            />
            <div className="relative grid grid-cols-1 gap-5 lg:grid-cols-[18rem_1fr] lg:items-center">
              <div>
                <div className="font-display text-lg text-white">
                  {t(`chain.groups.${chain.id}.name`)}
                </div>
                <p className="mt-1 text-sm text-steel-300">
                  {t(`chain.groups.${chain.id}.description`)}
                </p>
              </div>

              <ol className="flex flex-wrap items-center gap-2 lg:flex-nowrap lg:overflow-x-auto">
                {chain.steps.map((stepId, i) => {
                  const prof = findProfession(stepId);
                  if (!prof) return null;
                  const isLast = i === chain.steps.length - 1;
                  return (
                    <li key={stepId} className="flex items-center gap-2">
                      <div className="flex flex-col items-center gap-1.5">
                        <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-steel-700/60 bg-ink-900/70 p-1.5 shadow-md">
                          <AssetIcon code={prof.iconCode} size={44} />
                        </div>
                        <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-steel-300">
                          {t(`professions.${prof.id}.name`)}
                        </span>
                      </div>
                      {!isLast && (
                        <Icon
                          name="arrow-right"
                          size={14}
                          className="shrink-0 text-frost-300/70"
                        />
                      )}
                    </li>
                  );
                })}
              </ol>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
