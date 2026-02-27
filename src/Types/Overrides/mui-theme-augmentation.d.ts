
//mui
import '@mui/system';
import '@mui/material/styles';
import { TypographyPropsVariantOverrides } from '@mui/material/Typography';

import { ThemedComponent } from '../componentDefinition';

// AUTO-GENERATED Component IMPORTS START
import type { CardTabsCmpProps, CardTabsCmpClassKey } from '@/Themes/Default/Components/CardTabs';
import type { CodeBlockCmpProps, CodeBlockCmpClassKey } from '@/Themes/Default/Components/Code';
import type { CodeInlineCmpProps, CodeInlineCmpClassKey } from '@/Themes/Default/Components/Code';
import type { IconCmpProps, IconCmpClassKey } from '@/Themes/Default/Components/Icon';
import type { ImageCompareCmpProps, ImageCompareCmpClassKey } from '@/Themes/Default/Components/ImageCompare';
import type { ImageMultiCompareCmpProps, ImageMultiCompareCmpClassKey } from '@/Themes/Default/Components/ImageCompare';
import type { MarkdownRendererCmpProps, MarkdownRendererCmpClassKey } from '@/Themes/Default/Components/Markdown';
import type { MediaCmpProps, MediaCmpClassKey } from '@/Themes/Default/Components/Media';
import type { MediaGalleryCmpProps, MediaGalleryCmpClassKey } from '@/Themes/Default/Components/MediaGallery';
import type { NavbarCmpProps, NavbarCmpClassKey } from '@/Themes/Default/Components/Navbar';
import type { ParentSizeObserverCmpProps, ParentSizeObserverCmpClassKey } from '@/Themes/Default/Components/ParentSizeObserver';
import type { ProjectCardCmpProps, ProjectCardCmpClassKey } from '@/Themes/Default/Components/ProjectCard';
import type { ProjectOverviewCmpProps, ProjectOverviewCmpClassKey } from '@/Themes/Default/Components/ProjectOverview';
import type { ProjectsOverviewCmpProps, ProjectsOverviewCmpClassKey } from '@/Themes/Default/Components/ProjectsOverview';
import type { ResumeCmpProps, ResumeCmpClassKey } from '@/Themes/Default/Components/Resume';
import type { ScrollableCmpProps, ScrollableCmpClassKey } from '@/Themes/Default/Components/Scrollable';
import type { ScrollBarCmpProps, ScrollBarCmpClassKey } from '@/Themes/Default/Components/ScrollBar';
import type { SegmentSliderCmpProps, SegmentSliderCmpClassKey } from '@/Themes/Default/Components/SegmentSlider';
// AUTO-GENERATED Component IMPORTS END

// Augment MUI's Theme
declare module '@mui/material/styles' {
  interface Palette {
    gradients: {
      primary: (direction?: string) => string;
      background: (direction?: string) => string;
    };
  }

  interface PaletteOptions {
    gradients?: {
      primary?: (direction?: string) => string;
      background?: (direction?: string) => string;
    };
  }

  // Custom component definitions
  interface ComponentsProps {
    // AUTO-GENERATED ComponentsProps START
    CardTabsCmp?: CardTabsCmpProps;
    CodeBlockCmp?: CodeBlockCmpProps;
    CodeInlineCmp?: CodeInlineCmpProps;
    IconCmp?: IconCmpProps;
    ImageCompareCmp?: ImageCompareCmpProps;
    ImageMultiCompareCmp?: ImageMultiCompareCmpProps;
    MarkdownRendererCmp?: MarkdownRendererCmpProps;
    MediaCmp?: MediaCmpProps;
    MediaGalleryCmp?: MediaGalleryCmpProps;
    NavbarCmp?: NavbarCmpProps;
    ParentSizeObserverCmp?: ParentSizeObserverCmpProps;
    ProjectCardCmp?: ProjectCardCmpProps;
    ProjectOverviewCmp?: ProjectOverviewCmpProps;
    ProjectsOverviewCmp?: ProjectsOverviewCmpProps;
    ResumeCmp?: ResumeCmpProps;
    ScrollableCmp?: ScrollableCmpProps;
    ScrollBarCmp?: ScrollBarCmpProps;
    SegmentSliderCmp?: SegmentSliderCmpProps;
// AUTO-GENERATED ComponentsProps END
  }
  interface ComponentNameToClassKey {
    // AUTO-GENERATED ComponentNameToClassKey START
    CardTabsCmp: CardTabsCmpClassKey;
    CodeBlockCmp: CodeBlockCmpClassKey;
    CodeInlineCmp: CodeInlineCmpClassKey;
    IconCmp: IconCmpClassKey;
    ImageCompareCmp: ImageCompareCmpClassKey;
    ImageMultiCompareCmp: ImageMultiCompareCmpClassKey;
    MarkdownRendererCmp: MarkdownRendererCmpClassKey;
    MediaCmp: MediaCmpClassKey;
    MediaGalleryCmp: MediaGalleryCmpClassKey;
    NavbarCmp: NavbarCmpClassKey;
    ParentSizeObserverCmp: ParentSizeObserverCmpClassKey;
    ProjectCardCmp: ProjectCardCmpClassKey;
    ProjectOverviewCmp: ProjectOverviewCmpClassKey;
    ProjectsOverviewCmp: ProjectsOverviewCmpClassKey;
    ResumeCmp: ResumeCmpClassKey;
    ScrollableCmp: ScrollableCmpClassKey;
    ScrollBarCmp: ScrollBarCmpClassKey;
    SegmentSliderCmp: SegmentSliderCmpClassKey;
// AUTO-GENERATED ComponentNameToClassKey END
  }
  interface Components {
    // AUTO-GENERATED Components START
    CardTabsCmp?: ThemedComponent<'CardTabsCmp'>;
    CodeBlockCmp?: ThemedComponent<'CodeBlockCmp'>;
    CodeInlineCmp?: ThemedComponent<'CodeInlineCmp'>;
    IconCmp?: ThemedComponent<'IconCmp'>;
    ImageCompareCmp?: ThemedComponent<'ImageCompareCmp'>;
    ImageMultiCompareCmp?: ThemedComponent<'ImageMultiCompareCmp'>;
    MarkdownRendererCmp?: ThemedComponent<'MarkdownRendererCmp'>;
    MediaCmp?: ThemedComponent<'MediaCmp'>;
    MediaGalleryCmp?: ThemedComponent<'MediaGalleryCmp'>;
    NavbarCmp?: ThemedComponent<'NavbarCmp'>;
    ParentSizeObserverCmp?: ThemedComponent<'ParentSizeObserverCmp'>;
    ProjectCardCmp?: ThemedComponent<'ProjectCardCmp'>;
    ProjectOverviewCmp?: ThemedComponent<'ProjectOverviewCmp'>;
    ProjectsOverviewCmp?: ThemedComponent<'ProjectsOverviewCmp'>;
    ResumeCmp?: ThemedComponent<'ResumeCmp'>;
    ScrollableCmp?: ThemedComponent<'ScrollableCmp'>;
    ScrollBarCmp?: ThemedComponent<'ScrollBarCmp'>;
    SegmentSliderCmp?: ThemedComponent<'SegmentSliderCmp'>;
// AUTO-GENERATED Components END
  }
}
