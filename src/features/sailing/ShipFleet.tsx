import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

import { AssetIcon } from '@/components/ui/AssetIcon';
import { Icon } from '@/components/ui/Icon';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { SHIPS, SHIP_CLASSES, SHIP_CLASS_META, type ShipClass } from '@/data/sailing';

const TIER_TONE: Record<1 | 2 | 3 | 4, string> = {
  1: 'border-emerald-400/40 text-emerald-200',
  2: 'border-frost-400/40 text-frost-200',
  3: 'border-ember-400/40 text-ember-200',
  4: 'border-rose-400/50 text-rose-200',
};

export function ShipFleet() {
  const { t } = useTranslation('sailing');
  const traders = SHIPS.filter((s) => s.faction === 'trader');
  const pirates = SHIPS.filter((s) => s.faction === 'pirate');

  return (
    <section className="space-y-8">
      <SectionHeading
        kicker={t('fleet.kicker') as string}
        title={t('fleet.title') as string}
        subtitle={t('fleet.subtitle') as string}
      />

      <div className="rounded-2xl border border-rose-400/30 bg-rose-500/5 p-5">
        <div className="flex items-start gap-3">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-rose-400/40 bg-rose-500/10 text-rose-200">
            <Icon name="sword" size={16} />
          </span>
          <div>
            <div className="font-display text-sm text-white">{t('fleet.cannonRule.title')}</div>
            <p className="mt-1 text-sm leading-relaxed text-steel-300">
              {t('fleet.cannonRule.body')}
            </p>
          </div>
        </div>
      </div>

      <FactionGrid title={t('fleet.trader.title') as string} subtitle={t('fleet.trader.body') as string} ships={traders} />
      <FactionGrid title={t('fleet.pirate.title') as string} subtitle={t('fleet.pirate.body') as string} ships={pirates} />

      <div>
        <div className="mb-3 flex items-baseline justify-between">
          <h3 className="font-display text-lg text-white">{t('fleet.classTable.title')}</h3>
          <span className="text-xs uppercase tracking-[0.18em] text-steel-400">
            {SHIP_CLASSES.length} {t('fleet.classTable.unit')}
          </span>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-steel-700/60 bg-ink-900/60">
          <table className="w-full min-w-[600px] text-sm">
            <thead>
              <tr className="text-left text-[10px] uppercase tracking-[0.18em] text-steel-400">
                <th className="border-b border-steel-700/60 p-4">{t('fleet.classTable.col.tier')}</th>
                <th className="border-b border-steel-700/60 p-4">{t('fleet.classTable.col.shipClass')}</th>
                <th className="border-b border-steel-700/60 p-4 text-right">{t('fleet.classTable.col.coins')}</th>
                <th className="border-b border-steel-700/60 p-4 text-center">{t('fleet.classTable.col.cannons')}</th>
              </tr>
            </thead>
            <tbody>
              {SHIP_CLASSES.map((cls) => {
                const meta = SHIP_CLASS_META[cls];
                return (
                  <tr key={cls} className="text-steel-200 transition hover:bg-ink-800/40">
                    <td className="border-b border-steel-700/40 p-4">
                      <span className={`inline-flex items-center gap-2 rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] ${TIER_TONE[meta.tier]}`}>
                        Tier {meta.tier}
                      </span>
                    </td>
                    <td className="border-b border-steel-700/40 p-4 font-display text-white">
                      {t(`fleet.classes.${cls}`)}
                    </td>
                    <td className="border-b border-steel-700/40 p-4 text-right font-display text-ember-200">
                      {meta.coins.toLocaleString('en-US')}g
                    </td>
                    <td className="border-b border-steel-700/40 p-4 text-center">
                      {meta.cannons ? (
                        <span className="inline-flex items-center gap-1 rounded-full border border-emerald-400/40 bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-emerald-200">
                          ✓ {t('fleet.classTable.yes')}
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 rounded-full border border-rose-400/40 bg-rose-500/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-rose-200">
                          ✕ {t('fleet.classTable.no')}
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-xs text-steel-500">{t('fleet.classTable.note')}</p>
      </div>
    </section>
  );
}

function FactionGrid({
  title,
  subtitle,
  ships,
}: {
  title: string;
  subtitle: string;
  ships: typeof SHIPS;
}) {
  const { t } = useTranslation('sailing');
  return (
    <div>
      <div className="mb-3 flex items-baseline justify-between">
        <h3 className="font-display text-lg text-white">{title}</h3>
        <span className="text-xs uppercase tracking-[0.18em] text-steel-400">
          {ships.length} {t('fleet.shipsUnit')}
        </span>
      </div>
      <p className="mb-4 text-sm text-steel-300">{subtitle}</p>
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {ships.map((ship, i) => {
          const tier = ship.shipClass ? SHIP_CLASS_META[ship.shipClass as ShipClass].tier : 1;
          return (
            <motion.li
              key={ship.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.35, delay: (i % 4) * 0.05 }}
              className="group flex flex-col overflow-hidden rounded-2xl border border-steel-700/60 bg-ink-900/70 transition hover:-translate-y-0.5 hover:shadow-glow"
              style={{ borderTopColor: ship.accent, borderTopWidth: 3 }}
            >
              <div
                className="relative flex aspect-square items-center justify-center overflow-hidden bg-ink-950"
                style={{ background: `radial-gradient(ellipse at center, ${ship.accent}22 0%, transparent 70%)` }}
              >
                <AssetIcon
                  code={ship.iconCode}
                  size={120}
                  glow
                  alt={t(`fleet.list.${ship.id}.name`) as string}
                  className="transition duration-500 group-hover:scale-110"
                />
                <span className={`absolute right-2 top-2 rounded-full border px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.16em] backdrop-blur ${TIER_TONE[tier as 1 | 2 | 3 | 4]}`}>
                  Tier {tier}
                </span>
                {!ship.cannonsAllowed && (
                  <span className="absolute left-2 top-2 rounded-full border border-rose-400/40 bg-rose-500/10 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.16em] text-rose-200 backdrop-blur">
                    ✕ {t('fleet.classTable.cannons')}
                  </span>
                )}
              </div>
              <div className="flex flex-1 flex-col gap-2 p-4">
                <div>
                  <div className="font-display text-base text-white">
                    {t(`fleet.list.${ship.id}.name`)}
                  </div>
                  <div className="mt-0.5 text-[11px] uppercase tracking-[0.18em] text-steel-400">
                    {t(`fleet.list.${ship.id}.tag`)}
                  </div>
                </div>
                <p className="text-xs leading-relaxed text-steel-400">
                  {t(`fleet.list.${ship.id}.body`)}
                </p>
                {ship.build && (
                  <div className="mt-1 rounded-lg border border-steel-700/60 bg-ink-800/40 p-2">
                    <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-ember-300/80">
                      {t('fleet.buildLabel')}
                    </div>
                    <div className="mt-1 font-display text-sm text-ember-200">
                      {ship.build.coins.toLocaleString('en-US')}g
                    </div>
                  </div>
                )}
              </div>
            </motion.li>
          );
        })}
      </ul>
    </div>
  );
}
