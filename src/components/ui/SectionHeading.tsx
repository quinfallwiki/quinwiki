import type { ReactNode } from 'react';

interface SectionHeadingProps {
  kicker?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  align?: 'left' | 'center';
}

export function SectionHeading({
  kicker,
  title,
  subtitle,
  align = 'left',
}: SectionHeadingProps) {
  const alignment = align === 'center' ? 'text-center mx-auto' : 'text-left';
  return (
    <div className={`max-w-2xl ${alignment}`}>
      {kicker && (
        <div className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-frost-300/90">
          {kicker}
        </div>
      )}
      <h2 className="text-2xl font-semibold text-balance heading-gradient sm:text-3xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-sm text-steel-300 sm:text-base">{subtitle}</p>
      )}
    </div>
  );
}
