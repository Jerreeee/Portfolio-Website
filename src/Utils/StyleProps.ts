  export type StyleProps = {
      className?: string;
      style?: React.CSSProperties;
  }

export type StyleOverride = StyleProps & {
  mode?: 'merge' | 'replace' | 'none';
};

export function mergeStyleProps(theme?: StyleProps, override?: StyleProps): StyleProps {
  return {
    className: [theme?.className, override?.className].filter(Boolean).join(' '),
    style: {
      ...(theme?.style ?? {}),
      ...(override?.style ?? {}),
    },
  };
}

export function selectStyleProps(baseClass: string, styleOverride?: StyleProps): StyleProps {
  return {
    className: styleOverride ? styleOverride.className ?? '' : baseClass,
    style: styleOverride ? styleOverride.style : undefined,
  };
}

export function bem(block: string, element?: string, modifiers: string[] = []): string {
  const base = element ? `${block}__${element}` : block;
  const mods = modifiers.map((m) => `${base}--${m}`);
  return [base, ...mods].join(' ');
}

export function buildClass(baseClass: string, override?: StyleOverride): string {
  if (!override) return baseClass;

  switch (override.mode) {
    case 'replace':
      return override.className ?? '';
    case 'none':
      return '';
    case 'merge':
    default:
      return [baseClass, override.className].filter(Boolean).join(' ');
  }
}

export const buildStyle = (override?: StyleOverride): React.CSSProperties | undefined =>
  override?.style;

export function withBemBase(
  baseClass: string,
  override?: StyleOverride,
  defaultUtilityClasses = ''
): StyleOverride {
  // combine BEM base with optional utility classes
  const combinedBase = [baseClass, defaultUtilityClasses]
    .filter(Boolean)
    .join(' ');
  if (!override) return { className: combinedBase };
  return {
    ...override,
    className: buildClass(combinedBase, override),
  };
}
