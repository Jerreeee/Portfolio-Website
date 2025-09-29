
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
import type { SegmentSliderProps } from '@/Themes/Default/Components/SegmentSlider/SegmentSlider'
import type { SegmentSliderClassKey } from '@/Themes/Default/Components/SegmentSlider/segmentSliderClasses'
import type { ScrollBarProps } from '@/Themes/Default/Components/ScrollBar/ScrollBar'
import type { ScrollBarClassKey } from '@/Themes/Default/Components/ScrollBar/scrollBarClasses'
import type { ImageCompareProps } from '@/Themes/Default/Components/ImageCompare/ImageCompare'
import type { ImageCompareClassKey } from '@/Themes/Default/Components/ImageCompare/imageCompareClasses'
import type { ImageMultiCompareProps } from '@/Themes/Default/Components/ImageMultiCompare/ImageMultiCompare'
import type { ImageMultiCompareClassKey } from '@/Themes/Default/Components/ImageMultiCompare/imageMultiCompareClasses'
import type { MediaGalleryProps } from '@/Themes/Default/Components/MediaGallery/MediaGallery'
import type { MediaGalleryClassKey } from '@/Themes/Default/Components/MediaGallery/mediaGalleryClasses'

// Augment MUI's Theme
  declare module '@mui/material/styles' {
    // Custom component definitions
    interface ComponentsProps {
      Media?: MediaProps;
      Icon?: IconProps;
      ProjectCard?: ProjectCardProps;
      ProjectsOverview?: ProjectsOverviewProps;
      Navbar?: NavbarProps;
      SegmentSlider?: SegmentSliderProps;
      ScrollBar?: ScrollBarProps;
      ImageCompare?: ImageCompareProps;
      ImageMultiCompare?: ImageMultiCompareProps;
      MediaGallery?: MediaGalleryProps;
    }
    interface ComponentNameToClassKey {
      Media: MediaClassKey;
      Icon: IconClassKey;
      ProjectCard: ProjectCardClassKey;
      ProjectsOverview: ProjectsOverviewClassKey;
      Navbar: NavbarClassKey;
      SegmentSlider: SegmentSliderClassKey;
      ScrollBar: ScrollBarClassKey;
      ImageCompare: ImageCompareClassKey;
      ImageMultiCompare: ImageMultiCompareClassKey;
      MediaGallery: MediaGalleryClassKey;
    }
    interface Components {
      Media?: ThemedComponent<'Media'>;
      Icon?: ThemedComponent<'Icon'>;
      ProjectCard?: ThemedComponent<'ProjectCard'>;
      ProjectsOverview?: ThemedComponent<'ProjectsOverview'>;
      Navbar?: ThemedComponent<'Navbar'>;
      SegmentSlider?: ThemedComponent<'SegmentSlider'>;
      ScrollBar?: ThemedComponent<'ScrollBar'>;
      ImageCompare?: ThemedComponent<'ImageCompare'>;
      ImageMultiCompare?: ThemedComponent<'ImageMultiCompare'>;
      MediaGallery?: ThemedComponent<'MediaGallery'>;
    }
  }
