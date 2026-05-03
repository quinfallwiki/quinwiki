import { useTranslation } from 'react-i18next';

import { Container } from '@/components/ui/Container';
import { PageHeader } from '@/components/ui/PageHeader';
import { Seo } from '@/components/seo/Seo';
import { SystemHero } from '@/features/system/SystemHero';
import { SpecsCompare } from '@/features/system/SpecsCompare';
import { PerformanceTips } from '@/features/system/PerformanceTips';

export default function SystemPage() {
  const { t } = useTranslation('system');
  return (
    <>
      <Seo
        title={t('page.title') as string}
        description={t('page.description') as string}
      />
      <PageHeader
        eyebrow={t('page.eyebrow') as string}
        title={t('page.title')}
        description={t('page.description')}
      />

      <div className="relative">
        {/* Faint frost-grid backdrop band — subtle, fades to nothing */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[640px] opacity-[0.07]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(126,196,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(126,196,255,0.6) 1px, transparent 1px)',
            backgroundSize: '64px 64px',
            maskImage: 'linear-gradient(180deg, rgb(0,0,0) 0%, rgba(0,0,0,0) 100%)',
            WebkitMaskImage: 'linear-gradient(180deg, rgb(0,0,0) 0%, rgba(0,0,0,0) 100%)',
          }}
        />

        <Container size="xl" className="space-y-16 py-12">
          <SystemHero />
          <SpecsCompare />
          <PerformanceTips />
        </Container>
      </div>
    </>
  );
}
