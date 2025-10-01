import { createUtilityClasses } from '@/utils/createUtilityClasses';

export const { slots, getUtilityClass, classes: mediaGalleryClasses } =
  createUtilityClasses('MediaGallery', [
    'root',
    'main',
    'thumbs',
    'thumbsButton',
    'videoOverlay'
  ] as const);

export type MediaGalleryClassKey = typeof slots[number];
export type MediaGalleryClasses = typeof mediaGalleryClasses;
