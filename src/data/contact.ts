/**
 * Contact / community channels.
 *
 * Verified sources (2026-05-03):
 *   - Discord: provided by user (https://discord.gg/JnTqyN2b)
 *   - X / Twitter: <meta name="twitter:creator" content="@quinfall"> on quinfall.com
 *   - YouTube: @TheQuinfall — channel description confirms "The Quinfall | New
 *     MMORPG Project by Vawraek Technology"
 *   - LinkedIn / Instagram: vawraek.com footer
 *   - Steam: store.steampowered.com/app/2294660
 */
import { EXTERNAL_LINKS } from '@/data/external';

export type ChannelGroup = 'community' | 'platform' | 'studio';

export interface ContactChannel {
  id:
    | 'discord'
    | 'twitter'
    | 'youtube'
    | 'steam'
    | 'officialSite'
    | 'studioSite'
    | 'linkedin'
    | 'instagram';
  group: ChannelGroup;
  url: string;
  /** Display value for the link (without https) */
  handle: string;
  /** Brand-style hex */
  color: string;
  /** Highlighted = primary CTA on the hero */
  primary?: boolean;
}

export const CONTACT_CHANNELS: ContactChannel[] = [
  // Live community
  { id: 'discord',  group: 'community', url: EXTERNAL_LINKS.discord,      handle: 'discord.gg/JnTqyN2b',     color: '#5865F2', primary: true },
  { id: 'twitter',  group: 'community', url: EXTERNAL_LINKS.twitter,      handle: '@quinfall',                color: '#0d0d0d' },
  { id: 'youtube',  group: 'community', url: EXTERNAL_LINKS.youtube,      handle: '@TheQuinfall',             color: '#FF0033' },

  // Game platform / official
  { id: 'steam',        group: 'platform', url: EXTERNAL_LINKS.steam,        handle: 'Steam · The Quinfall', color: '#1b2838' },
  { id: 'officialSite', group: 'platform', url: EXTERNAL_LINKS.officialSite, handle: 'quinfall.com',          color: '#7ec4ff' },

  // Studio
  { id: 'studioSite', group: 'studio', url: EXTERNAL_LINKS.studioSite, handle: 'vawraek.com',                  color: '#7ec4ff' },
  { id: 'linkedin',   group: 'studio', url: EXTERNAL_LINKS.linkedin,   handle: 'linkedin.com/company/vawraek', color: '#0a66c2' },
  { id: 'instagram',  group: 'studio', url: EXTERNAL_LINKS.instagram,  handle: '@vawraek',                     color: '#e4405f' },
];

export const CONTACT_GROUPS: { id: ChannelGroup; channels: ContactChannel['id'][] }[] = [
  { id: 'community', channels: ['discord', 'twitter', 'youtube'] },
  { id: 'platform',  channels: ['steam', 'officialSite'] },
  { id: 'studio',    channels: ['studioSite', 'linkedin', 'instagram'] },
];
