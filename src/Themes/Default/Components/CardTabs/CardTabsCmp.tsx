'use client';
// @generate-component-classes

import {
  useState,
  useRef,
  useLayoutEffect,
  useCallback,
  Children,
  isValidElement,
  ReactNode,
  ReactElement,
} from 'react';
import { useTheme } from '@mui/material/styles';
import { makeSlotFactory } from '@/Utils/makeSlotFactory';
import { ScrollableCmp } from '@/Themes/Default/Components/Scrollable';
import { Item, ItemProps } from './Item';
import { cardTabsCmp } from './CardTabsCmpClasses';

const makeSlot = makeSlotFactory('CardTabsCmp', cardTabsCmp);

const CardTabsRoot = makeSlot('div', 'root')(({ theme }) => ({
  width: '100%',
  borderRadius: `${theme.shape.borderRadius}px`,
  overflow: 'hidden',
  border: `1px solid ${theme.palette.divider}`,
  backgroundColor: theme.palette.background.paper,
}));

const CardTabsHeader = makeSlot('div', 'header')(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  gap: theme.spacing(1),
  padding: `${theme.spacing(1.25)} ${theme.spacing(2)}`,
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

const CardTabsTab = makeSlot('div', 'tab')(({ theme }) => ({
  padding: `${theme.spacing(0.9)} ${theme.spacing(2)}`,
  cursor: 'pointer',
  borderRadius: `${theme.shape.borderRadius}px`,
  fontSize: theme.typography.body2.fontSize,
  whiteSpace: 'nowrap',
  textAlign: 'center',
  transition: theme.transitions.create(['background', 'borderColor', 'color']),
  border: `1px solid ${theme.palette.divider}`,
  color: theme.palette.text.secondary,
  userSelect: 'none',
}));

const ARROW_DEPTH = 12;
const TIMELINE_GAP = 4;

function getClipPath(
  position: 'first' | 'middle' | 'last' | 'only',
): string | undefined {
  const d = `${ARROW_DEPTH}px`;
  switch (position) {
    case 'first':
      return `polygon(0 0, calc(100% - ${d}) 0, 100% 50%, calc(100% - ${d}) 100%, 0 100%)`;
    case 'middle':
      return `polygon(0 0, calc(100% - ${d}) 0, 100% 50%, calc(100% - ${d}) 100%, 0 100%, ${d} 50%)`;
    case 'last':
      return `polygon(0 0, calc(100% - ${d}) 0, 100% 50%, calc(100% - ${d}) 100%, 0 100%, ${d} 50%)`;
    case 'only':
      return undefined;
  }
}

function getTabPosition(
  index: number,
  total: number,
): 'first' | 'middle' | 'last' | 'only' {
  if (total === 1) return 'only';
  if (index === 0) return 'first';
  if (index === total - 1) return 'last';
  return 'middle';
}

const CardTabsTimelineTab = makeSlot('div', 'timelineTab')(({ theme }) => ({
  padding: `${theme.spacing(0.9)} ${theme.spacing(2)}`,
  cursor: 'pointer',
  fontSize: theme.typography.body2.fontSize,
  whiteSpace: 'nowrap',
  textAlign: 'center',
  transition: theme.transitions.create(['background', 'color']),
  color: theme.palette.text.secondary,
  userSelect: 'none',
  flexGrow: 1,
}));

const CardTabsContent = makeSlot('div', 'content')(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: theme.palette.background.paper,
}));

const GAP = 8; // theme.spacing(1)
const HEADER_PADDING_X = 32; // theme.spacing(2) * 2

