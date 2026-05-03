import { useTranslation } from 'react-i18next';

import { Container } from '@/components/ui/Container';
import { PageHeader } from '@/components/ui/PageHeader';
import { Seo } from '@/components/seo/Seo';
import { HeroShowcase } from '@/features/classes/HeroShowcase';
import { ClassesGrid } from '@/features/classes/ClassesGrid';
import { CombosSection } from '@/features/classes/CombosSection';
import { LevelingExplainer } from '@/features/classes/LevelingExplainer';

export default function ClassesPage() {
  const { t } = useTranslation('classes');
  return (
    <>
      <Seo title={t('page.title') as string} description={t('page.description') as string} />
      <PageHeader
        eyebrow={t('page.eyebrow') as string}
        title={t('page.title')}
        description={t('page.description')}
      />
      <HeroShowcase />
      <Container size="xl" className="space-y-20 py-14">
        <ClassesGrid />
        <CombosSection />
        <LevelingExplainer />
      </Container>
    </>
  );
}
