// () => makePath(`${BASE.TYPES}/componentSettings.d.ts`)
/**
 * Auto-generated mapping between component names and their Settings types.
 * Used to power theme configuration and typing.
 */

// AUTO-GENERATED START
import type { CardTabsCmpSettings } from '@/Themes/Default/Components/CardTabs';
import type {
  CodeBlockCmpSettings,
  CodeInlineCmpSettings,
} from '@/Themes/Default/Components/Code';
import type { IconCmpSettings } from '@/Themes/Default/Components/Icon';
import type {
  ImageCompareCmpSettings,
  ImageMultiCompareCmpSettings,
} from '@/Themes/Default/Components/ImageCompare';
import type { MarkdownRendererCmpSettings } from '@/Themes/Default/Components/Markdown';
import type { MediaCmpSettings } from '@/Themes/Default/Components/Media';
import type { MediaGalleryCmpSettings } from '@/Themes/Default/Components/MediaGallery';
import type { NavbarCmpSettings } from '@/Themes/Default/Components/Navbar';
import type { ParentSizeObserverCmpSettings } from '@/Themes/Default/Components/ParentSizeObserver';
import type { ProjectCardCmpSettings } from '@/Themes/Default/Components/ProjectCard';
import type { ProjectOverviewCmpSettings } from '@/Themes/Default/Components/ProjectOverview';
import type { ProjectsOverviewCmpSettings } from '@/Themes/Default/Components/ProjectsOverview';
import type { ScrollBarCmpSettings } from '@/Themes/Default/Components/ScrollBar';
import type { ScrollableCmpSettings } from '@/Themes/Default/Components/Scrollable';
import type { SegmentSliderCmpSettings } from '@/Themes/Default/Components/SegmentSlider';
import type { TimelineSettings } from '@/Themes/Default/Components/Timeline';

export interface ComponentNameToSettings {
  CardTabsCmp: CardTabsCmpSettings;
  CodeBlockCmp: CodeBlockCmpSettings;
  CodeInlineCmp: CodeInlineCmpSettings;
  IconCmp: IconCmpSettings;
  ImageCompareCmp: ImageCompareCmpSettings;
  ImageMultiCompareCmp: ImageMultiCompareCmpSettings;
  MarkdownRendererCmp: MarkdownRendererCmpSettings;
  MediaCmp: MediaCmpSettings;
  MediaGalleryCmp: MediaGalleryCmpSettings;
  NavbarCmp: NavbarCmpSettings;
  ParentSizeObserverCmp: ParentSizeObserverCmpSettings;
  ProjectCardCmp: ProjectCardCmpSettings;
  ProjectOverviewCmp: ProjectOverviewCmpSettings;
  ProjectsOverviewCmp: ProjectsOverviewCmpSettings;
  ScrollBarCmp: ScrollBarCmpSettings;
  ScrollableCmp: ScrollableCmpSettings;
  SegmentSliderCmp: SegmentSliderCmpSettings;
  Timeline: TimelineSettings;
}

/**
 * Main helper: ComponentsSettings
 * Gives you { ProjectCardCmp?: ProjectCardCmpSettings; ... }
 */
export type ComponentsSettings<Theme = unknown> = {
  [Name in keyof ComponentNameToSettings]?: ComponentNameToSettings[Name];
};
// AUTO-GENERATED END
