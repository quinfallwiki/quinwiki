export type GalleryItemType =
  | 'landscape'
  | 'town'
  | 'underwater'
  | 'fishing'
  | 'mining'
  | 'gathering'
  | 'farm'
  | 'building'
  | 'dungeon'
  | 'pvp'
  | 'pve'
  | 'mount'
  | 'naval';

export interface GalleryItem {
  id: string;
  /** Path under /public/assets/quinfall/gallery */
  file: string;
  type: GalleryItemType;
}

export const GALLERY_ITEMS: GalleryItem[] = [
  { id: 'manzara',      file: 'manzara.jpg',      type: 'landscape'  },
  { id: 'manzara2',     file: 'manzara2.png',     type: 'landscape'  },
  { id: 'manzara3',     file: 'manzara3.png',     type: 'landscape'  },
  { id: 'doga',         file: 'doga.png',         type: 'landscape'  },
  { id: 'walking',      file: 'walking.png',      type: 'landscape'  },
  { id: 'kasaba',       file: 'kasaba.jpg',       type: 'town'       },
  { id: 'dungeon',      file: 'dungeon.png',      type: 'dungeon'    },
  { id: 'maden',        file: 'maden.png',        type: 'mining'     },
  { id: 'toplayicilik', file: 'toplayicilik.png', type: 'gathering'  },
  { id: 'tarim',        file: 'tarim.jpg',        type: 'farm'       },
  { id: 'fishing',      file: 'fishing.png',      type: 'fishing'    },
  { id: 'suAlti',       file: 'su-alti.jpg',      type: 'underwater' },
  { id: 'denizcilik',   file: 'denizcilik.png',   type: 'naval'      },
  { id: 'denizcilik2',  file: 'denizcilik2.png',  type: 'naval'      },
  { id: 'zirhliAt',     file: 'zirhli-at.png',    type: 'mount'      },
  { id: 'build',        file: 'build.jpg',        type: 'building'   },
  { id: 'build2',       file: 'build2.jpg',       type: 'building'   },
];

export const GALLERY_BASE = '/assets/quinfall/gallery/';

export const GALLERY_TYPES: GalleryItemType[] = [
  'landscape', 'town', 'underwater', 'fishing', 'mining', 'gathering',
  'farm', 'building', 'dungeon', 'pvp', 'pve', 'mount', 'naval',
];
