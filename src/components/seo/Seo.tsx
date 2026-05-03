import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { useParams, useLocation } from 'react-router-dom';

import {
  SITE_URL,
  SITE_NAME,
  SITE_LOCALES,
  DEFAULT_OG_IMAGE,
  TWITTER_HANDLE,
  buildUrl,
} from '@/config/site';
import { PAGES } from '@/routes/pages';
import { PAGE_BG } from '@/data/homeAssets';
import { isLanguageCode, DEFAULT_LANGUAGE } from '@/i18n/languages';

interface SeoProps {
  title?: string;
  description?: string;
  /** Path to OG/Twitter card image (relative to /public or full URL) */
  image?: string;
  /** Pass the page key (e.g. 'guide', 'items') so we can emit hreflang alternates */
  pageKey?: string;
  /** Override og:type (default 'website') */
  type?: 'website' | 'article';
}

const OG_LOCALE_MAP: Record<string, string> = {
  tr: 'tr_TR', en: 'en_US', de: 'de_DE', ru: 'ru_RU',
};

/**
 * Per-page SEO head tags.
 * Emits: title, description, canonical, hreflang alternates,
 * Open Graph, Twitter card, and a per-page WebPage JSON-LD block.
 */
export function Seo({
  title,
  description,
  image,
  pageKey,
  type = 'website',
}: SeoProps) {
  const { t, i18n } = useTranslation();
  const { lang } = useParams();
  const location = useLocation();

  const langCode = lang && isLanguageCode(lang) ? lang : DEFAULT_LANGUAGE;
  const brand = String(t('brand.title', { defaultValue: SITE_NAME }));
  const fullTitle = title ? `${title} — ${brand}` : brand;
  const desc = description ?? String(t('brand.tagline', { defaultValue: '' }));

  // Resolve canonical + alternate URLs.
  // 1. Explicit pageKey wins. 2. Otherwise infer slug from URL and look up.
  const slugFromUrl = location.pathname.replace(/^\/[a-z]{2}\/?/, '');
  const page = pageKey
    ? PAGES.find((p) => p.key === pageKey)
    : PAGES.find((p) => p.slug === slugFromUrl);
  const slug = page?.slug ?? slugFromUrl;
  const canonical = buildUrl(langCode, slug);

  // Resolve image: explicit prop → page-specific PAGE_BG → site default
  const inferredImage = page ? PAGE_BG[page.key] : undefined;
  const imgPath = image ?? inferredImage ?? DEFAULT_OG_IMAGE;
  const imgFull = imgPath.startsWith('http') ? imgPath : `${SITE_URL}${imgPath}`;

  return (
    <Helmet>
      <html lang={langCode} />
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />

      <link rel="canonical" href={canonical} />
      {SITE_LOCALES.map((altLang) => (
        <link
          key={altLang}
          rel="alternate"
          hrefLang={altLang}
          href={buildUrl(altLang, slug)}
        />
      ))}
      <link rel="alternate" hrefLang="x-default" href={buildUrl(DEFAULT_LANGUAGE, slug)} />

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={desc} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonical} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content={OG_LOCALE_MAP[langCode] ?? 'en_US'} />
      {SITE_LOCALES
        .filter((l) => l !== langCode)
        .map((l) => (
          <meta key={l} property="og:locale:alternate" content={OG_LOCALE_MAP[l] ?? l} />
        ))}
      <meta property="og:image" content={imgFull} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="675" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={TWITTER_HANDLE} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={desc} />
      <meta name="twitter:image" content={imgFull} />

      {/* WebPage JSON-LD */}
      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': type === 'article' ? 'Article' : 'WebPage',
          name: fullTitle,
          description: desc,
          url: canonical,
          inLanguage: i18n.language,
          isPartOf: { '@type': 'WebSite', name: SITE_NAME, url: SITE_URL },
          primaryImageOfPage: { '@type': 'ImageObject', url: imgFull },
        })}
      </script>
    </Helmet>
  );
}
