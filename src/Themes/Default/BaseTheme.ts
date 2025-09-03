import type { BaseTheme } from '@/Themes/BaseTheme';
import type { Project } from '@/data/projects/project';
import type { NavbarTheme } from '@/Themes/Default/Components/Navbar';
import type { ProjectsOverviewTheme } from '@/Themes/Default/Components/ProjectsOverview';
import type { ProjectCardTheme } from '@/Themes/Default/Components/ProjectCard';
import type { IconTheme, IconProps } from '@/Themes/Default/Components/Icon';

export type DefaultTheme = BaseTheme & {
  name: string;
  colors: {
    // Base colors
    background: string;        // Main page background
    backgroundAlt: string;     // Alternate background (e.g. cards, sections)

    foreground: string;        // Main text color
    foregroundMuted: string;   // Muted/subtle text (e.g. descriptions)
    
    // Accent & branding
    highlight: string;         // Primary accent color
    highlightAlt: string;      // Secondary or hover variant of highlight

    // UI elements
    border: string;            // Standard borders
    borderMuted: string;       // Subtle borders (e.g. for cards)

    // Gradients & overlays
    gradientStart: string;     // For hero sections, buttons, etc.
    gradientEnd: string;       // Ending color for gradients

    overlay: string;           // For modals, darkening backgrounds

    // Statuses (optional but useful)
    success: string;
    warning: string;
    error: string;
    info: string;

    // Interactive
    link: string;              // Link color (can match or differ from highlight)
    linkHover: string;
  };
  invertIconColor: boolean;
  components: {
    navbar: {
      cmp: React.ComponentType;
      theme: NavbarTheme;
    };
    projectsOverview: {
      cmp: React.ComponentType;
      theme: ProjectsOverviewTheme;
    };
    projectDetails: {
      cmp: React.ComponentType<{ project: Project }>;
    };
    card: {
      cmp: React.ComponentType<{ project:  Project }>;
      theme: ProjectCardTheme;
    };
    icon: {
      cmp: React.ComponentType<IconProps>;
      theme: IconTheme;
    };
  };
};
