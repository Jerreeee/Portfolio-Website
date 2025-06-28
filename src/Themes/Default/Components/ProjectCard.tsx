'use client';

import Image from 'next/image';
import Link from 'next/link';
import { GetIcon } from '@/Themes/Default/Components/Icon';
import { Project } from '@/data/projects/project';
import { useTheme } from '@/Themes/ThemeProvider';

export type CardTheme = {
  background: string;
  hoverBackground: string;
  textColor: string;
  borderRadius: number;
  shadowColor: string;
};

export function ProjectCard({ project }: { project: Project }) {
  const { theme } = useTheme();
  const card = theme.components.card;

  return (
    <Link
      href={`/projects/${project.slug}`}
      className={`
        flex flex-col space-y-3
        rounded-lg shadow
        transform transition
        hover:shadow-2xl
        overflow-hidden
      `}
      style={{
        backgroundColor: card.background,
        color: card.textColor,
      }}
      onMouseEnter={(e) => {
        if (card.hoverBackground) {
          (e.currentTarget as HTMLElement).style.backgroundColor =
            card.hoverBackground;
        }
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.backgroundColor =
          card.background;
      }}
    >
      <div className="w-full relative aspect-video">
        <Image
          src={project.thumbnailImage}
          alt={project.title}
          fill
          className="object-cover"
        />
      </div>

      <div className="p-4 space-y-2">
        <h2 className="text-xl font-semibold">{project.title}</h2>
        {project.shortDescription && <p>{project.shortDescription}</p>}
        <div className="flex space-x-2">
          {project.technologies?.map((tech) => (
            <div key={tech} className="w-6 h-6">
              {GetIcon(tech)}
            </div>
          ))}
        </div>
      </div>
    </Link>
  );
}
