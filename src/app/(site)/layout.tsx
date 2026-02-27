import './globals.css';
import type { Metadata } from 'next';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v16-appRouter';
import { ClientProviders } from './ClientProviders'; // 👈 THIS WAS MISSING

export const metadata: Metadata = {
  title: 'Jeroen Denayer Portfolio',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <svg style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }} aria-hidden="true">
          <defs>

            {/* ——— DARK ——— */}
            {/* Border only (always visible) */}
            <filter id="card-border-dark" x="-5%" y="-5%" width="110%" height="110%">
              <feMorphology in="SourceAlpha" operator="dilate" radius="1" result="dilated"/>
              <feComposite in="dilated" in2="SourceAlpha" operator="out" result="ring"/>
              <feFlood floodColor="#f48fb1" floodOpacity="0.75" result="ringColor"/>
              <feComposite in="ringColor" in2="ring" operator="in" result="coloredRing"/>
              <feMerge>
                <feMergeNode in="SourceGraphic"/>
                <feMergeNode in="coloredRing"/>
              </feMerge>
            </filter>
            {/* Border + inner glow (hover) */}
            <filter id="card-hover-dark" x="-5%" y="-5%" width="110%" height="110%">
              <feFlood floodColor="#000000" result="black"/>
              <feComposite in="black" in2="SourceAlpha" operator="out" result="invertedAlpha"/>
              <feGaussianBlur in="invertedAlpha" stdDeviation="5" result="blurredEdges"/>
              <feFlood floodColor="#f8bbd0" floodOpacity="1.0" result="glowColor"/>
              <feComposite in="glowColor" in2="blurredEdges" operator="in" result="coloredGlow"/>
              <feComposite in="coloredGlow" in2="SourceAlpha" operator="in" result="innerGlow"/>
              <feBlend in="SourceGraphic" in2="innerGlow" mode="screen" result="withGlow"/>
              <feMorphology in="SourceAlpha" operator="dilate" radius="2" result="dilated"/>
              <feComposite in="dilated" in2="SourceAlpha" operator="out" result="ring"/>
              <feFlood floodColor="#f8bbd0" floodOpacity="1.0" result="ringColor"/>
              <feComposite in="ringColor" in2="ring" operator="in" result="coloredRing"/>
              <feMerge>
                <feMergeNode in="withGlow"/>
                <feMergeNode in="coloredRing"/>
              </feMerge>
            </filter>

            {/* ——— LIGHT ——— */}
            <filter id="card-border-light" x="-5%" y="-5%" width="110%" height="110%">
              <feMorphology in="SourceAlpha" operator="dilate" radius="1" result="dilated"/>
              <feComposite in="dilated" in2="SourceAlpha" operator="out" result="ring"/>
              <feFlood floodColor="#c2185b" floodOpacity="0.5" result="ringColor"/>
              <feComposite in="ringColor" in2="ring" operator="in" result="coloredRing"/>
              <feMerge>
                <feMergeNode in="SourceGraphic"/>
                <feMergeNode in="coloredRing"/>
              </feMerge>
            </filter>
            <filter id="card-hover-light" x="-5%" y="-5%" width="110%" height="110%">
              <feFlood floodColor="#000000" result="black"/>
              <feComposite in="black" in2="SourceAlpha" operator="out" result="invertedAlpha"/>
              <feGaussianBlur in="invertedAlpha" stdDeviation="5" result="blurredEdges"/>
              <feFlood floodColor="#c2185b" floodOpacity="1.0" result="glowColor"/>
              <feComposite in="glowColor" in2="blurredEdges" operator="in" result="coloredGlow"/>
              <feComposite in="coloredGlow" in2="SourceAlpha" operator="in" result="innerGlow"/>
              <feBlend in="SourceGraphic" in2="innerGlow" mode="multiply" result="withGlow"/>
              <feMorphology in="SourceAlpha" operator="dilate" radius="2" result="dilated"/>
              <feComposite in="dilated" in2="SourceAlpha" operator="out" result="ring"/>
              <feFlood floodColor="#c2185b" floodOpacity="1.0" result="ringColor"/>
              <feComposite in="ringColor" in2="ring" operator="in" result="coloredRing"/>
              <feMerge>
                <feMergeNode in="withGlow"/>
                <feMergeNode in="coloredRing"/>
              </feMerge>
            </filter>

            {/* ——— JADE ——— */}
            <filter id="card-border-jade" x="-5%" y="-5%" width="110%" height="110%">
              <feMorphology in="SourceAlpha" operator="dilate" radius="1" result="dilated"/>
              <feComposite in="dilated" in2="SourceAlpha" operator="out" result="ring"/>
              <feFlood floodColor="#fbbf24" floodOpacity="0.75" result="ringColor"/>
              <feComposite in="ringColor" in2="ring" operator="in" result="coloredRing"/>
              <feMerge>
                <feMergeNode in="SourceGraphic"/>
                <feMergeNode in="coloredRing"/>
              </feMerge>
            </filter>
            <filter id="card-hover-jade" x="-5%" y="-5%" width="110%" height="110%">
              <feFlood floodColor="#000000" result="black"/>
              <feComposite in="black" in2="SourceAlpha" operator="out" result="invertedAlpha"/>
              <feGaussianBlur in="invertedAlpha" stdDeviation="5" result="blurredEdges"/>
              <feFlood floodColor="#fcd34d" floodOpacity="1.0" result="glowColor"/>
              <feComposite in="glowColor" in2="blurredEdges" operator="in" result="coloredGlow"/>
              <feComposite in="coloredGlow" in2="SourceAlpha" operator="in" result="innerGlow"/>
              <feBlend in="SourceGraphic" in2="innerGlow" mode="screen" result="withGlow"/>
              <feMorphology in="SourceAlpha" operator="dilate" radius="2" result="dilated"/>
              <feComposite in="dilated" in2="SourceAlpha" operator="out" result="ring"/>
              <feFlood floodColor="#fcd34d" floodOpacity="1.0" result="ringColor"/>
              <feComposite in="ringColor" in2="ring" operator="in" result="coloredRing"/>
              <feMerge>
                <feMergeNode in="withGlow"/>
                <feMergeNode in="coloredRing"/>
              </feMerge>
            </filter>

          </defs>
        </svg>
        <AppRouterCacheProvider>
          <ClientProviders>{children}</ClientProviders>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
