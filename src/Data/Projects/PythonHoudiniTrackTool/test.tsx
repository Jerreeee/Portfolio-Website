import React, { useMemo } from 'react';
import { useSizeObserver } from '@/Hooks/useSizeObserver';

export type SmartImageMode = 'downscale' | 'upscale';

export interface SmartImageProps {
  src: string;
  naturalWidth: number;
  naturalHeight: number;
  mode?: SmartImageMode;
  alt?: string;
}

export const SmartImage: React.FC<SmartImageProps> = ({
  src,
  naturalWidth,
  naturalHeight,
  mode = 'downscale',
  alt = '',
}) => {
  // IMPORTANT:
  // useSizeObserver MUST now be using measure: 'parent'
  const { ref, size } = useSizeObserver<HTMLDivElement>({
    mode: 'both',
    measure: 'parent',
  });

  const scale = useMemo(() => {
    if (!size) return 1;

    const { width: w, height: h } = size;

    const hasW = w > 0 && !isNaN(w);
    const hasH = h > 0 && !isNaN(h);

    let s = 1;

    if (hasW && hasH) {
      s = Math.min(w / naturalWidth, h / naturalHeight);
    } else if (hasH) {
      s = h / naturalHeight;
    } else if (hasW) {
      s = w / naturalWidth;
    }

    if (mode === 'downscale') s = Math.min(s, 1);

    return s;
  }, [size, naturalWidth, naturalHeight, mode]);

  const scaledW = naturalWidth * scale;
  const scaledH = naturalHeight * scale;

  // ---- ALWAYS PRINT EVERYTHING ----
  console.groupCollapsed(`SmartImage: ${src}`);

  console.log('Natural Size:', {
    naturalWidth,
    naturalHeight,
  });

  console.log('Wrapper Size (parent constraints):', {
    width: size?.width,
    height: size?.height,
  });

  console.log('Scale:', scale);

  console.log('Scaled Size:', {
    scaledW,
    scaledH,
  });

  console.groupEnd();
  // ---------------------------------

  if (!size) {
    return <div ref={ref} />;
  }

  return (
    <div
      ref={ref}
      style={{
        border: '2px solid yellow',
        width: scaledW,
        height: scaledH,
      }}
    >
      <img
        src={src}
        alt={alt}
        style={{
          width: '100%',
          height: '100%',
          display: 'block',
          border: '2px solid green',
        }}
      />
    </div>
  );
};
