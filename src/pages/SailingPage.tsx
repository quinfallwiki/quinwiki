import { useTranslation } from 'react-i18next';

import { Container } from '@/components/ui/Container';
import { PageHeader } from '@/components/ui/PageHeader';
import { Seo } from '@/components/seo/Seo';
import { SailingHero } from '@/features/sailing/SailingHero';
import { ShipFleet } from '@/features/sailing/ShipFleet';
import { PremiumShips } from '@/features/sailing/PremiumShips';
import { HarborServices } from '@/features/sailing/HarborServices';
import { NavalCombat } from '@/features/sailing/NavalCombat';
import { KrakenHunt } from '@/features/sailing/KrakenHunt';
import { FishingSystem } from '@/features/sailing/FishingSystem';
import { StrategyGrid } from '@/features/sailing/StrategyGrid';

export default function SailingPage() {
  const { t } = useTranslation('sailing');
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
        <SailingHero />
        <ShipFleet />
        <PremiumShips />
        <HarborServices />
        <NavalCombat />
        <KrakenHunt />
        <FishingSystem />
        <StrategyGrid />
      </Container>
    </>
  );
}
