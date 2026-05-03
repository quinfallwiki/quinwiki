/**
 * Steam store-asset URLs used as page-card backdrops on the homepage.
 * Each page slug maps to one screenshot themed for that section.
 */
const STEAM_BASE = 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2294660';

export const HERO_LIBRARY_BG = `${STEAM_BASE}/library_hero.jpg`;
export const GAME_LOGO       = `${STEAM_BASE}/logo.png`;

export const PAGE_BG: Record<string, string> = {
  guide:     '/assets/quinfall/gallery/walking.png',           // "Yolda" — başlangıç / yolculuk
  classes:   `${STEAM_BASE}/ss_3b9415a55ac620ba261c42a977d1ea3de84ea1ca.600x338.jpg`,
  crafting:  `${STEAM_BASE}/ss_e3a0490567ff21e2155ed4653dba73c2be5a249e.600x338.jpg`,
  dungeons:  '/assets/quinfall/home-cards/zindanlar-bosslar.jpg',
  items:     '/assets/quinfall/home-cards/itemler.png',         // ICON klasöründen üretilmiş 24-eşya mozaiği
  craftCalc: `${STEAM_BASE}/ss_e3a0490567ff21e2155ed4653dba73c2be5a249e.600x338.jpg`,
  mounts:    '/assets/quinfall/home-cards/binek.png',
  sailing:   '/assets/quinfall/gallery/denizcilik.png',         // Galeri "Açık Deniz"
  caravan:   '/assets/quinfall/home-cards/kervan.png',
  leveling:  `${STEAM_BASE}/ss_2e3e583f7ccce999fd6611916e765fbc03327ab9.600x338.jpg`,
  gallery:   '/assets/quinfall/gallery/manzara.jpg',            // Galeri "Açık Dünya Manzarası" — galeri kartı için manzara
  system:    '/assets/quinfall/home-cards/sistem.png',
  studio:    '/assets/quinfall/home-cards/vawraek.png',
  contact:   `${STEAM_BASE}/ss_3ec201f38553eb9e7af2e8440540456cbce65a20.600x338.jpg`,
};

/**
 * Topic-anchor: a real in-game asset icon that visually identifies the page topic.
 * Rendered on top of the Steam screenshot in the card image area so the topic
 * is unmistakable at a glance (a horse for mounts, a ship for sailing, etc).
 * Path is relative to /public/assets/ — file must exist in /public/assets/icons/
 * or /public/assets/quinfall/.
 */
export const PAGE_TOPIC_ASSET: Record<string, string | null> = {
  guide:     null,
  classes:   null,
  crafting:  null,
  dungeons:  null,
  items:     null,
  craftCalc: null,
  mounts:    null,
  sailing:   null,
  caravan:   null,
  leveling:  null,
  gallery:   null,
  system:    null,
  studio:    null,
  contact:   null,
};

export const PAGE_ACCENT: Record<string, string> = {
  guide:     'border-emerald-400/40 from-emerald-500/20',
  classes:   'border-rose-400/40 from-rose-500/20',
  crafting:  'border-amber-400/40 from-amber-500/20',
  dungeons:  'border-purple-400/40 from-purple-500/20',
  items:     'border-frost-400/40 from-frost-500/20',
  craftCalc: 'border-amber-400/40 from-amber-500/20',
  mounts:    'border-ember-400/40 from-ember-500/20',
  sailing:   'border-frost-400/40 from-frost-500/20',
  caravan:   'border-ember-400/40 from-ember-500/20',
  leveling:  'border-purple-400/40 from-purple-500/20',
  gallery:   'border-frost-400/40 from-frost-500/20',
  system:    'border-steel-400/40 from-steel-500/20',
  studio:    'border-ember-400/40 from-ember-500/20',
  contact:   'border-frost-400/40 from-frost-500/20',
};
