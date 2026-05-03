import { useTranslation } from 'react-i18next';

import { Container } from '@/components/ui/Container';
import { PageHeader } from '@/components/ui/PageHeader';
import { Seo } from '@/components/seo/Seo';
import { EmbeddedFrame } from '@/components/ui/EmbeddedFrame';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { GalleryGrid } from '@/features/gallery/GalleryGrid';
import { EXTERNAL_LINKS } from '@/data/external';

export default function GalleryPage() {
  const { t } = useTranslation('gallery');
  return (
    <>
      <Seo title={t('page.title') as string} description={t('page.description') as string} />
      <PageHeader
        eyebrow={t('page.eyebrow') as string}
        title={t('page.title')}
        description={t('page.description')}
      />
      <Container size="xl" className="space-y-12 py-10">
        <GalleryGrid />

        <section className="space-y-6">
          <SectionHeading
            kicker={t('map.kicker') as string}
            title={t('map.title') as string}
            subtitle={t('map.subtitle') as string}
          />
          <EmbeddedFrame
            src={EXTERNAL_LINKS.interactiveMap}
            title={t('map.title') as string}
            i18nNamespace="gallery"
          />
        </section>
      </Container>
    </>
  );
}
