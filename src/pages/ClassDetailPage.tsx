import { useMemo } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

import { Container } from '@/components/ui/Container';
import { Card } from '@/components/ui/Card';
import { Icon } from '@/components/ui/Icon';
import { Seo } from '@/components/seo/Seo';
import { CLASSES, findClassBySlug, findClassByWeapon, MAX_WEAPON_LEVEL } from '@/data/classes';
import { WEAPON_COMBOS } from '@/data/weaponCombos';
import { StatRadar } from '@/features/classes/StatRadar';
import { LevelTimeline } from '@/features/classes/LevelTimeline';
import { ComboCard } from '@/features/classes/ComboCard';
import { WeaponIcon } from '@/features/classes/WeaponIcon';

const ROLE_GLOW: Record<string, string> = {
  tank: 'rgba(51,166,255,0.4)',
  melee: 'rgba(247,185,85,0.4)',
  ranged: 'rgba(74,222,128,0.4)',
  magic: 'rgba(168,85,247,0.4)',
  healer: 'rgba(244,114,182,0.4)',
};

const ROLE_RADAR_COLOR: Record<string, string> = {
  tank: '#33a6ff',
  melee: '#f7b955',
  ranged: '#4ade80',
  magic: '#a855f7',
  healer: '#fb7185',
};

