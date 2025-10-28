// @generate-component-classes
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { makeSlotFactory } from '@/Utils/makeSlotFactory';
import { timeline } from './TimelineClasses';
import ScrollableCmp from '../Scrollable/ScrollableCmp';
import { TimelineContext } from './Context';
import type { RangeProvider } from '@/Utils/RangeProvider';
import BarLayer, { BAR_FLAG } from './BarLayer';
import GraphLayer, { GRAPH_FLAG } from './GraphLayer';
import Group, { GroupProps, GROUP_FLAG } from './Group';
import { LayerProps } from './Layer';

const makeSlot = makeSlotFactory('Timeline', timeline);

const TimelineRoot = makeSlot(motion.div, 'root')(() => ({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  height: '100%',
  userSelect: 'none',
  background: '#121212',
  color: '#ddd',
}));

const GROUP_ROW_HEIGHT = 24;

export interface TimelineSettings {} // ✅ placeholder for future settings

interface FlattenedRow {
  id: string;
  name: string;
  depth: number;
  collapsed?: boolean;
  parentId?: string;
  type: 'group' | 'layer' | 'layer-group';
  element: React.ReactElement<any>;
}

export interface TimelineProps {
  rangeProvider: RangeProvider;
  pixelsPerUnit?: number;
  scaleToFit?: boolean;
  children?: React.ReactNode;
  leftColumnWidth?: number;
  showLabels?: boolean;
  showTopBar?: boolean;
}

// --- flatten tree structure ---
function flatten(
  children: React.ReactNode,
  depth = 0,
  parentId = '',
  collapsedState: Record<string, boolean> = {},
  indexPrefix = ''
): FlattenedRow[] {
  const list: FlattenedRow[] = [];

  React.Children.forEach(children, (child, index) => {
    if (!React.isValidElement(child)) return;
    const el = child as React.ReactElement<LayerProps | GroupProps>;
    const type: any = el.type;
    const props = el.props;

    // group
    if (type && type[GROUP_FLAG]) {
      const { name, collapsed = false, children: inner } = props as GroupProps;
      const id = `${parentId}${indexPrefix}${index}-${name ?? 'group'}`;
      const isCollapsed = collapsedState[id] ?? collapsed;
      list.push({ id, name: name ?? '', depth, collapsed: isCollapsed, parentId, type: 'group', element: el });
      if (!isCollapsed && inner) list.push(...flatten(inner, depth + 1, id, collapsedState, `${index}-`));
      return;
    }

    // layer
    const isVisual = (type as any)?.[BAR_FLAG] || (type as any)?.[GRAPH_FLAG];
    if (isVisual) {
      const id = `${parentId}${indexPrefix}${index}-layer`;
      const { name, children: inner } = props as LayerProps;
      const hasChildren = !!inner && React.Children.count(inner) > 0;
      if (hasChildren) {
        const isCollapsed = collapsedState[id] ?? false;
        list.push({ id, name: name ?? '', depth, collapsed: isCollapsed, parentId, type: 'layer-group', element: el });
        if (!isCollapsed && inner) list.push(...flatten(inner, depth + 1, id, collapsedState, `${index}-`));
      } else {
        list.push({ id, name: name ?? '', depth, parentId, type: 'layer', element: el });
      }
    }
  });

  return list;
}

