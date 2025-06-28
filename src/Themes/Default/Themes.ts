import { DefaultTheme } from "@/Themes/Default/BaseTheme";
import { ProjectPage } from "@/Themes/Default/Components/ProjectPage";

const baseDefaultTheme = {
  pages: {
    ProjectPage,
  },
} as const;

export type DarkTheme = DefaultTheme & {
  name: 'Dark';
};

export const darkTheme: DarkTheme = {
  name: 'Dark',
  ...baseDefaultTheme,
  colors: {
    foreground: '#e0e0e0',
    background: '#181818',
  },
  invertIconColor: true,
  components: {
    projectPage: {
      background: '#181818',
      foreground: '#e0e0e0',
      highlight: '#4a9eff',
    },
    card: {
      background: '#232323',
      hoverBackground: '#2c2c2c',
      textColor: '#f0f0f0', 
      borderRadius: 8,
      shadowColor: '#0a0a0a',
    },
    navbar: {
      background: '#181818',
      foreground: '#e0e0e0',
      highlight: '#4a9eff',
    },
    icon: {
      invert: true,
    },
  },
};

export type LightTheme = DefaultTheme & {
  name: 'Light';
};

export const lightTheme: LightTheme = {
  name: 'Light',
  ...baseDefaultTheme,
  colors: {
    foreground: '#1a1a1a',
    background: '#e8e8e8',
  },
  invertIconColor: false,
  components: {
    projectPage: {
      background: '#e8e8e8',
      foreground: '#1a1a1a',
      highlight: '#2563eb',
    },
    card: {
      background: '#f4f1ea',
      hoverBackground: '#f4f1ea',
      textColor: '#1a1a1a',
      borderRadius: 8,
      shadowColor: '#d0d0d0',
    },
    navbar: {
      background: '#e8e8e8',
      foreground: '#1a1a1a',
      highlight: '#2563eb',
    },
    icon: {
      invert: false,
    },
  },
};
