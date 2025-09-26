  import { createUtilityClasses } from '@/utils/createUtilityClasses';

  export const { slots, getUtilityClass, classes: navbarClasses } =
    createUtilityClasses('ProjectCard', [
      'root',
      'header',
      'image',
      'techList',
      'techIcon',
      'content'
    ] as const);

  export type NavbarClassKey = typeof slots[number];
  export type NavbarClasses = typeof navbarClasses;
