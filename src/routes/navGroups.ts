import type { PageDef } from '@/routes/pages';
import { findPageByKey } from '@/routes/pages';

export interface NavGroup {
  key: string;
  labelKey: string;
  pages: PageDef[];
}

function p(key: string): PageDef {
  const page = findPageByKey(key);
  if (!page) throw new Error(`Page not found: ${key}`);
  return page;
}

export const PRIMARY_NAV: PageDef[] = [
  p('home'),
  p('classes'),
  p('items'),
  p('crafting'),
  p('dungeons'),
  p('leveling'),
];

export const NAV_GROUPS: NavGroup[] = [
  {
    key: 'world',
    labelKey: 'navGroups.world',
    pages: [p('sailing'), p('caravan'), p('mounts'), p('gallery')],
  },
  {
    key: 'tools',
    labelKey: 'navGroups.tools',
    pages: [p('craftCalc'), p('guide'), p('system')],
  },
  {
    key: 'about',
    labelKey: 'navGroups.about',
    pages: [p('studio'), p('contact')],
  },
];
