'use client';

import { ThemeProvider } from '@/Themes/ThemeProvider';
import { PageWrapper } from '@/Components/PageWrapper';
import { SvgFilterDefs } from '@/Svg/Filters';

export function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <SvgFilterDefs />
      <PageWrapper>{children}</PageWrapper>
    </ThemeProvider>
  );
}
