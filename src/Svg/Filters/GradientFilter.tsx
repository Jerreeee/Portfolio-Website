export interface GradientFilterSettings {
  type: 'gradient';
  id: string;
  from: string;
  to: string;
  angle?: number;
}

export function GradientFilter({
  id,
  from,
  to,
  angle = 135,
}: GradientFilterSettings) {
  // Convert angle to x1,y1 → x2,y2 for SVG linearGradient
  const rad = ((angle - 90) * Math.PI) / 180;
  const x1 = 0.5 - 0.5 * Math.cos(rad);
  const y1 = 0.5 - 0.5 * Math.sin(rad);
  const x2 = 0.5 + 0.5 * Math.cos(rad);
  const y2 = 0.5 + 0.5 * Math.sin(rad);

  const gradId = `${id}-grad`;

  return (
    <>
      <linearGradient id={gradId} x1={x1} y1={y1} x2={x2} y2={y2}>
        <stop offset="0%" stopColor={from} />
        <stop offset="100%" stopColor={to} />
      </linearGradient>
      <filter id={id} x="-15%" y="-15%" width="130%" height="130%">
        {/* Create a rect filled with the gradient */}
        <feImage
          href={`data:image/svg+xml,${encodeURIComponent(
            `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">` +
            `<defs><linearGradient id="g" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}">` +
            `<stop offset="0%" stop-color="${from}"/>` +
            `<stop offset="100%" stop-color="${to}"/>` +
            `</linearGradient></defs>` +
            `<rect width="100%" height="100%" fill="url(#g)"/>` +
            `</svg>`,
          )}`}
          preserveAspectRatio="none"
          result="gradientImage"
        />
        {/* Use the source alpha as a mask for the gradient */}
        <feComposite in="gradientImage" in2="SourceAlpha" operator="in" result="coloredResult" />
      </filter>
    </>
  );
}
