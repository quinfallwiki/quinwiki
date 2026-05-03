import { useTranslation } from 'react-i18next';

import { Container } from '@/components/ui/Container';
import { PageHeader } from '@/components/ui/PageHeader';
import { Seo } from '@/components/seo/Seo';
import { LevelingHero } from '@/features/leveling/LevelingHero';
import { PhaseTimeline } from '@/features/leveling/PhaseTimeline';
import { XpSourceMatrix } from '@/features/leveling/XpSourceMatrix';
import { HuntingZones } from '@/features/leveling/HuntingZones';
import { MasteryTriad } from '@/features/leveling/MasteryTriad';
import { LevelingMistakes } from '@/features/leveling/LevelingMistakes';
import { PAGE_BG } from '@/data/homeAssets';

export default function LevelingPage() {
  const { t } = useTranslation('leveling');
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
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[680px] bg-cover bg-center opacity-[0.08]"
          style={{ backgroundImage: `url(${PAGE_BG.leveling})` }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[680px]"
          style={{
            background:
              'linear-gradient(180deg, rgba(5,7,13,0.55) 0%, rgba(5,7,13,0.92) 70%, rgb(5,7,13) 100%)',
          }}
        />

        <Container size="xl" className="space-y-16 py-12">
          <LevelingHero />
          <PhaseTimeline />
          <XpSourceMatrix />
          <HuntingZones />
          <MasteryTriad />
          <LevelingMistakes />
        </Container>
      </div>
    </>
  );
}
