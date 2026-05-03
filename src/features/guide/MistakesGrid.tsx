import { useTranslation } from 'react-i18next';

import { SectionHeading } from '@/components/ui/SectionHeading';
import { MISTAKES } from '@/data/guide';
import { SectionBackdrop } from '@/features/guide/SectionBackdrop';

export function MistakesGrid() {
  const { t } = useTranslation('guide');

  return (
    <SectionBackdrop bgKey="mistakes" accent="bg-rose-500/15">
      <SectionHeading
        kicker={t('mistakes.kicker') as string}
        title={t('mistakes.title') as string}
        subtitle={t('mistakes.subtitle') as string}
      />

      <ul className="grid grid-cols-1 gap-3 md:grid-cols-2">
        {MISTAKES.map((m, i) => (
          <li
            key={m}
            className="flex gap-4 rounded-2xl border border-rose-400/20 bg-gradient-to-br from-rose-500/5 via-ink-900/60 to-transparent p-5"
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-rose-400/40 bg-rose-500/10 font-display text-sm text-rose-200">
              ✕
            </span>
            <div>
              <div className="font-display text-sm text-white">
                <span className="text-rose-300">{i + 1}.</span> {t(`mistakes.list.${m}.title`)}
              </div>
              <p className="mt-1 text-xs leading-relaxed text-steel-400">
                {t(`mistakes.list.${m}.body`)}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </SectionBackdrop>
  );
}
