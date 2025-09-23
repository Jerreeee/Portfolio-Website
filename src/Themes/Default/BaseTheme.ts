import type { BaseTheme, ComponentDefinition } from '@/Themes/BaseTheme';
import { NavbarCmp } from './Components/Navbar';
import { ProjectsOverviewCmp } from './Components/ProjectsOverview';
import { ProjectCardCmp } from './Components/ProjectCard';
import { IconCmp } from './Components/Generic/Icon';
import * as Text from './Components/Generic/Text';
import { ImageCmp } from './Components/Generic/Image';
import { ImageCompareCmp, ImageMaskCmp } from './Components/Generic/ImageCompare';
import { MediaCmp } from './Components/Generic/Media';
import { MediaGalleryCmp } from './Components/Generic/MediaGallery';
import { ScrollBarCmp } from './Components/Generic/ScrollBar';
import { SegmentSliderCmp } from './Components/Generic/SegmentSlider';

type ComponentMap = {
  navbar: typeof NavbarCmp;
  projectsOverview: typeof ProjectsOverviewCmp;
  projectCard: typeof ProjectCardCmp;
  icon: typeof IconCmp;
  image: typeof ImageCmp;
  imageMask: typeof ImageMaskCmp;
  imageCompare: typeof ImageCompareCmp;
  media: typeof MediaCmp;
  mediaGallery: typeof MediaGalleryCmp;
  scrollBar: typeof ScrollBarCmp;
  segmentSlider: typeof SegmentSliderCmp;
  h1: typeof Text.H1;
  h2: typeof Text.H2;
  h3: typeof Text.H3;
  h4: typeof Text.H4;
  p: typeof Text.P;
};

export type DefaultTheme = BaseTheme<ComponentMap> & {
  name: string;
  colors: {
    background: string;
    backgroundAlt: string;
    foreground: string;
    foregroundMuted: string;
    highlight: string;
    highlightAlt: string;
    border: string;
    borderMuted: string;
    gradientStart: string;
    gradientEnd: string;
    overlay: string;
    success: string;
    warning: string;
    error: string;
    info: string;
    link: string;
    linkHover: string;
  };
};
