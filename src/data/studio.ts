/**
 * Vawraek Technology page data — sourced from the official site
 * (https://www.vawraek.com) and Steam publisher info.
 *
 * Verified facts:
 *   - Founded: January 2021
 *   - First game: The Quinfall
 *   - Next: a Sandbox MMORPG of unprecedented scale
 *   - Social: LinkedIn, Instagram, X (twitter)
 */

export const STUDIO_ASSETS = {
  base: '/assets/vawraek',
  vawraekLogo: '/assets/vawraek/vawraek-logo.png',
  quinfallLogo: '/assets/vawraek/the-quinfall-logo.png',
  aboutVawraek: '/assets/vawraek/about-vawraek.png',
  aboutQuinfall: '/assets/vawraek/about-the-quinfall.png',
};

export const MEDIA_GALLERY = [1, 2, 3, 4, 5, 6].map((n) => ({
  id: `media${n}`,
  file: `/assets/vawraek/media-${n}.jpg`,
}));

export interface PillarItem {
  id: 'innovation' | 'scale' | 'global' | 'ai';
  icon: 'spark' | 'globe' | 'cpu' | 'shield';
  accent: string;
}

export const STUDIO_PILLARS: PillarItem[] = [
  { id: 'innovation', icon: 'spark',  accent: 'border-ember-400/55 from-ember-500/15' },
  { id: 'scale',      icon: 'globe',  accent: 'border-frost-400/55 from-frost-500/15' },
  { id: 'global',     icon: 'shield', accent: 'border-emerald-400/55 from-emerald-500/15' },
  { id: 'ai',         icon: 'cpu',    accent: 'border-purple-400/55 from-purple-500/15' },
];

export interface ProjectCard {
  id: 'kayra' | 'quinfall' | 'sandbox';
  status: 'live' | 'inDevelopment' | 'archived';
  cover: string;
  link?: string;
  accent: string;
}

/**
 * Project history (chronological — first → latest):
 *   1. Kayra Online (Turkish-only MMORPG, beta-tested, project shelved
 *      before full release; Unity engine). Beta reception fueled Quinfall
 *      investor funding.
 *   2. The Quinfall (live globally, Steam app 2294660).
 *   3. Next-gen Sandbox MMORPG (in development).
 */
export const STUDIO_PROJECTS: ProjectCard[] = [
  {
    id: 'kayra',
    status: 'archived',
    cover: STUDIO_ASSETS.aboutVawraek,
    accent: 'border-steel-500/55',
  },
  {
    id: 'quinfall',
    status: 'live',
    cover: STUDIO_ASSETS.aboutQuinfall,
    link: 'https://store.steampowered.com/app/2294660',
    accent: 'border-ember-400/55',
  },
  {
    id: 'sandbox',
    status: 'inDevelopment',
    cover: STUDIO_ASSETS.aboutVawraek,
    accent: 'border-frost-400/45',
  },
];

export interface SocialLink {
  id: 'linkedin' | 'instagram' | 'twitter' | 'web';
  url: string;
  /** Brand-style hex */
  color: string;
}

export const STUDIO_SOCIAL: SocialLink[] = [
  { id: 'web',       url: 'https://www.vawraek.com',                   color: '#7ec4ff' },
  { id: 'linkedin',  url: 'https://tr.linkedin.com/company/vawraek',   color: '#0a66c2' },
  { id: 'instagram', url: 'https://www.instagram.com/vawraek',         color: '#e4405f' },
  { id: 'twitter',   url: 'https://x.com/vawraek',                     color: '#1d9bf0' },
];

export const FOUNDED_YEAR = 2021;
export const FOUNDED_MONTH_LOC_KEY = 'foundedMonth';
