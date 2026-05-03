import { Helmet } from 'react-helmet-async';
import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { Icon } from '@/components/ui/Icon';
import { SITE_URL, buildUrl } from '@/config/site';
import { isLanguageCode, DEFAULT_LANGUAGE } from '@/i18n/languages';

export interface Crumb {
  label: string;
  /** Page key — for translation lookup (nav.<key>) and slug build */
  pageKey?: string;
  /** Explicit href — wins over pageKey */
  href?: string;
}

interface BreadcrumbsProps {
  trail: Crumb[];
}

/**
 * Visual breadcrumb strip + a JSON-LD BreadcrumbList for Google.
 * Always prepends the language home as the first crumb.
 */
export function Breadcrumbs({ trail }: BreadcrumbsProps) {
  const { t } = useTranslation();
  const { lang } = useParams();
  const langCode = lang && isLanguageCode(lang) ? lang : DEFAULT_LANGUAGE;
  const langPrefix = `/${langCode}`;

  const homeCrumb: Crumb = {
    label: String(t('nav.home', { defaultValue: 'Home' })),
    href: langPrefix,
  };
  const fullTrail = [homeCrumb, ...trail];

  // Build canonical URLs for the schema
  const itemList = fullTrail.map((c, i) => {
    const href = c.href ?? (c.pageKey ? buildUrl(langCode, c.pageKey) : undefined);
    return {
      '@type': 'ListItem',
      position: i + 1,
      name: c.label,
      item: href ? (href.startsWith('http') ? href : `${SITE_URL}${href}`) : undefined,
    };
  });

  return (
    <>
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: itemList,
          })}
        </script>
      </Helmet>

      <nav
        aria-label="Breadcrumb"
        className="flex flex-wrap items-center gap-1.5 text-[11px] font-medium uppercase tracking-[0.16em] text-steel-400"
      >
        {fullTrail.map((c, i) => {
          const isLast = i === fullTrail.length - 1;
          const href = c.href ?? (c.pageKey ? `${langPrefix}/${c.pageKey}` : undefined);
          return (
            <span key={`${i}-${c.label}`} className="flex items-center gap-1.5">
              {i > 0 && <Icon name="arrow-right" size={11} className="text-steel-600" />}
              {isLast || !href ? (
                <span className="text-frost-200/95">{c.label}</span>
              ) : (
                <Link
                  to={href}
                  className="transition hover:text-white"
                >
                  {c.label}
                </Link>
              )}
            </span>
          );
        })}
      </nav>
    </>
  );
}
