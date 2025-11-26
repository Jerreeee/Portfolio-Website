import { Suspense } from "react";
import ProjectsOverviewClient from "./ProjectsOverviewClient";

export default function ProjectsPage() {
  return (
    <Suspense>
      <ProjectsOverviewClient />
    </Suspense>
  );
}
