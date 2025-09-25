
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

/**
 * Generic helper: one component definition can have its own props and
 * its own internal theme settings object.
 */
interface ComponentDefinition<Props, ThemeSettings = any> {
  cmp?: React.FC<Props>;
  theme?: ThemeSettings;
}

// Augment MUI's Theme
  declare module '@mui/material/styles' {
    // Custom component definitions
    interface ComponentsProps {
      Media?: MediaProps;
      Icon?: IconProps;
      ProjectCard?: ProjectCardProps;
    }
    interface ComponentNameToClassKey {
      Media: MediaClassKey;
      Icon: IconClassKey;
      ProjectCard: ProjectCardClassKey;
    }
    interface Components {
      Media?: ThemedComponent<'Media'>
      Icon?: ThemedComponent<'Icon'>
      ProjectCard?: ThemedComponent<'ProjectCard'>
    }
  }
