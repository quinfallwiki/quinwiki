import { useEffect } from 'react';
import { Navigate, Outlet, useParams } from 'react-router-dom';

import { DEFAULT_LANGUAGE, isLanguageCode } from '@/i18n/languages';
import { ensureLanguage } from '@/i18n';

export function LangGate() {
  const { lang } = useParams();

  if (!lang || !isLanguageCode(lang)) {
    return <Navigate to={`/${DEFAULT_LANGUAGE}`} replace />;
  }

  return <LangGateInner lang={lang} />;
}

function LangGateInner({ lang }: { lang: 'tr' | 'en' | 'de' | 'ru' | 'fr' | 'it' | 'es' | 'pt' | 'pl' | 'uk' | 'zh' | 'ja' | 'ko' }) {
  useEffect(() => {
    ensureLanguage(lang);
    document.documentElement.lang = lang;
  }, [lang]);

  return <Outlet />;
}
