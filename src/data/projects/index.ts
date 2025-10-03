import { ProjectInfo } from '@/data/projects/project'

export const getProjectBySlug = (slug: string) =>
  projects.find((project) => project.slug === slug);

// AUTO-GENERATED PROJECT IMPORTS START
import { data as BubbleBobbleData } from '@/data/projects/BubbleBobble/data';
import BubbleBobbleCmp from '@/data/projects/BubbleBobble/ProjectCmp';
import { projectManifest as BubbleBobbleManifest } from '@/data/projects/BubbleBobble/manifest';

import { data as VulkanDeferredRendererData } from '@/data/projects/VulkanDeferredRenderer/data';
import VulkanDeferredRendererCmp from '@/data/projects/VulkanDeferredRenderer/ProjectCmp';
import { projectManifest as VulkanDeferredRendererManifest } from '@/data/projects/VulkanDeferredRenderer/manifest';

const BubbleBobbleProjectInfo: ProjectInfo = {
  ...BubbleBobbleData,
  component: BubbleBobbleCmp,
  manifest: BubbleBobbleManifest,
};

const VulkanDeferredRendererProjectInfo: ProjectInfo = {
  ...VulkanDeferredRendererData,
  component: VulkanDeferredRendererCmp,
  manifest: VulkanDeferredRendererManifest,
};

export const projects: ProjectInfo[] = [
  BubbleBobbleProjectInfo,
  VulkanDeferredRendererProjectInfo,
];
// AUTO-GENERATED PROJECT IMPORTS END








































