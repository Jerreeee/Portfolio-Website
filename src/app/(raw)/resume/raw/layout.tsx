"use client";

import { ThemeProvider } from "@/Themes/ThemeProvider";
import { CacheProvider } from "@emotion/react";
import createEmotionCache from "@/Themes/createEmotionCache";
import { CssBaseline, GlobalStyles } from "@mui/material";

const emotionCache = createEmotionCache();

export default function RawLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0 }}>
        <CacheProvider value={emotionCache}>
          <ThemeProvider>
            <CssBaseline />
            <GlobalStyles
              styles={{
                "@page": { size: "A4", margin: 0 },
                "html, body, #root": {
                  margin: 0,
                  padding: 0,
                  height: "100%",
                  background: "#000",
                },
              }}
            />
            {children}
          </ThemeProvider>
        </CacheProvider>
      </body>
    </html>
  );
}
