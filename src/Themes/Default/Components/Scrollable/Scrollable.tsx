'use client';

import React, { useEffect, useRef, useState } from 'react';
import { styled } from '@mui/material/styles';
import ScrollBarCmp from '@/Themes/Default/Components/ScrollBar/ScrollBar';

const ScrollableRoot = styled('div', { name: 'Scrollable', slot: 'Root' })({
  position: 'relative',
  width: '100%',
});

const ScrollableContainer = styled('div', { name: 'Scrollable', slot: 'Container' })({
  display: 'flex',
  gap: '0.75rem',
  overflowX: 'auto',
  scrollbarWidth: 'none',
  msOverflowStyle: 'none',
  '&::-webkit-scrollbar': { display: 'none' },
});

export interface ScrollableProps {
  children: React.ReactNode;
}

export default function ScrollableCmp(props: ScrollableProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [needsScroll, setNeedsScroll] = useState(false);

  useEffect(() => {
    function checkScroll() {
      const el = containerRef.current;
      if (el) setNeedsScroll(el.scrollWidth > el.clientWidth);
    }
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, [props.children]);

  return (
    <ScrollableRoot>
      <ScrollableContainer ref={containerRef}>{props.children}</ScrollableContainer>
      {needsScroll && <ScrollBarCmp scrollContainer={containerRef} />}
    </ScrollableRoot>
  );
}
