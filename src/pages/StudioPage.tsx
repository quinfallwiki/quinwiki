import { useTranslation } from 'react-i18next';

import { Container } from '@/components/ui/Container';
import { PageHeader } from '@/components/ui/PageHeader';
import { Seo } from '@/components/seo/Seo';
import { StudioHero } from '@/features/studio/StudioHero';
import { StudioPillars } from '@/features/studio/StudioPillars';
import { StudioProjects } from '@/features/studio/StudioProjects';
import { StudioMedia } from '@/features/studio/StudioMedia';
import { StudioSocial } from '@/features/studio/StudioSocial';

export default function StudioPage() {
  const { t } = useTranslation('studio');
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

      <Container size="xl" className="space-y-16 py-12">
        <StudioHero />
        <StudioPillars />
        <StudioProjects />
        <StudioMedia />
        <StudioSocial />
      </Container>
    </>
  );
}
