import { getIconPath } from '@/data/items';
import type { ClassDef } from '@/data/classes';

interface WeaponIconProps {
  cls: ClassDef;
  size?: number;
  className?: string;
  glow?: boolean;
}

export function WeaponIcon({ cls, size = 64, className = '', glow = false }: WeaponIconProps) {
  return (
    <span
      className={`relative inline-flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
    >
      {glow && (
        <span
          aria-hidden
          className="absolute inset-0 -z-10 rounded-full bg-frost-500/30 blur-xl"
        />
      )}
      <img
        src={getIconPath(cls.iconCode)}
        alt=""
        loading="lazy"
        decoding="async"
        draggable={false}
        className="h-full w-full object-contain drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)]"
        style={{ imageRendering: 'auto' }}
      />
    </span>
  );
}