function useJustifiedRows(tabCount: number) {
  const headerRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [widths, setWidths] = useState<number[]>([]);

  const setTabRef = useCallback(
    (index: number) => (el: HTMLDivElement | null) => {
      tabRefs.current[index] = el;
    },
    [],
  );

  useLayoutEffect(() => {
    const header = headerRef.current;
    if (!header || tabCount === 0) return;

    function calculate() {
      const header = headerRef.current;
      if (!header) return;

      const containerWidth = header.clientWidth - HEADER_PADDING_X;
      const naturals: number[] = [];

      for (let i = 0; i < tabCount; i++) {
        const el = tabRefs.current[i];
        if (!el) return;
        naturals.push(el.offsetWidth);
      }

      // Pass 1: Greedy row assignment
      const greedyRows: number[][] = [[]];
      let rowWidth = 0;
      for (let i = 0; i < naturals.length; i++) {
        const needed = (rowWidth > 0 ? GAP : 0) + naturals[i];
        if (rowWidth > 0 && rowWidth + needed > containerWidth) {
          greedyRows.push([]);
          rowWidth = 0;
        }
        greedyRows[greedyRows.length - 1].push(i);
        rowWidth += (rowWidth > 0 ? GAP : 0) + naturals[i];
      }

      const R = greedyRows.length;

      if (R <= 1) {
        // Single row — just stretch
        const totalNatural =
          naturals.reduce((s, w) => s + w, 0) +
          (naturals.length - 1) * GAP;
        const extra = containerWidth - totalNatural;
        const perTab = extra / naturals.length;
        setWidths(naturals.map((w) => w + perTab));
        return;
      }

      // Pass 2: Balanced re-assignment
      const target = Math.ceil(tabCount / R);
      const rows: { index: number; natural: number }[][] = [[]];
      rowWidth = 0;

      for (let i = 0; i < naturals.length; i++) {
        const currentRow = rows[rows.length - 1];
        const needed = (rowWidth > 0 ? GAP : 0) + naturals[i];
        let startNewRow = false;

        if (currentRow.length >= target) {
          startNewRow = true;
        } else if (rowWidth > 0 && rowWidth + needed > containerWidth) {
          startNewRow = true;
        }

        if (startNewRow) {
          rows.push([]);
          rowWidth = 0;
        }

        rows[rows.length - 1].push({
          index: i,
          natural: naturals[i],
        });
        rowWidth +=
          (rowWidth > 0 ? GAP : 0) + naturals[i];
      }

      // Pass 3: Compute final widths
      const finalWidths = new Array<number>(tabCount);
      for (const row of rows) {
        const totalNatural =
          row.reduce((s, t) => s + t.natural, 0) +
          (row.length - 1) * GAP;
        const extra = containerWidth - totalNatural;
        const perTab = extra / row.length;
        for (const tab of row) {
          finalWidths[tab.index] = tab.natural + perTab;
        }
      }

      setWidths(finalWidths);
    }

    // Clear explicit widths so tabs render at natural size for measurement
    setWidths([]);

    // Use rAF to measure after the DOM has updated with natural widths
    const frame = requestAnimationFrame(calculate);

    const observer = new ResizeObserver(() => {
      setWidths([]);
      requestAnimationFrame(calculate);
    });
    observer.observe(header);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [tabCount]);

  return { headerRef, setTabRef, widths };
}

export interface CardTabsCmpProps {
  children?: ReactNode;
  defaultIndex?: number;
  variant?: 'default' | 'timeline';
}

export interface CardTabsCmpSettings {}

function CardTabsCmp({
  children,
  defaultIndex = 0,
  variant = 'default',
}: CardTabsCmpProps) {
  const theme = useTheme();
  const items = Children.toArray(children).filter(
    isValidElement,
  ) as ReactElement<ItemProps>[];
  const [activeIndex, setActiveIndex] = useState(defaultIndex);
  const activeContent = items[activeIndex]?.props.children;
  const isTimeline = variant === 'timeline';
  const { headerRef, setTabRef, widths } = useJustifiedRows(
    isTimeline ? 0 : items.length,
  );

  return (
    <CardTabsRoot>
      <CardTabsHeader
        ref={isTimeline ? undefined : headerRef}
        data-variant={variant}
        sx={
          isTimeline
            ? { flexWrap: 'nowrap', gap: 0, overflow: 'hidden' }
            : undefined
        }
      >
        {isTimeline
          ? <ScrollableCmp direction="horizontal">
              <div style={{ display: 'flex', flexWrap: 'nowrap', padding: '4px 8px' }}>
              {items.map((item, index) => {
              const position = getTabPosition(index, items.length);
              const clipPath = getClipPath(position);
              const isFirst = index === 0;
              const isSelected = index === activeIndex;
              return (
                <div
                  key={item.props.label}
                  style={{
                    position: 'relative',
                    flexGrow: 1,
                    marginLeft: isFirst
                      ? 0
                      : -(ARROW_DEPTH - TIMELINE_GAP),
                    zIndex: items.length - index,
                    filter: isSelected
                      ? 'url(#timeline-tab-selected)'
                      : undefined,
                  }}
                >
                  {/* Opaque layer matching header bg — gives filter a solid arrow-shaped alpha */}
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      clipPath,
                      background: theme.palette.background.paper,
                    }}
                  />
                  {/* Visible tab with transparent bg */}
                  <CardTabsTimelineTab
                    data-selected={isSelected}
                    onClick={() => setActiveIndex(index)}
                    style={{
                      clipPath,
                      position: 'relative',
                      paddingLeft:
                        isFirst
                          ? undefined
                          : `calc(${ARROW_DEPTH}px + 16px)`,
                      paddingRight: `calc(${ARROW_DEPTH}px + 16px)`,
                    }}
                  >
                    {item.props.label}
                  </CardTabsTimelineTab>
                </div>
              );
            })}
              </div>
            </ScrollableCmp>
          : items.map((item, index) => (
              <CardTabsTab
                key={item.props.label}
                ref={setTabRef(index)}
                data-selected={index === activeIndex}
                onClick={() => setActiveIndex(index)}
                style={
                  widths.length > 0
                    ? { width: widths[index] }
                    : undefined
                }
              >
                {item.props.label}
              </CardTabsTab>
            ))}
      </CardTabsHeader>
      <CardTabsContent key={activeIndex}>
        {activeContent}
      </CardTabsContent>
    </CardTabsRoot>
  );
}

CardTabsCmp.Item = Item;

export { CardTabsCmp };
export default CardTabsCmp;
