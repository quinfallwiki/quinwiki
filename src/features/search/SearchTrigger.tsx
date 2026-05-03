import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Icon } from '@/components/ui/Icon';
import { useSearchStore } from '@/stores/searchStore';

/**
 * Compact navbar button + global Ctrl/⌘+K hotkey to open the search modal.
 */
export function SearchTrigger() {
  const { t } = useTranslation();
  const openSearch = useSearchStore((s) => s.openSearch);
  const toggleSearch = useSearchStore((s) => s.toggleSearch);
  const [isMac, setIsMac] = useState(false);

  useEffect(() => {
    setIsMac(/Mac|iPhone|iPad/i.test(navigator.platform || ''));
  }, []);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        toggleSearch();
      } else if (e.key === '/' && !isInput(e.target)) {
        // Slash to open (when not already typing in an input)
        e.preventDefault();
        openSearch();
      }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [openSearch, toggleSearch]);

  return (
    <button
      type="button"
      onClick={openSearch}
      aria-label={t('search.open', { defaultValue: 'Ara' }) as string}
      title={t('search.open', { defaultValue: 'Ara' }) as string}
      className="inline-flex h-10 items-center gap-2 rounded-lg border border-steel-700 bg-ink-900/40 px-2.5 text-sm text-steel-200 transition hover:border-frost-400/70 hover:text-white sm:px-3"
    >
      <Icon name="search" size={16} />
      <span className="hidden text-xs text-steel-400 sm:inline">
        {t('search.open', { defaultValue: 'Ara' })}
      </span>
      <kbd className="hidden rounded border border-steel-700/60 bg-ink-950/70 px-1.5 py-0.5 font-mono text-[10px] text-steel-500 sm:inline-block">
        {isMac ? '⌘K' : 'Ctrl K'}
      </kbd>
    </button>
  );
}

function isInput(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;
  const tag = target.tagName;
  return tag === 'INPUT' || tag === 'TEXTAREA' || target.isContentEditable;
}
