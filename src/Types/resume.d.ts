// types/resume.types.ts
import {
  Contact,
  SkillSet,
  AboutBio,
} from './about';

export interface NameBlock {
  first: string;
  last: string;
  tagline: string;
}

export interface EntryItem {
  title: string;
  right?: string;
  sub?: string;
  body: string;
  link?: string;
}

export interface Experience {
  work: EntryItem[];
  projects: EntryItem[];
}

export interface ResumeData {
  name: NameBlock;
  contact: Contact;
  skills: SkillSet;
  summary: AboutBio;
  experience: Experience;
  education: EntryItem[];
}
