import { DefaultTheme } from "@/Themes/Default/BaseTheme";
import { NavbarCmp } from "@/Themes/Default/Components/Navbar";
import { ProjectsOverviewCmp } from "@/Themes/Default/Components/ProjectsOverview";
import { ProjectDetailsCmp } from "@/Themes/Default/Components/ProjectDetails";
import { ProjectCardCmp } from "@/Themes/Default/Components/ProjectCard";
import { IconCmp } from "@/Themes/Default/Components/Icon";

export type DarkTheme = DefaultTheme & {
  name: 'Dark';
};

const darkColors = {
  background: '#0b0b0d',           // almost black
  backgroundAlt: '#141418',        // very dark gray-blue for contrast

  foreground: '#f0f0f0',
  foregroundMuted: '#888888',

  highlight: '#7f5af0',            // lavender purple (matches right side of gradient)
  highlightAlt: '#60a5fa',         // light blue for hover or accent

  border: '#1e1e22',
  borderMuted: '#131317',

  gradientStart: '#60a5fa',        // light blue (start of gradient)
  gradientEnd: '#c084fc',          // soft purple (end of gradient)
  // gradientStart: '#0b0b0d', // almost black
  // gradientEnd: '#151520',   // just slightly lighter, bluish tint

  overlay: 'rgba(0, 0, 0, 0.7)',

  success: '#22c55e',
  warning: '#facc15',
  error: '#ef4444',
  info: '#7dd3fc',

  link: '#7f5af0',
  linkHover: '#c084fc',
};

export const darkTheme: DarkTheme = {
  name: 'Dark',
  colors: darkColors,
  invertIconColor: true,
  components: {
    navbar: {
      cmp: NavbarCmp,
      theme: {
        background: darkColors.backgroundAlt,
        foreground: darkColors.foreground,
        highlight: darkColors.highlight,
        border: darkColors.border,
        foregroundMuted: darkColors.foregroundMuted,
        gradientStart: darkColors.gradientStart,
        gradientEnd: darkColors.gradientEnd,
      },
    },
    projectsOverview: {
      cmp: ProjectsOverviewCmp,
      theme: {
        sectionBgColor: '#0b0b0d',
        sectionBgGradientStart: '#0b0b0d', // very dark near-black
        sectionBgGradientEnd: '#1e1e28',   // subtle deep bluish gray
    
        titleGradientStart: '#3fa0ff', // Vibrant blue
        titleGradientMid:   '#7b72f0', // Electric lavender
        titleGradientEnd:   '#ec38bc', // Bright pinkish-purple for punch
    
        ctaButtonBgColor: '#f0f0f0',
        ctaButtonTextColor: '#0b0b0d',
      },
    },
    projectDetails: {
      cmp: ProjectDetailsCmp,
    },
    card: {
      cmp: ProjectCardCmp,
      theme: {
        background: darkColors.backgroundAlt,
        hoverBackground: '#2c2c2c', // custom, not in shared colors
        titleColor: darkColors.foreground,
        descriptionColor: darkColors.foregroundMuted,
        borderRadius: 8,
        shadowColor: darkColors.borderMuted,
      },
    },
    icon: {
      cmp: IconCmp,
      theme: {
        invert: true,
      },
    },
  },
};


export type LightTheme = DefaultTheme & {
  name: 'Light';
};

const lightColors = {
  background: '#ffffff',
  backgroundAlt: '#f7f7f7',

  foreground: '#1a1a1a',
  foregroundMuted: '#666666',

  highlight: '#0070f3',
  highlightAlt: '#0059c1',

  border: '#e0e0e0',
  borderMuted: '#f0f0f0',

  gradientStart: '#e0f7ff',
  gradientEnd: '#cce0ff',

  overlay: 'rgba(0, 0, 0, 0.3)',

  success: '#22c55e',
  warning: '#facc15',
  error: '#ef4444',
  info: '#3b82f6',

  link: '#0366d6',
  linkHover: '#023e8a',
};

export const lightTheme: LightTheme = {
  name: 'Light',
  colors: lightColors,
  invertIconColor: false,
  components: {
    navbar: {
      cmp: NavbarCmp,
      theme: {
        background: lightColors.backgroundAlt,
        foreground: lightColors.foreground,
        highlight: lightColors.highlight,
        border: lightColors.border,
        foregroundMuted: lightColors.foregroundMuted,
        gradientStart: lightColors.gradientStart,
        gradientEnd: lightColors.gradientEnd,
      },
    },
    projectsOverview: {
      cmp: ProjectsOverviewCmp,
      theme: {
        sectionBgColor: '#ffffff',
        sectionBgGradientStart: '#ffffff',
        sectionBgGradientEnd: '#f2f6ff',
    
        titleGradientStart: '#0070f3',
        titleGradientMid: '#7928ca',
        titleGradientEnd: '#7928ca',
    
        ctaButtonBgColor: '#1a1a1a',
        ctaButtonTextColor: '#ffffff',
      },
    },
    projectDetails: {
      cmp: ProjectDetailsCmp,
    },
    card: {
      cmp: ProjectCardCmp,
      theme: {
        background: '#f4f1ea', // optionally: lightColors.backgroundAlt or a custom neutral
        hoverBackground: '#f4f1ea', // optionally another token
        titleColor: lightColors.foreground,
        descriptionColor: lightColors.foregroundMuted,
        borderRadius: 8,
        shadowColor: lightColors.borderMuted,
      },
    },
    icon: {
      cmp: IconCmp,
      theme: {
        invert: false,
      },
    },
  },
};
