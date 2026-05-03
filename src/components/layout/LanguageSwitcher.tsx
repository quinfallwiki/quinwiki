import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { LANGUAGES, isLanguageCode, type LanguageCode } from '@/i18n/languages';
import { Icon } from '@/components/ui/Icon';

export function LanguageSwitcher() {
  const { t } = useTranslation();
  const { lang } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const currentCode: LanguageCode = isLanguageCode(lang ?? '') ? (lang as LanguageCode) : 'tr';
  const current = LANGUAGES.find((l) => l.code === currentCode) ?? LANGUAGES[0];

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    }
    if (open) document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  function pick(code: LanguageCode) {
    if (code === currentCode) {
      setOpen(false);
      return;
    }
    const segments = location.pathname.split('/').filter(Boolean);
    segments[0] = code;
    navigate('/' + segments.join('/') + location.search, { replace: false });
    setOpen(false);
  }

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={t('actions.language')}
        className="inline-flex h-10 items-center gap-2 rounded-lg border border-steel-700 px-3 text-sm text-steel-100 transition hover:border-frost-400/70 hover:text-white"
      >
        <Icon name="globe" size={16} />
        <span className="hidden sm:inline">{current.nativeLabel}</span>
        <span className="sm:hidden">{current.code.toUpperCase()}</span>
      </button>
      {open && (
        <div
          role="listbox"
          className="absolute right-0 z-30 mt-2 max-h-80 w-48 overflow-y-auto rounded-lg border border-steel-700 bg-ink-900/95 p-1 shadow-panel backdrop-blur scrollbar-thin"
        >
          {LANGUAGES.map((l) => {
            const active = l.code === currentCode;
            return (
              <button
                key={l.code}
                role="option"
                aria-selected={active}
                onClick={() => pick(l.code)}
                className={`flex w-full items-center justify-between gap-3 rounded-md px-3 py-2 text-sm transition ${
                  active
                    ? 'bg-frost-500/15 text-white'
                    : 'text-steel-200 hover:bg-ink-800/70 hover:text-white'
                }`}
              >
                <span>{l.nativeLabel}</span>
                <span className="text-xs uppercase tracking-wide text-steel-400">{l.code}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
