import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

import { SectionHeading } from '@/components/ui/SectionHeading';
import {
  ARMOR_WEIGHTS,
  WEAPON_FAMILIES,
  type ArmorWeight,
  type WeaponFamily,
} from '@/features/items/itemTaxonomy';

const WEAPON_ACCENT: Record<WeaponFamily, { ring: string; glow: string; icon: string }> = {
  sword:        { ring: 'border-frost-400/50',   glow: 'from-frost-500/20',   icon: '⚔' },
  shield:       { ring: 'border-steel-400/60',   glow: 'from-steel-500/20',   icon: '🛡' },
  twoHandSword: { ring: 'border-rose-400/50',    glow: 'from-rose-500/20',    icon: '🗡' },
  spear:        { ring: 'border-emerald-400/50', glow: 'from-emerald-500/20', icon: '╋' },
  dualAxe:      { ring: 'border-ember-400/55',   glow: 'from-ember-500/25',   icon: '🪓' },
  dualDagger:   { ring: 'border-purple-400/55',  glow: 'from-purple-500/25',  icon: '🗡' },
  bow:          { ring: 'border-emerald-400/45', glow: 'from-emerald-500/15', icon: '🏹' },
  dualCrossbow: { ring: 'border-amber-400/50',   glow: 'from-amber-500/20',   icon: '⊹' },
  arcaneStaff:  { ring: 'border-purple-400/55',  glow: 'from-purple-500/25',  icon: '✦' },
  lifeStaff:    { ring: 'border-emerald-400/55', glow: 'from-emerald-500/25', icon: '✚' },
  warHammer:    { ring: 'border-ember-400/55',   glow: 'from-ember-500/25',   icon: '⚒' },
};

const ARMOR_ACCENT: Record<ArmorWeight, { ring: string; glow: string; icon: string }> = {
  heavy: { ring: 'border-steel-400/60',   glow: 'from-steel-500/25',   icon: '⛨' },
  light: { ring: 'border-emerald-400/55', glow: 'from-emerald-500/20', icon: '⟁' },
  robe:  { ring: 'border-purple-400/55',  glow: 'from-purple-500/25',  icon: '✦' },
};

export function EquipmentExplainer() {
  const { t } = useTranslation('items');

  return (
    <section className="space-y-12">
      <SectionHeading
        kicker={t('explainer.kicker') as string}
        title={t('explainer.title') as string}
        subtitle={t('explainer.subtitle') as string}
      />

      {/* WEAPON FAMILIES ----------------------------------------------------- */}
      <div className="space-y-5">
        <SectionHeading
          kicker={t('explainer.weapons.kicker') as string}
          title={t('explainer.weapons.title') as string}
          subtitle={t('explainer.weapons.subtitle') as string}
        />
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {WEAPON_FAMILIES.map((fam, i) => {
            const a = WEAPON_ACCENT[fam];
            return (
              <motion.li
                key={fam}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.35, delay: (i % 4) * 0.05 }}
                className={`relative overflow-hidden rounded-2xl border bg-ink-900/70 p-5 shadow-panel transition hover:-translate-y-0.5 hover:shadow-glow ${a.ring}`}
              >
                <div
                  aria-hidden
                  className={`pointer-events-none absolute -top-12 -right-12 h-32 w-32 rounded-full bg-gradient-to-br opacity-50 blur-2xl ${a.glow}`}
                />
                <div className="flex items-start gap-3">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl border border-steel-700/60 bg-ink-950 text-xl text-frost-200">
                    {a.icon}
                  </span>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-display text-base text-white">
                      {t(`weapons.${fam}.name`)}
                    </h3>
                    <p className="mt-0.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-frost-300/90">
                      {t(`weapons.${fam}.tagline`)}
                    </p>
                  </div>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-steel-300/90">
                  {t(`weapons.${fam}.body`)}
                </p>
              </motion.li>
            );
          })}
        </ul>
      </div>

      {/* ARMOR WEIGHTS ------------------------------------------------------- */}
      <div className="space-y-5">
        <SectionHeading
          kicker={t('explainer.armor.kicker') as string}
          title={t('explainer.armor.title') as string}
          subtitle={t('explainer.armor.subtitle') as string}
        />
        <ul className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {ARMOR_WEIGHTS.map((w, i) => {
            const a = ARMOR_ACCENT[w];
            return (
              <motion.li
                key={w}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className={`relative overflow-hidden rounded-2xl border bg-ink-900/70 p-6 shadow-panel transition hover:-translate-y-0.5 hover:shadow-glow ${a.ring}`}
              >
                <div
                  aria-hidden
                  className={`pointer-events-none absolute -top-16 -right-16 h-40 w-40 rounded-full bg-gradient-to-br opacity-60 blur-3xl ${a.glow}`}
                />
                <div className="flex items-center gap-3">
                  <span className="grid h-14 w-14 place-items-center rounded-2xl border border-steel-700/60 bg-ink-950 text-2xl text-frost-200">
                    {a.icon}
                  </span>
                  <div>
                    <h3 className="font-display text-lg text-white">
                      {t(`armorWeights.${w}.name`)}
                    </h3>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-frost-300/90">
                      {t(`armorWeights.${w}.tagline`)}
                    </p>
                  </div>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-steel-300/90">
                  {t(`armorWeights.${w}.body`)}
                </p>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
