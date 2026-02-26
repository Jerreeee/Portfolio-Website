import type { AboutInfo, EntryItem } from '@/Types/about';
import type { EntryOverrideMap, ResumeTailoring } from '@/Types/resume-tailoring';

function applyEntryOverrides(
  entries: EntryItem[],
  overrides?: EntryOverrideMap,
): EntryItem[] {
  if (!overrides) return entries;
  return entries
    .filter((entry) => !overrides[entry.title]?.exclude)
    .map((entry) => {
      const override = overrides[entry.title];
      if (!override?.body) return entry;
      return { ...entry, body: override.body };
    });
}

export function applyResumeTailoring(
  base: AboutInfo,
  tailoring?: ResumeTailoring,
): AboutInfo {
  if (!tailoring) return base;

  const bio =
    tailoring.bio?.description !== undefined
      ? { ...base.bio, description: tailoring.bio.description }
      : base.bio;

  const experience = {
    work: applyEntryOverrides(base.experience.work, tailoring.experience?.work),
    projects: applyEntryOverrides(
      base.experience.projects,
      tailoring.experience?.projects,
    ),
  };

  const education = applyEntryOverrides(base.education, tailoring.education);

  return { ...base, bio, experience, education };
}
