import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

import { Container } from '@/components/ui/Container';
import { Icon } from '@/components/ui/Icon';
import { AssetIcon } from '@/components/ui/AssetIcon';
import { loadItemDb } from '@/data/items';
import type { ItemDb, RawItem } from '@/data/types';
import { LANGUAGES, type LanguageCode } from '@/i18n/languages';

type BoosterTab = 'powerCards' | 'skillStones';

interface CharacterBoostersProps {
  lang: LanguageCode;
}

export function CharacterBoosters({ lang }: CharacterBoostersProps) {
  const { t } = useTranslation('craftCalc');
  const langDef = LANGUAGES.find((l) => l.code === lang) ?? LANGUAGES[0];
  const fallback = LANGUAGES[1];
  const titleField = `baslik_loc_${langDef.itemDbField}` as const;
  const descField = `aciklama_loc_${langDef.itemDbField}` as const;
  const descFallback = `aciklama_loc_${fallback.itemDbField}` as const;

  const [db, setDb] = useState<ItemDb | null>(null);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<BoosterTab>('powerCards');
  const [query, setQuery] = useState('');

  useEffect(() => {
    let alive = true;
    setLoading(true);
    loadItemDb()
      .then((d) => alive && setDb(d))
      .finally(() => alive && setLoading(false));
    return () => {
      alive = false;
    };
  }, []);

  const items = useMemo<RawItem[]>(() => {
    if (!db) return [];
    const list = tab === 'powerCards' ? db.guc_karti_tablosu : db.beceri_tasi_tablosu;
    const q = query.trim().toLowerCase();
    if (!q) return list;
    return list.filter((it) => {
      const name = (it[titleField] as string | undefined) ?? '';
      return name.toLowerCase().includes(q);
    });
  }, [db, tab, query, titleField]);

  return (
    <Container size="xl" className="pb-20">
      <header className="mb-6 max-w-3xl">
        <div className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-frost-300/90">
          {t('character.title')}
        </div>
        <p className="text-sm leading-relaxed text-steel-200 sm:text-base">
          {t('character.subtitle')}
        </p>
      </header>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="inline-flex rounded-full border border-steel-700 bg-ink-900/60 p-1">
          {(['powerCards', 'skillStones'] as BoosterTab[]).map((k) => {
            const active = tab === k;
            return (
              <button
                key={k}
                type="button"
                onClick={() => setTab(k)}
                className={`rounded-full px-5 py-2 text-sm font-medium transition ${
                  active
                    ? 'bg-frost-500/20 text-white shadow-glow'
                    : 'text-steel-300 hover:text-white'
                }`}
              >
                {t(`character.tabs.${k}`)}
              </button>
            );
          })}
        </div>

        <div className="relative w-full sm:max-w-sm">
          <Icon
            name="search"
            size={16}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-steel-400"
          />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t('character.search') as string}
            className="h-11 w-full rounded-lg border border-steel-700 bg-ink-900/60 pl-10 pr-4 text-sm text-white placeholder:text-steel-500 focus:border-frost-400/70"
          />
        </div>
      </div>

      <p className="mt-4 max-w-3xl text-sm text-steel-300">
        {tab === 'powerCards'
          ? t('character.powerCards.intro')
          : t('character.skillStones.intro')}
      </p>

      {loading ? (
        <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="h-36 animate-pulse rounded-xl border border-steel-700/40 bg-ink-900/40" />
          ))}
        </div>
      ) : (
        <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {items.map((it, i) => {
            const name = (it[titleField] as string | undefined) ?? it.id;
            const desc = ((it[descField] as string | undefined) ?? (it[descFallback] as string | undefined) ?? '').trim();
            return (
              <motion.li
                key={it.id}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.35, delay: (i % 8) * 0.03 }}
                className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-steel-700/60 bg-panel-grad p-4 shadow-panel transition hover:-translate-y-0.5 hover:border-frost-400/70 hover:shadow-glow"
              >
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_0%,rgba(51,166,255,0.1),transparent_60%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="relative flex items-start gap-3">
                  <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg border border-steel-700/60 bg-ink-900/70 p-1.5">
                    <AssetIcon code={it.icon1} size={44} alt={name} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="font-display text-sm leading-tight text-white">{name}</div>
                    <div className="mt-1 inline-flex items-center gap-1 rounded-full border border-frost-400/30 bg-frost-500/10 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.16em] text-frost-200">
                      {it.default_grade ? `Tier ${it.default_grade}` : '—'}
                    </div>
                  </div>
                </div>
                <p className="relative mt-3 text-xs leading-relaxed text-steel-300">
                  {desc || (t('character.noDescription') as string)}
                </p>
              </motion.li>
            );
          })}
        </ul>
      )}
    </Container>
  );
}
