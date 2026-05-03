import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

import { SectionHeading } from '@/components/ui/SectionHeading';
import { Icon } from '@/components/ui/Icon';

const TRIAD = [
  { id: 'character', icon: 'spark' as const, accent: 'border-ember-400/55 from-ember-500/20 text-ember-200' },
  { id: 'weapon',    icon: 'sword' as const, accent: 'border-rose-400/55 from-rose-500/20 text-rose-200' },
  { id: 'profession',icon: 'anvil' as const, accent: 'border-emerald-400/55 from-emerald-500/20 text-emerald-200' },
] as const;

export function MasteryTriad() {
  const { t } = useTranslation('leveling');

  return (
    <section className="space-y-6">
      <SectionHeading
        kicker={t('mastery.kicker') as string}
        title={t('mastery.title') as string}
        subtitle={t('mastery.subtitle') as string}
      />

      <ul className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {TRIAD.map((m, i) => (
          <motion.li
            key={m.id}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-30px' }}
            transition={{ duration: 0.4, delay: i * 0.06 }}
            className={`relative overflow-hidden rounded-2xl border bg-gradient-to-br to-transparent p-6 shadow-panel transition hover:-translate-y-0.5 hover:shadow-glow ${m.accent}`}
          >
            <div className={`grid h-12 w-12 place-items-center rounded-xl border border-steel-700/60 bg-ink-950/80`}>
              <Icon name={m.icon} size={20} />
            </div>
            <h3 className="mt-4 font-display text-lg text-white">
              {t(`mastery.${m.id}.name`)}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-steel-300/95">
              {t(`mastery.${m.id}.body`)}
            </p>
          </motion.li>
        ))}
      </ul>
    </section>
  );
}
