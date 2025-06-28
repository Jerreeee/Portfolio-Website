import type { BaseTheme } from '@/Themes/BaseTheme';
import type { ProjectPageTheme } from '@/Themes/Default/Components/ProjectPage';
import type { NavbarTheme } from '@/Themes/Default/Components/Navbar';
import type { CardTheme } from '@/Themes/Default/Components/ProjectCard';
import type { IconTheme } from '@/Themes/Default/Components/Icon';

export type DefaultTheme = BaseTheme & {
  name: string;
  colors: {
    foreground: string;
    background: string;
  };
  invertIconColor: boolean;
  components: {
    card: CardTheme;
    navbar: NavbarTheme;
    icon: IconTheme;
    projectPage: ProjectPageTheme;
  };
};
