import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Container } from '@/components/ui/Container';
import { PageHeader } from '@/components/ui/PageHeader';
import { Seo } from '@/components/seo/Seo';
import { PatchTimeline } from '@/features/updates/PatchTimeline';
import { loadPatchNotes, formatPatchDate } from '@/data/patchNotes';
import { useParams } from 'react-router-dom';
import { isLanguageCode, DEFAULT_LANGUAGE } from '@/i18n/languages';

export default function PatchNotesPage() {
  const { t } = useTranslation('updates');
  const { lang } = useParams();
  const langCode = lang && isLanguageCode(lang) ? lang : DEFAULT_LANGUAGE;
  const [stats, setStats] = useState<{ total: string; latest: string; fetched: string } | null>(null);

  useEffect(() => {
    loadPatchNotes().then((d) => {
      setStats({
        total:   String(d.count),
        latest:  formatPatchDate(d.entries[0]?.pubDate ?? null, langCode),
        fetched: formatPatchDate(d.fetchedAt, langCode),
      });
    }).catch(() => {});
  }, [langCode]);

  return (
    <>
      <Seo title={t('page.title') as string} description={t('page.description') as string} />
      <PageHeader
        eyebrow={t('page.eyebrow') as string}
        title={t('page.title')}
        description={t('page.description')}
      />

      <Container size="xl" className="space-y-10 py-8 sm:py-12">
        {stats && (
          <ul className="grid grid-cols-3 gap-3">
            <Stat label={t('stats.total') as string}   value={stats.total}   accent="text-ember-300" />
            <Stat label={t('stats.latest') as string}  value={stats.latest}  accent="text-frost-300" />
            <Stat label={t('stats.fetched') as string} value={stats.fetched} accent="text-emerald-300" />
          </ul>
        )}

        <PatchTimeline />
      </Container>
    </>
  );
}

function Stat({ label, value, accent }: { label: string; value: string; accent: string }) {
  return (
    <li className="rounded-2xl border border-steel-700/60 bg-ink-900/70 p-4 backdrop-blur">
      <div className={`font-display text-base sm:text-lg ${accent}`}>{value || '—'}</div>
      <div className="mt-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-steel-400">
        {label}
      </div>
    </li>
  );
}
