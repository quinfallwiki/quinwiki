import { useTranslation } from 'react-i18next';

import { Icon } from '@/components/ui/Icon';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { POST50_BANDS, XP_BUFFS, XP_SOURCES } from '@/data/guide';
import { SectionBackdrop } from '@/features/guide/SectionBackdrop';

const PACE_TONE: Record<string, string> = {
  emerald: 'border-emerald-400/40 text-emerald-200',
  frost:   'border-frost-400/40 text-frost-200',
  rose:    'border-rose-400/40 text-rose-200',
};

const SOURCE_ICON: Record<typeof XP_SOURCES[number], 'flag' | 'shield' | 'skull' | 'spark'> = {
  townBoard:     'flag',
  partyMobs:     'shield',
  highDungeons:  'skull',
  championStars: 'spark',
};

export function Post50Grind() {
  const { t } = useTranslation('guide');

  return (
    <SectionBackdrop bgKey="post50" accent="bg-rose-500/20">
      <SectionHeading
        kicker={t('post50.kicker') as string}
        title={t('post50.title') as string}
        subtitle={t('post50.subtitle') as string}
      />

      <div className="rounded-2xl border border-rose-400/30 bg-gradient-to-br from-rose-500/10 via-ink-900/60 to-transparent p-5">
        <div className="flex items-start gap-3">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-rose-400/40 bg-rose-500/10 text-rose-200">
            <Icon name="flag" size={16} />
          </span>
          <div>
            <div className="font-display text-sm text-white">{t('post50.questEnd.title')}</div>
            <p className="mt-1 text-sm leading-relaxed text-steel-300">
              {t('post50.questEnd.body')}
            </p>
          </div>
        </div>
      </div>

      <div>
        <div className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-rose-300/90">
          {t('post50.bandsLabel')}
        </div>
        <ol className="grid grid-cols-1 gap-3 md:grid-cols-3">
          {POST50_BANDS.map((b) => (
            <li
              key={b.id}
              className={`rounded-2xl border bg-ink-900/60 p-5 ${PACE_TONE[b.paceTone]}`}
            >
              <div className="font-display text-2xl text-white">{b.range}</div>
              <div className={`mt-1 inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.18em] ${PACE_TONE[b.paceTone]}`}>
                {t(`post50.pace.${b.pace}`)}
              </div>
              <p className="mt-3 text-sm leading-relaxed text-steel-300">
                {t(`post50.bands.${b.id}.body`)}
              </p>
            </li>
          ))}
        </ol>
      </div>

      <div>
        <div className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-ember-300/90">
          {t('post50.buffsLabel')}
        </div>
        <ul className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {XP_BUFFS.map((b) => (
            <li
              key={b.id}
              className={`rounded-2xl border bg-ink-900/60 p-5 text-center ${b.accent}`}
            >
              <div className="font-display text-3xl">{b.value}</div>
              <div className="mt-1 font-display text-sm text-white">
                {t(`post50.buffs.${b.id}.title`)}
              </div>
              <p className="mt-2 text-[11px] leading-relaxed text-steel-400">
                {t(`post50.buffs.${b.id}.body`)}
              </p>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <div className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-frost-300/90">
          {t('post50.xpSourcesLabel')}
        </div>
        <ul className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
          {XP_SOURCES.map((s) => (
            <li
              key={s}
              className="rounded-2xl border border-steel-700/60 bg-ink-900/60 p-5"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-frost-400/40 bg-frost-500/10 text-frost-200">
                  <Icon name={SOURCE_ICON[s]} size={16} />
                </span>
                <div className="font-display text-sm text-white">
                  {t(`post50.xpSources.${s}.title`)}
                </div>
              </div>
              <p className="mt-2 text-xs leading-relaxed text-steel-400">
                {t(`post50.xpSources.${s}.body`)}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </SectionBackdrop>
  );
}
