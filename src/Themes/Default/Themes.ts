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
        containerBackground: '#141418',
        containerBorderColor: '#3fa0ff',
      
        brandGradientStart: '#3fa0ff',
        brandGradientMid: '#7b72f0',
        brandGradientEnd: '#ec38bc',
      
        brandTextColor: '#ec38bc', // fallback or non-gradient context
      
        linkTextColor: '#888888',
        linkTextHoverColor: '#d0d0d0',
        linkTextActiveColor: '#7b72f0',
      },
    },
    projectsOverview: {
      cmp: ProjectsOverviewCmp,
      theme: {
        sectionBgColor: '#0b0b0d',
        sectionBgGradientStart: '#151a2c', // Dark blue-violet base
        sectionBgGradientEnd:   '#221730', // Deep purple-gray
    
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
        bgColor: '#1a1b20',            // Slightly lighter than navbar/section background
        bgHoverColor: '#2a2b32',       // Subtle lift on hover
      
        borderRadius: 12,
        shadowColor: 'rgba(0, 0, 0, 0.3)',
      
        titleTextColor: '#f0f0f0',     // Soft white for titles
        descriptionTextColor: '#aaaaaa', // Muted gray for secondary text
      
        forceTechIconColor: false,
        techIconColor: '#b0c4ff',      // Soft pastel blue
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
