'use client';

import { useAppTheme } from '@/Themes/ThemeProvider';
import { OutlineFilter } from './OutlineFilter';
import { InnerGlowFilter } from './InnerGlowFilter';
import { CombinedFilter } from './CombinedFilter';
import { OuterGlowFilter } from './OuterGlowFilter';
import { GradientFilter } from './GradientFilter';
import type { SvgFilterDef, SvgFilterEntry } from '.';

export function SvgFilterDefs() {
  const { theme } = useAppTheme();

  const allFilters: SvgFilterDef[] = Object.values(theme.components ?? {})
    .flatMap((cmp: any) => cmp?.svgFilters ?? [])
    .map((entry: SvgFilterEntry) => typeof entry === 'function' ? entry(theme) : entry);

  if (allFilters.length === 0) return null;

  return (
    <svg
      style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }}
      aria-hidden="true"
    >
      <defs>
        {allFilters.map(def => {
          if (def.type === 'outline') return <OutlineFilter key={def.id} {...def} />;
          if (def.type === 'innerGlow') return <InnerGlowFilter key={def.id} {...def} />;
          if (def.type === 'outerGlow') return <OuterGlowFilter key={def.id} {...def} />;
          if (def.type === 'gradient') return <GradientFilter key={def.id} {...def} />;
          return <CombinedFilter key={def.id} {...def} />;
        })}
      </defs>
    </svg>
  );
}
