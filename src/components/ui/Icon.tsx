import type { SVGProps } from 'react';

type IconName =
  | 'home'
  | 'book'
  | 'shield'
  | 'anvil'
  | 'skull'
  | 'sword'
  | 'calc'
  | 'horse'
  | 'ship'
  | 'wagon'
  | 'spark'
  | 'image'
  | 'cpu'
  | 'flag'
  | 'mail'
  | 'menu'
  | 'close'
  | 'search'
  | 'globe'
  | 'arrow-right'
  | 'discord';

interface IconProps extends SVGProps<SVGSVGElement> {
  name: IconName;
  size?: number;
}

const PATHS: Record<IconName, string> = {
  home: 'M3 11.5 12 4l9 7.5V20a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1z',
  book: 'M4 4.5A2.5 2.5 0 0 1 6.5 2H20v15H6.5A2.5 2.5 0 0 0 4 19.5zM20 22H6.5A2.5 2.5 0 0 1 4 19.5',
  shield: 'M12 3 4 6v6c0 5 3.5 8.5 8 9 4.5-.5 8-4 8-9V6z',
  anvil: 'M5 9h14l-2 4H7zM3 9h2m14 0h2M8 13v3h8v-3M6 16h12v3H6z',
  skull: 'M12 3a8 8 0 0 0-8 8v4l2 2v3h3v-2h2v2h2v-2h2v2h3v-3l2-2v-4a8 8 0 0 0-8-8M9 12a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3m6 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3',
  sword: 'M14 3h7v7l-2 2-4-4 2-2zM3 21l2-2 8-8 4 4-8 8-2 2H3zM3 18v3h3',
  calc: 'M5 3h14v18H5zM8 7h8v3H8zM8 13h2v2H8zm3 0h2v2h-2zm3 0h2v2h-2zM8 17h2v2H8zm3 0h2v2h-2zm3 0h2v2h-2z',
  horse: 'M4 19V9l4-3 2 2 4-4 5 3 2 4-3 2v6h-3v-4l-3 1v3H8v-4l-2-1v3z',
  ship: 'M3 17 12 4l9 13H3zm0 3 2 1 2-1 2 1 2-1 2 1 2-1 2 1 2-1',
  wagon: 'M3 7h13l3 4v4H3zM7 17a2 2 0 1 0 0 4 2 2 0 0 0 0-4m9 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4',
  spark: 'M12 2v6m0 8v6M2 12h6m8 0h6M5 5l4 4m6 6 4 4M5 19l4-4m6-6 4-4',
  image: 'M4 4h16v16H4zM4 16l5-5 4 4 3-3 4 4',
  cpu: 'M6 6h12v12H6zM9 9h6v6H9M3 9h3M3 13h3m12-4h3m-3 4h3M9 3v3m4-3v3M9 18v3m4-3v3',
  flag: 'M5 3v18M5 3h11l-2 4 2 4H5',
  mail: 'M3 6h18v12H3zm0 0 9 7 9-7',
  menu: 'M4 6h16M4 12h16M4 18h16',
  close: 'M6 6l12 12M6 18 18 6',
  search: 'M11 4a7 7 0 1 1 0 14 7 7 0 0 1 0-14m5.5 12L21 21',
  globe: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18m0 0c3 3 3 15 0 18M3 12h18M5 7h14M5 17h14',
  'arrow-right': 'M5 12h14M13 5l7 7-7 7',
  discord: 'M8 11a1 1 0 1 0 0 2 1 1 0 0 0 0-2m8 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2M5 7l3-1 1 2c2-.5 4-.5 6 0l1-2 3 1 2 11-3 2-1-2c-3 1-6 1-9 0l-1 2-3-2z',
};

export function Icon({ name, size = 20, className = '', ...rest }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
      {...rest}
    >
      <path d={PATHS[name]} />
    </svg>
  );
}
