import { useTranslation } from 'react-i18next';

import { Container } from '@/components/ui/Container';
import { PageHeader } from '@/components/ui/PageHeader';
import { Seo } from '@/components/seo/Seo';
import { MountHero } from '@/features/mounts/MountHero';
import { MountSection } from '@/features/mounts/MountSection';
import { TameSystem } from '@/features/mounts/TameSystem';
import { CaravanRental } from '@/features/mounts/CaravanRental';
import { PremiumGallery } from '@/features/mounts/PremiumGallery';
import { PetSection } from '@/features/mounts/PetSection';
import { PetEvolution } from '@/features/mounts/PetEvolution';
import { BreedingFlow } from '@/features/mounts/BreedingFlow';
import { StrategyGrid } from '@/features/mounts/StrategyGrid';

export default function MountsPage() {
  const { t } = useTranslation('mounts');

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
        <MountHero />
        <MountSection />
        <TameSystem />
        <BreedingFlow />
        <CaravanRental />
        <PremiumGallery />
        <PetSection />
        <PetEvolution />
        <StrategyGrid />
      </Container>
    </>
  );
}
