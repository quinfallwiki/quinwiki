import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { Container } from '@/components/ui/Container';
import { PageHeader } from '@/components/ui/PageHeader';
import { Seo } from '@/components/seo/Seo';
import { CraftCalculator } from '@/features/craft-calc/CraftCalculator';
import { XpPlanner } from '@/features/craft-calc/XpPlanner';
import { CharacterBoosters } from '@/features/craft-calc/CharacterBoosters';
import { isLanguageCode, type LanguageCode } from '@/i18n/languages';

type CalcTab = 'calculator' | 'xp' | 'character';

const TABS: CalcTab[] = ['calculator', 'xp', 'character'];

export default function CraftCalcPage() {
  const { t } = useTranslation('craftCalc');
  const { lang } = useParams();
  const code: LanguageCode = isLanguageCode(lang ?? '') ? (lang as LanguageCode) : 'tr';
  const [tab, setTab] = useState<CalcTab>('calculator');

  return (
    <>
      <Seo title={t('page.title') as string} description={t('page.description') as string} />
      <PageHeader
        eyebrow={t('page.eyebrow') as string}
        title={t('page.title')}
        description={t('page.description')}
      />

      <Container size="xl" className="mt-6">
        <div className="inline-flex flex-wrap rounded-xl border border-steel-700 bg-ink-900/60 p-1">
          {TABS.map((id) => {
            const active = tab === id;
            return (
              <button
                key={id}
                type="button"
                onClick={() => setTab(id)}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                  active
                    ? 'bg-frost-500/20 text-white shadow-glow'
                    : 'text-steel-300 hover:text-white'
                }`}
              >
                {t(`tabs.${id}`)}
              </button>
            );
          })}
        </div>
      </Container>

      <div className="pt-6">
        {tab === 'calculator' && <CraftCalculator lang={code} />}
        {tab === 'xp' && <XpPlanner lang={code} />}
        {tab === 'character' && <CharacterBoosters lang={code} />}
      </div>
    </>
  );
}
