import type { ReactNode, FC } from 'react';
import { ProjectManifest } from "@/types/projectManifest";

export type ProjectRequiredInfo = {
  slug: string;
  title: string;
  thumbnailImage: string;
  heroImage: string;
  technologies: string[];
  shortDescription: string;
}

export type ProjectInfo = ProjectRequiredInfo & {
  component: FC<ProjectCmpProps>;
  manifest: ProjectManifest;
};

export interface ProjectCmpProps {
  project: ProjectInfo;
}
