// Convert a hex color to grayscale
export function toGrayScale(hex: string): string {
  // Parse r,g,b
  const m = hex.match(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i);
  if (!m) return hex; // fallback: keep as-is

  const r = parseInt(m[1], 16);
  const g = parseInt(m[2], 16);
  const b = parseInt(m[3], 16);

  const avg = Math.round((r + g + b) / 3);
  const gray = `#${avg.toString(16).padStart(2, "0").repeat(3)}`;
  return gray;
}

// Blend a base color with a tint
// strength: 0 = keep base, 1 = full tint
export function applyTint(hex: string, tint: string, strength: number = 0.5): string {
  const hexToRgb = (h: string) => {
    const m = h.match(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i);
    return m ? [parseInt(m[1], 16), parseInt(m[2], 16), parseInt(m[3], 16)] : null;
  };

  const rgbToHex = (r: number, g: number, b: number) =>
    "#" +
    [r, g, b].map((x) =>
      Math.max(0, Math.min(255, Math.round(x))).toString(16).padStart(2, "0")
    ).join("");

  const base = hexToRgb(hex);
  const t = hexToRgb(tint);
  if (!base || !t) return hex;

  // Linear interpolation: base*(1-strength) + tint*strength
  return rgbToHex(
    base[0] * (1 - strength) + t[0] * strength,
    base[1] * (1 - strength) + t[1] * strength,
    base[2] * (1 - strength) + t[2] * strength
  );
}
