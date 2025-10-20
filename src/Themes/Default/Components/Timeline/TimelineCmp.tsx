'use client';

import React, { useMemo, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { makeSlotFactory } from '@/Utils/makeSlotFactory';
import { timelineCmp } from './TimelineCmpClasses';
import { TimelineContext, TimelineGroupInfo } from './Context';

// Modular scrollable system
import ScrollableCmp from '../Scrollable/ScrollableCmp';

import TimelineCmpTopBar from './TimelineTopBarCmp';
import TimelineCmpGroup from './TimelineGroupCmp';
import TimelineCmpBarLayer from './TimelineBarLayerCmp';
import TimelineCmpGraphLayer from './TimelineGraphLayerCmp';

const makeSlot = makeSlotFactory('TimelineCmp', timelineCmp);

const TimelineRoot = makeSlot(motion.div, 'root')(() => ({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  height: '100%',
  userSelect: 'none',
  overflow: 'hidden',
}));

// =====================================================================
// =========================== COMPONENT ===============================
// =====================================================================

export interface TimelineCmpProps {
  range: [number, number];
  currentTime?: number;
  onChange?: (t: number) => void;
  children?: React.ReactNode;
  leftColumnWidth?: number;
  showLabels?: boolean;
}

export default function TimelineCmp({
  range,
  currentTime,
  onChange,
  children,
  leftColumnWidth = 100,
  showLabels = false,
}: TimelineCmpProps) {
  const [internalTime, setInternalTime] = useState(currentTime ?? range[0]);
  const [groups, setGroups] = useState<TimelineGroupInfo[]>([]);

  // --- Context logic ---
  const scale = (v: number) => (v - range[0]) / (range[1] - range[0]);
  const unscale = (r: number) => range[0] + r * (range[1] - range[0]);

  const registerGroup = useCallback((group: TimelineGroupInfo) => {
    setGroups((prev) => {
      if (prev.find((g) => g.id === group.id)) return prev;
      return [...prev, group];
    });
  }, []);

  const unregisterGroup = useCallback((id: string) => {
    setGroups((prev) => prev.filter((g) => g.id !== id));
  }, []);

  const ctxValue = useMemo(
    () => ({
      range,
      scale,
      unscale,
      currentTime: internalTime,
      setCurrentTime: (t: number) => {
        setInternalTime(t);
        onChange?.(t);
      },
      registerGroup,
      unregisterGroup,
      groups,
    }),
    [range, internalTime, onChange, registerGroup, unregisterGroup, groups]
  );

  // --- Extract topbars + groups ---
  const topBars: React.ReactNode[] = [];
  const groupChildren: React.ReactNode[] = [];

  React.Children.forEach(children, (child) => {
    if (!React.isValidElement(child)) return;
    if (child.type === TimelineCmp.TopBar) topBars.push(child);
    else if (child.type === TimelineCmp.Group) groupChildren.push(child);
  });

  const trackHeight = groups.reduce((sum, g) => sum + (g.height ?? 32), 0);
  const topBarHeight = topBars.length > 0 ? 24 : 0;
  const contentWidth = 2000;
  const contentHeight = trackHeight;

  // -------------------------------------------------------------------
  // Layout
  // -------------------------------------------------------------------

  return (
    <TimelineContext.Provider value={ctxValue}>
      <TimelineRoot>
  <ScrollableCmp>
    {/* ================= Top Bar ================= */}
    {topBars.length > 0 && (
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: topBarHeight,
          display: 'grid',
          gridTemplateColumns: `${showLabels ? leftColumnWidth : 0}px 1fr`,
          borderBottom: '1px solid rgba(255,255,255,0.1)',  // ✅ fixed
          background: 'rgba(20,20,20,0.9)',                 // ✅ fixed
          zIndex: 10,
        }}
      >
        {/* Left spacer */}
        <div
          style={{
            width: showLabels ? leftColumnWidth : 0,
            background: showLabels ? 'rgba(0,0,0,0.1)' : 'transparent',
          }}
        />
        {/* Scrollable top bar (linked horizontally with id=1) */}
        <ScrollableCmp.Group id="1" direction="horizontal">
          <div style={{ width: contentWidth }}>{topBars}</div>
        </ScrollableCmp.Group>
      </div>
    )}

    {/* ================= Main grid layout ================= */}
    <div
      style={{
        position: 'absolute',
        top: topBarHeight,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'grid',
        gridTemplateColumns: `${showLabels ? leftColumnWidth : 0}px 1fr auto`,
        gridTemplateRows: `1fr auto`,
      }}
    >
      {/* === Left label column (vertically scrolls with id=0) === */}
      <ScrollableCmp.Group
        id="0"
        direction="vertical"
        style={{
          gridColumn: 1,
          gridRow: 1,
          borderRight: showLabels ? '1px solid rgba(255,255,255,0.1)' : 'none',
          background: showLabels ? 'rgba(0,0,0,0.1)' : 'transparent',
        }}
      >
        <div style={{ height: contentHeight }}>
          {groups.map((g) => (
            <div
              key={g.id}
              style={{
                height: g.height ?? 32,
                display: 'flex',
                alignItems: 'center',
                paddingLeft: 8,
                borderBottom: '1px solid rgba(255,255,255,0.05)',
                fontSize: '0.75rem',
              }}
            >
              {g.name}
            </div>
          ))}
        </div>
      </ScrollableCmp.Group>

      {/* === Main content (scrolls vertically with id=0, horizontally with id=1) === */}
      <ScrollableCmp.Group
        id="0"
        direction="vertical"
        style={{
          gridColumn: 2,
          gridRow: 1,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <ScrollableCmp.Group id="1" direction="horizontal">
          <div style={{ width: contentWidth, height: contentHeight }}>
            {groupChildren}
          </div>
        </ScrollableCmp.Group>
      </ScrollableCmp.Group>

      {/* === Vertical scrollbar (controls id=0) === */}
      <div style={{ gridColumn: 3, gridRow: 1, height: '100%' }}>
        <ScrollableCmp.Vertical id="0" />
      </div>

      {/* === Horizontal scrollbar (controls id=1) === */}
      <div style={{ gridColumn: 2, gridRow: 2, width: '100%' }}>
        <ScrollableCmp.Horizontal id="1" />
      </div>
    </div>
  </ScrollableCmp>
</TimelineRoot>
    </TimelineContext.Provider>
  );
}

// Attach child components
TimelineCmp.TopBar = TimelineCmpTopBar;
TimelineCmp.Group = TimelineCmpGroup;
TimelineCmp.BarLayer = TimelineCmpBarLayer;
TimelineCmp.GraphLayer = TimelineCmpGraphLayer;
