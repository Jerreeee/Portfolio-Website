export interface OuterGlowFilterSettings {
  type: 'outerGlow';
  id: string;
  color: string;
  opacity?: number;
  strength?: number;
  /** If true, only render the glow — hide the source element. */
  glowOnly?: boolean;
}

export function OuterGlowFilter({
  id,
  color,
  opacity = 0.6,
  strength = 4,
  glowOnly = false,
}: OuterGlowFilterSettings) {
  return (
    <filter id={id} x="-15%" y="-15%" width="130%" height="130%">
      <feMorphology in="SourceAlpha" operator="dilate" radius={3} result="dilated" />
      <feGaussianBlur in="dilated" stdDeviation={strength} result="blurred" />
      <feComposite in="blurred" in2="SourceAlpha" operator="out" result="outerOnly" />
      <feFlood floodColor={color} floodOpacity={opacity} result="glowColor" />
      <feComposite in="glowColor" in2="outerOnly" operator="in" result="coloredGlow" />
      {/* Stack multiple glow layers for intensity */}
      <feMerge>
        <feMergeNode in="coloredGlow" />
        <feMergeNode in="coloredGlow" />
        <feMergeNode in="coloredGlow" />
        {!glowOnly && <feMergeNode in="SourceGraphic" />}
      </feMerge>
    </filter>
  );
}
