import { ProjectInfo } from '@/Data/Projects/project'

export const getProjectBySlug = (slug: string) =>
  projects.find((project) => project.slug === slug);

// AUTO-GENERATED PROJECT IMPORTS START
import { data as DualRasterizerData } from '@/Data/Projects/DualRasterizer/data';
import DualRasterizerCmp from '@/Data/Projects/DualRasterizer/ProjectCmp';
import { projectManifest as DualRasterizerManifest } from '@/Data/Projects/DualRasterizer/manifest';

import { data as JREngineData } from '@/Data/Projects/JREngine/data';
import JREngineCmp from '@/Data/Projects/JREngine/ProjectCmp';
import { projectManifest as JREngineManifest } from '@/Data/Projects/JREngine/manifest';

import { data as LuaCPPSnakeData } from '@/Data/Projects/LuaCPPSnake/data';
import LuaCPPSnakeCmp from '@/Data/Projects/LuaCPPSnake/ProjectCmp';
import { projectManifest as LuaCPPSnakeManifest } from '@/Data/Projects/LuaCPPSnake/manifest';

import { data as VulkanDeferredRendererData } from '@/Data/Projects/VulkanDeferredRenderer/data';
import VulkanDeferredRendererCmp from '@/Data/Projects/VulkanDeferredRenderer/ProjectCmp';
import { projectManifest as VulkanDeferredRendererManifest } from '@/Data/Projects/VulkanDeferredRenderer/manifest';

const DualRasterizerProjectInfo: ProjectInfo = {
  ...DualRasterizerData,
  component: DualRasterizerCmp,
  manifest: DualRasterizerManifest,
};

const JREngineProjectInfo: ProjectInfo = {
  ...JREngineData,
  component: JREngineCmp,
  manifest: JREngineManifest,
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
  DualRasterizerProjectInfo,
  JREngineProjectInfo,
  LuaCPPSnakeProjectInfo,
  VulkanDeferredRendererProjectInfo,
];
// AUTO-GENERATED PROJECT IMPORTS END






































