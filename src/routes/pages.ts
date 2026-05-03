export interface PageDef {
  key: string;
  slug: string;
  navKey: string;
  iconKey: string;
  order: number;
}

export const PAGES: readonly PageDef[] = [
  { key: 'home', slug: '', navKey: 'nav.home', iconKey: 'home', order: 1 },
  { key: 'guide', slug: 'rehber', navKey: 'nav.guide', iconKey: 'book', order: 2 },
  { key: 'classes', slug: 'siniflar', navKey: 'nav.classes', iconKey: 'shield', order: 3 },
  { key: 'crafting', slug: 'crafting', navKey: 'nav.crafting', iconKey: 'anvil', order: 4 },
  { key: 'dungeons', slug: 'zindanlar', navKey: 'nav.dungeons', iconKey: 'skull', order: 5 },
  { key: 'items', slug: 'itemler', navKey: 'nav.items', iconKey: 'sword', order: 6 },
  { key: 'craftCalc', slug: 'craft-hesaplama', navKey: 'nav.craftCalc', iconKey: 'calc', order: 7 },
  { key: 'mounts', slug: 'binekler-petler', navKey: 'nav.mounts', iconKey: 'horse', order: 8 },
  { key: 'sailing', slug: 'denizcilik', navKey: 'nav.sailing', iconKey: 'ship', order: 9 },
  { key: 'caravan', slug: 'kervan', navKey: 'nav.caravan', iconKey: 'wagon', order: 10 },
  { key: 'leveling', slug: 'level-kasma', navKey: 'nav.leveling', iconKey: 'spark', order: 11 },
  { key: 'gallery', slug: 'galeri', navKey: 'nav.gallery', iconKey: 'image', order: 12 },
  { key: 'system', slug: 'sistem', navKey: 'nav.system', iconKey: 'cpu', order: 13 },
  { key: 'updates', slug: 'guncellemeler', navKey: 'nav.updates', iconKey: 'spark', order: 14 },
  { key: 'studio', slug: 'vawraek', navKey: 'nav.studio', iconKey: 'flag', order: 15 },
  { key: 'contact', slug: 'iletisim', navKey: 'nav.contact', iconKey: 'mail', order: 16 },
] as const;

export const HOME = PAGES[0];

export function findPageByKey(key: string): PageDef | undefined {
  return PAGES.find((p) => p.key === key);
}
