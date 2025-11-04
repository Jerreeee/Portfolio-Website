// 'use client';

// import React from 'react';
// import { useTheme } from '@/Themes/ThemeProvider';
// import { useTimeline } from './Context';
// import { makeSlotFactory } from '@/Utils/makeSlotFactory';
// import { timelineCmp } from './TimelineCmpClasses';

// const makeSlot = makeSlotFactory('TimelineTopBarCmp', timelineCmp);

// const TopBarRoot = makeSlot('div', 'root')(({ theme }) => ({
//   position: 'relative',
//   height: theme.spacing(3),
//   borderBottom: `1px solid ${theme.palette.divider}`,
//   display: 'flex',
//   alignItems: 'center',
//   fontSize: theme.typography.caption.fontSize,
//   color: theme.palette.text.secondary,
// }));

// export interface TimelineCmpTopBarProps {
//   tickCount?: number;
//   formatter?: (value: number) => string;
// }

// export default function TimelineCmpTopBar({ tickCount = 5, formatter }: TimelineCmpTopBarProps) {
//   const { rangeProvider: provider } = useTimeline();
//   const { start, end, denormalize: unscale } = provider;
//   const { theme } = useTheme();

//   const ticks = Array.from({ length: tickCount + 1 }).map((_, i) => i / tickCount);

//   return (
//     <TopBarRoot>
//       {ticks.map((r, i) => {
//         const value = unscale(r);
//         const isFirst = i === 0;
//         const isLast = i === ticks.length - 1;

//         const positionStyle: React.CSSProperties = isFirst
//           ? { left: 0, transform: 'none', textAlign: 'left' }
//           : isLast
//           ? { right: 0, left: 'auto', transform: 'none', textAlign: 'right' }
//           : { left: `${r * 100}%`, transform: 'translateX(-50%)', textAlign: 'center' };

//         return (
//           <div
//             key={i}
//             style={{
//               position: 'absolute',
//               top: 0,
//               fontSize: theme.typography.caption.fontSize,
//               whiteSpace: 'nowrap',
//               ...positionStyle,
//             }}
//           >
//             {formatter ? formatter(value) : value.toFixed(2)}
//           </div>
//         );
//       })}
//     </TopBarRoot>
//   );
// }
