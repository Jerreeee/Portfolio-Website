import { createUtilityClasses } from '@/utils/createUtilityClasses';

export const { slots, getUtilityClass, classes: projectsOverviewClasses } =
  createUtilityClasses('ProjectsOverview', [
    'root',
    'container',
    'header',
    'grid',
    'cardWrapper',
  ] as const);

export type ProjectsOverviewClassKey = typeof slots[number];
export type ProjectsOverviewClasses = typeof projectsOverviewClasses;
