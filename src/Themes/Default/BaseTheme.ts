import type { BaseTheme } from '@/Themes/BaseTheme';

import { NavbarProps } from '@/Themes/Default/Components/Navbar';
import { ProjectsOverviewProps } from '@/Themes/Default/Components/ProjectsOverview';
import { ProjectCardProps } from '@/Themes/Default/Components/ProjectCard';
import { IconProps } from '@/Themes/Default/Components/Generic/Icon';
import * as Text from '@/Themes/Default/Components/Generic/Text';
import { ImageProps } from '@/Themes/Default/Components/Generic/Image';
import { ImageCompareProps } from '@/Themes/Default/Components/Generic/ImageCompare';
import { MediaProps } from '@/Themes/Default/Components/Generic/Media';
import { MediaGalleryProps } from '@/Themes/Default/Components/Generic/MediaGallery';
import { ScrollBarProps } from '@/Themes/Default/Components/Generic/ScrollBar';
import { SegmentSliderProps } from '@/Themes/Default/Components/Generic/SegmentSlider';

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
  ImageCompareT = unknown,
  MediaT = unknown,
  MediaGalleryT = unknown,
  ScrollBarT = unknown,
  SegmentSliderT = unknown
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
    navbar: ComponentDefinition<NavbarProps, NavbarT>;
    projectsOverview: ComponentDefinition<ProjectsOverviewProps, ProjectsOverviewT>;
    projectCard: ComponentDefinition<ProjectCardProps, CardT>;
    icon: ComponentDefinition<IconProps, IconT>;
    h1: ComponentDefinition<Text.TextProps, H1T>;
    p: ComponentDefinition<Text.TextProps, PT>;
    image: ComponentDefinition<ImageProps, ImageT>;
    imageCompare: ComponentDefinition<ImageCompareProps, ImageCompareT>;
    media: ComponentDefinition<MediaProps, MediaT>;
    mediaGallery: ComponentDefinition<MediaGalleryProps, MediaGalleryT>;
    scrollBar: ComponentDefinition<ScrollBarProps, ScrollBarT>;
    segmentSlider: ComponentDefinition<SegmentSliderProps, SegmentSliderT>;
  };
};
