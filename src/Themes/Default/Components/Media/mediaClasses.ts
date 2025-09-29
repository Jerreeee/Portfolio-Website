import { createUtilityClasses } from '@/utils/createUtilityClasses';

export const { slots, getUtilityClass, classes: mediaClasses } =
  createUtilityClasses('Media', [
    'root',
    'image',
    'fileVideo',
    'embeddedVideo'
  ] as const);

export type MediaClassKey = typeof slots[number];
export type MediaClasses = typeof mediaClasses;
