import type { DarkTheme } from '@/Themes/Dark/theme';
import { darkTheme } from '@/Themes/Dark/theme';
import type { LightTheme } from '@/Themes/Light/theme';
import { lightTheme } from '@/Themes/Light/theme';

export type Theme = LightTheme | DarkTheme;
export type ThemeName = Theme['name'];

export const themeRegistry: Record<ThemeName, Theme> = {
    Dark: darkTheme,
    Light: lightTheme,
};
