import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import type { ClassRole } from '@/data/classes';
import { WEAPON_COMBOS } from '@/data/weaponCombos';
import { ComboCard } from '@/features/classes/ComboCard';

type Filter = 'all' | ClassRole | 'hybrid';

const FILTERS: Filter[] = ['all', 'tank', 'melee', 'ranged', 'magic', 'healer', 'hybrid'];

export function CombosSection() {
  const { t } = useTranslation('classes');
  const [active, setActive] = useState<Filter>('all');

  const list = useMemo(() => {
    if (active === 'all') return WEAPON_COMBOS;
    return WEAPON_COMBOS.filter((c) => c.role === active);
  }, [active]);

  return (
    <section>
      <div className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-frost-300/90">
        {t('combos.heading')}
      </div>
      <h2 className="font-display text-2xl heading-gradient sm:text-3xl">{t('combos.title')}</h2>
      <p className="mt-2 max-w-2xl text-sm text-steel-300 sm:text-base">{t('combos.subtitle')}</p>

      <div className="mt-6 flex flex-wrap items-center gap-2">
        {FILTERS.map((f) => {
          const isActive = active === f;
          return (
            <button
              key={f}
              type="button"
              onClick={() => setActive(f)}
              className={`rounded-full border px-4 py-1.5 text-sm font-medium transition ${
                isActive
                  ? 'border-frost-400/80 bg-frost-500/15 text-white shadow-glow'
                  : 'border-steel-700 text-steel-200 hover:border-frost-400/60 hover:text-white'
              }`}
            >
              {f === 'hybrid' ? t('combos.roles.hybrid') : t(`filter.${f}`)}
            </button>
          );
        })}
      </div>

      <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {list.map((combo, i) => (
          <ComboCard key={combo.id} combo={combo} index={i} />
        ))}
      </div>
    </section>
  );
}
