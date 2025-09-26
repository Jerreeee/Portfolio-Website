// src/types/componentAnimations.d.ts
import type { AnimationProps } from 'framer-motion';

// custom
import type { IconClassKey } from '@/Themes/Default/Components/Icon/IconClasses';
import type { MediaClassKey } from '@/Themes/Default/Components/Media/MediaClasses';
import type { ProjectCardClassKey } from '@/Themes/Default/Components/ProjectCard/projectCardClasses';
import type { ProjectsOverviewClassKey } from '@/Themes/Default/Components/ProjectsOverview/projectsOverviewClasses'
import type { NavbarClassKey } from '@/Themes/Default/Components/Navbar/navbarClasses'


/**
 * For each component, we want a record of slot->AnimationProps.
 * This is similar to OverridesStyleRules but specialized for motion.
 */
export type AnimationStyleRules<SlotKey extends string> = {
  [Slot in SlotKey]?: AnimationProps;
};

/**
 * Main helper: ComponentsAnimations<Theme>
 * Gives you { ProjectCard?: Partial<AnimationStyleRules<...>>; ... }
 */
export type ComponentsAnimations<Theme = unknown> = {
  [Name in keyof ComponentNameToAnimationSlot]?: Partial<
    AnimationStyleRules<ComponentNameToAnimationSlot[Name]>
  >;
};

/**
 * Map each component name to the set of valid slot keys
 * (just like ComponentNameToClassKey, but for animations).
 */
export interface ComponentNameToAnimationSlot {
  Media: MediaClassKey;
  Icon: IconClassKey;
  ProjectCard: ProjectCardClassKey;
  ProjectsOverview: ProjectsOverviewClassKey;
  Navbar: NavbarClassKey;
}
