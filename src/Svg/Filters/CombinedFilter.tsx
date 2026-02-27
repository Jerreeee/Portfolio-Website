export interface CombinedFilterSettings {
  type: 'combined';
  id: string;
  glowColor: string;
  glowOpacity?: number;
  glowStrength?: number;
  glowBlendMode?: 'screen' | 'multiply';
  borderColor: string;
  borderOpacity?: number;
  borderRadius?: number;
}

export function CombinedFilter({
  id,
  glowColor,
  glowOpacity = 1,
  glowStrength = 5,
  glowBlendMode = 'screen',
  borderColor,
  borderOpacity = 1,
  borderRadius = 2,
}: CombinedFilterSettings) {
  return (
    <filter id={id} x="-5%" y="-5%" width="110%" height="110%">
      {/* Inner glow */}
      <feFlood floodColor="#000000" result="black" />
      <feComposite in="black" in2="SourceAlpha" operator="out" result="invertedAlpha" />
      <feGaussianBlur in="invertedAlpha" stdDeviation={glowStrength} result="blurredEdges" />
      <feFlood floodColor={glowColor} floodOpacity={glowOpacity} result="glowColor" />
      <feComposite in="glowColor" in2="blurredEdges" operator="in" result="coloredGlow" />
      <feComposite in="coloredGlow" in2="SourceAlpha" operator="in" result="innerGlow" />
      <feBlend in="SourceGraphic" in2="innerGlow" mode={glowBlendMode} result="withGlow" />
      {/* Border */}
      <feMorphology in="SourceAlpha" operator="dilate" radius={borderRadius} result="dilated" />
      <feComposite in="dilated" in2="SourceAlpha" operator="out" result="ring" />
      <feFlood floodColor={borderColor} floodOpacity={borderOpacity} result="ringColor" />
      <feComposite in="ringColor" in2="ring" operator="in" result="coloredRing" />
      <feMerge>
        <feMergeNode in="withGlow" />
        <feMergeNode in="coloredRing" />
      </feMerge>
    </filter>
  );
}
