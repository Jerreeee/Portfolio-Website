// src/types/componentAnimations.d.ts
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
import type { ImageCompareCmpClassKey } from '@/Themes/Default/Components/ImageCompare';
import type { ImageMultiCompareCmpClassKey } from '@/Themes/Default/Components/ImageMultiCompare';
import type { MediaGalleryCmpClassKey } from '@/Themes/Default/Components/MediaGallery';
import type { NavbarCmpClassKey } from '@/Themes/Default/Components/Navbar';
import type { ProjectCardCmpClassKey } from '@/Themes/Default/Components/ProjectCard';
import type { ProjectsOverviewCmpClassKey } from '@/Themes/Default/Components/ProjectsOverview';
import type { ScrollBarCmpClassKey } from '@/Themes/Default/Components/ScrollBar';
import type { SegmentSliderCmpClassKey } from '@/Themes/Default/Components/SegmentSlider';

export interface ComponentNameToAnimationSlot {
  CodeBlockCmp: CodeBlockCmpClassKey;
  CodeInlineCmp: CodeInlineCmpClassKey;
  IconCmp: IconCmpClassKey;
  ImageCompareCmp: ImageCompareCmpClassKey;
  ImageMultiCompareCmp: ImageMultiCompareCmpClassKey;
  MediaGalleryCmp: MediaGalleryCmpClassKey;
  NavbarCmp: NavbarCmpClassKey;
  ProjectCardCmp: ProjectCardCmpClassKey;
  ProjectsOverviewCmp: ProjectsOverviewCmpClassKey;
  ScrollBarCmp: ScrollBarCmpClassKey;
  SegmentSliderCmp: SegmentSliderCmpClassKey;
}
// AUTO-GENERATED END
