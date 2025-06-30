export function WithCSSVars(vars: Record<`--${string}`, string>): React.CSSProperties & Record<`--${string}`, string> {
    return vars;
  }