'use client';

import Image from 'next/image';
import { Project } from '@/data/projects/project';
import { useTheme } from '@/Themes/ThemeProvider';

export default function ThemedProjectDetailsCmp({ project }: { project: Project }) {
  const { theme } = useTheme();
  const ProjectDetailsCmp = theme.components.projectDetails.cmp;
  return <ProjectDetailsCmp project={project} />;
}

export function ProjectDetailsCmp({ project }: { project: Project }) {
  const { theme } = useTheme();
  const textStyle = { color: theme.colors.foreground };

  return (
    <main>
      {/* Title */}
      <h1 className="text-3xl font-bold" style={textStyle}>
        {project.title}
      </h1>

      {/* Hero Image */}
      <div className="mt-4">
        <Image
          src={project.heroImage}
          alt={project.title}
          width={1200}
          height={600}
          className="rounded"
        />
      </div>

      {/* Short Description */}
      <p className="mt-4" style={textStyle}>
        {project.shortDescription}
      </p>

      {/* Technologies */}
      <div className="mt-4 flex flex-wrap items-center space-x-3">
        {project.technologies?.map((tech) => (
          <div key={tech}></div>
        ))}
      </div>
    </main>
  );
}
