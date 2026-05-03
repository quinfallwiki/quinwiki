import { lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { Layout } from '@/components/layout/Layout';
import { LangGate } from '@/routes/LangGate';
import { PageLoader } from '@/components/ui/PageLoader';
import { DEFAULT_LANGUAGE } from '@/i18n/languages';
import { PAGES } from '@/routes/pages';

const HomePage = lazy(() => import('@/pages/HomePage'));
const GuidePage = lazy(() => import('@/pages/GuidePage'));
const ClassesPage = lazy(() => import('@/pages/ClassesPage'));
const ClassDetailPage = lazy(() => import('@/pages/ClassDetailPage'));
const CraftingPage = lazy(() => import('@/pages/CraftingPage'));
const DungeonsPage = lazy(() => import('@/pages/DungeonsPage'));
const ItemsPage = lazy(() => import('@/pages/ItemsPage'));
const CraftCalcPage = lazy(() => import('@/pages/CraftCalcPage'));
const MountsPage = lazy(() => import('@/pages/MountsPage'));
const SailingPage = lazy(() => import('@/pages/SailingPage'));
const CaravanPage = lazy(() => import('@/pages/CaravanPage'));
const LevelingPage = lazy(() => import('@/pages/LevelingPage'));
const GalleryPage = lazy(() => import('@/pages/GalleryPage'));
const SystemPage = lazy(() => import('@/pages/SystemPage'));
const StudioPage = lazy(() => import('@/pages/StudioPage'));
const ContactPage = lazy(() => import('@/pages/ContactPage'));
const PatchNotesPage = lazy(() => import('@/pages/PatchNotesPage'));
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'));

const PAGE_COMPONENTS: Record<string, React.ComponentType> = {
  home: HomePage,
  guide: GuidePage,
  classes: ClassesPage,
  crafting: CraftingPage,
  dungeons: DungeonsPage,
  items: ItemsPage,
  craftCalc: CraftCalcPage,
  mounts: MountsPage,
  sailing: SailingPage,
  caravan: CaravanPage,
  leveling: LevelingPage,
  gallery: GalleryPage,
  system: SystemPage,
  updates: PatchNotesPage,
  studio: StudioPage,
  contact: ContactPage,
};

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to={`/${DEFAULT_LANGUAGE}`} replace />} />
      <Route path="/:lang" element={<LangGate />}>
        <Route element={<Layout />}>
          {PAGES.map((page) => {
            const Component = PAGE_COMPONENTS[page.key];
            if (!Component) return null;
            return (
              <Route
                key={page.key}
                index={page.slug === ''}
                path={page.slug || undefined}
                element={
                  <Suspense fallback={<PageLoader />}>
                    <Component />
                  </Suspense>
                }
              />
            );
          })}
          <Route
            path="siniflar/:slug"
            element={
              <Suspense fallback={<PageLoader />}>
                <ClassDetailPage />
              </Suspense>
            }
          />
          <Route
            path="*"
            element={
              <Suspense fallback={<PageLoader />}>
                <NotFoundPage />
              </Suspense>
            }
          />
        </Route>
      </Route>
    </Routes>
  );
}
