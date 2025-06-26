'use client';

import Image from 'next/image';
import { GetIcon } from '@/Components/icon';
import { Project } from '@/data/projects/project';
import { useTheme } from '@/Themes/ThemeProvider';

export function ProjectLayout({ project }: { project: Project }) {
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
          <div key={tech}>{GetIcon(tech)}</div>
        ))}
      </div>

      {/* Sections */}
      <div className="mt-8 space-y-8">
        {project.sections?.map((section, index) => (
          <div key={index}>
            <h2 className="text-2xl font-bold" style={textStyle}>
              {section.title}
            </h2>
            {section.content && (
              <p className="mt-2" style={textStyle}>
                {section.content}
              </p>
            )}
            {section.videoSrc && (
              <video controls className="mt-2 rounded">
                <source src={section.videoSrc} type="video/mp4" />
              </video>
            )}
            {section.imageSrc && (
              <Image
                src={section.imageSrc}
                alt={section.title}
                width={800}
                height={450}
                className="mt-2 rounded"
              />
            )}
          </div>
        ))}
      </div>
    </main>
  );
}
