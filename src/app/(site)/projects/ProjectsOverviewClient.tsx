"use client";

import { useSearchParams } from "next/navigation";
import { useComponents } from '@/Themes/ThemeProvider';

export default function ProjectsOverviewClient() {
  const { ProjectsOverviewCmp } = useComponents();
  const search = useSearchParams();
  const order = search.get("order") ?? "default";

  return <ProjectsOverviewCmp order={order} />;
}
