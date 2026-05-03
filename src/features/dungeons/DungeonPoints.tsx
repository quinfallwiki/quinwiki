import { useTranslation } from 'react-i18next';

import { Icon } from '@/components/ui/Icon';
import { DUNGEON_POINTS_CAP } from '@/data/dungeons';

export function DungeonPoints() {
  const { t } = useTranslation('dungeons');

  return (
    <section className="rounded-2xl border border-frost-400/30 bg-gradient-to-br from-frost-500/10 via-ink-900/60 to-ember-500/5 p-6">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[auto_1fr] lg:items-center">
        <div className="flex items-center gap-4">
          <span className="flex h-14 w-14 items-center justify-center rounded-2xl border border-frost-400/40 bg-frost-500/10 text-frost-200">
            <Icon name="spark" size={26} />
          </span>
          <div>
            <div className="font-display text-3xl text-white">
              {DUNGEON_POINTS_CAP.toLocaleString('en-US')}
            </div>
            <div className="mt-0.5 text-[11px] uppercase tracking-[0.18em] text-frost-300/80">
              {t('points.cap')}
            </div>
          </div>
        </div>

        <div>
          <div className="font-display text-base text-white">
            {t('points.title')}
          </div>
          <p className="mt-2 text-sm leading-relaxed text-steel-300">
            {t('points.body')}
          </p>
        </div>
      </div>
    </section>
  );
}
