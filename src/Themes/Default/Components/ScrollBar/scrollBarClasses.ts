import { createUtilityClasses } from '@/utils/createUtilityClasses';

export const { slots, getUtilityClass, classes: scrollBarClasses } =
  createUtilityClasses('Scrollbar', [
    'root',
    'thumb',
  ] as const);

export type ScrollBarClassKey = typeof slots[number];
export type ScrollBarClasses = typeof scrollBarClasses;
