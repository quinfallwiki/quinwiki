import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

import { SectionHeading } from '@/components/ui/SectionHeading';
import { Icon } from '@/components/ui/Icon';
import { SYSTEM_SPECS } from '@/data/system';

export function SpecsCompare() {
  const { t } = useTranslation('system');

  return (
    <section className="space-y-6">
      <SectionHeading
        kicker={t('specs.kicker') as string}
        title={t('specs.title') as string}
        subtitle={t('specs.subtitle') as string}
      />

      {/* Column header strip */}
      <div className="grid grid-cols-[180px_1fr_1fr] items-end gap-3 sm:grid-cols-[220px_1fr_1fr] sm:gap-5">
        <div />
        <ColumnHeader label={t('specs.minHeader') as string} accent="border-steel-500/50 from-steel-500/10 text-steel-200" />
        <ColumnHeader label={t('specs.recHeader') as string} accent="border-frost-400/55 from-frost-500/15 text-frost-200" highlight />
      </div>

      {/* Spec rows */}
      <ul className="space-y-3">
        {SYSTEM_SPECS.map((row, i) => (
          <motion.li
            key={row.id}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-30px' }}
            transition={{ duration: 0.4, delay: Math.min(i, 7) * 0.05 }}
            className="group grid grid-cols-[180px_1fr_1fr] items-stretch gap-3 sm:grid-cols-[220px_1fr_1fr] sm:gap-5"
          >
            {/* Row label */}
            <div className="flex items-center gap-3 rounded-2xl border border-steel-700/60 bg-ink-900/70 px-4 py-3 transition group-hover:border-frost-400/55">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-steel-700/60 bg-ink-950/80 text-frost-200">
                <Icon name={row.icon} size={16} />
              </span>
              <span className="font-display text-sm text-white sm:text-base">
                {t(`specs.rows.${row.id}`)}
              </span>
            </div>

            {/* Min value */}
            <SpecCell
              text={row.min}
              accent="border-steel-700/60 bg-ink-900/60 text-steel-200"
            />

            {/* Recommended value */}
            <SpecCell
              text={row.recommended}
              accent="border-frost-400/40 bg-frost-500/10 text-frost-100"
              highlight
            />
          </motion.li>
        ))}
      </ul>
    </section>
  );
}

function ColumnHeader({
  label,
  accent,
  highlight,
}: {
  label: string;
  accent: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl border bg-gradient-to-b to-transparent px-4 py-2.5 text-center text-[11px] font-semibold uppercase tracking-[0.2em] ${accent}`}
    >
      {label}
      {highlight && (
        <motion.span
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-frost-400/15 to-transparent"
          animate={{ x: ['-100%', '100%'] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: 'linear' }}
        />
      )}
    </div>
  );
}

function SpecCell({
  text,
  accent,
  highlight,
}: {
  text: string;
  accent: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`relative flex items-center rounded-2xl border px-4 py-3 text-sm leading-snug transition ${accent}`}
    >
      {highlight && (
        <span
          aria-hidden
          className="absolute -left-px top-1/2 h-8 w-[3px] -translate-y-1/2 rounded-r bg-frost-400/80"
        />
      )}
      <span>{text}</span>
    </div>
  );
}
