import { useTranslation } from 'react-i18next';

import { Container } from '@/components/ui/Container';
import { PageHeader } from '@/components/ui/PageHeader';
import { Seo } from '@/components/seo/Seo';
import { GuideHero } from '@/features/guide/GuideHero';
import { QuickStart } from '@/features/guide/QuickStart';
import { PhaseTimeline } from '@/features/guide/PhaseTimeline';
import { StatMastery } from '@/features/guide/StatMastery';
import { Post50Grind } from '@/features/guide/Post50Grind';
import { DailyRoutines } from '@/features/guide/DailyRoutines';
import { MistakesGrid } from '@/features/guide/MistakesGrid';
import { FirstHundredHours } from '@/features/guide/FirstHundredHours';

export default function GuidePage() {
  const { t } = useTranslation('guide');
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
        <GuideHero />
        <QuickStart />
        <PhaseTimeline />
        <StatMastery />
        <Post50Grind />
        <DailyRoutines />
        <MistakesGrid />
        <FirstHundredHours />
      </Container>
    </>
  );
}
