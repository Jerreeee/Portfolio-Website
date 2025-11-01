import { ProjectInfo } from '@/Data/Projects/project'

export const getProjectBySlug = (slug: string) =>
  projects.find((project) => project.slug === slug);

// AUTO-GENERATED PROJECT IMPORTS START
import { data as BubbleBobbleData } from '@/Data/Projects/BubbleBobble/data';
import BubbleBobbleCmp from '@/Data/Projects/BubbleBobble/ProjectCmp';
import { projectManifest as BubbleBobbleManifest } from '@/Data/Projects/BubbleBobble/manifest';

import { data as DualRasterizerData } from '@/Data/Projects/DualRasterizer/data';
import DualRasterizerCmp from '@/Data/Projects/DualRasterizer/ProjectCmp';
import { projectManifest as DualRasterizerManifest } from '@/Data/Projects/DualRasterizer/manifest';

import { data as LuaCPPSnakeData } from '@/Data/Projects/LuaCPPSnake/data';
import LuaCPPSnakeCmp from '@/Data/Projects/LuaCPPSnake/ProjectCmp';
import { projectManifest as LuaCPPSnakeManifest } from '@/Data/Projects/LuaCPPSnake/manifest';

import { data as VulkanDeferredRendererData } from '@/Data/Projects/VulkanDeferredRenderer/data';
import VulkanDeferredRendererCmp from '@/Data/Projects/VulkanDeferredRenderer/ProjectCmp';
import { projectManifest as VulkanDeferredRendererManifest } from '@/Data/Projects/VulkanDeferredRenderer/manifest';

const BubbleBobbleProjectInfo: ProjectInfo = {
  ...BubbleBobbleData,
  component: BubbleBobbleCmp,
  manifest: BubbleBobbleManifest,
};

const DualRasterizerProjectInfo: ProjectInfo = {
  ...DualRasterizerData,
  component: DualRasterizerCmp,
  manifest: DualRasterizerManifest,
};

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
  BubbleBobbleProjectInfo,
  DualRasterizerProjectInfo,
  LuaCPPSnakeProjectInfo,
  VulkanDeferredRendererProjectInfo,
];
// AUTO-GENERATED PROJECT IMPORTS END





































