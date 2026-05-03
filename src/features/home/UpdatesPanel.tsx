import { useTranslation } from 'react-i18next';

import { Container } from '@/components/ui/Container';
import { Card } from '@/components/ui/Card';
import { SectionHeading } from '@/components/ui/SectionHeading';

export function UpdatesPanel() {
  const { t } = useTranslation('home');

  return (
    <section className="py-16 sm:py-20">
      <Container size="xl">
        <SectionHeading
          kicker={t('updates.title') as string}
          title={t('updates.title')}
          subtitle={t('updates.subtitle')}
        />
        <Card className="mt-8 flex min-h-[160px] items-center justify-center text-sm text-steel-400">
          {t('updates.empty')}
        </Card>
      </Container>
    </section>
  );
}
