import { ProjectInfo } from '@/data/projects/project'

export const getProjectBySlug = (slug: string) =>
  projects.find((project) => project.slug === slug);

// AUTO-GENERATED PROJECT IMPORTS START
import { data as LuaCPPSnakeData } from '@/data/projects/LuaCPPSnake/data';
import LuaCPPSnakeCmp from '@/data/projects/LuaCPPSnake/ProjectCmp';
import { projectManifest as LuaCPPSnakeManifest } from '@/data/projects/LuaCPPSnake/manifest';

import { data as VulkanDeferredRendererData } from '@/data/projects/VulkanDeferredRenderer/data';
import VulkanDeferredRendererCmp from '@/data/projects/VulkanDeferredRenderer/ProjectCmp';
import { projectManifest as VulkanDeferredRendererManifest } from '@/data/projects/VulkanDeferredRenderer/manifest';

const LuaCPPSnakeProjectInfo: ProjectInfo = {
  ...LuaCPPSnakeData,
  component: LuaCPPSnakeCmp,
  manifest: LuaCPPSnakeManifest,
};

const VulkanDeferredRendererProjectInfo: ProjectInfo = {
  ...VulkanDeferredRendererData,
  component: VulkanDeferredRendererCmp,
  manifest: VulkanDeferredRendererManifest,
};

export const projects: ProjectInfo[] = [
  LuaCPPSnakeProjectInfo,
  VulkanDeferredRendererProjectInfo,
];
// AUTO-GENERATED PROJECT IMPORTS END
















