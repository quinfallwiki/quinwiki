import { useTranslation } from 'react-i18next';

import { Container } from '@/components/ui/Container';
import { PageHeader } from '@/components/ui/PageHeader';
import { Card } from '@/components/ui/Card';
import { Seo } from '@/components/seo/Seo';
import { Icon } from '@/components/ui/Icon';
import { findPageByKey } from '@/routes/pages';

interface PlaceholderPageProps {
  pageKey: string;
}

export function PlaceholderPage({ pageKey }: PlaceholderPageProps) {
  const { t } = useTranslation();
  const page = findPageByKey(pageKey);
  const title = page ? (t(page.navKey) as string) : pageKey;

  return (
    <>
      <Seo title={title} />
      <PageHeader
        eyebrow={t('brand.title') as string}
        title={title}
        description={t(`pages.${pageKey}.description`, {
          defaultValue: t('states.loading') as string,
        })}
      />
      <Container size="xl" className="py-12">
        <Card className="flex flex-col items-center gap-3 py-16 text-center text-steel-300">
          <span className="flex h-14 w-14 items-center justify-center rounded-2xl border border-steel-700/60 bg-ink-800/60 text-frost-300 animate-pulse-glow">
            {page && (
              <Icon
                name={page.iconKey as Parameters<typeof Icon>[0]['name']}
                size={26}
              />
            )}
          </span>
          <div className="font-display text-lg text-white">{title}</div>
          <p className="max-w-md text-sm text-steel-400">
            {t('states.empty')}
          </p>
        </Card>
      </Container>
    </>
  );
}
