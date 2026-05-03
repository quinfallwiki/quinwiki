import { useTranslation } from 'react-i18next';

import { Container } from '@/components/ui/Container';
import { Icon } from '@/components/ui/Icon';
import { EXTERNAL_LINKS } from '@/data/external';

export function CommunityCta() {
  const { t } = useTranslation('home');

  return (
    <section className="pb-20">
      <Container size="xl">
        <div className="panel relative overflow-hidden p-8 sm:p-12">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(51,166,255,0.18),transparent_50%),radial-gradient(circle_at_80%_80%,rgba(247,185,85,0.12),transparent_50%)]" />
          <div className="relative flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="max-w-2xl">
              <h2 className="font-display text-2xl heading-gradient sm:text-3xl">
                {t('community.title')}
              </h2>
              <p className="mt-2 text-sm text-steel-300 sm:text-base">{t('community.subtitle')}</p>
            </div>
            <a
              href={EXTERNAL_LINKS.discord}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary h-12 px-6 text-base"
            >
              <Icon name="discord" size={18} />
              Discord
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
