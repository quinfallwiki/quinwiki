import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';

interface EmbeddedFrameProps {
  src: string;
  title: string;
  height?: string;
  i18nNamespace: string;
  i18nKey?: string;
}

export function EmbeddedFrame({
  src,
  title,
  height = 'min(85vh, 980px)',
  i18nNamespace,
  i18nKey = 'frame',
}: EmbeddedFrameProps) {
  const { t } = useTranslation(i18nNamespace);
  const [state, setState] = useState<'loading' | 'ready' | 'blocked'>('loading');
  const ref = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setState((s) => (s === 'loading' ? 'blocked' : s));
    }, 6000);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <div className="relative overflow-hidden rounded-2xl border border-steel-700/60 bg-ink-900/60 shadow-panel">
      {state === 'loading' && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-ink-950/70 backdrop-blur-sm">
          <div className="flex items-center gap-3 text-sm text-steel-300">
            <span className="h-3 w-3 animate-pulse rounded-full bg-frost-400" />
            {t(`${i18nKey}.loading`)}
          </div>
        </div>
      )}
      {state === 'blocked' ? (
        <div className="flex flex-col items-center justify-center gap-3 px-6 py-20 text-center">
          <Icon name="globe" size={28} className="text-frost-300" />
          <div className="font-display text-lg text-white">{t(`${i18nKey}.fallbackTitle`)}</div>
          <p className="max-w-md text-sm text-steel-300">{t(`${i18nKey}.fallbackBody`)}</p>
          <Button
            onClick={() => window.open(src, '_blank', 'noopener,noreferrer')}
            rightIcon={<Icon name="arrow-right" size={16} />}
          >
            {t(`${i18nKey}.openInNewTab`)}
          </Button>
        </div>
      ) : (
        <iframe
          ref={ref}
          src={src}
          title={title}
          loading="lazy"
          referrerPolicy="no-referrer"
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
          onLoad={() => setState('ready')}
          onError={() => setState('blocked')}
          style={{ height }}
          className="block w-full border-0 bg-white"
        />
      )}
    </div>
  );
}
