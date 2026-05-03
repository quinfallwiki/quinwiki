import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

import { Icon } from '@/components/ui/Icon';
import { AssetIcon } from '@/components/ui/AssetIcon';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { FLOW_CHAINS, GATHERING_ICONS } from '@/data/craftingTools';
import { CRAFTING_TIERS } from '@/data/craftingTiers';

const FAMILY_TONE: Record<string, string> = {
  gather:  'border-emerald-400/55 bg-emerald-500/10 text-emerald-200',
  process: 'border-frost-400/55 bg-frost-500/10 text-frost-200',
  craft:   'border-ember-400/60 bg-ember-500/15 text-ember-200',
};

export function ProductionFlow() {
  const { t } = useTranslation('crafting');

  const findIcon = (id: string) => {
    return CRAFTING_TIERS.find((p) => p.id === id)?.iconCode ?? GATHERING_ICONS[id];
  };

  return (
    <section className="space-y-6">
      <SectionHeading
        kicker={t('flow.kicker') as string}
        title={t('flow.title') as string}
        subtitle={t('flow.subtitle') as string}
      />

      <ul className="space-y-4">
        {FLOW_CHAINS.map((chain, i) => (
          <motion.li
            key={chain.id}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-30px' }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            className={`relative overflow-hidden rounded-2xl border bg-gradient-to-r to-transparent p-5 shadow-panel ${chain.accent}`}
          >
            <div
              aria-hidden
              className="pointer-events-none absolute inset-y-0 -left-20 w-72 opacity-50 blur-3xl"
              style={{
                background: `radial-gradient(ellipse at 30% 50%, ${
                  chain.accent.includes('frost')   ? 'rgba(126,196,255,0.25)'
                : chain.accent.includes('emerald') ? 'rgba(74,222,128,0.22)'
                : chain.accent.includes('rose')    ? 'rgba(244,114,128,0.22)'
                : chain.accent.includes('purple')  ? 'rgba(168,85,247,0.22)'
                : chain.accent.includes('amber')   ? 'rgba(247,185,85,0.22)'
                : 'transparent'}, transparent 70%)`,
              }}
            />

            <div className="relative grid grid-cols-1 items-center gap-5 lg:grid-cols-[16rem_1fr]">
              <div>
                <div className="font-display text-lg text-white">
                  {t(`flow.chains.${chain.id}.name`)}
                </div>
                <p className="mt-1 text-sm text-steel-300/95">
                  {t(`flow.chains.${chain.id}.body`)}
                </p>
              </div>

              {/* Step pipeline */}
              <ol className="flex flex-wrap items-stretch gap-2 lg:flex-nowrap">
                {chain.steps.map((step, idx) => {
                  const isLast = idx === chain.steps.length - 1;
                  const tone = FAMILY_TONE[step.family];
                  const icon = findIcon(step.id);
                  return (
                    <li key={`${step.id}-${idx}`} className="flex flex-1 items-center gap-2 min-w-0">
                      <div className={`flex flex-1 items-center gap-3 rounded-xl border px-3 py-2.5 ${tone}`}>
                        <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-steel-700/60 bg-ink-950/80 p-1.5">
                          {icon ? <AssetIcon code={icon} size={24} /> : null}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="text-[9px] font-semibold uppercase tracking-[0.18em] opacity-90">
                            {t(`flow.family.${step.family}`)}
                          </div>
                          <div className="truncate text-sm font-medium text-white">
                            {t(`professionsList.${step.id}.name`)}
                          </div>
                        </div>
                      </div>
                      {!isLast && (
                        <Icon name="arrow-right" size={14} className="shrink-0 text-frost-300/70" />
                      )}
                    </li>
                  );
                })}
              </ol>
            </div>
          </motion.li>
        ))}
      </ul>
    </section>
  );
}
