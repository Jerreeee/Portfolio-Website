'use client';

import React, { createContext, useContext } from 'react';
import type { RangeProvider } from '@/Utils/RangeProvider';

export interface TimelineContextType {
  rangeProvider: RangeProvider;
  pixelsPerUnit: number;
  scaleToFit: boolean;
}

export const TimelineContext = createContext<TimelineContextType | null>(null);

export function useTimeline() {
  const ctx = useContext(TimelineContext);
  if (!ctx) throw new Error('Timeline components must be used within <TimelineCmp>.');
  return ctx;
}
