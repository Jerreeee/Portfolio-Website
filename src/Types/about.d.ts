export interface ContactLink {
  label: string;
  icon: string;
  href: string;
  copyText?: string;
  tooltip?: string;
}

export interface LinkSet {
  github?: ContactLink;
  linkedin?: ContactLink;
  artstation?: ContactLink;
}

export interface Contact {
  gsm: string;
  email: string;
  links: LinkSet;
  qrSrc: string;
}

export interface Language {
  name: string;
  level?: string;
}

export interface SkillGroup {
  title: string;
  items: string[];
}

export interface SkillSet {
  groups: SkillGroup[];
  languages: Language[];
}

export interface ResumeSkills {
  languages: string[];
  frameworks: string[];
  tools: string[];
  concepts: string[];
}

export interface AboutBio {
  firstName: string;
  lastName: string;
  tagline: string;
  description: string;
  aiDescription: string;
  backgroundDescription: string;
  profileImage: string;
  resumeSkills: ResumeSkills;
}

export interface EntryItem {
  title: string;
  right?: string;
  sub?: string;
  body: string | string[];
  link?: string;
}

export interface Experience {
  work: EntryItem[];
  projects: EntryItem[];
}

export interface AboutInfo {
  website: string;
  bio: AboutBio;
  contact: Contact;
  skills: SkillSet;
  experience: Experience;
  resumeProjects: EntryItem[];
  education: EntryItem[];
}
