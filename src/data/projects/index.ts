import { ProjectInfo } from '@/data/projects/project'
import { projectInfo as BubbleBobbleProjectInfo } from '@/data/projects/BubbleBobble/info';

export const projects = [
  BubbleBobbleProjectInfo,
];

export const getProjectBySlug = (slug: string) =>
  projects.find((project) => project.slug === slug);
