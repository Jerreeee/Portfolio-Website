// @generate-component-classes
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { makeSlotFactory } from '@/Utils/makeSlotFactory';
import { timeline } from './TimelineClasses';
import ScrollableCmp from '../Scrollable/ScrollableCmp';
import { TimelineContext } from './Context';
import type { RangeProvider } from '@/Utils/RangeProvider';
import Layer, { LAYER_FLAG } from './Layer';
import BarLayer from './BarLayer';
import GraphLayer from './GraphLayer';

const makeSlot = makeSlotFactory('Timeline', timeline);

const TimelineRoot = makeSlot(motion.div, 'root')(() => ({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  height: '100%',
  userSelect: 'none',
}));

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

interface FlattenedLayer {
  id: string;
  name: string;
  depth: number;
  collapsed?: boolean;
  parentId?: string;
  hasChildren?: boolean;
  element: React.ReactElement<any>;
}

interface LayerElementProps {
  name?: string;
  collapsed?: boolean;
  children?: React.ReactNode;
}

/**
 * Recursively flattens <Layer> hierarchy into a visible list.
 * No height calculation — layout is fully intrinsic.
 * IDs are deterministic (based on tree position).
 */
function flatten(
  children: React.ReactNode,
  depth = 0,
  parentId = '',
  collapsedState?: Record<string, boolean>,
  indexPrefix = ''
): FlattenedLayer[] {
  const list: FlattenedLayer[] = [];

  React.Children.forEach(children, (child, index) => {
    if (!React.isValidElement(child)) return;
    const type: any = child.type;

    if (type && type[LAYER_FLAG]) {
      const props = child.props as LayerElementProps;
      const { name, collapsed = false, children: inner } = props;

      // Determine if this layer actually has child <Layer> elements
      const hasChildren =
        !!inner &&
        React.Children.toArray(inner).some(
          (c) => React.isValidElement(c) && (c.type as any)[LAYER_FLAG]
        );

      // deterministic id
      const id = `${parentId}${indexPrefix}${index}-${name ?? 'layer'}`;
      const isCollapsed = collapsedState?.[id] ?? collapsed;

      list.push({
        id,
        name: name ?? '',
        depth,
        collapsed: isCollapsed,
        parentId,
        hasChildren,
        element: child,
      });

      if (!isCollapsed && inner) {
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

  // Measure actual heights of right column rows
  React.useLayoutEffect(() => {
    const elements = document.querySelectorAll('[data-layer-id]');
    const newHeights: Record<string, number> = {};
    elements.forEach((el) => {
      const id = el.getAttribute('data-layer-id');
      if (id) newHeights[id] = el.getBoundingClientRect().height;
    });
    rowHeights.current = newHeights;
    forceUpdate();
  }, [flattened]);

  return (
    <TimelineContext.Provider value={ProviderValue}>
      <TimelineRoot>
        <ScrollableCmp>
          <div
            style={{
              display: 'grid',
              width: '100%',
              gridTemplateRows: showTopBar ? `${topBarHeight}px 1fr auto` : `1fr auto`,
              gridTemplateColumns: `${showLabels ? leftColumnWidth : 0}px 1fr auto`,
            }}
          >
            {/* --- Top Bar --- */}
            {showTopBar && (
              <>
                <div
                  style={{
                    gridRow: 1,
                    gridColumn: 1,
                    background: showLabels ? 'rgba(0,0,0,0.07)' : 'transparent',
                    borderBottom: '1px solid rgba(255,255,255,0.12)',
                  }}
                />
                <ScrollableCmp.Group
                  horizontalId="timeline-h"
                  style={{
                    gridRow: 1,
                    gridColumn: 2,
                    borderBottom: '1px solid rgba(255,255,255,0.12)',
                    background: 'rgba(20,20,20,0.85)',
                  }}
                >
                  <div style={{ width: contentWidth, height: topBarHeight }} />
                </ScrollableCmp.Group>
              </>
            )}

            {/* --- Left column (names) --- */}
            <ScrollableCmp.Group
              verticalId="timeline-v"
              style={{
                gridRow: showTopBar ? 2 : 1,
                gridColumn: 1,
                borderRight: showLabels ? '1px solid rgba(255,255,255,0.12)' : 'none',
                background: showLabels ? 'rgba(0,0,0,0.03)' : 'transparent',
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {flattened.map((layer) => {
                  const height = rowHeights.current[layer.id] ?? 'auto';
                  return (
                    <div
                      key={layer.id}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        height,
                        paddingLeft: 8 + layer.depth * 14,
                        borderBottom: '1px solid rgba(255,255,255,0.06)',
                        fontSize: '0.78rem',
                        fontWeight: layer.depth === 0 ? 600 : 500,
                        cursor: layer.hasChildren ? 'pointer' : 'default',
                        userSelect: 'none',
                      }}
                      onClick={() => layer.hasChildren && toggleCollapse(layer.id)}
                    >
                      {layer.hasChildren ? (layer.collapsed ? '▶ ' : '▼ ') : ''}
                      {layer.name}
                    </div>
                  );
                })}
              </div>
            </ScrollableCmp.Group>

            {/* --- Right side content --- */}
            <ScrollableCmp.Group
              horizontalId="timeline-h"
              verticalId="timeline-v"
              style={{
                gridRow: showTopBar ? 2 : 1,
                gridColumn: 2,
                display: 'flex',
                flexDirection: 'column',
                minHeight: 0,
                minWidth: 0,
              }}
            >
              <div style={{ width: contentWidth, display: 'flex', flexDirection: 'column' }}>
                {flattened.map((layer) => {
                  // hide rows if any ancestor is collapsed
                  let hidden = false;
                  let pid = layer.parentId;
                  while (pid) {
                    if (collapsedState[pid]) { hidden = true; break; }
                    const parent = flattened.find((l) => l.id === pid);
                    pid = parent?.parentId;
                  }
                  if (hidden) return null;

                  const el = layer.element;

                  // Only render the non-layer children in this row
                  const rowChildren = React.Children.toArray(el.props.children).filter((c) => {
                    if (!React.isValidElement(c)) return true;
                    const t: any = c.type;
                    return !t || !t[LAYER_FLAG];
                  });

                  return (
                    <div
                      key={layer.id}
                      data-layer-id={layer.id}
                      style={{ display: 'block' }}
                    >
                      {rowChildren}
                    </div>
                  );
                })}
              </div>
            </ScrollableCmp.Group>

            {/* --- Scrollbars --- */}
            <div style={{ gridRow: showTopBar ? 2 : 1, gridColumn: 3 }}>
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

Timeline.Layer = Layer;
Timeline.BarLayer = BarLayer;
Timeline.GraphLayer = GraphLayer;
