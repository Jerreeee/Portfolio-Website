'use client';

import { ThemeProvider } from '@/Themes/ThemeProvider';
import { CacheProvider } from '@emotion/react';
import createEmotionCache from '@/Themes/createEmotionCache';
import { CssBaseline, GlobalStyles } from '@mui/material';
import { SvgFilterDefs } from '@/Svg/Filters';

const emotionCache = createEmotionCache();

export default function LinkedInBannerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0 }}>
        <CacheProvider value={emotionCache}>
          <ThemeProvider>
            <CssBaseline />
            <GlobalStyles
              styles={{
                'html, body': {
                  margin: '0 !important',
                  padding: '0 !important',
                  overflow: 'hidden !important',
                  width: '1584px !important',
                  height: '396px !important',
                  maxWidth: '1584px !important',
                  maxHeight: '396px !important',
                  background: '#000 !important',
                },
              }}
            />
            <SvgFilterDefs />
            {children}
          </ThemeProvider>
        </CacheProvider>
      </body>
    </html>
  );
}
