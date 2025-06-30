export function TypeAsCSSVars(vars: Record<`--${string}`, string>): React.CSSProperties & Record<`--${string}`, string> {
    return vars;
  }

  /**
 * Converts a theme object into CSS custom properties (CSS vars),
 * using the object's own keys as `--key`, and ignores boolean values.
 */
export function WithThemeCSSVars<T extends Record<string, string | number | boolean>>(theme: T) {
    const cssVars: Record<string, string> = {};
  
    for (const key in theme) {
      const value = theme[key];
  
      if (typeof value === 'boolean') {
        continue; // Skip booleans
      }
  
      cssVars[`--${key}`] = String(value);
    }
  
    return TypeAsCSSVars(cssVars);
  }