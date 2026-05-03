import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import type { ClassStats } from '@/data/classes';

interface StatRadarProps {
  stats: ClassStats;
  size?: number;
  color?: string;
}

const AXES: (keyof ClassStats)[] = ['damage', 'defense', 'mobility', 'range', 'support', 'complexity'];

export function StatRadar({ stats, size = 260, color = '#33a6ff' }: StatRadarProps) {
  const { t } = useTranslation('classes');

  const center = size / 2;
  const radius = (size / 2) * 0.78;

  const points = useMemo(
    () =>
      AXES.map((axis, i) => {
        const value = stats[axis] / 100;
        const angle = (Math.PI * 2 * i) / AXES.length - Math.PI / 2;
        const x = center + Math.cos(angle) * radius * value;
        const y = center + Math.sin(angle) * radius * value;
        return { x, y, axis, value };
      }),
    [stats, center, radius],
  );

  const polygon = points.map((p) => `${p.x},${p.y}`).join(' ');

  const grid = [0.25, 0.5, 0.75, 1].map((scale) => {
    const pts = AXES.map((_, i) => {
      const angle = (Math.PI * 2 * i) / AXES.length - Math.PI / 2;
      const x = center + Math.cos(angle) * radius * scale;
      const y = center + Math.sin(angle) * radius * scale;
      return `${x},${y}`;
    }).join(' ');
    return { scale, pts };
  });

  const labels = AXES.map((axis, i) => {
    const angle = (Math.PI * 2 * i) / AXES.length - Math.PI / 2;
    const labelRadius = radius + 18;
    const x = center + Math.cos(angle) * labelRadius;
    const y = center + Math.sin(angle) * labelRadius;
    return { axis, x, y };
  });

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      role="img"
      aria-label={t('detail.statsAria') as string}
      className="block"
    >
      <defs>
        <radialGradient id="radar-fill" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={color} stopOpacity="0.55" />
          <stop offset="100%" stopColor={color} stopOpacity="0.1" />
        </radialGradient>
      </defs>

      {grid.map((g) => (
        <polygon
          key={g.scale}
          points={g.pts}
          fill="none"
          stroke="rgba(160,180,210,0.16)"
          strokeWidth={1}
        />
      ))}

      {AXES.map((_, i) => {
        const angle = (Math.PI * 2 * i) / AXES.length - Math.PI / 2;
        const x = center + Math.cos(angle) * radius;
        const y = center + Math.sin(angle) * radius;
        return (
          <line
            key={i}
            x1={center}
            y1={center}
            x2={x}
            y2={y}
            stroke="rgba(160,180,210,0.18)"
            strokeWidth={1}
          />
        );
      })}

      <polygon
        points={polygon}
        fill="url(#radar-fill)"
        stroke={color}
        strokeWidth={1.6}
        strokeLinejoin="round"
      />

      {points.map((p) => (
        <circle key={p.axis} cx={p.x} cy={p.y} r={3} fill={color} />
      ))}

      {labels.map((l) => {
        const isLeft = l.x < center - 8;
        const isRight = l.x > center + 8;
        const anchor = isLeft ? 'end' : isRight ? 'start' : 'middle';
        return (
          <text
            key={l.axis}
            x={l.x}
            y={l.y}
            fill="#a3acbf"
            fontSize="11"
            fontWeight="500"
            textAnchor={anchor}
            dominantBaseline="middle"
          >
            {t(`stats.${l.axis}`)}
          </text>
        );
      })}
    </svg>
  );
}
