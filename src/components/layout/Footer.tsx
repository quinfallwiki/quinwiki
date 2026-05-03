import { useTranslation } from 'react-i18next';

import { Container } from '@/components/ui/Container';

export function Footer() {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  return (
    <footer className="mt-16 border-t border-steel-700/40 bg-ink-950/60">
      <Container size="xl" className="py-10">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div className="flex items-center gap-3">
            <img src="/logo.webp" alt={t('brand.title')} className="h-8 w-auto" loading="lazy" />
            <div>
              <div className="font-display text-base heading-gradient">{t('brand.title')}</div>
              <div className="text-xs text-steel-400">{t('footer.communityNote')}</div>
            </div>
          </div>
          <div className="text-xs text-steel-400">
            © {year} {t('brand.title')} — {t('footer.rights')}
          </div>
        </div>
      </Container>
    </footer>
  );
}
