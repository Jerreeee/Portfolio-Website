import type { BaseTheme } from '@/Themes/BaseTheme';
import type { Project } from '@/data/projects/project';
import type { NavbarTheme } from '@/Themes/Default/Components/Navbar';
import type { ProjectsOverviewTheme } from '@/Themes/Default/Components/ProjectsOverview';
import type { CardTheme } from '@/Themes/Default/Components/ProjectCard';
import type { IconTheme } from '@/Themes/Default/Components/Icon';
import type { IconProps } from '@/Themes/Default/Components/Icon';

export type DefaultTheme = BaseTheme & {
  name: string;
  colors: {
    foreground: string;
    background: string;
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
      theme: CardTheme;
    };
    icon: {
      cmp: React.ComponentType<IconProps>;
      theme: IconTheme;
    };
  };
};
