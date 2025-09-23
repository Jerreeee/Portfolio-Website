import { DefaultTheme } from "@/Themes/Default/BaseTheme";
import { NavbarCmp } from "@/Themes/Default/Components/Navbar";
import { ProjectsOverviewCmp } from "@/Themes/Default/Components/ProjectsOverview";
import { ProjectCardCmp } from "@/Themes/Default/Components/ProjectCard";
import { IconCmp } from "@/Themes/Default/Components/Generic/Icon";
import * as Text from "@/Themes/Default/Components/Generic/Text"
import { ImageCmp } from '@/Themes/Default/Components/Generic/Image';
import { ImageMaskCmp, ImageCompareCmp } from '@/Themes/Default/Components/Generic/ImageCompare';
import { MediaCmp } from '@/Themes/Default/Components/Generic/Media';
import { MediaGalleryCmp } from '@/Themes/Default/Components/Generic/MediaGallery';
import { ScrollBarCmp } from '@/Themes/Default/Components/Generic/ScrollBar';
import { SegmentSliderCmp } from '@/Themes/Default/Components/Generic/SegmentSlider';

export type DarkTheme = DefaultTheme & { name: 'Dark'; };

const darkColors = {
  background: '#0b0b0d',           // almost black
  backgroundAlt: '#141418',        // very dark gray-blue for contrast

  foreground: '#f0f0f0',
  foregroundMuted: '#888888',

  highlight: '#7f5af0',            // lavender purple (matches right side of gradient)
  highlightAlt: '#60a5fa',         // light blue for hover or accent

  border: '#1e1e22',
  borderMuted: '#131317',

  gradientStart: '#60a5fa',        // light blue (start of gradient)
  gradientEnd: '#c084fc',          // soft purple (end of gradient)
  // gradientStart: '#0b0b0d', // almost black
  // gradientEnd: '#151520',   // just slightly lighter, bluish tint

  overlay: 'rgba(0, 0, 0, 0.7)',

  success: '#22c55e',
  warning: '#facc15',
  error: '#ef4444',
  info: '#7dd3fc',

  link: '#7f5af0',
  linkHover: '#c084fc',
};

export const darkTheme: DarkTheme = {
  name: 'Dark',
  colors: darkColors,
   components: {
    navbar: { cmp: NavbarCmp, settings: {} },
    projectsOverview: { cmp: ProjectsOverviewCmp, settings: {} },
    projectCard: { cmp: ProjectCardCmp, settings: {} },
    icon: {
      cmp: IconCmp,
      settings: {
        convertToGrayScale: false,
        grayScaleIconColor: "",
      },
    },
    image: { cmp: ImageCmp, settings: {} },
    imageMask: { cmp: ImageMaskCmp, settings: {} },
    imageCompare: { cmp: ImageCompareCmp, settings: {} },
    media: { cmp: MediaCmp, settings: {} },
    mediaGallery: { cmp: MediaGalleryCmp, settings: {} },
    scrollBar: { cmp: ScrollBarCmp, settings: {} },
    segmentSlider: { cmp: SegmentSliderCmp, settings: {} },
    h1: { cmp: Text.H1, settings: {} },
    h2: { cmp: Text.H2, settings: {} },
    h3: { cmp: Text.H3, settings: {} },
    h4: { cmp: Text.H4, settings: {} },
    p: { cmp: Text.P, settings: {} },
  },
};
