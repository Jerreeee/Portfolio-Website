import { ProjectInfo } from '@/Data/Projects/project'

export const getProjectBySlug = (slug: string) =>
  projects.find((project) => project.slug === slug);

// AUTO-GENERATED PROJECT IMPORTS START

import { data as Overpass2Data } from '@/Data/Projects/Overpass2/data';
import Overpass2Cmp from '@/Data/Projects/Overpass2/ProjectCmp';
import { projectManifest as Overpass2Manifest } from '@/Data/Projects/Overpass2/manifest';

import { data as VulkanDeferredRendererData } from '@/Data/Projects/VulkanDeferredRenderer/data';
import VulkanDeferredRendererCmp from '@/Data/Projects/VulkanDeferredRenderer/ProjectCmp';
import { projectManifest as VulkanDeferredRendererManifest } from '@/Data/Projects/VulkanDeferredRenderer/manifest';

import { data as PythonHoudiniTrackToolData } from '@/Data/Projects/PythonHoudiniTrackTool/data';
import PythonHoudiniTrackToolCmp from '@/Data/Projects/PythonHoudiniTrackTool/ProjectCmp';
import { projectManifest as PythonHoudiniTrackToolManifest } from '@/Data/Projects/PythonHoudiniTrackTool/manifest';

import { data as DualRasterizerData } from '@/Data/Projects/DualRasterizer/data';
import DualRasterizerCmp from '@/Data/Projects/DualRasterizer/ProjectCmp';
import { projectManifest as DualRasterizerManifest } from '@/Data/Projects/DualRasterizer/manifest';

import { data as JREngineData } from '@/Data/Projects/JREngine/data';
import JREngineCmp from '@/Data/Projects/JREngine/ProjectCmp';
import { projectManifest as JREngineManifest } from '@/Data/Projects/JREngine/manifest';

import { data as LuaCPPSnakeData } from '@/Data/Projects/LuaCPPSnake/data';
import LuaCPPSnakeCmp from '@/Data/Projects/LuaCPPSnake/ProjectCmp';
import { projectManifest as LuaCPPSnakeManifest } from '@/Data/Projects/LuaCPPSnake/manifest';

import { data as MayaReferencePlaneSetupData } from '@/Data/Projects/MayaReferencePlaneSetup/data';
import MayaReferencePlaneSetupCmp from '@/Data/Projects/MayaReferencePlaneSetup/ProjectCmp';
import { projectManifest as MayaReferencePlaneSetupManifest } from '@/Data/Projects/MayaReferencePlaneSetup/manifest';

import { data as AIPoweredDevelopmentData } from '@/Data/Projects/AIPoweredDevelopment/data';
import AIPoweredDevelopmentCmp from '@/Data/Projects/AIPoweredDevelopment/ProjectCmp';
import { projectManifest as AIPoweredDevelopmentManifest } from '@/Data/Projects/AIPoweredDevelopment/manifest';

const Overpass2ProjectInfo: ProjectInfo = {
  ...Overpass2Data,
  component: Overpass2Cmp,
  manifest: Overpass2Manifest,
};

const VulkanDeferredRendererProjectInfo: ProjectInfo = {
  ...VulkanDeferredRendererData,
  component: VulkanDeferredRendererCmp,
  manifest: VulkanDeferredRendererManifest,
};

const PythonHoudiniTrackToolProjectInfo: ProjectInfo = {
  ...PythonHoudiniTrackToolData,
  component: PythonHoudiniTrackToolCmp,
  manifest: PythonHoudiniTrackToolManifest,
};

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

const MayaReferencePlaneSetupProjectInfo: ProjectInfo = {
  ...MayaReferencePlaneSetupData,
  component: MayaReferencePlaneSetupCmp,
  manifest: MayaReferencePlaneSetupManifest,
};

const AIPoweredDevelopmentProjectInfo: ProjectInfo = {
  ...AIPoweredDevelopmentData,
  component: AIPoweredDevelopmentCmp,
  manifest: AIPoweredDevelopmentManifest,
};

export const projects: ProjectInfo[] = [
  AIPoweredDevelopmentProjectInfo,
  Overpass2ProjectInfo,
  VulkanDeferredRendererProjectInfo,
  PythonHoudiniTrackToolProjectInfo,
  DualRasterizerProjectInfo,
  JREngineProjectInfo,
  LuaCPPSnakeProjectInfo,
  MayaReferencePlaneSetupProjectInfo,
];

export const projectSlugs = [
  "AIPoweredDevelopment",
  "Overpass2",
  "VulkanDeferredRenderer",
  "PythonHoudiniTrackTool",
  "DualRasterizer",
  "JREngine",
  "LuaCPPSnake",
  "MayaReferencePlaneSetup"
] as const;

// AUTO-GENERATED PROJECT IMPORTS END

export type ValidProjectSlug = typeof projectSlugs[number];



