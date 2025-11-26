"use client";

import { useSearchParams } from "next/navigation";
import ProjectsOverviewCmp from '@/Themes/Default/Components/ProjectsOverview/ProjectsOverviewCmp';

export default function ProjectsOverviewClient() {
  const search = useSearchParams();
  const order = search.get("order") ?? "default";

  return <ProjectsOverviewCmp order={order} />;
}
