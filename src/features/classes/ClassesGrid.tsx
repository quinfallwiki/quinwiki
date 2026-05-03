import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { CLASSES, type ClassDef } from '@/data/classes';
import { ClassCard } from '@/features/classes/ClassCard';

type Filter = 'all' | ClassDef['role'];

const FILTERS: Filter[] = ['all', 'tank', 'melee', 'ranged', 'magic', 'healer'];

export function ClassesGrid() {
  const { t } = useTranslation('classes');
  const [active, setActive] = useState<Filter>('all');

  const filtered = useMemo(() => {
    if (active === 'all') return CLASSES;
    return CLASSES.filter((c) => c.role === active);
  }, [active]);

  return (
    <div>
      <div className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-frost-300/90">
        {t('grid.heading')}
      </div>
      <h2 className="font-display text-2xl heading-gradient sm:text-3xl">{t('grid.title')}</h2>
      <p className="mt-2 max-w-2xl text-sm text-steel-300 sm:text-base">{t('grid.subtitle')}</p>

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
              {t(`filter.${f}`)}
            </button>
          );
        })}
      </div>

      <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((cls, i) => (
          <ClassCard key={cls.id} cls={cls} index={i} />
        ))}
      </div>
    </div>
  );
}
