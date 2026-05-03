/**
 * Site-wide constants used by SEO, sitemap and structured data.
 * Update SITE_URL when the wiki goes live behind its real domain.
 */
export const SITE_URL = 'https://quinwiki.com';
export const SITE_NAME = 'The Quinfall Wiki';
export const SITE_LOCALES = ['tr', 'en', 'de', 'ru'] as const;
export const DEFAULT_OG_IMAGE = '/logo.webp';
export const TWITTER_HANDLE = '@quinfall';

/** Build a canonical URL for the given language + slug. */
export function buildUrl(lang: string, slug: string): string {
  const trail = slug ? `/${slug}` : '';
  return `${SITE_URL}/${lang}${trail}`;
}
