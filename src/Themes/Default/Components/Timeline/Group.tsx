'use client';

import React from 'react';

export const GROUP_FLAG = '__isTimelineGroup';

export interface GroupProps {
  name?: string;
  collapsed?: boolean;
  children?: React.ReactNode;
}

export type GroupCmp = React.ReactElement<GroupProps>;

export default function Group({ children }: GroupProps) {
  return <>{children}</>;
}

(Group as any)[GROUP_FLAG] = true;
