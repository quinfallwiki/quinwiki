import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

import { Container } from '@/components/ui/Container';
import { Icon } from '@/components/ui/Icon';
import {
  loadPatchNotes,
  pickLocalized,
  formatPatchDate,
  type PatchEntry,
} from '@/data/patchNotes';
import { isLanguageCode, DEFAULT_LANGUAGE } from '@/i18n/languages';

/**
 * Slim banner that floats just under the hero on the homepage,
 * surfacing the most recent Steam patch entry.
 */
export function LatestPatchStrip() {
  const { t } = useTranslation('updates');
  const { lang } = useParams();
  const langCode = lang && isLanguageCode(lang) ? lang : DEFAULT_LANGUAGE;
  const [latest, setLatest] = useState<PatchEntry | null>(null);

  useEffect(() => {
    let alive = true;
    loadPatchNotes()
      .then((d) => { if (alive) setLatest(d.entries[0] ?? null); })
      .catch(() => {});
    return () => { alive = false; };
  }, []);

  if (!latest) return null;
  const title = pickLocalized(latest.titles, langCode);
  const date = formatPatchDate(latest.pubDate, langCode);
  const isMajor = /major/i.test(title);
  const isHotfix = /hotfix/i.test(title);
  const tone = isMajor
    ? 'border-ember-400/50 from-ember-500/15 text-ember-100'
    : isHotfix
      ? 'border-rose-400/50 from-rose-500/15 text-rose-100'
      : 'border-frost-400/50 from-frost-500/15 text-frost-100';
  const tagLabel = isMajor ? 'MAJOR' : isHotfix ? 'HOTFIX' : 'PATCH';
  const langPrefix = `/${langCode}`;

  return (
    <section className="relative">
      <Container size="xl" className="pb-2 pt-5 sm:pb-3 sm:pt-7">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        >
          <Link
            to={`${langPrefix}/guncellemeler`}
            className={`group relative flex items-center gap-3 overflow-hidden rounded-2xl border bg-gradient-to-r to-transparent px-4 py-3 backdrop-blur transition hover:-translate-y-0.5 hover:shadow-glow sm:px-5 ${tone}`}
          >
            {/* Pulsing dot */}
            <span className="relative flex h-2.5 w-2.5 shrink-0">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-current opacity-60" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-current" />
            </span>

            <span className="rounded-full border border-current/40 bg-current/10 px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.2em] sm:text-[10px]">
              {tagLabel}
            </span>

            <div className="min-w-0 flex-1">
              <div className="truncate text-sm font-semibold text-white sm:text-base">
                {title}
              </div>
              {date && (
                <div className="hidden text-[11px] text-steel-400 sm:block">{date}</div>
              )}
            </div>

            <span className="hidden shrink-0 text-[11px] font-semibold uppercase tracking-[0.18em] text-steel-300 sm:inline">
              {t('actions.expand')}
            </span>
            <Icon name="arrow-right" size={14} className="shrink-0 transition group-hover:translate-x-0.5" />
          </Link>
        </motion.div>
      </Container>
    </section>
  );
}
