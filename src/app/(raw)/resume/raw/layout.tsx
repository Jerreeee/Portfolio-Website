"use client";

import { ThemeProvider } from "@/Themes/ThemeProvider";
import { CacheProvider } from "@emotion/react";
import createEmotionCache from "@/Themes/createEmotionCache";

const emotionCache = createEmotionCache();

export default function RawLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0 }}>
        <CacheProvider value={emotionCache}>
          <ThemeProvider>
            {children}
          </ThemeProvider>
        </CacheProvider>
      </body>
    </html>
  );
}
