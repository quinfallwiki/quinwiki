import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

import { Icon } from '@/components/ui/Icon';
import type { ClassDef } from '@/data/classes';
import { StatBars } from '@/features/classes/StatBars';
import { WeaponIcon } from '@/features/classes/WeaponIcon';

interface ClassCardProps {
  cls: ClassDef;
  index: number;
}

const ROLE_TINT: Record<ClassDef['role'], string> = {
  tank: 'from-frost-500/30 to-frost-700/0 group-hover:from-frost-500/45',
  melee: 'from-ember-500/30 to-ember-700/0 group-hover:from-ember-500/45',
  ranged: 'from-emerald-500/25 to-emerald-700/0 group-hover:from-emerald-500/40',
  magic: 'from-purple-500/25 to-purple-700/0 group-hover:from-purple-500/40',
  healer: 'from-rose-400/25 to-rose-700/0 group-hover:from-rose-400/40',
};

const ROLE_BORDER: Record<ClassDef['role'], string> = {
  tank: 'group-hover:border-frost-400/70',
  melee: 'group-hover:border-ember-400/70',
  ranged: 'group-hover:border-emerald-400/70',
  magic: 'group-hover:border-purple-400/70',
  healer: 'group-hover:border-rose-400/70',
};

const ROLE_ICON_BG: Record<ClassDef['role'], string> = {
  tank: 'bg-frost-500/10 group-hover:bg-frost-500/20',
  melee: 'bg-ember-500/10 group-hover:bg-ember-500/20',
  ranged: 'bg-emerald-500/10 group-hover:bg-emerald-500/20',
  magic: 'bg-purple-500/10 group-hover:bg-purple-500/20',
  healer: 'bg-rose-500/10 group-hover:bg-rose-500/20',
};

export function ClassCard({ cls, index }: ClassCardProps) {
  const { t } = useTranslation('classes');
  const { lang } = useParams();
  const langPrefix = `/${lang ?? 'tr'}`;
  const name = t(`weapons.${cls.weaponKey}.name`);
  const tagline = t(`weapons.${cls.weaponKey}.tagline`);
  const summary = t(`weapons.${cls.weaponKey}.summary`);

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5, delay: (index % 5) * 0.05, ease: 'easeOut' }}
      className={`group relative flex h-full flex-col overflow-hidden rounded-2xl border border-steel-700/60 bg-panel-grad p-6 shadow-panel transition duration-300 ${ROLE_BORDER[cls.role]} hover:-translate-y-0.5 hover:shadow-glow`}
    >
      <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${ROLE_TINT[cls.role]} opacity-70 transition-opacity duration-500`} />
      <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-frost-500/10 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />

      <div className="relative flex items-start gap-4">
        <div className={`flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl border border-steel-700/60 ${ROLE_ICON_BG[cls.role]} p-2 transition-all duration-300 group-hover:scale-105 group-hover:border-frost-400/60`}>
          <WeaponIcon cls={cls} size={64} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="rounded-full border border-steel-700/60 bg-ink-900/70 px-2 py-0.5 text-[10px] uppercase tracking-[0.18em] text-steel-300">
              {t(`filter.${cls.role}`)}
            </span>
            <span className="rounded-full border border-steel-700/60 bg-ink-900/70 px-2 py-0.5 text-[10px] uppercase tracking-[0.18em] text-steel-300">
              {t(`speeds.${cls.attackSpeed}`)}
            </span>
          </div>
          <h3 className="mt-2 font-display text-xl text-white">{name}</h3>
          <p className="mt-0.5 text-sm text-frost-300/90">{tagline}</p>
        </div>
      </div>

      <p className="relative mt-4 text-sm leading-relaxed text-steel-200">{summary}</p>

      <div className="relative mt-5 rounded-xl border border-steel-700/40 bg-ink-900/40 p-3">
        <StatBars stats={cls.stats} compact />
      </div>

      <div className="relative mt-5 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <span
              key={i}
              className={`h-1.5 w-4 rounded-full ${
                i < cls.difficulty ? 'bg-frost-400' : 'bg-steel-700'
              }`}
            />
          ))}
          <span className="ml-2 text-[10px] uppercase tracking-[0.18em] text-steel-400">
            {t('labels.difficulty')}
          </span>
        </div>
        <Link
          to={`${langPrefix}/siniflar/${cls.slug}`}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-frost-300 transition group-hover:gap-2.5 group-hover:text-white"
        >
          {t('actions.viewDetail')}
          <Icon name="arrow-right" size={14} />
        </Link>
      </div>
    </motion.article>
  );
}
