import type { ReactNode } from 'react';

import { SECTION_BGS, type SectionBgKey } from '@/data/guide';

interface SectionBackdropProps {
  bgKey: SectionBgKey;
  /** Inner accent gradient (top-right glow) — Tailwind class names. */
  accent?: string;
  className?: string;
  children: ReactNode;
}

/**
 * Heavy-cinematic section wrapper.
 * Uses a top "banner band" with the Steam screenshot in clear focus,
 * fading down through a vignette into the standard ink-900 panel area
 * where cards/text live.
 */
export function SectionBackdrop({
  bgKey,
  accent = 'bg-frost-500/15',
  className = '',
  children,
}: SectionBackdropProps) {
  return (
    <section
      className={`relative overflow-hidden rounded-3xl border border-steel-700/60 ${className}`}
    >
      {/* Image layer — full-bleed */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `url(${SECTION_BGS[bgKey]})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      {/* Bottom-anchored ink wash so cards remain readable */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, rgba(5,7,13,0.55) 0%, rgba(5,7,13,0.78) 35%, rgba(10,14,26,0.92) 65%, rgba(10,14,26,0.95) 100%)',
        }}
      />
      {/* Subtle accent glow in top-right */}
      <div
        aria-hidden
        className={`pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full blur-3xl ${accent}`}
      />

      <div className="relative space-y-6 p-6 sm:p-8">{children}</div>
    </section>
  );
}
