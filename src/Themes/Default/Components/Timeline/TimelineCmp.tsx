'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { styled } from '@mui/material/styles';
import { useTheme } from '@/Themes/ThemeProvider';
import { makeSlotFactory } from '@/Utils/makeSlotFactory';
import { timelineCmp } from './TimelineCmpClasses';

// =====================================================================
// ============================= Slot Definitions ======================

const makeSlot = makeSlotFactory('TimelineCmp', timelineCmp);

const TimelineRoot = makeSlot(motion.div, 'root')(() => ({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  overflow: 'hidden',
}));

const TimelineTopBar = makeSlot('div', 'topBar')(({ theme }) => ({
  position: 'relative',
  width: '100%',
  height: theme.spacing(3),
  borderBottom: `1px solid ${theme.palette.divider}`,
  fontSize: theme.typography.caption.fontSize,
  color: theme.palette.text.secondary,
  boxSizing: 'border-box',
}));

const TimelineTopTick = makeSlot('div', 'topTick')(({ theme }) => ({
  position: 'absolute',
  top: 0,
  bottom: 0,
  width: 1,
  backgroundColor: theme.palette.grey[500],
  opacity: 0.5,
  transform: 'translateX(-50%)',
}));

const TimelineLayersRoot = makeSlot('div', 'layersRoot')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  gap: theme.spacing(0.5),
  paddingTop: theme.spacing(0.5),
  position: 'relative',
}));

const TimelineLayer = makeSlot('div', 'layer')(({ theme }) => ({
  position: 'relative',
  height: theme.spacing(3),
  width: '100%',
  borderRadius: theme.shape.borderRadius,
}));

const TimelineBarSlot = makeSlot('div', 'bar')(({ theme }) => ({
  position: 'absolute',
  top: 0,
  bottom: 0,
  borderRadius: theme.shape.borderRadius,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.getContrastText(theme.palette.background.paper),
  fontSize: theme.typography.caption.fontSize,
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
}));

// =====================================================================
// ============================= Types ==================================

export interface TimelineCmpSettings {}

export interface TimelineBar {
  layerIndex: number;
  start: number;
  end: number;
  label: string;
  color?: string;
}

export interface TimelineCmpProps {
  range: [number, number];
  interval?: number;
  showTopBar?: boolean;
  bars: TimelineBar[];
  layerCount?: number;
}

// =====================================================================
// ============================= Component ==============================

export default function TimelineCmp(props: TimelineCmpProps) {
  const { theme } = useTheme();

  const normalize = (v: number) => {
    const [min, max] = props.range;
    if (max === min) return 0;
    return (v - min) / (max - min);
  };

  const ticks: number[] = [];
  if (props.showTopBar && props.interval !== undefined) {
    for (let t = props.range[0]; t <= props.range[1] + 1e-9; t += props.interval) {
      ticks.push(Number(t.toFixed(6)));
    }
  }

  const layerCount =
    props.layerCount ?? Math.max(0, ...props.bars.map((b) => b.layerIndex + 1));

  return (
    <TimelineRoot>
      {props.showTopBar && (
        <TimelineTopBar>
          {ticks.map((t, i) => {
            const pos = normalize(t) * 100;
            const isFirst = i === 0;
            const isLast = i === ticks.length - 1;

            let labelLeft = `${pos}%`;
            let translate = 'translate(-50%, -50%)';
            let textAlign: 'left' | 'right' | 'center' = 'center';

            if (isFirst) {
              // move label slightly right of tick
              labelLeft = `calc(${pos}% + 0.25rem)`;
              translate = 'translateY(-50%)';
              textAlign = 'left';
            } else if (isLast) {
              // move label slightly left of tick
              labelLeft = `calc(${pos}% - 0.25rem)`;
              translate = 'translate(-100%, -50%)';
              textAlign = 'right';
            }

            return (
              <React.Fragment key={i}>
                <TimelineTopTick sx={{ left: `${pos}%` }} />
                <div
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: labelLeft,
                    transform: translate,
                    textAlign,
                    whiteSpace: 'nowrap',
                    pointerEvents: 'none',
                  }}
                >
                  {t}
                </div>
              </React.Fragment>
            );
          })}
        </TimelineTopBar>
      )}

      <TimelineLayersRoot>
        {Array.from({ length: layerCount }).map((_, layerIdx) => (
          <TimelineLayer key={layerIdx}>
            {props.bars
              .filter((b) => b.layerIndex === layerIdx)
              .map((b, i) => {
                const left = normalize(b.start) * 100;
                const right = normalize(b.end) * 100;
                const width = Math.max(right - left, 0);
                return (
                  <TimelineBarSlot
                    key={i}
                    sx={{
                      left: `${left}%`,
                      width: `${width}%`,
                      backgroundColor: b.color || theme.palette.primary.main,
                    }}
                  >
                    {b.label}
                  </TimelineBarSlot>
                );
              })}
          </TimelineLayer>
        ))}
      </TimelineLayersRoot>
    </TimelineRoot>
  );
}
