export interface EntryOverride {
  body?: string;
  exclude?: boolean;
}
export type EntryOverrideMap = Record<string, EntryOverride>;

export interface ResumeTailoring {
  bio?: { description?: string };
  experience?: {
    work?: EntryOverrideMap;
    projects?: EntryOverrideMap;
  };
  education?: EntryOverrideMap;
}
