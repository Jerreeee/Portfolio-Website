import React from 'react';

// Component implementations (Default theme)
import CodeBlockCmp from './Default/Components/Code/CodeBlockCmp';
import CodeInlineCmp from './Default/Components/Code/CodeInlineCmp';
import IconCmp from './Default/Components/Icon/IconCmp';
import ImageCompareCmp from './Default/Components/ImageCompare/ImageCompareCmp';
import ImageMultiCompareCmp from './Default/Components/ImageCompare/ImageMultiCompareCmp';
import MarkdownRendererCmp from './Default/Components/Markdown/MarkdownRendererCmp';
import MediaCmp from './Default/Components/Media/MediaCmp';
import MediaGalleryCmp from './Default/Components/MediaGallery/MediaGalleryCmp';
import NavbarCmp from './Default/Components/Navbar/NavbarCmp';
import ParentSizeObserverCmp from './Default/Components/ParentSizeObserver/ParentSizeObserverCmp';
import ProjectCardCmp from './Default/Components/ProjectCard/ProjectCardCmp';
import ProjectOverviewCmp from './Default/Components/ProjectOverview/ProjectOverviewCmp';
import ProjectsOverviewCmp from './Default/Components/ProjectsOverview/ProjectsOverviewCmp';
import ScrollableCmp from './Default/Components/Scrollable/ScrollableCmp';
import ScrollBarCmp from './Default/Components/ScrollBar/ScrollBarCmp';
import SegmentSliderCmp from './Default/Components/SegmentSlider/SegmentSliderCmp';
import TimelineCmp from './Default/Components/Timeline/Timeline';

// Prop types (import type — erased at runtime, no circular risk)
import type { CodeBlockCmpProps } from './Default/Components/Code/CodeBlockCmp';
import type { CodeInlineCmpProps } from './Default/Components/Code/CodeInlineCmp';
import type { IconCmpProps } from './Default/Components/Icon/IconCmp';
import type { ImageCompareCmpProps } from './Default/Components/ImageCompare/ImageCompareCmp';
import type { ImageMultiCompareCmpProps } from './Default/Components/ImageCompare/ImageMultiCompareCmp';
import type { MarkdownRendererCmpProps } from './Default/Components/Markdown/MarkdownRendererCmp';
import type { MediaCmpProps } from './Default/Components/Media/MediaCmp';
import type { MediaGalleryCmpProps } from './Default/Components/MediaGallery/MediaGalleryCmp';
import type { NavbarCmpProps } from './Default/Components/Navbar/NavbarCmp';
import type { ParentSizeObserverCmpProps } from './Default/Components/ParentSizeObserver/ParentSizeObserverCmp';
import type { ProjectCardCmpProps } from './Default/Components/ProjectCard/ProjectCardCmp';
import type { ProjectOverviewCmpProps } from './Default/Components/ProjectOverview/ProjectOverviewCmp';
import type { ProjectsOverviewCmpProps } from './Default/Components/ProjectsOverview/ProjectsOverviewCmp';
import type { ScrollBarCmpProps } from './Default/Components/ScrollBar/ScrollBarCmp';
import type { SegmentSliderCmpProps } from './Default/Components/SegmentSlider/SegmentSliderCmp';

/**
 * Maps component names to their React component types.
 * Compound components (ScrollableCmp, TimelineCmp) use `typeof` to preserve
 * their sub-component properties (e.g. .Group, .Vertical, .BarLayer).
 * A theme can override any subset of these via its `components` field.
 */
export type ComponentRegistry = {
  CodeBlockCmp: React.ComponentType<CodeBlockCmpProps>;
  CodeInlineCmp: React.ComponentType<CodeInlineCmpProps>;
  IconCmp: React.ComponentType<IconCmpProps>;
  ImageCompareCmp: React.ComponentType<ImageCompareCmpProps>;
  ImageMultiCompareCmp: React.ComponentType<ImageMultiCompareCmpProps>;
  MarkdownRendererCmp: React.ComponentType<MarkdownRendererCmpProps>;
  MediaCmp: React.ComponentType<MediaCmpProps>;
  MediaGalleryCmp: React.ComponentType<MediaGalleryCmpProps>;
  NavbarCmp: React.ComponentType<NavbarCmpProps>;
  ParentSizeObserverCmp: React.ComponentType<ParentSizeObserverCmpProps>;
  ProjectCardCmp: React.ComponentType<ProjectCardCmpProps>;
  ProjectOverviewCmp: React.ComponentType<ProjectOverviewCmpProps>;
  ProjectsOverviewCmp: React.ComponentType<ProjectsOverviewCmpProps>;
  // Compound components: use typeof to include sub-component properties
  ScrollableCmp: typeof ScrollableCmp;
  ScrollBarCmp: React.ComponentType<ScrollBarCmpProps>;
  SegmentSliderCmp: React.ComponentType<SegmentSliderCmpProps>;
  TimelineCmp: typeof TimelineCmp;
};

/**
 * Default component implementations — all from the Default theme.
 * Theme-specific registries override only the components they customize.
 */
export const defaultComponentRegistry: ComponentRegistry = {
  CodeBlockCmp,
  CodeInlineCmp,
  IconCmp,
  ImageCompareCmp,
  ImageMultiCompareCmp,
  MarkdownRendererCmp,
  MediaCmp,
  MediaGalleryCmp,
  NavbarCmp,
  ParentSizeObserverCmp,
  ProjectCardCmp,
  ProjectOverviewCmp,
  ProjectsOverviewCmp,
  ScrollableCmp,
  ScrollBarCmp,
  SegmentSliderCmp,
  TimelineCmp,
};
