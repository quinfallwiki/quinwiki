import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

import { SectionHeading } from '@/components/ui/SectionHeading';
import { TOOL_FAMILIES } from '@/data/craftingTools';

const TIER_TONE: Record<string, string> = {
  basic:    'border-steel-500/55 bg-steel-500/10 text-steel-200',
  sturdy:   'border-frost-400/55 bg-frost-500/10 text-frost-200',
  advanced: 'border-ember-400/60 bg-ember-500/15 text-ember-200',
};

export function GatheringTools() {
  const { t } = useTranslation('crafting');

  return (
    <section className="space-y-6">
      <SectionHeading
        kicker={t('tools.kicker') as string}
        title={t('tools.title') as string}
        subtitle={t('tools.subtitle') as string}
      />

      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {TOOL_FAMILIES.map((tool, i) => (
          <motion.li
            key={tool.id}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-30px' }}
            transition={{ duration: 0.4, delay: (i % 3) * 0.06 }}
            className={`group relative overflow-hidden rounded-2xl border bg-gradient-to-br to-transparent p-5 shadow-panel transition hover:-translate-y-0.5 hover:shadow-glow ${tool.accent}`}
          >
            <span
              aria-hidden
              className={`pointer-events-none absolute -top-12 -right-12 h-32 w-32 rounded-full bg-gradient-to-br opacity-50 blur-2xl transition-opacity duration-500 group-hover:opacity-90 ${tool.accent.split(' ').filter((c) => c.startsWith('from-')).join(' ')}`}
            />

            <div className="relative">
              <h3 className="font-display text-lg text-white">
                {t(`tools.families.${tool.id}.name`)}
              </h3>
              <p className="mt-0.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-frost-300/95">
                {t(`tools.families.${tool.id}.feeds`)}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-steel-300/95">
                {t(`tools.families.${tool.id}.body`)}
              </p>

              {/* 3 tier ladder */}
              <div className="mt-4 grid grid-cols-3 gap-2">
                {tool.tiers.map((tier) => (
                  <div
                    key={tier.id}
                    className={`rounded-lg border px-2.5 py-2 text-center ${TIER_TONE[tier.id]}`}
                  >
                    <div className="text-[9px] font-semibold uppercase tracking-[0.16em]">
                      {t(`tools.tiers.${tier.id}`)}
                    </div>
                    <div className="mt-0.5 font-display text-base">Lvl {tier.level}</div>
                    <div className="text-[10px] text-steel-400">grade {tier.grade}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.li>
        ))}
      </ul>
    </section>
  );
}
