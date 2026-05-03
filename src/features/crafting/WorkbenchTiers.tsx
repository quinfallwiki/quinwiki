import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

import { SectionHeading } from '@/components/ui/SectionHeading';
import { Icon } from '@/components/ui/Icon';

const TIERS = [
  { id: 1, accent: 'border-emerald-400/50 from-emerald-500/15 text-emerald-200', icon: 'anvil' as const },
  { id: 2, accent: 'border-frost-400/55 from-frost-500/15 text-frost-200',     icon: 'anvil' as const },
  { id: 3, accent: 'border-ember-400/60 from-ember-500/20 text-ember-200',     icon: 'anvil' as const },
];

export function WorkbenchTiers() {
  const { t } = useTranslation('crafting');

  return (
    <section className="space-y-6">
      <SectionHeading
        kicker={t('workbench.kicker') as string}
        title={t('workbench.title') as string}
        subtitle={t('workbench.subtitle') as string}
      />

      <ul className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {TIERS.map((tier, i) => (
          <motion.li
            key={tier.id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-30px' }}
            transition={{ duration: 0.45, delay: i * 0.08 }}
            className={`group relative overflow-hidden rounded-2xl border bg-gradient-to-br to-transparent p-6 shadow-panel transition hover:-translate-y-1 hover:shadow-glow ${tier.accent}`}
          >
            {/* Glow */}
            <span
              aria-hidden
              className={`pointer-events-none absolute -top-16 -right-16 h-40 w-40 rounded-full bg-gradient-to-br opacity-50 blur-3xl ${tier.accent.split(' ').filter((c) => c.startsWith('from-')).join(' ')}`}
            />

            <div className="flex items-center gap-3">
              <span className={`grid h-12 w-12 place-items-center rounded-xl border border-steel-700/60 bg-ink-950/85`}>
                <Icon name={tier.icon} size={20} />
              </span>
              <div>
                <div className="font-display text-2xl text-white">T{tier.id}</div>
                <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-frost-300/95">
                  {t(`workbench.tiers.t${tier.id}.label`)}
                </div>
              </div>
            </div>

            <h3 className="mt-4 font-display text-lg text-white">
              {t(`workbench.tiers.t${tier.id}.headline`)}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-steel-300/95">
              {t(`workbench.tiers.t${tier.id}.body`)}
            </p>

            <ul className="mt-4 space-y-1.5 text-[12px] text-steel-300/90">
              {(t(`workbench.tiers.t${tier.id}.bullets`, { returnObjects: true }) as string[] | undefined)?.map((b, j) => (
                <li key={j} className="flex items-start gap-2">
                  <span className="mt-1 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-frost-400/80" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </motion.li>
        ))}
      </ul>
    </section>
  );
}
