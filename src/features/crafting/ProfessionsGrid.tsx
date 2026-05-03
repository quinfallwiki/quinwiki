import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { PROFESSIONS, type ProfessionFamily } from '@/data/professions';
import { ProfessionCard } from '@/features/crafting/ProfessionCard';

const FAMILIES: (ProfessionFamily | 'all')[] = [
  'all',
  'crafting',
  'gathering',
  'land',
  'caravan',
  'other',
];

export function ProfessionsGrid() {
  const { t } = useTranslation('crafting');
  const [filter, setFilter] = useState<ProfessionFamily | 'all'>('all');

  const items = useMemo(() => {
    if (filter === 'all') return PROFESSIONS;
    return PROFESSIONS.filter((p) => p.family === filter);
  }, [filter]);

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2">
        {FAMILIES.map((f) => {
          const active = filter === f;
          return (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              className={`rounded-full border px-4 py-1.5 text-sm font-medium transition ${
                active
                  ? 'border-frost-400/80 bg-frost-500/15 text-white shadow-glow'
                  : 'border-steel-700 text-steel-200 hover:border-frost-400/60 hover:text-white'
              }`}
            >
              {t(`families.${f}`)}
            </button>
          );
        })}
      </div>

      <ul className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
        {items.map((p, i) => (
          <li key={p.id}>
            <ProfessionCard prof={p} index={i} />
          </li>
        ))}
      </ul>
    </div>
  );
}
