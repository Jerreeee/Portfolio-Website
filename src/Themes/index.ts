import type { DarkTheme } from '@/Themes/Default/Themes';
import { darkTheme } from '@/Themes/Default/Themes';
import type { LightTheme } from '@/Themes/Default/Themes';
import { lightTheme } from '@/Themes/Default/Themes';

export type Theme = LightTheme | DarkTheme;
export type ThemeName = Theme['name'];

export const themeRegistry: Record<ThemeName, Theme> = {
    Dark: darkTheme,
    Light: lightTheme,
};
