export type StyleProps = {
    className?: string;
    style?: React.CSSProperties;
}

export function mergeStyleProps(theme?: StyleProps, override?: StyleProps): StyleProps {
  return {
    className: [theme?.className, override?.className].filter(Boolean).join(' '),
    style: {
      ...(theme?.style ?? {}),
      ...(override?.style ?? {}),
    },
  };
}
