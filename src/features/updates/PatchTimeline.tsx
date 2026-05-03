import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import { Icon } from '@/components/ui/Icon';
import { SectionHeading } from '@/components/ui/SectionHeading';
import {
  loadPatchNotes,
  pickLocalized,
  formatPatchDate,
  type PatchEntry,
  type PatchPayload,
} from '@/data/patchNotes';
import { isLanguageCode, DEFAULT_LANGUAGE } from '@/i18n/languages';

const KIND_TONE = (title: string): { ring: string; chip: string; label: string } => {
  const t = title.toLowerCase();
  if (/major\s*update|büyük\s*güncelleme|großes\s*update|major/i.test(t))
    return { ring: 'border-ember-400/55', chip: 'bg-ember-500/15 text-ember-200 border-ember-400/55', label: 'MAJOR' };
  if (/hotfix/i.test(t))
    return { ring: 'border-rose-400/55', chip: 'bg-rose-500/15 text-rose-200 border-rose-400/55', label: 'HOTFIX' };
  if (/patch|update|güncelleme|обновление/i.test(t))
    return { ring: 'border-frost-400/55', chip: 'bg-frost-500/15 text-frost-200 border-frost-400/55', label: 'PATCH' };
  return { ring: 'border-steel-700/60', chip: 'bg-steel-500/15 text-steel-200 border-steel-500/55', label: 'NEWS' };
};

export function PatchTimeline() {
  const { t } = useTranslation('updates');
  const { lang } = useParams();
  const langCode = lang && isLanguageCode(lang) ? lang : DEFAULT_LANGUAGE;
  const [data, setData] = useState<PatchPayload | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState<Record<string, boolean>>({});

  useEffect(() => {
    let alive = true;
    loadPatchNotes()
      .then((d) => { if (alive) setData(d); })
      .catch((e) => { if (alive) setError(e.message ?? String(e)); });
    return () => { alive = false; };
  }, []);

  if (error) {
    return (
      <div className="rounded-2xl border border-rose-500/40 bg-rose-500/10 p-5 text-sm text-rose-200">
        {t('states.error')} <span className="text-rose-300">{error}</span>
      </div>
    );
  }
  if (!data) {
    return (
      <div className="rounded-2xl border border-steel-700/60 bg-ink-900/60 p-6 text-center text-sm text-steel-400">
        {t('states.loading')}
      </div>
    );
  }
  if (!data.entries.length) {
    return (
      <div className="rounded-2xl border border-steel-700/60 bg-ink-900/60 p-6 text-center text-sm text-steel-400">
        {t('states.empty')}
      </div>
    );
  }

  return (
    <section className="space-y-6">
      <SectionHeading
        kicker={t('hero.kicker') as string}
        title={t('hero.title') as string}
        subtitle={t('hero.subtitle') as string}
      />

      {/* Timeline */}
      <ol className="space-y-3">
        {data.entries.map((entry, i) => (
          <PatchCard
            key={entry.id}
            entry={entry}
            i={i}
            langCode={langCode}
            open={!!open[entry.id]}
            onToggle={() => setOpen((s) => ({ ...s, [entry.id]: !s[entry.id] }))}
            t={t}
          />
        ))}
      </ol>
    </section>
  );
}

function PatchCard({
  entry, i, langCode, open, onToggle, t,
}: {
  entry: PatchEntry; i: number; langCode: string; open: boolean;
  onToggle: () => void; t: (k: string) => string;
}) {
  const title = pickLocalized(entry.titles, langCode);
  const summary = pickLocalized(entry.summaries, langCode);
  const body = pickLocalized(entry.bodies, langCode);
  const tone = KIND_TONE(title);

  return (
    <motion.li
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.35, delay: Math.min(i, 8) * 0.04 }}
      className={`relative overflow-hidden rounded-2xl border bg-ink-900/70 shadow-panel transition hover:-translate-y-0.5 hover:shadow-glow ${tone.ring}`}
    >
      <div className="flex flex-col gap-3 p-5 sm:flex-row sm:items-start">
        {/* Left meta column */}
        <div className="flex shrink-0 flex-col items-start gap-2 sm:w-44">
          <span className={`rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.2em] ${tone.chip}`}>
            {tone.label}
          </span>
          {entry.pubDate && (
            <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-steel-400">
              {formatPatchDate(entry.pubDate, langCode)}
            </span>
          )}
        </div>

        {/* Body */}
        <div className="min-w-0 flex-1">
          <h3 className="font-display text-lg text-white">{title}</h3>
          {summary && (
            <p className="mt-2 text-sm leading-relaxed text-steel-300/95">{summary}</p>
          )}

          <AnimatePresence initial={false}>
            {open && body && body !== summary && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.25 }}
                className="overflow-hidden"
              >
                <p className="mt-3 whitespace-pre-line border-t border-steel-700/40 pt-3 text-sm leading-relaxed text-steel-300/90">
                  {body}
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="mt-3 flex flex-wrap items-center gap-2">
            {body && body !== summary && (
              <button
                type="button"
                onClick={onToggle}
                className="inline-flex items-center gap-1 rounded-full border border-steel-700/60 bg-ink-950/70 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-steel-200 transition hover:border-frost-400/55 hover:text-white"
              >
                {open ? t('actions.collapse') : t('actions.expand')}
              </button>
            )}
            {entry.link && (
              <a
                href={entry.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 rounded-full border border-frost-400/45 bg-frost-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-frost-100 transition hover:border-frost-300/70 hover:bg-frost-500/20 hover:text-white"
              >
                {t('actions.openOnSteam')}
                <Icon name="arrow-right" size={10} />
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.li>
  );
}
