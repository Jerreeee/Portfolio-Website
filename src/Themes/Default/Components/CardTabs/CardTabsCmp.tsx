'use client';
// @generate-component-classes

import { useState, Children, isValidElement, ReactNode, ReactElement } from 'react';
import { makeSlotFactory } from '@/Utils/makeSlotFactory';
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
  justifyContent: 'center',
  alignContent: 'center',
  padding: `${theme.spacing(1.25)} ${theme.spacing(2)}`,
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

const CardTabsTab = makeSlot('div', 'tab')(({ theme }) => ({
  padding: `${theme.spacing(0.9)} ${theme.spacing(2)}`,
  cursor: 'pointer',
  borderRadius: `${theme.shape.borderRadius}px`,
  fontSize: '0.9rem',
  whiteSpace: 'nowrap',
  transition: 'background 0.2s ease, border-color 0.2s ease, color 0.2s ease',
  border: `1px solid ${theme.palette.divider}`,
  color: theme.palette.text.secondary,
  userSelect: 'none',
}));

const CardTabsContent = makeSlot('div', 'content')(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: theme.palette.background.paper,
}));

export interface CardTabsCmpProps {
  children?: ReactNode;
  defaultIndex?: number;
}

export interface CardTabsCmpSettings {}

function CardTabsCmp({ children, defaultIndex = 0 }: CardTabsCmpProps) {
  const items = Children.toArray(children).filter(isValidElement) as ReactElement<ItemProps>[];
  const [activeIndex, setActiveIndex] = useState(defaultIndex);
  const activeContent = items[activeIndex]?.props.children;

  return (
    <CardTabsRoot>
      <CardTabsHeader>
        {items.map((item, index) => (
          <CardTabsTab
            key={item.props.label}
            data-selected={index === activeIndex}
            onClick={() => setActiveIndex(index)}
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
