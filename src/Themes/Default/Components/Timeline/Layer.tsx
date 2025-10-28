'use client';

import React from 'react';

export const LAYER_FLAG = '__isTimelineLayer';

export interface LayerProps {
  /** Optional name shown in the left column */
  name?: string;
  /** Whether this layer’s children are hidden */
  collapsed?: boolean;
  /** Nested layers or visual components (BarLayer, GraphLayer, etc.) */
  children?: React.ReactNode;
}

/**
 * Structural component that defines a logical layer in the timeline.
 * It does not control height — each inner visual component defines its own default height.
 */
export default function Layer({ children }: LayerProps) {
  return <>{children}</>;
}

(Layer as any)[LAYER_FLAG] = true;
