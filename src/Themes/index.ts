//mui
import { ThemeOptions, Theme } from '@mui/material/styles';

//custom
import { defaultDarkBase, defaultDarkEnhanced } from './Default/Variations/Dark';
import { defaultLightBase, defaultLightEnhanced } from './Default/Variations/Light';
import type { ComponentRegistry } from './componentRegistry';

export interface RegisteredTheme {
  base: ThemeOptions;
  enhance?: (base: Theme) => ThemeOptions;
  /** Optional component overrides — merged over the defaultComponentRegistry at runtime. */
  components?: Partial<ComponentRegistry>;
}

export const themeRegistry = {
  Default: {
    Dark: {
      base: defaultDarkBase,
      enhance: defaultDarkEnhanced,
    },
    Light: {
      base: defaultLightBase,
      enhance: defaultLightEnhanced,
    },
  },
} satisfies Record<string, Record<string, RegisteredTheme>>;

export type ThemeName = keyof typeof themeRegistry;
export type VariationName<T extends ThemeName> = keyof (typeof themeRegistry)[T];
