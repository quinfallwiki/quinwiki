import { useEffect, useState } from 'react';
import { NavLink, useLocation, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';

import { Container } from '@/components/ui/Container';
import { Icon } from '@/components/ui/Icon';
import { LanguageSwitcher } from '@/components/layout/LanguageSwitcher';
import { MegaMenu } from '@/components/layout/MegaMenu';
import { SearchTrigger } from '@/features/search/SearchTrigger';
import { PRIMARY_NAV } from '@/routes/navGroups';
import { PAGES } from '@/routes/pages';
import { EXTERNAL_LINKS } from '@/data/external';

export function Navbar() {
  const { t } = useTranslation();
  const { lang } = useParams();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8);
    }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const langPrefix = `/${lang ?? 'tr'}`;

  return (
    <>
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'border-b border-steel-700/60 bg-ink-950/85 backdrop-blur-xl shadow-[0_8px_32px_-8px_rgba(0,0,0,0.6)]'
            : 'border-b border-transparent bg-ink-950/30 backdrop-blur-md'
        }`}
      >
        <div className="pointer-events-none absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-frost-400/40 to-transparent opacity-70" />

        <Container size="xl" className="flex h-16 items-center gap-4">
          <NavLink to={langPrefix} className="group flex shrink-0 items-center gap-3">
            <div className="relative">
              <img
                src="/logo.webp"
                alt={t('brand.title')}
                className="relative h-9 w-auto transition-transform duration-300 group-hover:scale-110"
                loading="eager"
                decoding="async"
              />
              <div className="absolute inset-0 -z-10 rounded-full bg-frost-500/30 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100" />
            </div>
            <span className="hidden font-display text-lg tracking-wide heading-gradient sm:inline">
              {t('brand.title')}
            </span>
          </NavLink>

          <nav className="ml-auto hidden items-center gap-0.5 lg:flex">
            {PRIMARY_NAV.map((page) => (
              <NavLink
                key={page.key}
                to={`${langPrefix}/${page.slug}`}
                end={page.slug === ''}
                className={({ isActive }) =>
                  `group relative rounded-md px-3 py-2 text-sm font-medium transition ${
                    isActive
                      ? 'text-white'
                      : 'text-steel-200 hover:text-white'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span className="relative z-10">{t(page.navKey)}</span>
                    {isActive && (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-0 rounded-md bg-ink-800/70 ring-1 ring-frost-400/30"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                    <span className="pointer-events-none absolute inset-x-2 -bottom-px h-px scale-x-0 bg-frost-400/60 transition-transform duration-300 group-hover:scale-x-100" />
                  </>
                )}
              </NavLink>
            ))}
            <MegaMenu langPrefix={langPrefix} />
          </nav>

          <div className="ml-auto flex items-center gap-2 lg:ml-2">
            <SearchTrigger />
            <a
              href={EXTERNAL_LINKS.discord}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden h-10 w-10 items-center justify-center rounded-lg border border-steel-700 text-steel-100 transition hover:border-frost-400/70 hover:text-white sm:inline-flex"
              aria-label="Discord"
              title="Discord"
            >
              <Icon name="discord" size={18} />
            </a>
            <LanguageSwitcher />
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={t('actions.menu')}
              aria-expanded={open}
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-steel-700 text-steel-100 transition hover:border-frost-400/70 hover:text-white lg:hidden"
            >
              <Icon name={open ? 'close' : 'menu'} />
            </button>
          </div>
        </Container>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-30 lg:hidden"
          >
            <div className="absolute inset-0 bg-ink-950/85 backdrop-blur-xl" onClick={() => setOpen(false)} />
            <motion.div
              initial={{ y: -16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -16, opacity: 0 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="relative mx-auto mt-20 max-w-2xl px-4"
            >
              <div className="panel max-h-[80vh] overflow-y-auto p-3 scrollbar-thin">
                <ul className="grid grid-cols-1 gap-1">
                  {PAGES.map((page) => (
                    <li key={page.key}>
                      <NavLink
                        to={`${langPrefix}/${page.slug}`}
                        end={page.slug === ''}
                        className={({ isActive }) =>
                          `flex items-center gap-3 rounded-lg px-3 py-3 text-sm transition ${
                            isActive
                              ? 'bg-frost-500/15 text-white'
                              : 'text-steel-200 hover:bg-ink-800/70 hover:text-white active:bg-ink-800'
                          }`
                        }
                      >
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-steel-700/60 bg-ink-800/60 text-frost-300">
                          <Icon
                            name={page.iconKey as Parameters<typeof Icon>[0]['name']}
                            size={18}
                          />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block font-medium leading-tight">{t(page.navKey)}</span>
                          <span className="block truncate text-[11px] leading-tight text-steel-400">
                            {t(`pages.${page.key}.summary`, { defaultValue: '' })}
                          </span>
                        </span>
                        <Icon name="arrow-right" size={12} className="shrink-0 text-steel-500" />
                      </NavLink>
                    </li>
                  ))}
                </ul>
                <div className="mt-3 flex items-center justify-between border-t border-steel-700/60 pt-3">
                  <a
                    href={EXTERNAL_LINKS.discord}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-ghost h-10 px-4 text-sm"
                  >
                    <Icon name="discord" size={16} />
                    Discord
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
