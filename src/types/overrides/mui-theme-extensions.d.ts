
//mui
import '@mui/system';
import '@mui/material/styles';

//custom
import type { ThemedComponent } from '@/types/componentDefinition';
import type { MediaProps } from '@/Themes/Default/Components/Media/Media';
import type { MediaClassKey } from '@/Themes/Default/Components/Media/MediaClasses';
import type { IconProps } from '@/Themes/Default/Components/Icon/Icon';
import type { IconClassKey } from '@/Themes/Default/Components/Icon/IconClasses';
import type { ProjectCardProps } from '@/Themes/Default/Components/ProjectCard/ProjectCard';
import type { ProjectCardClassKey } from '@/Themes/Default/Components/ProjectCard/projectCardClasses';
import type { ProjectsOverviewProps } from '@/Themes/Default/Components/ProjectsOverview/ProjectsOverview'
import type { ProjectsOverviewClassKey } from '@/Themes/Default/Components/ProjectsOverview/projectsOverviewClasses'
import type { NavbarProps } from '@/Themes/Default/Components/Navbar/Navbar'
import type { NavbarClassKey } from '@/Themes/Default/Components/Navbar/navbarClasses'


// Augment MUI's Theme
  declare module '@mui/material/styles' {
    // Custom component definitions
    interface ComponentsProps {
      Media?: MediaProps;
      Icon?: IconProps;
      ProjectCard?: ProjectCardProps;
      ProjectsOverview?: ProjectsOverviewProps;
      Navbar?: NavbarProps;
    }
    interface ComponentNameToClassKey {
      Media: MediaClassKey;
      Icon: IconClassKey;
      ProjectCard: ProjectCardClassKey;
      ProjectsOverview: ProjectsOverviewClassKey;
      Navbar: NavbarClassKey;
    }
    interface Components {
      Media?: ThemedComponent<'Media'>;
      Icon?: ThemedComponent<'Icon'>;
      ProjectCard?: ThemedComponent<'ProjectCard'>;
      ProjectsOverview?: ThemedComponent<'ProjectsOverview'>;
      Navbar?: ThemedComponent<'Navbar'>;
    }
  }
