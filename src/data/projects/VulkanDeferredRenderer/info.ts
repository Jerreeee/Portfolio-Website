import { ProjectInfo } from '@/data/projects/project'
import { data } from './data'
import ProjectCmp from '@/data/projects/VulkanDeferredRenderer/ProjectCmp'

export const projectInfo : ProjectInfo = {
  ...data,
  Component: ProjectCmp,
};
