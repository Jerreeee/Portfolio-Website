'use client';

import React from 'react';

export interface TimelineGroupInfo {
  id: string;
  name?: string;
  height?: number;
}

export interface TimelineContextValue {
  range: [number, number];
  scale: (v: number) => number;
  unscale: (r: number) => number;
  currentTime: number;
  setCurrentTime: (t: number) => void;

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
