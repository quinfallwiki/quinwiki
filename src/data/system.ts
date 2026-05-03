/**
 * Quinfall system requirements — verified from the Steam store page
 * (https://store.steampowered.com/app/2294660). Last sync: 2026-05-03.
 */

export interface SpecRow {
  id: 'os' | 'cpu' | 'ram' | 'gpu' | 'dx' | 'storage' | 'network';
  /** Lucide-style icon name we already have in the Icon component */
  icon: 'cpu' | 'spark' | 'shield' | 'globe' | 'wagon' | 'anvil';
  /** Two-tier comparison */
  min: string;
  recommended: string;
}

export const SYSTEM_SPECS: SpecRow[] = [
  {
    id: 'os',
    icon: 'shield',
    min: 'Windows® 10 64-bit',
    recommended: 'Windows® 10 64-bit',
  },
  {
    id: 'cpu',
    icon: 'cpu',
    min: 'Intel® Core™ i3-4160 · AMD 4 çekirdek @ 3 GHz',
    recommended: 'Intel® Core™ i7-7700 · AMD Ryzen 5 5600X',
  },
  {
    id: 'ram',
    icon: 'spark',
    min: '8 GB',
    recommended: '8 GB',
  },
  {
    id: 'gpu',
    icon: 'spark',
    min: 'NVIDIA GeForce GT 760 2 GB · AMD Radeon R9 270X',
    recommended: 'NVIDIA GeForce GTX 1060 6 GB · AMD Radeon R9 390X',
  },
  {
    id: 'dx',
    icon: 'wagon',
    min: 'DirectX 11',
    recommended: 'DirectX 12',
  },
  {
    id: 'storage',
    icon: 'anvil',
    min: '55 GB',
    recommended: '55 GB · SSD önerilir',
  },
  {
    id: 'network',
    icon: 'globe',
    min: 'Geniş bant internet',
    recommended: 'Geniş bant internet',
  },
];

/** Hero highlight tiles */
export const SYSTEM_HIGHLIGHTS: { id: string; value: string; accent: string }[] = [
  { id: 'storage', value: '55 GB', accent: 'text-frost-300' },
  { id: 'dx',      value: 'DX 12',  accent: 'text-ember-300' },
  { id: 'os',      value: 'Win 10', accent: 'text-emerald-300' },
  { id: 'engine',  value: 'Unity',  accent: 'text-purple-300' },
];

/** Tuning tips — community-distilled, not from Steam */
export const PERFORMANCE_TIPS: { id: string; icon: SpecRow['icon']; accent: string }[] = [
  { id: 'ssd',         icon: 'anvil',  accent: 'border-frost-400/45 from-frost-500/15'   },
  { id: 'shadows',     icon: 'spark',  accent: 'border-ember-400/45 from-ember-500/15'   },
  { id: 'foliage',     icon: 'globe',  accent: 'border-emerald-400/45 from-emerald-500/15' },
  { id: 'resolution',  icon: 'cpu',    accent: 'border-rose-400/45 from-rose-500/15'     },
  { id: 'vram',        icon: 'spark',  accent: 'border-purple-400/45 from-purple-500/15' },
  { id: 'background',  icon: 'shield', accent: 'border-amber-400/45 from-amber-500/15'   },
];
