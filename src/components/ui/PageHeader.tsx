import type { ReactNode } from 'react';

import { Container } from '@/components/ui/Container';

interface PageHeaderProps {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  actions?: ReactNode;
}

export function PageHeader({ eyebrow, title, description, actions }: PageHeaderProps) {
  return (
    <header className="relative overflow-hidden border-b border-steel-700/40 bg-hero-radial">
      <div className="pointer-events-none absolute inset-0 bg-rune-grain opacity-30 mix-blend-overlay" />
      <Container className="relative py-7 sm:py-14">
        <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-3xl animate-fade-in">
            {eyebrow && (
              <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-frost-300/90 sm:text-xs">
                {eyebrow}
              </div>
            )}
            <h1 className="text-balance text-2xl font-semibold leading-tight heading-gradient sm:text-5xl">
              {title}
            </h1>
            {description && (
              <p className="mt-3 text-sm leading-relaxed text-steel-300 sm:mt-4 sm:text-lg">
                {description}
              </p>
            )}
          </div>
          {actions && <div className="flex shrink-0 gap-3">{actions}</div>}
        </div>
      </Container>
    </header>
  );
}
