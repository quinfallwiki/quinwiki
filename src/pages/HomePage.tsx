import { Seo } from '@/components/seo/Seo';
import { Hero } from '@/features/home/Hero';
import { LatestPatchStrip } from '@/features/home/LatestPatchStrip';
import { StatsBand } from '@/features/home/StatsBand';
import { CategoryGrid } from '@/features/home/CategoryGrid';
import { UpdatesPanel } from '@/features/home/UpdatesPanel';
import { CommunityCta } from '@/features/home/CommunityCta';

export default function HomePage() {
  return (
    <>
      <Seo />
      <Hero />
      <LatestPatchStrip />
      <StatsBand />
      <CategoryGrid />
      <UpdatesPanel />
      <CommunityCta />
    </>
  );
}
