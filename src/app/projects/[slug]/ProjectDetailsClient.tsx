  'use client';

  import { ProjectInfo } from '@/Data/Projects/project';

export default function ProjectDetailsClient({ project }: { project: ProjectInfo }) {
  // Each project provides its own component
  const ProjectComponent = project.component;

  return <ProjectComponent project={project} />;
}
