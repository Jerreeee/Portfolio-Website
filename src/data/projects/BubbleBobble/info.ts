import { ProjectInfo } from '@/data/projects/project'
import { data } from './data'
import ProjectCmp from '@/data/projects/BubbleBobble/ProjectCmp'

export const projectInfo : ProjectInfo = {
  ...data,
  Component: ProjectCmp,
};
