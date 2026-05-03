import { useTranslation } from 'react-i18next';

import type { ClassStats } from '@/data/classes';

interface StatBarsProps {
  stats: ClassStats;
  compact?: boolean;
}

const ORDER: (keyof ClassStats)[] = ['damage', 'defense', 'mobility', 'range', 'support', 'complexity'];

export function StatBars({ stats, compact = false }: StatBarsProps) {
  const { t } = useTranslation('classes');
  return (
    <ul className={`grid ${compact ? 'grid-cols-2 gap-2' : 'grid-cols-1 gap-2.5'}`}>
      {ORDER.map((key) => {
        const value = stats[key];
        return (
          <li key={key} className="flex items-center gap-3">
            <span className="w-24 shrink-0 text-[10px] uppercase tracking-[0.16em] text-steel-400">
              {t(`stats.${key}`)}
            </span>
            <span className="relative flex-1 overflow-hidden rounded-full bg-ink-900/80">
              <span className="block h-1.5 rounded-full bg-gradient-to-r from-frost-500 via-frost-300 to-frost-200" style={{ width: `${value}%` }} />
            </span>
            <span className="w-8 shrink-0 text-right text-xs font-semibold text-white">{value}</span>
          </li>
        );
      })}
    </ul>
  );
}
