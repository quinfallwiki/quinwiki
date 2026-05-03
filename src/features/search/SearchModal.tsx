import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';

import { Icon } from '@/components/ui/Icon';
import { useSearchStore } from '@/stores/searchStore';
import {
  buildIndex,
  search,
  KIND_ORDER,
  type EntryKind,
  type SearchEntry,
} from '@/features/search/searchIndex';
import { isLanguageCode, DEFAULT_LANGUAGE } from '@/i18n/languages';

const KIND_TONE: Record<EntryKind, { ring: string; chip: string; label: string }> = {
  page:       { ring: 'border-frost-400/55',   chip: 'bg-frost-500/15 text-frost-200 border-frost-400/45',     label: 'page' },
  profession: { ring: 'border-emerald-400/55', chip: 'bg-emerald-500/15 text-emerald-200 border-emerald-400/45', label: 'profession' },
  boss:       { ring: 'border-rose-400/55',    chip: 'bg-rose-500/15 text-rose-200 border-rose-400/45',         label: 'boss' },
  dungeon:    { ring: 'border-purple-400/55',  chip: 'bg-purple-500/15 text-purple-200 border-purple-400/45',   label: 'dungeon' },
  zone:       { ring: 'border-amber-400/55',   chip: 'bg-amber-500/15 text-amber-200 border-amber-400/45',      label: 'zone' },
  item:       { ring: 'border-ember-400/55',   chip: 'bg-ember-500/15 text-ember-200 border-ember-400/45',      label: 'item' },
  material:   { ring: 'border-lime-400/50',    chip: 'bg-lime-500/15 text-lime-200 border-lime-400/45',         label: 'material' },
  prop:       { ring: 'border-steel-400/55',   chip: 'bg-steel-500/15 text-steel-200 border-steel-400/55',      label: 'prop' },
};

