import { useTranslation } from 'react-i18next';

import { Icon } from '@/components/ui/Icon';
import { SectionHeading } from '@/components/ui/SectionHeading';

const ITEMS = ['gear', 'consumables', 'comp', 'comms', 'reset'] as const;

export function PrepChecklist() {
  const { t } = useTranslation('dungeons');

  return (
    <section className="space-y-6">
      <SectionHeading
        kicker={t('prep.kicker') as string}
        title={t('prep.title') as string}
        subtitle={t('prep.subtitle') as string}
      />

      <ul className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-5">
        {ITEMS.map((id, i) => (
          <li
            key={id}
            className="panel flex flex-col gap-2 p-5"
          >
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-frost-400/40 bg-frost-500/10 font-display text-sm text-frost-200">
                {String(i + 1).padStart(2, '0')}
              </span>
              <Icon name="shield" size={16} className="text-steel-500" />
            </div>
            <div className="font-display text-sm text-white">
              {t(`prep.items.${id}.title`)}
            </div>
            <p className="text-xs leading-relaxed text-steel-400">
              {t(`prep.items.${id}.body`)}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
