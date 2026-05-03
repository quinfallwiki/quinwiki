import { useTranslation } from 'react-i18next';

import { Icon } from '@/components/ui/Icon';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { MAJOR_CITIES } from '@/data/caravan';

const REGION_TONE: Record<string, string> = {
  west:    'border-emerald-400/40 bg-emerald-500/10 text-emerald-200',
  central: 'border-frost-400/40 bg-frost-500/10 text-frost-200',
  east:    'border-purple-400/40 bg-purple-500/10 text-purple-200',
  south:   'border-amber-400/40 bg-amber-500/10 text-amber-200',
  desert:  'border-ember-400/40 bg-ember-500/10 text-ember-200',
};

const REGIONS: (keyof typeof REGION_TONE)[] = ['west', 'central', 'east', 'south', 'desert'];

export function CitiesGrid() {
  const { t } = useTranslation('caravan');

  return (
    <section className="space-y-6">
      <SectionHeading
        kicker={t('cities.kicker') as string}
        title={t('cities.title') as string}
        subtitle={t('cities.subtitle') as string}
      />

      <div className="space-y-5">
        {REGIONS.map((region) => {
          const cities = MAJOR_CITIES.filter((c) => c.region === region);
          if (cities.length === 0) return null;
          return (
            <div key={region} className="rounded-2xl border border-steel-700/60 bg-ink-900/60 p-5">
              <div className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] ${REGION_TONE[region]}`}>
                {t(`cities.regions.${region}`)} · {cities.length}
              </div>
              <ul className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
                {cities.map((c) => (
                  <li
                    key={c.id}
                    className="flex items-center gap-3 rounded-xl border border-steel-700/60 bg-ink-800/40 p-3"
                  >
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-steel-700/60 bg-ink-900/70 text-steel-300">
                      <Icon name="flag" size={14} />
                    </span>
                    <div>
                      <div className="font-display text-sm text-white">{c.baslik}</div>
                      <div className="text-[10px] uppercase tracking-[0.16em] text-steel-500">
                        {t(`cities.regions.${region}`)}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>

      <div className="rounded-2xl border border-steel-700/60 bg-ink-900/40 p-5 text-sm text-steel-300">
        <div className="font-display text-base text-white">{t('cities.note.title')}</div>
        <p className="mt-2 leading-relaxed">{t('cities.note.body')}</p>
      </div>
    </section>
  );
}
