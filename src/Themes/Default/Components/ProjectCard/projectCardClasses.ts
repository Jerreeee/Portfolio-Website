import { createUtilityClasses } from '@/utils/createUtilityClasses';

export const { slots, getUtilityClass, classes: projectCardClasses } =
  createUtilityClasses('ProjectCard', ['root', 'header', 'image', 'techList', 'techIcon', 'content'] as const);

export type ProjectCardClassKey = typeof slots[number];
export type ProjectCardClasses = typeof projectCardClasses;
