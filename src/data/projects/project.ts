import { ReactNode } from "react";

export type ProjectRequiredInfo = {
  slug: string;
  title: string;
  thumbnailImage: string;
  heroImage: string;
  technologies: string[];
  shortDescription: string;
}

export type ProjectInfo = ProjectRequiredInfo & {
  Component?: () => ReactNode;
};

export const getProjectBySlug = (slug: string) =>
  projects.find((project) => project.slug === slug);
