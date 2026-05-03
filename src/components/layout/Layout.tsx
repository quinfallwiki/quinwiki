import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { SearchModal } from '@/features/search/SearchModal';

export function Layout() {
  const location = useLocation();

  // Scroll to top whenever the route changes — a sane default for a wiki
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        {/*
          Plain fade-in keyed on pathname.
          NOTE: We deliberately don't use <AnimatePresence mode="wait">
          here — combined with React.lazy + <Suspense>, the exit-then-mount
          ordering produced a black flash while the new chunk loaded and
          the previous Suspense fallback animated out.
        */}
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.22, ease: 'easeOut' }}
        >
          <Outlet />
        </motion.div>
      </main>
      <Footer />
      <SearchModal />
    </div>
  );
}
