import { ReactNode } from "react";

export type ProjectInfo = {
  slug: string;
  title: string;
  thumbnailImage: string;
  heroImage: string;
  technologies: string[];
  shortDescription: string;
  longDescription: string;

   Component?: () => ReactNode;
};
