//mui
import type { Theme } from '@mui/material/styles';

/**
 * Returns a three-stop linear gradient factory.
 * All theme variations use the same primary → mid → secondary structure,
 * so this shared helper eliminates the repeated inline template literal.
 *
 * Usage:
 *   const grad = threeStopGrad(P, MID, S);
 *   gradients: { primary: grad, ... }
 */
export const threeStopGrad =
  (p: string, mid: string, s: string) =>
  (dir = '135deg') =>
    `linear-gradient(${dir}, ${p} 0%, ${mid} 50%, ${s} 100%)`;

/**
 * Gradient text styles for an h1-sized heading.
 * Use alongside variant="h1": the variant supplies sizing, this supplies the gradient.
 *
 * Usage:
 *   <Typography variant="h1" sx={(theme) => gradientH1Styles(theme)}>
 */
export function gradientH1Styles(theme: Theme) {
  return {
    background: theme.palette.gradients.primary(),
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    display: 'inline-block',
  };
}
