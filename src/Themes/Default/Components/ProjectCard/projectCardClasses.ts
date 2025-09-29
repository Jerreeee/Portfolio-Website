  import { createUtilityClasses } from '@/utils/createUtilityClasses';

  export const { slots, getUtilityClass, classes: projectCardClasses } =
    createUtilityClasses('ProjectCard', [
      'root',
      'image',
      'content',
      'header',
      'techList',
      'techIcon',
    ] as const);

  export type ProjectCardClassKey = typeof slots[number];
  export type ProjectCardClasses = typeof projectCardClasses;
