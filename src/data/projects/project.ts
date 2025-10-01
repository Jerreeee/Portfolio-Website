import type { ReactNode, ComponentType } from "react";
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
  manifest: ProjectManifest;
  component: ComponentType<{ project: ProjectInfo }>;
};
