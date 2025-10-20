'use client';

import React from 'react';
import { nanoid } from 'nanoid';
import { useTheme } from '@/Themes/ThemeProvider';
import { useTimeline } from './Context';
import { makeSlotFactory } from '@/Utils/makeSlotFactory';
import { timelineCmp } from './TimelineCmpClasses';

const makeSlot = makeSlotFactory('TimelineCmp', timelineCmp);

const GroupRoot = makeSlot('div', 'root')(({ theme }) => ({
  position: 'relative',
  height: theme.spacing(4),
  borderBottom: `1px solid ${theme.palette.divider}`,
  backgroundColor: theme.palette.background.default,
}));

export interface TimelineCmpGroupProps {
  name?: string;
  children?: React.ReactNode;
}

export default function TimelineCmpGroup({ name, children }: TimelineCmpGroupProps) {
  const id = React.useMemo(() => nanoid(), []);
  const { registerGroup, unregisterGroup } = useTimeline();
  const { theme } = useTheme();

  React.useEffect(() => {
    registerGroup({ id, name, height: parseFloat(theme.spacing(4)) });
    return () => unregisterGroup(id);
  }, [id, name, registerGroup, unregisterGroup, theme]);

  return <GroupRoot>{children}</GroupRoot>;
}
