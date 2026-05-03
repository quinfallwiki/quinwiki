import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

import { AssetIcon } from '@/components/ui/AssetIcon';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { PETS, PET_GROUPS, type PetGroup } from '@/data/mountsAndPets';

const GROUP_TONE: Record<PetGroup, string> = {
  flying:  'border-cyan-400/40 text-cyan-200',
  dragon:  'border-rose-400/40 text-rose-200',
  wolf:    'border-frost-400/40 text-frost-200',
  rhino:   'border-steel-400/40 text-steel-200',
  pitbull: 'border-amber-400/40 text-amber-200',
  raccoon: 'border-orange-400/40 text-orange-200',
  reptile: 'border-emerald-400/40 text-emerald-200',
  rabbit:  'border-violet-400/40 text-violet-200',
  rodent:  'border-yellow-400/40 text-yellow-200',
  serpent: 'border-lime-400/40 text-lime-200',
  mythic:  'border-purple-400/40 text-purple-200',
  special: 'border-ember-400/40 text-ember-200',
};

export function PetSection() {
  const { t } = useTranslation('mounts');
  const [activeGroup, setActiveGroup] = useState<PetGroup | 'all'>('all');

  const filtered = activeGroup === 'all' ? PETS : PETS.filter((p) => p.group === activeGroup);

  return (
    <section className="space-y-6">
      <SectionHeading
        kicker={t('pets.kicker') as string}
        title={t('pets.title') as string}
        subtitle={t('pets.subtitle') as string}
      />

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setActiveGroup('all')}
          className={`rounded-full border px-3 py-1.5 text-xs font-medium transition ${
            activeGroup === 'all'
              ? 'border-frost-400 bg-frost-500/20 text-white'
              : 'border-steel-700/60 bg-ink-800/40 text-steel-300 hover:bg-ink-800/80'
          }`}
        >
          {t('pets.filterAll', { count: PETS.length })}
        </button>
        {PET_GROUPS.map((g) => {
          const active = activeGroup === g;
          const count = PETS.filter((p) => p.group === g).length;
          if (count === 0) return null;
          return (
            <button
              key={g}
              type="button"
              onClick={() => setActiveGroup(g)}
              className={`rounded-full border px-3 py-1.5 text-xs font-medium transition ${
                active ? `${GROUP_TONE[g]} bg-ink-900/70` : 'border-steel-700/60 bg-ink-800/40 text-steel-300 hover:bg-ink-800/80'
              }`}
            >
              {t(`pets.groups.${g}`)} <span className="ml-1 opacity-60">({count})</span>
            </button>
          );
        })}
      </div>

      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {filtered.map((p, i) => (
          <motion.li
            key={p.id}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-30px' }}
            transition={{ duration: 0.3, delay: (i % 6) * 0.04 }}
            className="group flex flex-col overflow-hidden rounded-2xl border border-steel-700/60 bg-ink-900/70 transition hover:-translate-y-0.5 hover:border-frost-400/50 hover:shadow-glow"
          >
            <div
              className="relative flex aspect-square items-center justify-center overflow-hidden bg-ink-950"
              style={{ background: `radial-gradient(ellipse at center, ${p.accent}1f 0%, transparent 70%)` }}
            >
              <AssetIcon
                code={p.iconCode}
                size={88}
                glow
                alt={t(`pets.list.${p.id}`, { defaultValue: p.id }) as string}
                className="transition duration-500 group-hover:scale-110"
              />
              <span className={`absolute right-2 top-2 rounded-full border px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.16em] backdrop-blur ${GROUP_TONE[p.group]}`}>
                {t(`pets.groups.${p.group}`)}
              </span>
            </div>
            <div className="p-3">
              <div className="font-display text-sm leading-tight text-white">
                {t(`pets.list.${p.id}`, { defaultValue: p.id })}
              </div>
            </div>
          </motion.li>
        ))}
      </ul>

      <div className="rounded-2xl border border-steel-700/60 bg-ink-900/40 p-5 text-sm text-steel-300">
        <div className="font-display text-base text-white">{t('pets.note.title')}</div>
        <p className="mt-2 leading-relaxed">{t('pets.note.body')}</p>
      </div>
    </section>
  );
}
