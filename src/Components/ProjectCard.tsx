'use client';

import { Key } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { GetIcon } from '@/components/icon';
import { Project } from '@/data/projects/project'

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="
        flex flex-col space-y-3
        rounded-lg shadow
        transform transition
        hover:shadow-2xl hover:-translate-y-2
        overflow-hidden
        bg-[var(--card-bg)] text-[var(--card-text)]
        hover:bg-[color-mix(in srgb var(--card-bg) 85%, var(--card-text) 5%)]
      "
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
        {project.shortDescription && (
          <p>{project.shortDescription}</p>
        )}
        <div className="flex space-x-2">
          {project.technologies?.map((tech) => (
            <div className="w-6 h-6">
              <div key={tech}>{GetIcon(tech)}</div>
            </div>
          ))}
        </div>
      </div>
    </Link>
  );
}