export function SearchModal() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { lang } = useParams();
  const langCode = lang && isLanguageCode(lang) ? lang : DEFAULT_LANGUAGE;
  const { open, closeSearch } = useSearchStore();

  const [query, setQuery] = useState('');
  const [entries, setEntries] = useState<SearchEntry[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [highlight, setHighlight] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Build index lazily on first open or language change
  useEffect(() => {
    if (!open) return;
    let alive = true;
    setLoading(true);
    buildIndex(langCode, t)
      .then((idx) => { if (alive) { setEntries(idx); setLoading(false); } })
      .catch(() => { if (alive) setLoading(false); });
    return () => { alive = false; };
  }, [open, langCode, t]);

  // Reset on close
  useEffect(() => {
    if (!open) {
      setQuery('');
      setHighlight(0);
    } else {
      // focus input on next tick
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open]);

  const results = useMemo(() => {
    if (!entries) return [];
    return search(entries, query, 60);
  }, [entries, query]);

  // Reset highlight when results change
  useEffect(() => { setHighlight(0); }, [query]);

  // Group by kind, preserving the score order inside each group
  const grouped = useMemo(() => {
    const map = new Map<EntryKind, typeof results>();
    for (const r of results) {
      const list = map.get(r.entry.kind) ?? [];
      list.push(r);
      map.set(r.entry.kind, list);
    }
    return KIND_ORDER
      .map((k) => ({ kind: k, items: map.get(k) ?? [] }))
      .filter((g) => g.items.length > 0);
  }, [results]);

  const flatList = useMemo(() => grouped.flatMap((g) => g.items), [grouped]);

  // Keyboard navigation
  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        e.preventDefault();
        closeSearch();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setHighlight((h) => Math.min(h + 1, flatList.length - 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setHighlight((h) => Math.max(h - 1, 0));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        const sel = flatList[highlight];
        if (sel?.entry.href) {
          navigate(sel.entry.href);
          closeSearch();
        }
      }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, flatList, highlight, navigate, closeSearch]);

  // Scroll highlighted item into view
  useEffect(() => {
    const node = listRef.current?.querySelector<HTMLAnchorElement>(`[data-idx="${highlight}"]`);
    node?.scrollIntoView({ block: 'nearest' });
  }, [highlight]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          className="fixed inset-0 z-[60] flex items-start justify-center bg-ink-950/80 p-4 pt-[8vh] backdrop-blur-md"
          onClick={closeSearch}
        >
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0,   scale: 1 }}
            exit={{ opacity: 0, y: -6,    scale: 0.98 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-2xl overflow-hidden rounded-2xl border border-frost-400/40 bg-ink-950 shadow-glow-strong"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Input */}
            <div className="flex items-center gap-3 border-b border-steel-700/60 p-4">
              <Icon name="search" size={18} className="text-frost-300" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t('search.placeholder', { defaultValue: 'Sayfa, item, boss, zindan ara…' }) as string}
                className="w-full border-0 bg-transparent text-base text-white placeholder:text-steel-500 focus:outline-none"
              />
              <kbd className="hidden rounded border border-steel-700/60 bg-ink-900/70 px-2 py-0.5 text-[10px] font-mono text-steel-400 sm:inline-block">ESC</kbd>
            </div>

            {/* Results */}
            <div ref={listRef} className="max-h-[60vh] overflow-y-auto">
              {loading && (
                <div className="p-6 text-center text-sm text-steel-400">
                  {t('search.loading', { defaultValue: 'İndeks yükleniyor…' })}
                </div>
              )}

              {!loading && !query && (
                <div className="space-y-2 p-6 text-sm text-steel-400">
                  <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-frost-300/90">
                    {t('search.hintsTitle', { defaultValue: 'İpuçları' })}
                  </div>
                  <ul className="space-y-1">
                    <li>· {t('search.hint1', { defaultValue: 'Sayfa adı, eşya, boss, zindan veya bölge yaz' })}</li>
                    <li>· {t('search.hint2', { defaultValue: '↑ ↓ ile gez, Enter ile aç, Esc ile kapat' })}</li>
                    <li>· {t('search.hint3', { defaultValue: 'Türkçe karakterler önemsiz: "demir cevheri" = "Demir Cevheri"' })}</li>
                  </ul>
                </div>
              )}

              {!loading && query && grouped.length === 0 && (
                <div className="p-6 text-center text-sm text-steel-400">
                  {t('search.noResults', { defaultValue: 'Eşleşme yok.' })}
                </div>
              )}

              {!loading && grouped.map((group) => (
                <div key={group.kind} className="border-t border-steel-700/40 first:border-t-0">
                  <div className="px-4 pt-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-steel-400">
                    {t(`search.kinds.${group.kind}`, { defaultValue: group.kind })}
                    <span className="ml-2 text-steel-600">{group.items.length}</span>
                  </div>
                  <ul>
                    {group.items.map((r) => {
                      const idx = flatList.indexOf(r);
                      const tone = KIND_TONE[r.entry.kind];
                      const active = idx === highlight;
                      return (
                        <li key={r.entry.id}>
                          <a
                            data-idx={idx}
                            href={r.entry.href ?? '#'}
                            onClick={(e) => {
                              if (r.entry.href) {
                                e.preventDefault();
                                navigate(r.entry.href);
                                closeSearch();
                              }
                            }}
                            onMouseEnter={() => setHighlight(idx)}
                            className={`group flex items-center gap-3 px-4 py-2.5 text-sm transition ${
                              active ? 'bg-frost-500/12 text-white' : 'text-steel-200 hover:bg-ink-800/70 hover:text-white'
                            }`}
                          >
                            {r.entry.iconUrl ? (
                              <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-lg border bg-ink-950/60 ${tone.ring}`}>
                                <img
                                  src={r.entry.iconUrl}
                                  alt=""
                                  className="h-7 w-7 object-contain"
                                  onError={(e) => { (e.currentTarget as HTMLImageElement).style.visibility = 'hidden'; }}
                                />
                              </span>
                            ) : (
                              <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-lg border bg-ink-950/60 text-frost-200 ${tone.ring}`}>
                                <Icon name="search" size={14} />
                              </span>
                            )}
                            <div className="min-w-0 flex-1">
                              <div className="truncate font-medium">{r.entry.title}</div>
                              {r.entry.subtitle && (
                                <div className="truncate text-[11px] text-steel-400">{r.entry.subtitle}</div>
                              )}
                            </div>
                            <span className={`shrink-0 rounded-full border px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.16em] ${tone.chip}`}>
                              {t(`search.kindShort.${r.entry.kind}`, { defaultValue: tone.label })}
                            </span>
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between gap-3 border-t border-steel-700/60 bg-ink-900/40 px-4 py-2 text-[10px] text-steel-400">
              <div className="flex items-center gap-3">
                <span><kbd className="rounded border border-steel-700/60 bg-ink-950/60 px-1.5 py-0.5 font-mono">↑↓</kbd> {t('search.kbdNav', { defaultValue: 'gez' })}</span>
                <span><kbd className="rounded border border-steel-700/60 bg-ink-950/60 px-1.5 py-0.5 font-mono">Enter</kbd> {t('search.kbdOpen', { defaultValue: 'aç' })}</span>
                <span><kbd className="rounded border border-steel-700/60 bg-ink-950/60 px-1.5 py-0.5 font-mono">Esc</kbd> {t('search.kbdClose', { defaultValue: 'kapat' })}</span>
              </div>
              <span>{flatList.length}{entries ? ` / ${entries.length}` : ''}</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
