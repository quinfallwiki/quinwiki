import { useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';

import { Icon } from '@/components/ui/Icon';
import { NAV_GROUPS } from '@/routes/navGroups';

interface MegaMenuProps {
  langPrefix: string;
}

export function MegaMenu({ langPrefix }: MegaMenuProps) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (!wrapperRef.current?.contains(e.target as Node)) setOpen(false);
    }
    function onEsc(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false);
    }
    if (open) {
      document.addEventListener('mousedown', onClickOutside);
      document.addEventListener('keydown', onEsc);
    }
    return () => {
      document.removeEventListener('mousedown', onClickOutside);
      document.removeEventListener('keydown', onEsc);
    };
  }, [open]);

  return (
    <div ref={wrapperRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="true"
        aria-expanded={open}
        className={`group relative flex items-center gap-1.5 rounded-md px-3 py-2 text-sm font-medium transition ${
          open
            ? 'text-white bg-ink-800/60'
            : 'text-steel-200 hover:text-white hover:bg-ink-800/40'
        }`}
      >
        <span>{t('actions.more')}</span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="flex"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 9l6 6 6-6" />
          </svg>
        </motion.span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="absolute right-0 z-30 mt-2 w-[640px] max-w-[92vw] overflow-hidden rounded-2xl border border-steel-700 bg-ink-900/95 shadow-panel backdrop-blur-xl"
          >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_0%,rgba(51,166,255,0.15),transparent_70%)]" />
            <div className="relative grid grid-cols-3 gap-px bg-steel-700/40">
              {NAV_GROUPS.map((group) => (
                <div key={group.key} className="bg-ink-900/95 p-4">
                  <div className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-frost-300/90">
                    {t(group.labelKey)}
                  </div>
                  <ul className="space-y-1">
                    {group.pages.map((page) => (
                      <li key={page.key}>
                        <NavLink
                          to={`${langPrefix}/${page.slug}`}
                          end={page.slug === ''}
                          onClick={() => setOpen(false)}
                          className={({ isActive }) =>
                            `flex items-center gap-3 rounded-lg px-2.5 py-2 text-sm transition ${
                              isActive
                                ? 'bg-frost-500/15 text-white'
                                : 'text-steel-200 hover:bg-ink-800/70 hover:text-white'
                            }`
                          }
                        >
                          <span className="flex h-8 w-8 items-center justify-center rounded-md border border-steel-700/60 bg-ink-800/60 text-frost-300">
                            <Icon
                              name={page.iconKey as Parameters<typeof Icon>[0]['name']}
                              size={16}
                            />
                          </span>
                          <span>{t(page.navKey)}</span>
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
