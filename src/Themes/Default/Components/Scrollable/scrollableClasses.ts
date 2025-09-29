import { createUtilityClasses } from '@/utils/createUtilityClasses';

export const { slots, getUtilityClass, classes: scrollableClasses } =
  createUtilityClasses('Scrollable', [
    'root'
  ] as const);

export type ScrollableClassKey = typeof slots[number];
export type ScrollableClasses = typeof scrollableClasses;