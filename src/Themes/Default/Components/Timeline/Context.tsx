'use client';

import { RangeProvider } from '@/Utils/RangeProvider';
import React from 'react';

export interface TimelineGroupInfo {
  id: string;
  name?: string;
  height?: number;
}

export interface TimelineContextValue {
  rangeProvider: RangeProvider;
  registerGroup: (group: TimelineGroupInfo) => void;
  unregisterGroup: (id: string) => void;
  groups: TimelineGroupInfo[];
}

export const TimelineContext = React.createContext<TimelineContextValue | null>(null);

export function useTimeline() {
  const ctx = React.useContext(TimelineContext);
  if (!ctx) throw new Error('TimelineCmp components must be used within <TimelineCmp>');
  return ctx;
}
