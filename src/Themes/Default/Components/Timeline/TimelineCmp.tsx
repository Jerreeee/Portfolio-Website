'use client';

import React, { useMemo, useState, useCallback, useEffect, useLayoutEffect } from 'react';
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
import { makeDefaultRangeProvider, RangeProvider } from '@/Utils/RangeProvider';

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
  rangeProvider: RangeProvider;
    /** Controlled current position within range */
  value?: number;
  /** Notifies parent when user moves playhead etc. */
  onValueChange?: (v: number) => void;
  children?: React.ReactNode;
  leftColumnWidth?: number;
  showLabels?: boolean;
  showTopBar?: boolean
}

export default function TimelineCmp({
  rangeProvider,
  value,
  onValueChange,
  children,
  leftColumnWidth = 100,
  showLabels = false,
  showTopBar = true,
}: TimelineCmpProps) {
  const [groups, setGroups] = useState<TimelineGroupInfo[]>([]);
  const [internalTime, setInternalTime] = useState(value ?? rangeProvider.start);

  // whenever parent changes value -> sync internal
  useLayoutEffect(() => {
    if (value !== undefined)
      setInternalTime(value);
  }, [value]);

  // whenever local changes -> notify parent
  const handleInternalChange = useCallback((t: number) => {
    setInternalTime(t);
    onValueChange?.(t);
  }, [onValueChange]);

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
      rangeProvider,
      registerGroup,
      unregisterGroup,
      groups,
    }),
    [rangeProvider, registerGroup, unregisterGroup, groups]
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
  const topBarHeight = showTopBar && topBars.length > 0 ? 24 : 0;
  // Determine total domain span in units
  const domainSpan = rangeProvider.end - rangeProvider.start;
  // Compute width in pixels based on provider settings
  const contentWidth = rangeProvider.fitToRange
    ? '100%' // stretch to full container width
    : rangeProvider.pixelsPerUnit * domainSpan;
  const contentHeight = trackHeight;

  // -------------------------------------------------------------------
  // Layout (Grid-based)
  // -------------------------------------------------------------------

  return (
    <TimelineContext.Provider value={ctxValue}>
      <TimelineRoot>
        <ScrollableCmp>
          <div
            style={{
              display: 'grid',
              width: '100%',
              height: '100%',
              gridTemplateRows: `${topBarHeight}px 1fr auto`,
              gridTemplateColumns: `${showLabels ? leftColumnWidth : 0}px 1fr auto`,
            }}
          >
            {/* === Top bar row === */}
            {topBars.length > 0 && (
              <>
                {/* Left spacer under top bar */}
                <div
                  style={{ gridRow: 1, gridColumn: 1,
                    background: showLabels ? 'rgba(0,0,0,0.1)' : 'transparent',
                    borderBottom: '1px solid rgba(255,255,255,0.1)',
                  }}
                />
                {/* Scrollable top bar */}
                <ScrollableCmp.Group
                  horizontalId="1"
                  style={{ gridRow: 1, gridColumn: 2,
                    borderBottom: '1px solid rgba(255,255,255,0.1)',
                    background: 'rgba(20,20,20,0.9)',
                  }}
                >
                  <div style={{ width: contentWidth }}>
                    {topBars}
                  </div>
                </ScrollableCmp.Group>
              </>
            )}

            {/* === Left label column (scrolls vertically, id=0) === */}
            <ScrollableCmp.Group
              verticalId="0"
              style={{ gridRow: 2, gridColumn: 1,
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

            {/* === Main scrollable content area (both axes) === */}
            <ScrollableCmp.Group
              horizontalId="1"
              verticalId="0"
              style={{ gridRow: 2, gridColumn: 2,
                display: 'flex',
                flexDirection: 'column',
                minHeight: 0,
                minWidth: 0,
              }}
            >
              <div style={{ width: contentWidth, height: contentHeight }}>
                {groupChildren}
              </div>
            </ScrollableCmp.Group>

            {/* === Vertical scrollbar (controls id=0) === */}
            <div style={{ gridRow: 2, gridColumn: 3 }}>
              <ScrollableCmp.Vertical id="0" />
            </div>

            {/* === Horizontal scrollbar (controls id=1) === */}
            <div style={{ gridRow: 3, gridColumn: 2 }}>
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
