import { createUtilityClasses } from '@/utils/createUtilityClasses';

export const { slots, getUtilityClass, classes: iconClasses } =
  createUtilityClasses('Icon', [
    'root'
  ] as const);

export type IconClassKey = typeof slots[number];
export type IconClasses = typeof iconClasses;