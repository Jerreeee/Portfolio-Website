import { DefaultTheme } from "@/Themes/Default/BaseTheme";
import { NavbarCmp } from "@/Themes/Default/Components/Navbar";
import { ProjectsOverviewCmp } from "@/Themes/Default/Components/ProjectsOverview";
import { ProjectDetailsCmp } from "@/Themes/Default/Components/ProjectDetails";
import { ProjectCardCmp } from "@/Themes/Default/Components/ProjectCard";
import { containerVariants, itemVariants } from "@/Themes/Default/animations";
import { IconCmp } from "@/Themes/Default/Components/Icon";

export type DarkTheme = DefaultTheme & {
  name: 'Dark';
};

export const darkTheme: DarkTheme = {
  name: 'Dark',
  colors: {
    foreground: '#e0e0e0',
    background: '#181818',
  },
  invertIconColor: true,
  components: {
    navbar: {
      cmp: NavbarCmp,
      theme: {
        background: '#181818',
        foreground: '#e0e0e0',
        highlight: '#4a9eff',
        anims: {
          container: containerVariants,
          item: itemVariants,
        },
      },
    },
    projectsOverview: {
      cmp: ProjectsOverviewCmp,
      theme: {
        background: '#181818',
        foreground: '#e0e0e0',
        highlight: '#4a9eff',
      },
    },
    projectDetails: {
      cmp: ProjectDetailsCmp
    },
    card: {
      cmp: ProjectCardCmp,
      theme: {
        background: '#232323',
        hoverBackground: '#2c2c2c',
        textColor: '#f0f0f0',
        borderRadius: 8,
        shadowColor: '#0a0a0a',
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

export const lightTheme: LightTheme = {
  name: 'Light',
  colors: {
    foreground: '#1a1a1a',
    background: '#e8e8e8',
  },
  invertIconColor: false,
  components: {
    navbar: {
      cmp: NavbarCmp,
      theme: {
        background: '#e8e8e8',
        foreground: '#1a1a1a',
        highlight: '#2563eb',
        anims: {
          container: containerVariants,
          item: itemVariants,
        },
      },
    },
    projectsOverview: {
      cmp: ProjectsOverviewCmp,
      theme: {
        background: '#e8e8e8',
        foreground: '#1a1a1a',
        highlight: '#2563eb',
      }
    },
    projectDetails: {
      cmp: ProjectDetailsCmp
    },
    card: {
      cmp: ProjectCardCmp,
      theme: {
        background: '#f4f1ea',
        hoverBackground: '#f4f1ea',
        textColor: '#1a1a1a',
        borderRadius: 8,
        shadowColor: '#d0d0d0',
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