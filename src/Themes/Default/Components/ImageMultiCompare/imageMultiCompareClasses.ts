import { createUtilityClasses } from '@/utils/createUtilityClasses';

export const { slots, getUtilityClass, classes: imageMultiCompareClasses } =
  createUtilityClasses('ImageMultiCompare', [
    'root',
    'layer',
    'handle',
  ] as const);

export type ImageMultiCompareClassKey = typeof slots[number];
export type ImageMultiCompareClasses = typeof imageMultiCompareClasses;
