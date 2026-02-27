export interface OutlineFilterSettings {
  type: 'outline';
  id: string;
  color: string;
  opacity?: number;
  radius?: number;
}

export function OutlineFilter({
  id,
  color,
  opacity = 1,
  radius = 1,
}: OutlineFilterSettings) {
  return (
    <filter id={id} x="-5%" y="-5%" width="110%" height="110%">
      <feMorphology in="SourceAlpha" operator="dilate" radius={radius} result="dilated" />
      <feComposite in="dilated" in2="SourceAlpha" operator="out" result="ring" />
      <feFlood floodColor={color} floodOpacity={opacity} result="ringColor" />
      <feComposite in="ringColor" in2="ring" operator="in" result="coloredRing" />
      <feMerge>
        <feMergeNode in="SourceGraphic" />
        <feMergeNode in="coloredRing" />
      </feMerge>
    </filter>
  );
}
