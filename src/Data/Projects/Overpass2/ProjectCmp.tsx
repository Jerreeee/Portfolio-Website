'use client';

import React from 'react';
import { Box, Typography, Container } from '@mui/material';
import type { ProjectManifest } from "@/Types/projectManifest";
import type { ProjectCmpProps } from '../project';
import { data } from './data';
import { makeDefaultRangeProvider } from '@/Utils/RangeProvider';
import { useAppTheme, useComponents } from '@/Themes/ThemeProvider';

// ===========================================================================
// Scrollable demo data
// ===========================================================================

const CAT_COLORS: Record<string, string> = {
  Road:     '#4fc3f7',
  Terrain:  '#81c784',
  Foliage:  '#aed581',
  Material: '#ffb74d',
  Traffic:  '#f06292',
};

const PARAM_NAMES_BY_CAT: Record<string, string[]> = {
  Road:     ['Width', 'Lane Count', 'Shoulder Width', 'Curb Height', 'Camber', 'Gradient Max'],
  Terrain:  ['Height Scale', 'Erosion', 'Roughness', 'Rock Density', 'Cliff Threshold', 'Slope Bias'],
  Foliage:  ['Tree Density', 'Grass Coverage', 'Bush Radius', 'Scatter Seed', 'Height Variation', 'Scale Variance'],
  Material: ['Roughness', 'Metallic', 'AO Intensity', 'Tiling', 'Blend Sharpness', 'Displacement'],
  Traffic:  ['Lanes Active', 'Speed Limit', 'Density', 'Spawn Rate', 'Merge Distance', 'Signal Count'],
};

const DEMO_ROWS = Object.entries(PARAM_NAMES_BY_CAT).flatMap(([cat, names]) =>
  names.map(name => ({ cat, name }))
);

const DEMO_COLS = Array.from({ length: 22 }, (_, i) => `V${String(i + 1).padStart(2, '0')}`);

const DEMO_VALUES = DEMO_ROWS.map((_, ri) =>
  DEMO_COLS.map((_, ci) => ((ri * 31 + ci * 17) % 97) / 96)
);

function valueColor(v: number): string {
  const r = Math.round(80  + (1 - v) * 60);
  const g = Math.round(140 + v * 100);
  const b = Math.round(200 + (1 - v) * 30);
  return `rgb(${r},${g},${b})`;
}

const LEFT_W  = 210;
const HEADER_H = 30;
const CELL_W  = 72;
const ROW_H   = 28;

