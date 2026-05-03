import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

import { AssetIcon } from '@/components/ui/AssetIcon';
import { CRAFTING_TOTALS } from '@/data/craftingTiers';

const STATS = [
  { id: 'professions', value: String(CRAFTING_TOTALS.professions), accent: 'text-frost-300' },
  { id: 'recipes',     value: String(CRAFTING_TOTALS.recipes),     accent: 'text-ember-300' },
  { id: 'workbench',   value: 'T1·T2·T3',                          accent: 'text-emerald-300' },
];

const FEATURED_ICONS = [
  // Gather
  { code: 'material_icon1_11201', tone: 'border-amber-400/55' },     // ore
  { code: 'material_icon1_12101', tone: 'border-emerald-400/55' },   // wood
  { code: 'material_icon1_13201', tone: 'border-rose-400/55' },      // leather
  { code: 'material_icon1_22010', tone: 'border-purple-400/55' },    // herb
  // Refine
  { code: 'material_icon1_12001', tone: 'border-frost-400/55' },     // ingot
  { code: 'material_icon1_12201', tone: 'border-purple-400/55' },    // thread
  { code: 'material_icon1_12301', tone: 'border-frost-400/60' },     // gem
  { code: 'material_icon1_22101', tone: 'border-purple-400/60' },    // essence
  // Craft
  { code: 'item_icon1_0_A016',   tone: 'border-ember-400/65' },      // sword
  { code: 'item_icon1_3_1404',   tone: 'border-rose-400/55' },       // armor
  { code: 'item_icon1_0_1010',   tone: 'border-frost-400/65' },      // jewel
  { code: 'material_icon1_12401',tone: 'border-amber-400/55' },      // food
];

export function CraftingHero() {
  const { t } = useTranslation('crafting');

  return (
    <section className="relative overflow-hidden rounded-3xl border border-frost-400/35 bg-gradient-to-br from-ink-950 via-ink-900 to-ink-950 shadow-glow">
      {/* Animated radial breathers */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -top-32 -right-32 h-96 w-96 rounded-full bg-gradient-to-br from-frost-500/30 via-purple-500/12 to-transparent blur-3xl"
        animate={{ scale: [1, 1.18, 1], opacity: [0.55, 0.85, 0.55] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-gradient-to-br from-ember-500/25 via-amber-500/10 to-transparent blur-3xl"
        animate={{ scale: [1.1, 1, 1.1], opacity: [0.45, 0.75, 0.45] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Tech grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(126,196,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(126,196,255,0.5) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
          maskImage: 'radial-gradient(ellipse 60% 70% at 80% 50%, black 0%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(ellipse 60% 70% at 80% 50%, black 0%, transparent 80%)',
        }}
      />

      <div className="relative grid grid-cols-1 gap-10 p-6 sm:p-10 lg:grid-cols-[1.4fr_1fr] lg:items-center">
        <div>
          <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-frost-300/95">
            {t('page.eyebrow')}
          </div>
          <h2 className="mt-2 font-display text-3xl text-white drop-shadow-[0_2px_14px_rgba(0,0,0,0.6)] sm:text-4xl lg:text-5xl">
            {t('hero.title')}
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-steel-300 sm:text-lg">
            {t('hero.subtitle')}
          </p>

          <ul className="mt-7 grid grid-cols-3 gap-3">
            {STATS.map((s, i) => (
              <motion.li
                key={s.id}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="rounded-2xl border border-steel-700/60 bg-ink-950/70 p-4 text-center backdrop-blur"
              >
                <div className={`font-display text-2xl ${s.accent}`}>{s.value}</div>
                <div className="mt-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-steel-300">
                  {t(`stats.${s.id}`)}
                </div>
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Right: 12 floating ingredient/output icons in a 4×3 grid */}
        <div className="grid grid-cols-4 gap-2.5 sm:gap-3">
          {FEATURED_ICONS.map((it, i) => (
            <motion.div
              key={`${it.code}-${i}`}
              initial={{ opacity: 0, y: 8, scale: 0.92 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.35, delay: (i % 4) * 0.04 + Math.floor(i / 4) * 0.08 }}
              className={`group relative flex aspect-square items-center justify-center rounded-xl border bg-ink-950/80 p-2 backdrop-blur transition hover:-translate-y-0.5 hover:shadow-glow ${it.tone}`}
            >
              <AssetIcon code={it.code} size={40} />
              <span
                aria-hidden
                className="pointer-events-none absolute -inset-1 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{ background: 'radial-gradient(ellipse at center, rgba(126,196,255,0.18), transparent 70%)' }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
