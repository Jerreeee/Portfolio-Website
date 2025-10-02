import { createUtilityClasses } from '@/utils/createUtilityClasses';

export const { slots, getUtilityClass, classes: imageCompareClasses } =
  createUtilityClasses('ImageCompare', [
    'root',
    'handle',
  ] as const);

export type ImageCompareClassKey = typeof slots[number];
export type ImageCompareClasses = typeof imageCompareClasses;