export default function Timeline({
  rangeProvider,
  pixelsPerUnit = 100,
  scaleToFit = false,
  children,
  leftColumnWidth = 160,
  showLabels = true,
  showTopBar = true,
}: TimelineProps) {
  const [collapsedState, setCollapsedState] = React.useState<Record<string, boolean>>({});
  const rowHeights = React.useRef<Record<string, number>>({});
  const [, forceUpdate] = React.useReducer((x) => x + 1, 0);

  const flattened = React.useMemo(() => flatten(children, 0, '', collapsedState), [children, collapsedState]);
  const toggleCollapse = React.useCallback((id: string) => setCollapsedState((p) => ({ ...p, [id]: !p[id] })), []);

  const domainSpan = rangeProvider.end - rangeProvider.start;
  const contentWidth = scaleToFit ? '100%' : Math.max(0, pixelsPerUnit * domainSpan);
  const topBarHeight = showTopBar ? 24 : 0;

  const ProviderValue = React.useMemo(() => ({ rangeProvider, pixelsPerUnit, scaleToFit }), [
    rangeProvider,
    pixelsPerUnit,
    scaleToFit,
  ]);

  React.useLayoutEffect(() => {
    const elements = document.querySelectorAll('[data-layer-id]');
    const newHeights: Record<string, number> = {};
    elements.forEach((el) => {
      const id = el.getAttribute('data-layer-id');
      if (id) newHeights[id] = el.getBoundingClientRect().height || 1;
    });
    rowHeights.current = newHeights;
    forceUpdate();
  }, [flattened]);

  const getDefaultLayerHeight = (el: React.ReactElement): number => {
    const type: any = el.type;
    const explicit = (el.props as LayerProps)?.height;
    if (typeof explicit === 'number') return explicit;
    if (type?.[GRAPH_FLAG]) return 60;
    return 20;
  };

  const getRowHeight = (row: FlattenedRow): number => {
    if (row.type === 'group') return GROUP_ROW_HEIGHT;
    return rowHeights.current[row.id] ?? getDefaultLayerHeight(row.element);
  };

  const depthColors = ['#4fc3f7', '#ba68c8', '#81c784', '#ffb74d', '#64b5f6', '#f06292', '#aed581'];
  const getDepthColor = (d: number) => depthColors[d % depthColors.length];

  return (
    <TimelineContext.Provider value={ProviderValue}>
      <TimelineRoot>
        <ScrollableCmp>
          <div
            style={{
              display: 'grid',
              width: '100%',
              gridTemplateRows: `${topBarHeight}px 1fr auto`,
              gridTemplateColumns: `${showLabels ? leftColumnWidth : 0}px 1fr auto`,
              background: '#121212',
            }}
          >
            {/* Top Bar */}
            <div
              style={{
                gridRow: 1,
                gridColumn: '1 / span 2',
                background: showTopBar ? '#1e1e1e' : 'transparent',
                borderBottom: showTopBar ? '1px solid rgba(255,255,255,0.1)' : 'none',
              }}
            />

            {/* Left Column */}
            <ScrollableCmp.Group
              verticalId="timeline-v"
              style={{
                gridRow: 2,
                gridColumn: 1,
                borderRight: showLabels ? '1px solid rgba(255,255,255,0.1)' : 'none',
                background: '#181818',
                position: 'relative',
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', position: 'relative' }}>
                {/* --- CONTINUOUS TREE LINES (segment-based) --- */}
                {(() => {
                  // Precompute row tops/heights
                  const tops: number[] = [];
                  const heights: number[] = [];
                  let y = 0;
                  for (let i = 0; i < flattened.length; i++) {
                    tops.push(y);
                    const h = getRowHeight(flattened[i]);
                    heights.push(h);
                    y += h;
                  }

                  // Helper: does a row show a triangle?
                  const hasTriangle = (row: FlattenedRow) => {
                    if (row.type !== 'group' && row.type !== 'layer-group') return false;
                    const el = row.element as React.ReactElement<any>;
                    return !!el.props?.children && React.Children.count(el.props.children) > 0;
                  };

                  // Build segments: for each row i and each depth d < row.depth,
                  // start a segment if previous row isn't deep enough; extend
                  // until the first row with depth < d + 1.
                  type Seg = { left: number; top: number; height: number; depth: number };
                  const segs: Seg[] = [];

                  for (let i = 0; i < flattened.length; i++) {
                    const row = flattened[i];
                    for (let d = 0; d < row.depth; d++) {
                      const prev = flattened[i - 1];
                      const startsHere = i === 0 || (prev && prev.depth < d + 1);
                      if (!startsHere) continue;

                      // find end index j (inclusive) where branch at depth d+1 ends
                      let j = i;
                      while (j + 1 < flattened.length && flattened[j + 1].depth >= d + 1) j++;

                      const left = 8 + d * 14 + 5;
                      const topGap = hasTriangle(row) ? 6 : 0; // skip triangle only where segment starts
                      const top = tops[i] + topGap;
                      const bottom = tops[j] + heights[j];
                      const height = Math.max(0, bottom - top);
                      if (height > 0) segs.push({ left, top, height, depth: d });
                    }
                  }

                  return (
                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        pointerEvents: 'none',
                        zIndex: 0,
                      }}
                    >
                      {segs.map((s, idx) => (
                        <div
                          key={`seg-${idx}`}
                          style={{
                            position: 'absolute',
                            left: s.left,
                            top: s.top,
                            height: s.height,
                            width: 2,
                            background: getDepthColor(s.depth),
                            opacity: 0.9,
                            borderRadius: 1,
                          }}
                        />
                      ))}
                    </div>
                  );
                })()}

                {/* --- ROWS (unchanged) --- */}
                {flattened.map((row, idx) => {
                  const isGroup = row.type === 'group';
                  const isLayerGroup = row.type === 'layer-group';
                  const height = getRowHeight(row);
                  const collapsed = row.collapsed ?? collapsedState[row.id];

                  const el = row.element as React.ReactElement<any>;
                  const showTriangle =
                    (isGroup || isLayerGroup) && !!el.props?.children && React.Children.count(el.props.children) > 0;
                  const icon = showTriangle ? (collapsed ? '▶' : '▼') : '';

                  return (
                    <div
                      key={row.id}
                      style={{
                        position: 'relative',
                        display: 'flex',
                        alignItems: 'center',
                        height,
                        paddingLeft: 8 + row.depth * 14,
                        borderBottom: '1px solid rgba(255,255,255,0.08)',
                        fontSize: '0.78rem',
                        fontWeight: isGroup || isLayerGroup ? 700 : 500,
                        color: '#eee',
                        cursor: isGroup || isLayerGroup ? 'pointer' : 'default',
                        userSelect: 'none',
                        zIndex: 1, // above the lines
                        background: 'transparent',
                      }}
                      onClick={() => (isGroup || isLayerGroup) && toggleCollapse(row.id)}
                      title={row.name}
                    >
                      {icon && <span style={{ display: 'inline-block', width: 14, marginRight: 2 }}>{icon}</span>}
                      {row.name}
                    </div>
                  );
                })}
              </div>
            </ScrollableCmp.Group>

            {/* Right Column */}
            <ScrollableCmp.Group
              horizontalId="timeline-h"
              verticalId="timeline-v"
              style={{
                gridRow: 2,
                gridColumn: 2,
                display: 'flex',
                flexDirection: 'column',
                background: '#181818',
              }}
            >
              <div style={{ width: contentWidth, display: 'flex', flexDirection: 'column' }}>
                {flattened.map((row) => {
                  const height = getRowHeight(row);
                  const background = `rgba(255,255,255,${0.01 * (row.depth + 1)})`;

                  if (row.type === 'group') {
                    return <div key={row.id} style={{ height, borderBottom: '1px solid rgba(255,255,255,0.1)', background }} />;
                  }

                  const el = row.element as React.ReactElement<LayerProps>;
                  return (
                    <div
                      key={row.id}
                      data-layer-id={row.id}
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        height,
                        borderBottom: '1px solid rgba(255,255,255,0.05)',
                        background,
                      }}
                    >
                      {el}
                    </div>
                  );
                })}
              </div>
            </ScrollableCmp.Group>

            {/* Scrollbars */}
            <div style={{ gridRow: 2, gridColumn: 3 }}>
              <ScrollableCmp.Vertical id="timeline-v" />
            </div>
            <div style={{ gridRow: 3, gridColumn: 2 }}>
              <ScrollableCmp.Horizontal id="timeline-h" />
            </div>
          </div>
        </ScrollableCmp>
      </TimelineRoot>
    </TimelineContext.Provider>
  );
}

Timeline.Group = Group;
Timeline.BarLayer = BarLayer;
Timeline.GraphLayer = GraphLayer;
