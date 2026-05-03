import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { Container } from '@/components/ui/Container';
import { Seo } from '@/components/seo/Seo';

export default function NotFoundPage() {
  const { t } = useTranslation();
  const { lang } = useParams();

  return (
    <>
      <Seo title="404" />
      <Container size="md" className="flex min-h-[60vh] flex-col items-center justify-center text-center">
        <div className="font-display text-7xl heading-gradient sm:text-9xl">404</div>
        <p className="mt-4 text-steel-300">{t('states.empty')}</p>
        <Link to={`/${lang ?? 'tr'}`} className="btn-primary mt-8 h-11 px-6">
          {t('nav.home')}
        </Link>
      </Container>
    </>
  );
}
