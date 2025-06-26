import { BaseTheme } from "@/Themes/BaseTheme";

export type DarkTheme = BaseTheme & {
  name: 'Dark';
};

export const darkTheme: DarkTheme = {
  name: 'Dark',
  colors: {
    foreground: '#e0e0e0',       // Softer than pure white
    background: '#181818',       // Softer than #121212
  },
  invertIconColor: true,
  components: {
    Card: {
      background: '#232323',         // Slight elevation above page
      hoverBackground: '#2c2c2c',    // Clear, but not too bright
      textColor: '#f0f0f0',          // Clean and readable
      borderRadius: 8,
      shadowColor: '#0a0a0a',        // Softer than #000000
    },
  },
};
