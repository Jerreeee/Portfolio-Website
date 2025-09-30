import { ProjectInfo } from '@/data/projects/project'

export const getProjectBySlug = (slug: string) =>
  projects.find((project) => project.slug === slug);

// AUTO-GENERATED PROJECT IMPORTS START
import { data as BubbleBobbleData } from '@/data/projects/BubbleBobble/data';
import BubbleBobbleCmp from '@/data/projects/BubbleBobble/ProjectCmp';

import { data as VulkanDeferredRendererData } from '@/data/projects/VulkanDeferredRenderer/data';
import VulkanDeferredRendererCmp from '@/data/projects/VulkanDeferredRenderer/ProjectCmp';

const BubbleBobbleProjectInfo: ProjectInfo = {
  ...BubbleBobbleData,
  Component: BubbleBobbleCmp,
};

const VulkanDeferredRendererProjectInfo: ProjectInfo = {
  ...VulkanDeferredRendererData,
  Component: VulkanDeferredRendererCmp,
};

export const projects: ProjectInfo[] = [
  BubbleBobbleProjectInfo,
  VulkanDeferredRendererProjectInfo,
];
// AUTO-GENERATED PROJECT IMPORTS END








