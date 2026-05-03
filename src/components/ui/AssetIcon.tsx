import { useState } from 'react';

interface AssetIconProps {
  code: string;
  size?: number;
  alt?: string;
  className?: string;
  glow?: boolean;
}

export function AssetIcon({ code, size = 48, alt = '', className = '', glow = false }: AssetIconProps) {
  const [failed, setFailed] = useState(false);
  const src = `/assets/icons/${code}.png`;

  if (failed) {
    return (
      <span
        className={`inline-flex items-center justify-center rounded-md bg-ink-900/70 text-steel-500 ${className}`}
        style={{ width: size, height: size }}
        aria-hidden
      >
        ?
      </span>
    );
  }

  return (
    <span
      className={`relative inline-flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
    >
      {glow && (
        <span aria-hidden className="absolute inset-0 -z-10 rounded-full bg-frost-500/25 blur-xl" />
      )}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        draggable={false}
        onError={() => setFailed(true)}
        className="h-full w-full object-contain drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)]"
      />
    </span>
  );
}
