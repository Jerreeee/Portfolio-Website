import type { ReactNode, FC } from 'react';
import { ProjectManifest } from "@/Types/projectManifest";
import type { IconKey } from '@/Data/Icons/icons-manifest';

export interface TechInfo {
  name: IconKey | (string & {});
  usage?: string;
  version?: string;
}

export type TechCategory = 'Core' | 'Libraries' | 'Tools' | 'Art';
export type Technologies = Partial<Record<TechCategory, TechInfo[]>>;

export type ProjectRequiredInfo = {
  slug: string;
  title: string;
  thumbnailImage: string;
  heroImage: string;
  technologies: Technologies;
  shortDescription: string;
  mediumDescription: string;
}

export type ProjectInfo = ProjectRequiredInfo & {
  component: FC<ProjectCmpProps>;
  manifest: ProjectManifest;
};

export interface ProjectCmpProps {
  project: ProjectInfo;
}
