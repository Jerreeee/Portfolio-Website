export interface InnerGlowFilterSettings {
  type: 'innerGlow';
  id: string;
  color: string;
  opacity?: number;
  strength?: number;
  blendMode?: 'screen' | 'multiply';
}

export function InnerGlowFilter({
  id,
  color,
  opacity = 1,
  strength = 5,
  blendMode = 'screen',
}: InnerGlowFilterSettings) {
  return (
    <filter id={id} x="-5%" y="-5%" width="110%" height="110%">
      <feFlood floodColor="#000000" result="black" />
      <feComposite in="black" in2="SourceAlpha" operator="out" result="invertedAlpha" />
      <feGaussianBlur in="invertedAlpha" stdDeviation={strength} result="blurredEdges" />
      <feFlood floodColor={color} floodOpacity={opacity} result="glowColor" />
      <feComposite in="glowColor" in2="blurredEdges" operator="in" result="coloredGlow" />
      <feComposite in="coloredGlow" in2="SourceAlpha" operator="in" result="innerGlow" />
      <feBlend in="SourceGraphic" in2="innerGlow" mode={blendMode} />
    </filter>
  );
}
