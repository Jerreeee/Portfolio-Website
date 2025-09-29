import { createUtilityClasses } from '@/utils/createUtilityClasses';

export const { slots, getUtilityClass, classes: segmentSliderClasses } =
  createUtilityClasses('SegmentSlider', [
    'root',
    'bar',
    'ticks',
    'tick',
    'highlight',
    'handle',
  ] as const);

export type SegmentSliderClassKey = typeof slots[number];
export type SegmentSliderClasses = typeof segmentSliderClasses;
