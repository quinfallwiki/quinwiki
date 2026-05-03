import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

import { Icon } from '@/components/ui/Icon';
import type { ComboDef } from '@/data/weaponCombos';
import { findClassByWeapon } from '@/data/classes';
import { WeaponIcon } from '@/features/classes/WeaponIcon';

interface ComboCardProps {
  combo: ComboDef;
  index: number;
}

export function ComboCard({ combo, index }: ComboCardProps) {
  const { t } = useTranslation('classes');
  const { lang } = useParams();
  const langPrefix = `/${lang ?? 'tr'}`;
  const primary = findClassByWeapon(combo.primary);
  const secondary = findClassByWeapon(combo.secondary);

  return (
    <motion.article
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.45, delay: (index % 6) * 0.04 }}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-steel-700/60 bg-panel-grad p-5 shadow-panel transition duration-300 hover:-translate-y-0.5 hover:border-frost-400/70 hover:shadow-glow"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,rgba(51,166,255,0.18),transparent_60%)]" />

      <div className="relative flex items-center gap-3">
        {primary && (
          <Link
            to={`${langPrefix}/siniflar/${primary.slug}`}
            className="flex h-16 w-16 items-center justify-center rounded-lg border border-steel-700/60 bg-ink-900/70 p-1.5 transition hover:border-frost-400/70 hover:bg-frost-500/10"
            aria-label={t(`weapons.${primary.weaponKey}.name`) as string}
          >
            <WeaponIcon cls={primary} size={48} />
          </Link>
        )}
        <Icon name="arrow-right" size={14} className="text-steel-500" />
        {secondary && (
          <Link
            to={`${langPrefix}/siniflar/${secondary.slug}`}
            className="flex h-16 w-16 items-center justify-center rounded-lg border border-steel-700/60 bg-ink-900/70 p-1.5 transition hover:border-frost-400/70 hover:bg-frost-500/10"
            aria-label={t(`weapons.${secondary.weaponKey}.name`) as string}
          >
            <WeaponIcon cls={secondary} size={48} />
          </Link>
        )}
        <span className="ml-auto rounded-full border border-frost-400/30 bg-frost-500/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-frost-200">
          {t(`combos.roles.${combo.role}`)}
        </span>
      </div>

      <h3 className="relative mt-4 font-display text-xl text-white">
        {t(`combos.list.${combo.id}.name`)}
      </h3>
      <p className="relative mt-1 text-sm font-medium text-frost-300/90">
        {primary && t(`weapons.${primary.weaponKey}.name`)}
        <span className="mx-1.5 text-steel-500">+</span>
        {secondary && t(`weapons.${secondary.weaponKey}.name`)}
      </p>

      <p className="relative mt-3 text-sm leading-relaxed text-steel-200">
        {t(`combos.list.${combo.id}.description`)}
      </p>

      <div className="relative mt-4 flex items-center justify-between border-t border-steel-700/40 pt-3">
        <div className="flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <span
              key={i}
              className={`h-1.5 w-3 rounded-full ${i < combo.difficulty ? 'bg-frost-400' : 'bg-steel-700'}`}
            />
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-1">
          {combo.bestFor.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-steel-700/60 bg-ink-900/60 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.16em] text-steel-300"
            >
              {t(`tags.${tag}`)}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  );
}
