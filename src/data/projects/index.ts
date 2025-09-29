import { ProjectInfo } from '@/data/projects/project'
import { projectInfo as BubbleBobbleProjectInfo } from '@/data/projects/BubbleBobble/info';
import { projectInfo as VulkanDeferredRendererProjectInfo } from '@/data/projects/VulkanDeferredRenderer/info';

export const projects = [
  BubbleBobbleProjectInfo,
  VulkanDeferredRendererProjectInfo,
];

export const getProjectBySlug = (slug: string) =>
  projects.find((project) => project.slug === slug);
