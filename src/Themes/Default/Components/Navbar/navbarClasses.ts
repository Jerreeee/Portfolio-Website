  import { createUtilityClasses } from '@/utils/createUtilityClasses';

  export const { slots, getUtilityClass, classes: navbarClasses } =
    createUtilityClasses('Navbar', [
      'root',
      'brand',
      'list',
      'item',
      'link',
      'underline'
    ] as const);

  export type NavbarClassKey = typeof slots[number];
  export type NavbarClasses = typeof navbarClasses;
