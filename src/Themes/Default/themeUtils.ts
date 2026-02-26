/**
 * Returns a three-stop linear gradient factory.
 * All theme variations use the same primary → mid → secondary structure,
 * so this shared helper eliminates the repeated inline template literal.
 *
 * Usage:
 *   const grad = threeStopGrad(P, MID, S);
 *   gradients: { primary: grad, h1: grad, ... }
 */
export const threeStopGrad =
  (p: string, mid: string, s: string) =>
  (dir = '135deg') =>
    `linear-gradient(${dir}, ${p} 0%, ${mid} 50%, ${s} 100%)`;
