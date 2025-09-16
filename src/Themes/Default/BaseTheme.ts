import type { BaseTheme } from '@/Themes/BaseTheme';
import type { ProjectInfo } from '@/data/projects/project';
import type { IconProps } from '@/Themes/Default/Components/Icon';
import type { TextProps } from '@/Themes/Default/Components/Text';
import { ImageProps } from '@/Themes/Default/Components/Image';
import { MediaGalleryProps } from '@/Themes/Default/Components/MediaGallery';

type ComponentDefinition<P extends object, TTheme> = {
  cmp: React.ComponentType<P>;
  theme: TTheme;
};

export type DefaultTheme<
  NavbarT = unknown,
  ProjectsOverviewT = unknown,
  CardT = unknown,
  IconT = unknown,
  H1T = unknown,
  PT = unknown,
  ImageT = unknown,
  MediaGalleryT = unknown
> = BaseTheme & {
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
  components: {
    navbar: ComponentDefinition<{}, NavbarT>;
    projectsOverview: ComponentDefinition<{}, ProjectsOverviewT>;
    projectCard: ComponentDefinition<{ project: ProjectInfo }, CardT>;
    icon: ComponentDefinition<IconProps, IconT>;
    h1: ComponentDefinition<TextProps, H1T>;
    p: ComponentDefinition<TextProps, PT>;
    image: ComponentDefinition<ImageProps, ImageT>;
    mediaGallery: ComponentDefinition<MediaGalleryProps, MediaGalleryT>;
  };
};
