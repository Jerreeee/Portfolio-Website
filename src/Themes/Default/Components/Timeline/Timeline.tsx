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
}));

const GROUP_ROW_HEIGHT = 24;

interface FlattenedRow {
  id: string;
  name: string;
  depth: number;
  collapsed?: boolean;
  parentId?: string;
  type: 'group' | 'layer';
  element: React.ReactElement;
}

export interface TimelineSettings {}

export interface TimelineProps {
  rangeProvider: RangeProvider;
  pixelsPerUnit?: number;
  scaleToFit?: boolean;
  children?: React.ReactNode;
  leftColumnWidth?: number;
  showLabels?: boolean;
  showTopBar?: boolean;
}

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

    // --- Group ---
    if (type && type[GROUP_FLAG]) {
      const { name, collapsed = false, children: inner } = props as GroupProps;
      const id = `${parentId}${indexPrefix}${index}-${name ?? 'group'}`;
      const isCollapsed = collapsedState[id] ?? collapsed;

      list.push({
        id,
        name: name ?? '',
        depth,
        collapsed: isCollapsed,
        parentId,
        type: 'group',
        element: el,
      });

      // only include children if expanded
      if (!isCollapsed && inner) {
        list.push(...flatten(inner, depth + 1, id, collapsedState, `${index}-`));
      }
      return;
    }

    // --- Visual layer ---
    const isVisual = (type as any)?.[BAR_FLAG] || (type as any)?.[GRAPH_FLAG];
    if (isVisual) {
      const id = `${parentId}${indexPrefix}${index}-layer`;
      const { name, children: inner } = props as LayerProps;

      list.push({
        id,
        name: name ?? '',
        depth,
        parentId,
        type: 'layer',
        element: el,
      });

      if (inner) {
        list.push(...flatten(inner, depth + 1, id, collapsedState, `${index}-`));
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
  leftColumnWidth = 120,
  showLabels = true,
  showTopBar = true,
}: TimelineProps) {
  const [collapsedState, setCollapsedState] = React.useState<Record<string, boolean>>({});
  const rowHeights = React.useRef<Record<string, number>>({});
  const [, forceUpdate] = React.useReducer((x) => x + 1, 0);

  const flattened = React.useMemo(
    () => flatten(children, 0, '', collapsedState),
    [children, collapsedState]
  );

  const toggleCollapse = React.useCallback(
    (id: string) => setCollapsedState((prev) => ({ ...prev, [id]: !prev[id] })),
    []
  );

  const domainSpan = rangeProvider.end - rangeProvider.start;
  const contentWidth = scaleToFit ? '100%' : Math.max(0, pixelsPerUnit * domainSpan);
  const topBarHeight = showTopBar ? 24 : 0;

  const ProviderValue = React.useMemo(
    () => ({ rangeProvider, pixelsPerUnit, scaleToFit }),
    [rangeProvider, pixelsPerUnit, scaleToFit]
  );

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

  function getDefaultLayerHeight(el: React.ReactElement): number {
    const type: any = el.type;
    const explicit = (el.props as LayerProps)?.height;
    if (typeof explicit === 'number') return explicit;
    if (type?.[GRAPH_FLAG]) return 60;
    return 20;
  }

  function getRowHeight(row: FlattenedRow): number {
    if (row.type === 'group') return GROUP_ROW_HEIGHT;
    return rowHeights.current[row.id] ?? getDefaultLayerHeight(row.element);
  }

  function rowHasOriginalChildren(row: FlattenedRow): boolean {
    if (row.type !== 'group') return false;
    const el = row.element as React.ReactElement<GroupProps>;
    return React.Children.count(el.props.children) > 0;
  }

  // Helper for alternating background tint on left column only
  function getDepthBackground(depth: number): string {
    const alpha = 0.03 + depth * 0.02;
    const base = depth % 2 === 0 ? 255 : 240;
    return `rgba(${base}, ${base}, ${base}, ${alpha})`;
  }

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
            }}
          >
            {/* --- Top Bar (empty when hidden) --- */}
            <div
              style={{
                gridRow: 1,
                gridColumn: 1,
                background: showTopBar ? 'rgba(0,0,0,0.07)' : 'transparent',
                borderBottom: showTopBar ? '1px solid rgba(255,255,255,0.12)' : 'none',
              }}
            />
            <ScrollableCmp.Group
              horizontalId="timeline-h"
              style={{
                gridRow: 1,
                gridColumn: 2,
                borderBottom: showTopBar ? '1px solid rgba(255,255,255,0.12)' : 'none',
                background: showTopBar ? 'rgba(20,20,20,0.85)' : 'transparent',
              }}
            >
              <div style={{ width: contentWidth, height: topBarHeight }} />
            </ScrollableCmp.Group>

            {/* --- Left column (labels with background shading) --- */}
            <ScrollableCmp.Group
              verticalId="timeline-v"
              style={{
                gridRow: 2,
                gridColumn: 1,
                borderRight: showLabels ? '1px solid rgba(255,255,255,0.12)' : 'none',
                background: showLabels ? 'rgba(0,0,0,0.03)' : 'transparent',
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {flattened.map((row) => {
                  const isGroup = row.type === 'group';
                  const height = getRowHeight(row);
                  const collapsed = row.collapsed ?? collapsedState[row.id];
                  const hasChildren = rowHasOriginalChildren(row);
                  const icon = isGroup && hasChildren ? (collapsed ? '▶' : '▼') : '';
                  const background = getDepthBackground(row.depth);

                  return (
                    <div
                      key={row.id}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        height,
                        paddingLeft: 8 + row.depth * 14,
                        borderBottom:
                          row.type === 'group'
                            ? '1px solid rgba(255,255,255,0.12)'
                            : '1px solid rgba(255,255,255,0.06)',
                        background,
                        fontSize: '0.78rem',
                        fontWeight: row.type === 'group' ? 700 : row.depth === 0 ? 600 : 500,
                        cursor: isGroup ? 'pointer' : 'default',
                        userSelect: 'none',
                        transition: 'background 0.2s ease',
                      }}
                      onClick={() => isGroup && toggleCollapse(row.id)}
                      title={row.name}
                    >
                      {icon && (
                        <span style={{ display: 'inline-block', width: 14, marginRight: 2 }}>
                          {icon}
                        </span>
                      )}
                      {row.name}
                    </div>
                  );
                })}
              </div>
            </ScrollableCmp.Group>

            {/* --- Right column (content, clean background) --- */}
            <ScrollableCmp.Group
              horizontalId="timeline-h"
              verticalId="timeline-v"
              style={{
                gridRow: 2,
                gridColumn: 2,
                display: 'flex',
                flexDirection: 'column',
                minHeight: 0,
                minWidth: 0,
              }}
            >
              <div style={{ width: contentWidth, display: 'flex', flexDirection: 'column' }}>
                {flattened.map((row) => {
                  const height = getRowHeight(row);

                  if (row.type === 'group') {
                    return (
                      <div
                        key={row.id}
                        style={{
                          height,
                          borderBottom: '1px solid rgba(255,255,255,0.12)',
                          background: 'transparent',
                        }}
                      />
                    );
                  }

                  const el = row.element as React.ReactElement<LayerProps>;
                  return (
                    <div
                      key={row.id}
                      data-layer-id={row.id}
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        marginLeft: row.depth * 12,
                        height,
                        borderBottom: '1px solid rgba(255,255,255,0.06)',
                        background: 'transparent',
                      }}
                    >
                      {el}
                    </div>
                  );
                })}
              </div>
            </ScrollableCmp.Group>

            {/* --- Scrollbars --- */}
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
