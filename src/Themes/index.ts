import { darkTheme, type DarkTheme } from '@/Themes/Default/Variations/Dark/Dark';

export type Theme = DarkTheme;
export type ThemeName = Theme['name'];

export const themeRegistry: Record<ThemeName, Theme> = {
    Dark: darkTheme,
};
