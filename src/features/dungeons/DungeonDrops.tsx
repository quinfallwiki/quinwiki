import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { SectionHeading } from '@/components/ui/SectionHeading';
import { INSTANCED_DUNGEONS, type DungeonEntry } from '@/data/dungeons';

type Mode = 'soloEasy' | 'soloNormal' | 'soloHard' | 'soloVeryHard' | 'party';

const MODE_FILE_SUFFIX: Record<Mode, string> = {
  soloEasy: 'bireysel-kolay',
  soloNormal: 'bireysel-orta',
  soloHard: 'bireysel-zor',
  soloVeryHard: 'bireysel-cokzor',
  party: 'party',
};

const MODES: { id: Mode; tone: string; activeTone: string }[] = [
  { id: 'soloEasy', tone: 'border-emerald-400/40 text-emerald-200', activeTone: 'bg-emerald-500/20 border-emerald-400 text-emerald-100' },
  { id: 'soloNormal', tone: 'border-frost-400/40 text-frost-200', activeTone: 'bg-frost-500/20 border-frost-400 text-frost-100' },
  { id: 'soloHard', tone: 'border-ember-400/40 text-ember-200', activeTone: 'bg-ember-500/20 border-ember-400 text-ember-100' },
  { id: 'soloVeryHard', tone: 'border-rose-400/50 text-rose-200', activeTone: 'bg-rose-500/20 border-rose-400 text-rose-100' },
  { id: 'party', tone: 'border-purple-400/50 text-purple-200', activeTone: 'bg-purple-500/20 border-purple-400 text-purple-100' },
];

type Manifest = Record<string, string[]>;

export function DungeonDrops() {
  const { t } = useTranslation('dungeons');
  const [manifest, setManifest] = useState<Manifest | null>(null);

  useEffect(() => {
    fetch('/assets/quinfall/drops-manifest.json')
      .then((r) => r.json())
      .then((m: Manifest) => setManifest(m))
      .catch(() => setManifest({}));
  }, []);

  return (
    <section className="space-y-8">
      <SectionHeading
        kicker={t('drops.kicker') as string}
        title={t('drops.title') as string}
        subtitle={t('drops.subtitle') as string}
      />

      <div className="rounded-2xl border border-steel-700/60 bg-ink-900/60 p-5 text-sm text-steel-300">
        <div className="font-display text-base text-white">{t('drops.rule.title')}</div>
        <p className="mt-2 leading-relaxed">{t('drops.rule.body')}</p>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-steel-700/60 bg-ink-900/60">
        <table className="w-full min-w-[640px] border-collapse text-sm">
          <thead>
            <tr className="text-left text-[11px] uppercase tracking-[0.18em] text-steel-400">
              <th className="border-b border-steel-700/60 p-4 font-semibold">{t('drops.table.dungeon')}</th>
              <th className="border-b border-steel-700/60 p-4 text-center font-semibold">{t('drops.table.easy')}</th>
              <th className="border-b border-steel-700/60 p-4 text-center font-semibold">{t('drops.table.normal')}</th>
              <th className="border-b border-steel-700/60 p-4 text-center font-semibold">{t('drops.table.hard')}</th>
              <th className="border-b border-steel-700/60 p-4 text-center font-semibold">{t('drops.table.veryHard')}</th>
              <th className="border-b border-steel-700/60 p-4 text-center font-semibold">{t('drops.table.party')}</th>
            </tr>
          </thead>
          <tbody>
            {INSTANCED_DUNGEONS.filter((d) => d.status === 'live').map((d) => (
              <tr key={d.id} className="text-steel-200 transition hover:bg-ink-800/40">
                <td className="border-b border-steel-700/40 p-4 font-display text-white">
                  {t(`instanced.list.${d.id}.name`)}
                </td>
                <td className="border-b border-steel-700/40 p-4 text-center">{d.drops.soloEasy}</td>
                <td className="border-b border-steel-700/40 p-4 text-center">{d.drops.soloNormal}</td>
                <td className="border-b border-steel-700/40 p-4 text-center">{d.drops.soloHard}</td>
                <td className="border-b border-steel-700/40 p-4 text-center font-display text-ember-200">
                  {d.drops.soloVeryHard}
                </td>
                <td className="border-b border-steel-700/40 p-4 text-center text-purple-200">{d.drops.party}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="space-y-10">
        {INSTANCED_DUNGEONS.filter((d) => d.status === 'live').map((d) => (
          <DungeonDropPanel key={d.id} dungeon={d} t={t} manifest={manifest} />
        ))}
      </div>
    </section>
  );
}

function DungeonDropPanel({
  dungeon,
  t,
  manifest,
}: {
  dungeon: DungeonEntry;
  t: (k: string, opts?: Record<string, unknown>) => unknown;
  manifest: Manifest | null;
}) {
  const [mode, setMode] = useState<Mode>('soloVeryHard');
  const folder = `${dungeon.imageBase}-${MODE_FILE_SUFFIX[mode]}`;
  const cells = manifest?.[folder] ?? [];

  return (
    <article className="overflow-hidden rounded-2xl border border-steel-700/60 bg-ink-900/60">
      <header className="flex flex-col gap-2 border-b border-steel-700/60 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="font-display text-xl text-white">{t(`instanced.list.${dungeon.id}.name`)}</h3>
          <p className="mt-1 text-sm text-steel-400">{t(`instanced.list.${dungeon.id}.body`)}</p>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <span className="rounded-full border border-steel-700/60 bg-ink-800/60 px-3 py-1 text-xs font-medium text-steel-200">
            {t('drops.itemCount', { count: cells.length })}
          </span>
        </div>
      </header>

      <div className="flex flex-wrap gap-2 p-4">
        {MODES.map((m) => {
          const active = mode === m.id;
          return (
            <button
              key={m.id}
              type="button"
              onClick={() => setMode(m.id)}
              className={`rounded-full border px-3 py-1.5 text-xs font-medium transition ${
                active ? m.activeTone : `${m.tone} bg-ink-800/40 hover:bg-ink-800/80`
              }`}
            >
              {t(`drops.modes.${m.id}`)}
            </button>
          );
        })}
      </div>

      <div className="border-t border-steel-700/60 bg-ink-950/60 p-4 sm:p-6">
        {manifest === null ? (
          <div className="flex h-32 items-center justify-center text-sm text-steel-500">
            {t('drops.loading')}
          </div>
        ) : cells.length === 0 ? (
          <div className="flex h-32 items-center justify-center text-sm text-steel-500">
            {t('drops.empty')}
          </div>
        ) : (
          <div className="grid grid-cols-4 gap-2 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10">
            {cells.map((cell) => (
              <div
                key={cell}
                className="group relative aspect-square overflow-hidden rounded-lg border border-steel-700/60 bg-ink-900/80 shadow-inner transition hover:border-ember-400/60 hover:shadow-glow"
              >
                <img
                  src={`/assets/quinfall/drop-cells/${folder}/${cell}`}
                  alt=""
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-300 group-hover:scale-110"
                />
              </div>
            ))}
          </div>
        )}
        {mode === 'party' && (
          <p className="mt-4 text-center text-xs text-purple-200/80">
            {t('drops.partyConstant')}
          </p>
        )}
      </div>
    </article>
  );
}
