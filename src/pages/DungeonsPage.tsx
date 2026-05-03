import { useTranslation } from 'react-i18next';

import { Container } from '@/components/ui/Container';
import { PageHeader } from '@/components/ui/PageHeader';
import { Seo } from '@/components/seo/Seo';
import { DungeonHero } from '@/features/dungeons/DungeonHero';
import { WorldBossRoster } from '@/features/dungeons/WorldBossRoster';
import { DungeonGrid } from '@/features/dungeons/DungeonGrid';
import { DungeonPoints } from '@/features/dungeons/DungeonPoints';
import { DifficultyMatrix } from '@/features/dungeons/DifficultyMatrix';
import { DungeonDrops } from '@/features/dungeons/DungeonDrops';
import { PrepChecklist } from '@/features/dungeons/PrepChecklist';

export default function DungeonsPage() {
  const { t } = useTranslation('dungeons');
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
        <DungeonHero />
        <WorldBossRoster />
        <DungeonGrid />
        <DungeonPoints />
        <DifficultyMatrix />
        <DungeonDrops />
        <PrepChecklist />
      </Container>
    </>
  );
}
