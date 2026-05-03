import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

import { SectionHeading } from '@/components/ui/SectionHeading';
import { Icon } from '@/components/ui/Icon';

const TIP_KEYS = ['1', '2', '3', '4', '5', '6'] as const;
const TIP_META: Record<string, { icon: 'sword' | 'spark' | 'cpu' | 'wagon' | 'book' | 'home'; accent: string }> = {
  '1': { icon: 'sword',  accent: 'border-frost-400/45 from-frost-500/15'   },
  '2': { icon: 'spark',  accent: 'border-ember-400/55 from-ember-500/15'   },
  '3': { icon: 'cpu',    accent: 'border-purple-400/55 from-purple-500/15' },
  '4': { icon: 'wagon',  accent: 'border-amber-400/55 from-amber-500/15'   },
  '5': { icon: 'book',   accent: 'border-emerald-400/55 from-emerald-500/15' },
  '6': { icon: 'home',   accent: 'border-rose-400/55 from-rose-500/15'     },
};

export function CraftingTips() {
  const { t } = useTranslation('crafting');

  return (
    <section className="space-y-6">
      <SectionHeading
        kicker={t('tips.heading') as string}
        title={t('tips.title') as string}
        subtitle={t('tips.subtitle', { defaultValue: '' }) as string}
      />

      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {TIP_KEYS.map((k, i) => {
          const meta = TIP_META[k];
          return (
            <motion.li
              key={k}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.4, delay: (i % 3) * 0.05 }}
              className={`group relative overflow-hidden rounded-2xl border bg-gradient-to-br to-transparent p-5 shadow-panel transition hover:-translate-y-0.5 hover:shadow-glow ${meta.accent}`}
            >
              <span
                aria-hidden
                className={`pointer-events-none absolute -top-12 -right-12 h-32 w-32 rounded-full bg-gradient-to-br opacity-50 blur-2xl transition-opacity duration-500 group-hover:opacity-90 ${meta.accent.split(' ').filter((c) => c.startsWith('from-')).join(' ')}`}
              />

              <div className="relative flex items-start gap-3">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-steel-700/60 bg-ink-950/80 text-white">
                  <Icon name={meta.icon} size={18} />
                </span>
                <div>
                  <h3 className="font-display text-base text-white">
                    {t(`tips.items.${k}.title`)}
                  </h3>
                </div>
              </div>
              <p className="relative mt-3 text-sm leading-relaxed text-steel-300/95">
                {t(`tips.items.${k}.body`)}
              </p>
            </motion.li>
          );
        })}
      </ul>
    </section>
  );
}
