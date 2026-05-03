import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

import { Container } from '@/components/ui/Container';
import { Icon } from '@/components/ui/Icon';

const FACTS = [
  { id: 'mapSize',    value: '2016', unit: 'km²', icon: 'globe' as const, accent: 'text-frost-300' },
  { id: 'maxLevel',   value: '100',  unit: 'lvl', icon: 'spark' as const, accent: 'text-ember-300' },
  { id: 'cities',     value: '12',   unit: '',    icon: 'flag'  as const, accent: 'text-emerald-300' },
  { id: 'harbors',    value: '8',    unit: '',    icon: 'ship'  as const, accent: 'text-cyan-300' },
  { id: 'worldBoss',  value: '8',    unit: '',    icon: 'skull' as const, accent: 'text-rose-300' },
  { id: 'weapons',    value: '10',   unit: '',    icon: 'sword' as const, accent: 'text-purple-300' },
  { id: 'professions',value: '13',   unit: '',    icon: 'anvil' as const, accent: 'text-amber-300' },
  { id: 'shipClasses',value: '12',   unit: '',    icon: 'wagon' as const, accent: 'text-frost-300' },
];

export function StatsBand() {
  const { t } = useTranslation('home');

  return (
    <section className="relative border-y border-steel-700/40 bg-gradient-to-b from-ink-950/80 via-ink-900/60 to-ink-950/80">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-rune-grain opacity-10 mix-blend-overlay"
      />
      <Container size="xl" className="relative py-10 sm:py-14">
        <div className="mb-8 text-center">
          <div className="text-[11px] font-semibold uppercase tracking-[0.28em] text-frost-300/80">
            {t('worldFacts.kicker', { defaultValue: 'OYUN DÜNYASI' })}
          </div>
          <h2 className="mt-2 font-display text-2xl text-white sm:text-3xl">
            {t('worldFacts.title', { defaultValue: 'Quinfall Bir Bakışta' })}
          </h2>
        </div>

        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
          {FACTS.map((f, i) => (
            <motion.li
              key={f.id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.35, delay: (i % 8) * 0.04 }}
              className="group relative flex flex-col items-center gap-2 rounded-2xl border border-steel-700/60 bg-ink-900/60 p-4 text-center transition hover:-translate-y-0.5 hover:border-frost-400/50 hover:shadow-glow"
            >
              <span className={`flex h-10 w-10 items-center justify-center rounded-xl border border-steel-700/60 bg-ink-800/70 ${f.accent}`}>
                <Icon name={f.icon} size={18} />
              </span>
              <div>
                <div className={`font-display text-2xl ${f.accent}`}>
                  {f.value}
                  {f.unit && (
                    <span className="ml-1 text-xs font-medium uppercase tracking-[0.18em] text-steel-400">
                      {f.unit}
                    </span>
                  )}
                </div>
                <div className="mt-0.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-steel-400">
                  {t(`worldFacts.facts.${f.id}`, { defaultValue: f.id })}
                </div>
              </div>
            </motion.li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
