import { SectionHeaderRight, DividerBar } from "./ResumeCmp";
import { Entry } from "./Entry";
import type { EntryItem } from "@/Types/about";

interface ExperienceSubSectionProps {
  title: string;
  items: EntryItem[];
}

export function ExperienceSubSection({ title, items }: ExperienceSubSectionProps) {
  if (items.length === 0) return null;
  return (
    <>
      <SectionHeaderRight>{title}</SectionHeaderRight>
      <DividerBar />
      {items.map((item, i) => (
        <Entry key={i} {...item} />
      ))}
    </>
  );
}