export default function ClassDetailPage() {
  const { slug, lang } = useParams();
  const { t } = useTranslation('classes');
  const cls = slug ? findClassBySlug(slug) : undefined;

  const langPrefix = `/${lang ?? 'tr'}`;

  const linkedCombos = useMemo(() => {
    if (!cls) return [];
    return WEAPON_COMBOS.filter(
      (c) => c.primary === cls.weaponKey || c.secondary === cls.weaponKey,
    );
  }, [cls]);

  const recommendedClasses = useMemo(() => {
    if (!cls) return [];
    return cls.recommendedSecondaries
      .map((w) => findClassByWeapon(w))
      .filter((x): x is NonNullable<typeof x> => Boolean(x));
  }, [cls]);

  if (!cls) return <Navigate to={`${langPrefix}/siniflar`} replace />;

  const name = t(`weapons.${cls.weaponKey}.name`) as string;
  const tagline = t(`weapons.${cls.weaponKey}.tagline`) as string;
  const lore = t(`weapons.${cls.weaponKey}.lore`) as string;
  const summary = t(`weapons.${cls.weaponKey}.summary`) as string;

  const roleGlow = ROLE_GLOW[cls.role] ?? 'rgba(51,166,255,0.4)';
  const radarColor = ROLE_RADAR_COLOR[cls.role] ?? '#33a6ff';

  return (
    <>
      <Seo title={name} description={tagline} />

      <header className="relative overflow-hidden border-b border-steel-700/40">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: `radial-gradient(ellipse at 30% 0%, ${roleGlow} 0%, transparent 55%), radial-gradient(ellipse at 80% 100%, rgba(247,185,85,0.08) 0%, transparent 55%)`,
          }}
        />
        <div className="pointer-events-none absolute inset-0 bg-rune-grain opacity-30 mix-blend-overlay" />
        <Container size="xl" className="relative py-12 sm:py-20">
          <Link
            to={`${langPrefix}/siniflar`}
            className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-steel-400 transition hover:text-white"
          >
            <Icon name="arrow-right" size={14} className="rotate-180" />
            {t('detail.backToList')}
          </Link>

          <div className="mt-6 grid grid-cols-1 gap-10 lg:grid-cols-[1.1fr_1fr_1fr]">
            <motion.div
              initial={{ opacity: 0, scale: 0.92, rotate: -3 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="relative flex items-center justify-center"
            >
              <div className="absolute inset-0 -z-10" style={{ background: `radial-gradient(circle at 50% 50%, ${roleGlow} 0%, transparent 65%)` }} />
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="relative"
              >
                <WeaponIcon cls={cls} size={280} glow />
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full border border-frost-400/30 bg-frost-500/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-frost-200">
                  {t(`filter.${cls.role}`)}
                </span>
                <span className="rounded-full border border-steel-700 bg-ink-900/60 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-steel-300">
                  {t(`speeds.${cls.attackSpeed}`)}
                </span>
                <span className="rounded-full border border-steel-700 bg-ink-900/60 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-steel-300">
                  {t(`damage.${cls.damageType}`)}
                </span>
              </div>
              <h1 className="mt-4 font-display text-4xl text-balance heading-gradient sm:text-5xl">{name}</h1>
              <p className="mt-2 text-base text-frost-300/90 sm:text-lg">{tagline}</p>
              <p className="mt-5 max-w-xl text-sm leading-relaxed text-steel-200 sm:text-base">{summary}</p>
              <p className="mt-3 max-w-xl text-sm italic leading-relaxed text-steel-300 sm:text-base">
                {lore}
              </p>

              <div className="mt-6 grid grid-cols-2 gap-2.5">
                <KeyStat label={t('detail.maxLevel')} value={`${MAX_WEAPON_LEVEL}`} />
                <KeyStat label={t('labels.range')} value={t(`ranges.${cls.range}`) as string} />
                <KeyStat label={t('labels.difficulty')} value={`${cls.difficulty} / 5`} />
                <KeyStat label={t('detail.bestForLabel')} value={t(`tags.${cls.bestFor[0]}`) as string} />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.15, ease: 'easeOut' }}
              className="flex items-center justify-center"
            >
              <div className="panel relative overflow-hidden p-6">
                <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_50%,rgba(51,166,255,0.12),transparent_70%)]" />
                <StatRadar stats={cls.stats} size={300} color={radarColor} />
              </div>
            </motion.div>
          </div>
        </Container>
      </header>

      <Container size="xl" className="space-y-16 py-14">
        <Section title={t('detail.strengthsWeaknesses') as string}>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <Card>
              <SectionHeader icon="spark" tone="frost">
                {t('detail.strengths')}
              </SectionHeader>
              <ul className="mt-4 space-y-3">
                {Array.from({ length: cls.strengthCount }).map((_, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-steel-200">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-frost-400" />
                    <span>{t(`weapons.${cls.weaponKey}.strengths.${i}`)}</span>
                  </li>
                ))}
              </ul>
            </Card>
            <Card>
              <SectionHeader icon="skull" tone="ember">
                {t('detail.weaknesses')}
              </SectionHeader>
              <ul className="mt-4 space-y-3">
                {Array.from({ length: cls.weaknessCount }).map((_, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-steel-200">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-ember-400" />
                    <span>{t(`weapons.${cls.weaponKey}.weaknesses.${i}`)}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </Section>

        <Section
          title={t('detail.signatureSkills') as string}
          subtitle={t('detail.signatureSkillsSub') as string}
        >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {Array.from({ length: cls.skillCount }).map((_, i) => (
              <Card key={i}>
                <div className="flex items-start gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-frost-400/40 bg-ink-900/80 text-frost-200">
                    <Icon name="spark" size={18} />
                  </span>
                  <div>
                    <div className="font-display text-base text-white">
                      {t(`weapons.${cls.weaponKey}.skills.${i}.name`)}
                    </div>
                    <p className="mt-1 text-sm leading-relaxed text-steel-300">
                      {t(`weapons.${cls.weaponKey}.skills.${i}.description`)}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </Section>

        <Section
          title={t('detail.levelJourney') as string}
          subtitle={t('detail.levelJourneySub', { max: MAX_WEAPON_LEVEL }) as string}
        >
          <Card className="p-6 sm:p-8">
            <LevelTimeline cls={cls} />
          </Card>
        </Section>

        <Section
          title={t('detail.recommendedCombos') as string}
          subtitle={t('detail.recommendedCombosSub') as string}
        >
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {linkedCombos.map((combo, i) => (
              <ComboCard key={combo.id} combo={combo} index={i} />
            ))}
          </div>
        </Section>

        <Section
          title={t('detail.alsoTry') as string}
          subtitle={t('detail.alsoTrySub') as string}
        >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {recommendedClasses.map((other) => (
              <Link
                key={other.id}
                to={`${langPrefix}/siniflar/${other.slug}`}
                className="group panel panel-hover flex items-center gap-3 p-4"
              >
                <span className="flex h-14 w-14 items-center justify-center rounded-lg border border-steel-700/60 bg-ink-900/70 p-1.5 transition group-hover:border-frost-400/70">
                  <WeaponIcon cls={other} size={40} />
                </span>
                <div className="flex-1">
                  <div className="font-display text-base text-white">
                    {t(`weapons.${other.weaponKey}.name`)}
                  </div>
                  <div className="text-xs text-steel-400">{t(`weapons.${other.weaponKey}.tagline`)}</div>
                </div>
                <Icon name="arrow-right" size={16} className="text-steel-500 transition group-hover:translate-x-1 group-hover:text-frost-300" />
              </Link>
            ))}
          </div>
        </Section>

        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-steel-700/40 pt-8">
          <Link
            to={`${langPrefix}/siniflar`}
            className="btn-ghost h-10 px-4 text-sm"
          >
            <Icon name="arrow-right" size={14} className="rotate-180" />
            {t('detail.backToList')}
          </Link>
          <div className="flex items-center gap-2">
            {CLASSES.slice(0, 5).map((c) => (
              <Link
                key={c.id}
                to={`${langPrefix}/siniflar/${c.slug}`}
                className={`h-2 w-6 rounded-full transition ${
                  c.id === cls.id ? 'bg-frost-400' : 'bg-steel-700 hover:bg-steel-500'
                }`}
                aria-label={t(`weapons.${c.weaponKey}.name`) as string}
              />
            ))}
          </div>
        </div>
      </Container>
    </>
  );
}

function KeyStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-steel-700/60 bg-ink-900/60 p-3">
      <div className="text-[10px] uppercase tracking-[0.18em] text-steel-400">{label}</div>
      <div className="mt-1 font-display text-lg text-white">{value}</div>
    </div>
  );
}

function Section({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <div className="mb-6">
        <h2 className="font-display text-2xl heading-gradient sm:text-3xl">{title}</h2>
        {subtitle && <p className="mt-2 max-w-2xl text-sm text-steel-300 sm:text-base">{subtitle}</p>}
      </div>
      {children}
    </section>
  );
}

function SectionHeader({
  icon,
  tone,
  children,
}: {
  icon: 'spark' | 'skull';
  tone: 'frost' | 'ember';
  children: React.ReactNode;
}) {
  const toneClass =
    tone === 'frost'
      ? 'border-frost-400/40 bg-frost-500/10 text-frost-200'
      : 'border-ember-400/40 bg-ember-500/10 text-ember-300';
  return (
    <div className="flex items-center gap-3">
      <span className={`flex h-10 w-10 items-center justify-center rounded-lg border ${toneClass}`}>
        <Icon name={icon} size={18} />
      </span>
      <div className="font-display text-lg text-white">{children}</div>
    </div>
  );
}
