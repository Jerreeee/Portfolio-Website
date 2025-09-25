import { DefaultTheme } from "@/Themes/Default/BaseTheme";
import { NavbarCmp, NavbarTheme } from "@/Themes/Default/Components/Navbar";
import { ProjectsOverviewCmp, ProjectsOverviewTheme } from "@/Themes/Default/Components/ProjectsOverview";
import { ProjectCardCmp, ProjectCardTheme } from "@/Themes/Default/Components/ProjectCard/ProjectCard";
import { IconCmp, IconTheme } from "@/Themes/Default/Components/Generic/Icon";
import * as Text from "@/Themes/Default/Components/Generic/Text"
import { ImageCmp, ImageTheme } from '@/Themes/Default/Components/Generic/Image';
import { ImageCompareCmp, ImageCompareTheme } from '@/Themes/Default/Components/Generic/ImageCompare';
import { MediaCmp, MediaTheme } from '@/Themes/Default/Components/Generic/Media';
import { MediaGalleryCmp, MediaGalleryTheme } from '@/Themes/Default/Components/Generic/MediaGallery';
import { ScrollBarCmp, ScrollBarTheme } from '@/Themes/Default/Components/Generic/ScrollBar';
import { SegmentSliderCmp, SegmentSliderTheme } from '@/Themes/Default/Components/Generic/SegmentSlider';

export type DarkTheme = DefaultTheme<
  NavbarTheme,
  ProjectsOverviewTheme,
  ProjectCardTheme,
  IconTheme,
  Text.TextTheme,
  Text.TextTheme,
  ImageTheme,
  ImageCompareTheme,
  MediaTheme,
  MediaGalleryTheme,
  ScrollBarTheme,
  SegmentSliderTheme
> & { name: 'Dark'; };

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
    navbar: {
      cmp: NavbarCmp,
      theme: {
        containerBackground: '#141418',
        containerBorderColor: '#3fa0ff',

        brandGradientStart: '#3fa0ff',
        brandGradientMid: '#7b72f0',
        brandGradientEnd: '#ec38bc',

        brandTextColor: '#ec38bc', // fallback or non-gradient context

        linkTextColor: '#888888',
        linkTextHoverColor: '#d0d0d0',
        linkTextActiveColor: '#7b72f0',
      },
    },
    projectsOverview: {
      cmp: ProjectsOverviewCmp,
      theme: {
        sectionBgColor: '#0b0b0d',
        sectionBgGradientStart: '#151a2c', // Dark blue-violet base
        sectionBgGradientEnd: '#221730', // Deep purple-gray

        titleGradientStart: '#3fa0ff', // Vibrant blue
        titleGradientMid: '#7b72f0', // Electric lavender
        titleGradientEnd: '#ec38bc', // Bright pinkish-purple for punch

        ctaButtonBgColor: '#f0f0f0',
        ctaButtonTextColor: '#0b0b0d',
      },
    },
    projectCard: {
      cmp: ProjectCardCmp,
      theme: {
        bgColor: '#141519', // darker than #1a1b20
        bgHoverColor: '#1f2027', // darker than #2a2b32

        borderRadius: 12,
        shadowColor: 'rgba(0, 0, 0, 0.3)',

        titleTextColor: '#F0F0F0', // Soft white for titles
        descriptionTextColor: '#aaaaaa', // Muted gray for secondary text
      },
    },
    icon: {
      cmp: IconCmp,
      theme: {
        convertToGrayScale: false,
        grayScaleIconColor: '#FFFFFF',
      },
    },
    h1: {
      cmp: Text.H1,
      theme: {
        style: {
          className: 'font-normal sm:font-[200] md:font-semibold lg:font-bold',
          style: {
            display: 'block',
            fontSize: 'clamp(24px, 4vw + 1rem, 48px)',
            marginTop: '0.25em',
            marginBottom: '0.25em',
            color: '#FFFFFF'
          }
        }
      },
    },
    p: {
      cmp: Text.Paragraph,
      theme: {
        style: {
          style: {
            fontSize: '20px',
            fontWeight: 'normal',
            color: '#FFFFFF'
          }
        }
      }
    },
    image: {
      cmp: ImageCmp,
      theme: {
        style:  {
          className: 'ring-2 ring-white'
        }
      }
    },
    imageCompare: {
      cmp: ImageCompareCmp,
      theme: {}
    },
    media: {
      cmp: MediaCmp,
      theme: {}
    },
    mediaGallery: {
      cmp: MediaGalleryCmp,
      theme: {}
    },
    scrollBar: {
      cmp: ScrollBarCmp,
      theme: {}
    },
    segmentSlider: {
      cmp: SegmentSliderCmp,
      theme: {}
    },
  },
};
