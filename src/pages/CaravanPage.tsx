import { useTranslation } from 'react-i18next';

import { Container } from '@/components/ui/Container';
import { PageHeader } from '@/components/ui/PageHeader';
import { Seo } from '@/components/seo/Seo';
import { CaravanHero } from '@/features/caravan/CaravanHero';
import { CaravanFlow } from '@/features/caravan/CaravanFlow';
import { ChannelRules } from '@/features/caravan/ChannelRules';
import { AnimalRoster } from '@/features/caravan/AnimalRoster';
import { CitiesGrid } from '@/features/caravan/CitiesGrid';
import { SeaCaravan } from '@/features/caravan/SeaCaravan';
import { StrategyGrid } from '@/features/caravan/StrategyGrid';

export default function CaravanPage() {
  const { t } = useTranslation('caravan');
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
        <CaravanHero />
        <CaravanFlow />
        <AnimalRoster />
        <ChannelRules />
        <CitiesGrid />
        <SeaCaravan />
        <StrategyGrid />
      </Container>
    </>
  );
}