function ScrollableSyncDemo() {
  const { ScrollableCmp } = useComponents();
  const { theme } = useAppTheme();
  return (
    <Box
      sx={{
        height: 380,
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: 2,
        overflow: 'hidden',
        fontFamily: 'monospace',
        background: '#0d0d1c',
        userSelect: 'none',
      }}
    >
      <ScrollableCmp>
        <div
          style={{
            display: 'grid',
            width: '100%',
            height: '100%',
            gridTemplateRows: `${HEADER_H}px 1fr auto`,
            gridTemplateColumns: `${LEFT_W}px 1fr auto`,
          }}
        >
          {/* ── Corner ── */}
          <div
            style={{
              gridRow: 1,
              gridColumn: 1,
              background: '#16162e',
              borderRight: '1px solid rgba(255,255,255,0.1)',
              borderBottom: '1px solid rgba(255,255,255,0.1)',
              display: 'flex',
              alignItems: 'center',
              padding: '0 12px',
            }}
          >
            <span style={{ color: '#6b6b99', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.06em' }}>
              PARAMETER
            </span>
          </div>

          {/* ── Column headers — linked horizontally with data grid ── */}
          <ScrollableCmp.Group
            horizontalId="demo-h"
            style={{
              gridRow: 1,
              gridColumn: 2,
              background: '#16162e',
              borderBottom: '1px solid rgba(255,255,255,0.1)',
            }}
          >
            <div style={{ display: 'flex' }}>
              {DEMO_COLS.map(col => (
                <div
                  key={col}
                  style={{
                    minWidth: CELL_W,
                    height: HEADER_H,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRight: '1px solid rgba(255,255,255,0.06)',
                    fontSize: '0.65rem',
                    color: '#64b5f6',
                    fontWeight: 700,
                    letterSpacing: '0.05em',
                  }}
                >
                  {col}
                </div>
              ))}
            </div>
          </ScrollableCmp.Group>

          {/* ── Row labels — linked vertically with data grid ── */}
          <ScrollableCmp.Group
            verticalId="demo-v"
            style={{
              gridRow: 2,
              gridColumn: 1,
              background: '#12122a',
              borderRight: '1px solid rgba(255,255,255,0.1)',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {DEMO_ROWS.map(({ cat, name }, ri) => (
                <div
                  key={ri}
                  style={{
                    minHeight: ROW_H,
                    height: ROW_H,
                    display: 'flex',
                    alignItems: 'center',
                    padding: '0 10px',
                    borderBottom: '1px solid rgba(255,255,255,0.04)',
                    gap: 8,
                  }}
                >
                  <span
                    style={{
                      fontSize: '0.58rem',
                      color: CAT_COLORS[cat],
                      fontWeight: 700,
                      letterSpacing: '0.04em',
                      minWidth: 48,
                    }}
                  >
                    {cat.toUpperCase()}
                  </span>
                  <span style={{ fontSize: '0.7rem', color: '#c8c8dd', whiteSpace: 'nowrap' }}>
                    {name}
                  </span>
                </div>
              ))}
            </div>
          </ScrollableCmp.Group>

          {/* ── Data grid — linked both horizontally and vertically ── */}
          <ScrollableCmp.Group
            horizontalId="demo-h"
            verticalId="demo-v"
            style={{ gridRow: 2, gridColumn: 2, background: '#0d0d1c' }}
          >
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {DEMO_ROWS.map((_, ri) => (
                <div
                  key={ri}
                  style={{
                    display: 'flex',
                    minHeight: ROW_H,
                    height: ROW_H,
                    borderBottom: '1px solid rgba(255,255,255,0.03)',
                  }}
                >
                  {DEMO_VALUES[ri].map((v, ci) => (
                    <div
                      key={ci}
                      style={{
                        minWidth: CELL_W,
                        height: ROW_H,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRight: '1px solid rgba(255,255,255,0.03)',
                        fontSize: '0.68rem',
                        color: valueColor(v),
                        background: `rgba(${Math.round(v * 15)},${Math.round(v * 25)},${Math.round(v * 55)},0.5)`,
                      }}
                    >
                      {v.toFixed(3)}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </ScrollableCmp.Group>

          {/* ── Vertical scrollbar ── */}
          <div style={{ gridRow: 2, gridColumn: 3 }}>
            <ScrollableCmp.Vertical id="demo-v" />
          </div>

          {/* ── Horizontal scrollbar ── */}
          <div style={{ gridRow: 3, gridColumn: 2 }}>
            <ScrollableCmp.Horizontal id="demo-h" />
          </div>

          {/* ── Bottom-right corner filler ── */}
          <div style={{ gridRow: 3, gridColumn: 3, background: '#16162e' }} />
        </div>
      </ScrollableCmp>
    </Box>
  );
}

// ===========================================================================
// Signal Studio demo data
// ===========================================================================

const SIG_CH       = 18;
const SIG_TIMES    = 64;
const SIG_FREQS    = 48;
const SIG_ROW_H    = 32;
const SIG_TIME_W   = 44;
const SIG_FREQ_W   = 28;
const SIG_RULER_H  = 26;
const SIG_LABEL_W  = 82;

const SIG_CHANNEL_NAMES = Array.from({ length: SIG_CH }, (_, i) =>
  `CH ${String(i + 1).padStart(2, '0')}`
);

// Amplitude ∈ [-1, 1] per [channel][time]
const SIG_WAVEFORM = Array.from({ length: SIG_CH }, (_, ch) =>
  Array.from({ length: SIG_TIMES }, (_, t) => {
    const f1 = Math.sin((t + ch * 3) * 0.35 + ch * 0.8);
    const f2 = Math.sin((t * 0.7 + ch * 1.2) * 0.6) * 0.5;
    const n  = (((ch * 31 + t * 17) % 23) / 23 - 0.5) * 0.25;
    return Math.max(-1, Math.min(1, f1 + f2 + n));
  })
);

// Spectral magnitude ∈ [0, 1] per [channel][freq_bin]
const SIG_SPECTRUM = Array.from({ length: SIG_CH }, (_, ch) =>
  Array.from({ length: SIG_FREQS }, (_, f) => {
    const p1 = Math.exp(-((f - 4 - ch * 1.8) ** 2) / 10) * 0.9;
    const p2 = Math.exp(-((f - SIG_FREQS + ch * 1.2) ** 2) / 18) * 0.6;
    const n  = ((ch * 7 + f * 13) % 11) / 110;
    return Math.min(1, p1 + p2 + n);
  })
);

const SIG_RMS = SIG_WAVEFORM.map(row =>
  Math.sqrt(row.reduce((s, v) => s + v * v, 0) / row.length)
);

function waveColor(v: number): string {
  if (v >= 0) {
    return `rgb(${Math.round(30 + v * 20)},${Math.round(160 + v * 95)},${Math.round(180 + v * 75)})`;
  }
  return `rgb(${Math.round(200 - v * 55)},${Math.round(60 - v * 20)},${Math.round(60 - v * 20)})`;
}

function specColor(v: number): string {
  if (v < 0.25) {
    const t = v / 0.25;
    return `rgb(${Math.round(68 - t * 10)},${Math.round(1 + t * 50)},${Math.round(84 + t * 71)})`;
  } else if (v < 0.5) {
    const t = (v - 0.25) / 0.25;
    return `rgb(${Math.round(58 + t * 20)},${Math.round(51 + t * 130)},${Math.round(155 - t * 30)})`;
  } else if (v < 0.75) {
    const t = (v - 0.5) / 0.25;
    return `rgb(${Math.round(78 + t * 55)},${Math.round(181 + t * 38)},${Math.round(125 - t * 70)})`;
  }
  const t = (v - 0.75) / 0.25;
  return `rgb(${Math.round(133 + t * 120)},${Math.round(219 + t * 15)},${Math.round(55 - t * 55)})`;
}

/**
 * Layout:
 *   col 1 = channel labels (V:sig-ch)
 *   col 2 = waveform panel (H:sig-time, V:sig-ch)
 *   col 3 = spectrum panel (H:sig-freq, V:sig-ch)
 *   col 4 = shared vertical scrollbar
 *
 *   row 1 = rulers (time ruler | freq ruler)
 *   row 2 = data panels
 *   row 3 = horizontal scrollbars (time | freq)
 *
 * Axes:
 *   sig-ch   → col1 labels + waveform + spectrum scroll together vertically
 *   sig-time → time ruler + waveform scroll together horizontally
 *   sig-freq → freq ruler + spectrum scroll together horizontally (independent axis)
 */
function SignalStudioDemo() {
  const { ScrollableCmp } = useComponents();
  const { theme } = useAppTheme();
  return (
    <Box
      sx={{
        height: 420,
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: 2,
        overflow: 'hidden',
        fontFamily: 'monospace',
        background: '#08080f',
        userSelect: 'none',
      }}
    >
      <ScrollableCmp>
        <div
          style={{
            display: 'grid',
            width: '100%',
            height: '100%',
            gridTemplateColumns: `${SIG_LABEL_W}px 1fr 1fr auto`,
            gridTemplateRows: `${SIG_RULER_H}px 1fr auto`,
          }}
        >
          {/* ── Corner ── */}
          <div
            style={{
              gridRow: 1, gridColumn: 1,
              background: '#111122',
              borderRight: '1px solid rgba(255,255,255,0.08)',
              borderBottom: '1px solid rgba(255,255,255,0.08)',
              display: 'flex', alignItems: 'center', padding: '0 10px',
            }}
          >
            <span style={{ color: '#5566aa', fontSize: '0.58rem', fontWeight: 700, letterSpacing: '0.08em' }}>
              CHANNEL
            </span>
          </div>

          {/* ── Time ruler — linked horizontally to waveform grid ── */}
          <ScrollableCmp.Group
            horizontalId="sig-time"
            style={{
              gridRow: 1, gridColumn: 2,
              background: '#0e0e20',
              borderBottom: '1px solid rgba(255,255,255,0.08)',
              borderRight: '1px solid rgba(255,255,255,0.15)',
            }}
          >
            <div style={{ display: 'flex', height: SIG_RULER_H }}>
              {Array.from({ length: SIG_TIMES }, (_, i) => (
                <div
                  key={i}
                  style={{
                    minWidth: SIG_TIME_W, width: SIG_TIME_W,
                    display: 'flex', alignItems: 'center', paddingLeft: 4,
                    borderRight: i % 4 === 3
                      ? '1px solid rgba(255,255,255,0.14)'
                      : '1px solid rgba(255,255,255,0.04)',
                  }}
                >
                  {i % 4 === 0 && (
                    <span style={{ fontSize: '0.57rem', color: '#7799cc', whiteSpace: 'nowrap' }}>
                      {i * 10}ms
                    </span>
                  )}
                </div>
              ))}
            </div>
          </ScrollableCmp.Group>

          {/* ── Freq ruler — linked horizontally to spectrum grid (independent axis) ── */}
          <ScrollableCmp.Group
            horizontalId="sig-freq"
            style={{
              gridRow: 1, gridColumn: 3,
              background: '#0e0e20',
              borderBottom: '1px solid rgba(255,255,255,0.08)',
            }}
          >
            <div style={{ display: 'flex', height: SIG_RULER_H }}>
              {Array.from({ length: SIG_FREQS }, (_, i) => (
                <div
                  key={i}
                  style={{
                    minWidth: SIG_FREQ_W, width: SIG_FREQ_W,
                    display: 'flex', alignItems: 'center', paddingLeft: 3,
                    borderRight: i % 4 === 3
                      ? '1px solid rgba(255,255,255,0.14)'
                      : '1px solid rgba(255,255,255,0.04)',
                  }}
                >
                  {i % 4 === 0 && (
                    <span style={{ fontSize: '0.55rem', color: '#aa77cc', whiteSpace: 'nowrap' }}>
                      {(i + 1) * 250}Hz
                    </span>
                  )}
                </div>
              ))}
            </div>
          </ScrollableCmp.Group>

          {/* ── Top-right corner filler ── */}
          <div style={{ gridRow: 1, gridColumn: 4, background: '#111122', borderBottom: '1px solid rgba(255,255,255,0.08)' }} />

          {/* ── Channel labels — linked vertically to waveform AND spectrum ── */}
          <ScrollableCmp.Group
            verticalId="sig-ch"
            style={{
              gridRow: 2, gridColumn: 1,
              background: '#0d0d1e',
              borderRight: '1px solid rgba(255,255,255,0.08)',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {SIG_CHANNEL_NAMES.map((name, i) => (
                <div
                  key={i}
                  style={{
                    height: SIG_ROW_H, minHeight: SIG_ROW_H,
                    display: 'flex', alignItems: 'center',
                    padding: '0 8px', gap: 6,
                    borderBottom: '1px solid rgba(255,255,255,0.04)',
                  }}
                >
                  <span style={{ fontSize: '0.65rem', color: '#8899cc', fontWeight: 700, minWidth: 30 }}>
                    {name}
                  </span>
                  {/* RMS activity bar */}
                  <div style={{ flex: 1, height: 5, background: 'rgba(255,255,255,0.06)', borderRadius: 3, overflow: 'hidden' }}>
                    <div style={{
                      width: `${SIG_RMS[i] * 100}%`,
                      height: '100%',
                      background: `hsl(${200 + i * 9}, 70%, 55%)`,
                      borderRadius: 3,
                    }} />
                  </div>
                </div>
              ))}
            </div>
          </ScrollableCmp.Group>

          {/* ── Waveform grid — H:sig-time + V:sig-ch ── */}
          <ScrollableCmp.Group
            horizontalId="sig-time"
            verticalId="sig-ch"
            style={{
              gridRow: 2, gridColumn: 2,
              background: '#08080f',
              borderRight: '1px solid rgba(255,255,255,0.15)',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {SIG_WAVEFORM.map((row, ci) => (
                <div
                  key={ci}
                  style={{
                    display: 'flex',
                    height: SIG_ROW_H, minHeight: SIG_ROW_H,
                    borderBottom: '1px solid rgba(255,255,255,0.04)',
                    background: ci % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.012)',
                  }}
                >
                  {row.map((v, ti) => (
                    <div
                      key={ti}
                      style={{
                        minWidth: SIG_TIME_W, width: SIG_TIME_W, height: SIG_ROW_H,
                        position: 'relative',
                        borderRight: ti % 4 === 3
                          ? '1px solid rgba(255,255,255,0.08)'
                          : '1px solid rgba(255,255,255,0.02)',
                      }}
                    >
                      {/* center line */}
                      <div style={{
                        position: 'absolute', width: '100%', height: '1px',
                        background: 'rgba(255,255,255,0.06)', top: '50%',
                      }} />
                      {/* amplitude bar */}
                      <div style={{
                        position: 'absolute',
                        left: '50%', transform: 'translateX(-50%)',
                        width: 3, borderRadius: 1,
                        height: `${Math.abs(v) * 50}%`,
                        top: v >= 0 ? `${(1 - v) * 50}%` : '50%',
                        background: waveColor(v),
                        boxShadow: `0 0 3px ${waveColor(v)}`,
                      }} />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </ScrollableCmp.Group>

          {/* ── Spectrum grid — H:sig-freq + V:sig-ch ── */}
          <ScrollableCmp.Group
            horizontalId="sig-freq"
            verticalId="sig-ch"
            style={{
              gridRow: 2, gridColumn: 3,
              background: '#08080f',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {SIG_SPECTRUM.map((row, ci) => (
                <div
                  key={ci}
                  style={{
                    display: 'flex',
                    height: SIG_ROW_H, minHeight: SIG_ROW_H,
                    borderBottom: '1px solid rgba(0,0,0,0.3)',
                  }}
                >
                  {row.map((v, fi) => (
                    <div
                      key={fi}
                      style={{
                        minWidth: SIG_FREQ_W, width: SIG_FREQ_W, height: SIG_ROW_H,
                        background: specColor(v),
                        borderRight: fi % 4 === 3
                          ? '1px solid rgba(0,0,0,0.35)'
                          : '1px solid rgba(0,0,0,0.15)',
                      }}
                    />
                  ))}
                </div>
              ))}
            </div>
          </ScrollableCmp.Group>

          {/* ── Vertical scrollbar — drives all three vertical panels ── */}
          <div style={{ gridRow: 2, gridColumn: 4 }}>
            <ScrollableCmp.Vertical id="sig-ch" />
          </div>

          {/* ── Bottom-left filler ── */}
          <div style={{ gridRow: 3, gridColumn: 1, background: '#111122' }} />

          {/* ── Time horizontal scrollbar ── */}
          <div style={{ gridRow: 3, gridColumn: 2, borderRight: '1px solid rgba(255,255,255,0.15)' }}>
            <ScrollableCmp.Horizontal id="sig-time" />
          </div>

          {/* ── Freq horizontal scrollbar ── */}
          <div style={{ gridRow: 3, gridColumn: 3 }}>
            <ScrollableCmp.Horizontal id="sig-freq" />
          </div>

          {/* ── Bottom-right corner filler ── */}
          <div style={{ gridRow: 3, gridColumn: 4, background: '#111122' }} />
        </div>
      </ScrollableCmp>
    </Box>
  );
}

// ===========================================================================
// Timeline demo data
// ===========================================================================

const PIPELINE_RANGE = makeDefaultRangeProvider([0, 100]);

function TimelineDemo() {
  const { TimelineCmp } = useComponents();
  const { theme } = useAppTheme();
  return (
    <Box
      sx={{
        height: 500,
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: 2,
        overflow: 'hidden',
      }}
    >
      <TimelineCmp
        rangeProvider={PIPELINE_RANGE}
        pixelsPerUnit={8}
        leftColumnWidth={180}
        showLabels
        showTopBar
        maxHeight={500}
      >
        {/* ── Procedural Generation ── */}
        <TimelineCmp.Group name="Procedural Generation">
          <TimelineCmp.BarLayer
            name="Road Spline"
            height={20}
            bars={[
              { start: 0,  end: 18, label: 'Compute',  color: '#29b6f6' },
              { start: 20, end: 38, label: 'Mesh',     color: '#4fc3f7' },
            ]}
          />
          <TimelineCmp.BarLayer
            name="Terrain Sculpt"
            height={20}
            bars={[
              { start: 5,  end: 24, label: 'Heightmap', color: '#66bb6a' },
              { start: 25, end: 42, label: 'Erosion',   color: '#81c784' },
            ]}
          />
          <TimelineCmp.BarLayer
            name="Foliage Scatter"
            height={20}
            bars={[
              { start: 32, end: 55, label: 'Distribute', color: '#9ccc65' },
              { start: 56, end: 68, label: 'Cull',       color: '#aed581' },
            ]}
          />
        </TimelineCmp.Group>

        {/* ── Material Baking ── */}
        <TimelineCmp.Group name="Material Baking">
          <TimelineCmp.BarLayer
            name="Diffuse"
            height={20}
            bars={[{ start: 40, end: 58, label: 'Bake', color: '#ffb74d' }]}
          />
          <TimelineCmp.BarLayer
            name="Normal Map"
            height={20}
            bars={[{ start: 44, end: 63, label: 'Bake', color: '#ffa726' }]}
          />
          <TimelineCmp.BarLayer
            name="Roughness"
            height={20}
            bars={[{ start: 48, end: 66, label: 'Bake', color: '#fb8c00' }]}
          />
        </TimelineCmp.Group>

        {/* ── Unreal Export ── */}
        <TimelineCmp.Group name="Unreal Export">
          <TimelineCmp.BarLayer
            name="Static Meshes"
            height={20}
            bars={[
              { start: 65, end: 78, label: 'Road Mesh', color: '#ce93d8' },
              { start: 78, end: 88, label: 'Props',     color: '#ba68c8' },
            ]}
          />
          <TimelineCmp.BarLayer
            name="Textures"
            height={20}
            bars={[{ start: 68, end: 86, label: 'Pack & Export', color: '#ab47bc' }]}
          />
        </TimelineCmp.Group>

        {/* ── Performance Metrics ── */}
        <TimelineCmp.Group name="Performance Metrics">
          <TimelineCmp.GraphLayer
            name="Vertex Count"
            height={64}
            color="#64b5f6"
            data={[
              { x: 0,   y: 0.02 }, { x: 10,  y: 0.08 }, { x: 18,  y: 0.26 },
              { x: 25,  y: 0.36 }, { x: 35,  y: 0.52 }, { x: 45,  y: 0.65 },
              { x: 55,  y: 0.74 }, { x: 65,  y: 0.81 }, { x: 78,  y: 0.86 },
              { x: 88,  y: 0.88 }, { x: 100, y: 0.89 },
            ]}
          />
          <TimelineCmp.GraphLayer
            name="GPU Memory"
            height={64}
            color="#ef9a9a"
            data={[
              { x: 0,   y: 0.05 }, { x: 10,  y: 0.12 }, { x: 20,  y: 0.29 },
              { x: 35,  y: 0.51 }, { x: 45,  y: 0.68 }, { x: 55,  y: 0.80 },
              { x: 65,  y: 0.75 }, { x: 78,  y: 0.70 }, { x: 90,  y: 0.65 },
              { x: 100, y: 0.62 },
            ]}
          />
        </TimelineCmp.Group>

        {/* ── Validation (collapsed by default) ── */}
        <TimelineCmp.Group name="Validation" collapsed>
          <TimelineCmp.BarLayer
            name="LOD Generation"
            height={20}
            bars={[
              { start: 70, end: 79, label: 'LOD 0', color: '#80cbc4' },
              { start: 79, end: 84, label: 'LOD 1', color: '#4db6ac' },
              { start: 84, end: 87, label: 'LOD 2', color: '#26a69a' },
              { start: 87, end: 89, label: 'LOD 3', color: '#00897b' },
            ]}
          />
          <TimelineCmp.BarLayer
            name="Collision Mesh"
            height={20}
            bars={[{ start: 75, end: 90, label: 'Bake Collision', color: '#a5d6a7' }]}
          />
        </TimelineCmp.Group>
      </TimelineCmp>
    </Box>
  );
}

// ===========================================================================
// Page component
// ===========================================================================

export default function ProjectCmp({ project }: ProjectCmpProps) {
  const { ProjectOverviewCmp, MarkdownRendererCmp, ScrollableCmp, TimelineCmp } = useComponents();
  const manifest: ProjectManifest = project.manifest;

  return (
    <Box>
      {/* ==================== HERO SECTION ==================== */}
      <Container maxWidth="md" sx={{ textAlign: 'center', mb: 6 }}>
        <Typography variant="gradientH1">
          {data.title}
        </Typography>
      </Container>

      {/* ==================== OVERVIEW ==================== */}
      <ProjectOverviewCmp project={project} />

      {/* ==================== LEARNINGS ==================== */}
      <Container maxWidth="md" sx={{ mt: 6, mb: 6 }}>
        <Typography variant="h3" align="center" gutterBottom>
          Learnings
        </Typography>

        <MarkdownRendererCmp
          markdown={`
While working with **Houdini**, I found that for more complex operations and data manipulation, I preferred using **VEX** over node-based **VOP** networks for its clarity and precision. That preference for expressing logic through code rather than nodes made me increasingly interested in the technical side of tool development.
As I maintained and expanded our toolset, I began encountering the **limitations of the Houdini Engine plugin** — I often needed functionality that required deeper **C++ integration with Unreal**.

At the time, I didn't yet have that knowledge, which made me realize the importance of learning **C++ and low-level programming**. This became the main reason I pursued a **second bachelor's in Game Development**.

That experience also taught me how important iteration speed is for artists. While **Houdini excels at offline procedural generation** and its **live bridge to Unreal** works well, there's still a noticeable delay in the round-trip process. In contrast, **real-time, in-engine tools** give artists immediate feedback and allow for much faster iteration. Unreal's **Procedural Content Generation (PCG)** system reflects this shift — moving more procedural logic from Houdini into Unreal itself.

Working on *Overpass 2* ultimately sparked my passion for **C++ programming**, so I could create my own tools without such limitations.
          `}
        />
      </Container>

      {/* ==================== SCROLLABLE DEMO ==================== */}
      <Container maxWidth="lg" sx={{ mt: 6, mb: 6 }}>
        <Typography variant="h3" align="center" gutterBottom>
          Synchronized Scroll Demo
        </Typography>
        <Typography
          variant="body2"
          align="center"
          sx={{ color: 'text.secondary', mb: 3, maxWidth: 560, mx: 'auto' }}
        >
          Four panels sharing two scrollbars. The row labels, column headers, and data
          grid are all linked — scroll any panel or drag a scrollbar and the others follow.
        </Typography>
        <ScrollableSyncDemo />
      </Container>

      {/* ==================== SIGNAL STUDIO DEMO ==================== */}
      <Container maxWidth="lg" sx={{ mt: 6, mb: 6 }}>
        <Typography variant="h3" align="center" gutterBottom>
          Multi-Axis Sync Demo
        </Typography>
        <Typography
          variant="body2"
          align="center"
          sx={{ color: 'text.secondary', mb: 3, maxWidth: 660, mx: 'auto' }}
        >
          Three independent scroll axes, five linked panels. The waveform (left) and
          spectrogram (right) share a single vertical axis — scroll any panel up or down
          and all three follow. Each half has its own horizontal axis: time on the left,
          frequency on the right. One scrollbar rules the channels; two independent
          scrollbars rule their respective grids.
        </Typography>
        <SignalStudioDemo />
      </Container>

      {/* ==================== TIMELINE DEMO ==================== */}
      <Container maxWidth="lg" sx={{ mt: 6, mb: 6 }}>
        <Typography variant="h3" align="center" gutterBottom>
          Pipeline Timeline Demo
        </Typography>
        <Typography
          variant="body2"
          align="center"
          sx={{ color: 'text.secondary', mb: 3, maxWidth: 560, mx: 'auto' }}
        >
          A simulated Houdini generation run — bar tracks show overlapping tasks
          across five pipeline stages, graph layers reveal vertex count and GPU
          memory as the scene builds. Click any group header to collapse it.
        </Typography>
        <TimelineDemo />
      </Container>
    </Box>
  );
}
