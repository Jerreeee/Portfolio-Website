import type { DarkTheme } from '@/Themes/Default/Themes';
import { darkTheme } from '@/Themes/Default/Themes';

export type Theme = DarkTheme;
export type ThemeName = Theme['name'];

export const themeRegistry: Record<ThemeName, Theme> = {
    Dark: darkTheme,
};
