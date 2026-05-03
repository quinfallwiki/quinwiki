import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

import { Card } from '@/components/ui/Card';
import { Icon } from '@/components/ui/Icon';
import { MAX_WEAPON_LEVEL } from '@/data/classes';

const STEPS = [1, 2, 3] as const;

export function LevelingExplainer() {
  const { t } = useTranslation('classes');

  return (
    <section>
      <div className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-frost-300/90">
        {t('leveling.heading')}
      </div>
      <h2 className="font-display text-2xl heading-gradient sm:text-3xl">{t('leveling.title')}</h2>
      <p className="mt-2 max-w-3xl text-sm text-steel-300 sm:text-base">
        {t('leveling.subtitle', { max: MAX_WEAPON_LEVEL })}
      </p>

      <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
        {STEPS.map((step, i) => (
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.4, delay: i * 0.06 }}
          >
            <Card className="h-full">
              <div className="flex items-start gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-frost-400/40 bg-frost-500/10 text-frost-200">
                  <Icon name={step === 1 ? 'spark' : step === 2 ? 'sword' : 'cpu'} size={18} />
                </span>
                <div>
                  <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-frost-300/90">
                    {t(`leveling.steps.${step}.kicker`)}
                  </div>
                  <div className="mt-0.5 font-display text-base text-white">
                    {t(`leveling.steps.${step}.title`)}
                  </div>
                </div>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-steel-300">
                {t(`leveling.steps.${step}.body`)}
              </p>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
