// () => makePath(`${BASE.TYPES}/componentAnimations.d.ts`)
import type { AnimationProps } from 'framer-motion';

/**
 * For each component, we want a record of slot->AnimationProps.
 * This is similar to OverridesStyleRules but specialized for motion.
 */
export type AnimationStyleRules<SlotKey extends string> = {
  [Slot in SlotKey]?: AnimationProps;
};

/**
 * Main helper: ComponentsAnimations<Theme>
 * Gives you { ProjectCardCmp?: Partial<AnimationStyleRules<...>>; ... }
 */
export type ComponentsAnimations<Theme = unknown> = {
  [Name in keyof ComponentNameToAnimationSlot]?: Partial<
    AnimationStyleRules<ComponentNameToAnimationSlot[Name]>
  >;
};

// AUTO-GENERATED START
import type {
  CodeBlockCmpClassKey,
  CodeInlineCmpClassKey,
} from '@/Themes/Default/Components/Code';
import type { IconCmpClassKey } from '@/Themes/Default/Components/Icon';
import type {
  ImageCompareCmpClassKey,
  ImageMultiCompareCmpClassKey,
} from '@/Themes/Default/Components/ImageCompare';
import type { MarkdownRendererCmpClassKey } from '@/Themes/Default/Components/Markdown';
import type { MediaCmpClassKey } from '@/Themes/Default/Components/Media';
import type { MediaGalleryCmpClassKey } from '@/Themes/Default/Components/MediaGallery';
import type { NavbarCmpClassKey } from '@/Themes/Default/Components/Navbar';
import type { ParentSizeObserverCmpClassKey } from '@/Themes/Default/Components/ParentSizeObserver';
import type { ProjectCardCmpClassKey } from '@/Themes/Default/Components/ProjectCard';
import type { ProjectOverviewCmpClassKey } from '@/Themes/Default/Components/ProjectOverview';
import type { ProjectsOverviewCmpClassKey } from '@/Themes/Default/Components/ProjectsOverview';
import type { ScrollBarCmpClassKey } from '@/Themes/Default/Components/ScrollBar';
import type { ScrollableCmpClassKey } from '@/Themes/Default/Components/Scrollable';
import type { SegmentSliderCmpClassKey } from '@/Themes/Default/Components/SegmentSlider';
import type { TimelineTopBarCmpClassKey } from '@/Themes/Default/Components/Timeline';

export interface ComponentNameToAnimationSlot {
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
  ScrollBarCmp: ScrollBarCmpClassKey;
  ScrollableCmp: ScrollableCmpClassKey;
  SegmentSliderCmp: SegmentSliderCmpClassKey;
  TimelineTopBarCmp: TimelineTopBarCmpClassKey;
}
// AUTO-GENERATED END
