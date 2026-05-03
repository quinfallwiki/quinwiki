import { useTranslation } from 'react-i18next';

import { Container } from '@/components/ui/Container';
import { PageHeader } from '@/components/ui/PageHeader';
import { Seo } from '@/components/seo/Seo';
import { ContactHero } from '@/features/contact/ContactHero';
import { ChannelGroups } from '@/features/contact/ChannelGroups';

export default function ContactPage() {
  const { t } = useTranslation('contact');
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
        <ContactHero />
        <ChannelGroups />
      </Container>
    </>
  );
}
