import React from 'react';
import { icons } from '@/Themes/Default/Icons';

export interface IconProps {
  techName: string;

  className?: string;
  iconClassName?: string;
  textClassName?: string;
  showName?: boolean;

  forceTechIconColor?: boolean;
  techIconColorClass?: string;
  techIconHoverColorClass?: string;
}

function logElementTypesAndProps(element: React.ReactNode, depth = 0): void {
  if (!React.isValidElement(element)) return;

  const el = element as React.ReactElement<{ children?: React.ReactNode; [key: string]: any }>;
  const { type, props } = el;
  const indent = ' '.repeat(depth * 2);

  // Get type name (string for HTML tags or function/class name for components)
  const typeName =
    typeof type === 'string'
      ? type
      : (type && ((type as any).displayName || (type as any).name)) || 'Unknown';

  // List prop names (keys)
  const propNames = Object.keys(props).filter((key) => key !== 'children');

  console.log(`${indent}<${typeName}> props: [${propNames.join(', ')}]`);

  // Recursively process children
  if (props.children) {
    React.Children.forEach(props.children, (child) => {
      logElementTypesAndProps(child, depth + 1);
    });
  }
}

export function IconCmp({
  techName,
  className,
  iconClassName,
  textClassName,
  showName = false,
  forceTechIconColor = false,
  techIconColorClass = '',
  techIconHoverColorClass = '',
}: IconProps) {
  const iconData = icons[techName as keyof typeof icons];

  if (!iconData) {
    return <span className={className}>{techName}</span>;
  }

  const { component: IconComponent, isGrayScale } = iconData;

  const applyColor = forceTechIconColor || isGrayScale;

  const combinedIconClassName = [
    'w-full h-full',
    applyColor ? techIconColorClass : '',
    applyColor ? techIconHoverColorClass : '',
    iconClassName ?? '',
  ]
    .filter(Boolean)
    .join(' ');

    const iconElement = <icons.Unity.component />;
    React.useEffect(() => {
      console.log('IconCmp mounted, logging fills...');
      // findAllFills(iconElement);
      logElementTypesAndProps(iconElement);
    }, []);

  return (
    <span className={className ?? 'inline-flex items-center space-x-2'}>
      <span className={combinedIconClassName}>
        <IconComponent />
      </span>
      {showName && (
        <span className={textClassName ?? ''}>{techName}</span>
      )}
    </span>
  );
}

