import { BaseTheme } from "@/Themes/BaseTheme";

export type LightTheme = BaseTheme & {
  name: 'Light';
};

export const lightTheme: LightTheme = {
  name: 'Light',
  colors: {
    foreground: '#1a1a1a',        // Dark but not harsh black
    background: '#e8e8e8',        // Y80 compliant, glare-reducing
  },
  invertIconColor: false,
  components: {
    Card: {
      background: '#f4f1ea',         // Beige-tinted for low glare
      hoverBackground: '#f4f1ea',    // Slightly darker on hover
      textColor: '#1a1a1a',          // High readability
      borderRadius: 8,
      shadowColor: '#d0d0d0',
    },
  },
};



