'use client';

import { ThemeProvider } from '@/themes/ThemeProvider';
import { PageWrapper } from '@/Components/PageWrapper';
import { CacheProvider } from '@emotion/react';
import createEmotionCache from '@/themes/createEmotionCache';

const clientSideEmotionCache = createEmotionCache();

export function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <CacheProvider value={clientSideEmotionCache}>
      <ThemeProvider>
        <PageWrapper>{children}</PageWrapper>
      </ThemeProvider>
    </CacheProvider>
  );
}
