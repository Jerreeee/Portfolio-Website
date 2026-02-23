//mui
import { ThemeOptions, Theme } from '@mui/material/styles';

//custom
import { defaultDarkBase, defaultDarkEnhanced } from './Default/Variations/Dark';
import { defaultLightBase, defaultLightEnhanced } from './Default/Variations/Light';
import { defaultSharedBase } from './Default/defaultShared';
import type { ComponentRegistry } from './componentRegistry';

export interface RegisteredTheme {
  base: ThemeOptions;
  enhance?: (base: Theme) => ThemeOptions;
  /** Optional component overrides — merged over the defaultComponentRegistry at runtime. */
  components?: Partial<ComponentRegistry>;
}

export interface ThemeFamily {
  /** Options shared by all variations of this theme family. */
  shared?: ThemeOptions;
  variations: Record<string, RegisteredTheme>;
}

export const themeRegistry = {
  Default: {
    shared: defaultSharedBase,
    variations: {
      Dark: {
        base: defaultDarkBase,
        enhance: defaultDarkEnhanced,
      },
      Light: {
        base: defaultLightBase,
        enhance: defaultLightEnhanced,
      },
    },
  },
} satisfies Record<string, ThemeFamily>;

export type ThemeName = keyof typeof themeRegistry;
export type VariationName<T extends ThemeName> = keyof (typeof themeRegistry)[T]['variations'];
