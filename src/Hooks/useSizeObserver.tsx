import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Size } from '@/Types/extra';
import { MultiDirection } from '@/Themes/Default/Components/ScrollBar/ScrollBarCmp';

export interface UserSizeObserverProps {
  /** Optional aspect ratio (width / height) */
  aspectRatio?: number;
  /** Maximum width constraint (overrides aspect ratio if mode allows) */
  maxWidth?: number;
  /** Maximum height constraint (overrides aspect ratio if mode allows) */
  maxHeight?: number;
  /** Which dimension drives scaling or constraints */
  mode?: MultiDirection;
}

/**
 * Tracks the size of the parent element and applies optional constraints:
 * - aspectRatio: maintain width/height ratio
 * - maxWidth / maxHeight: cap the dimensions
 *
 * If mode="width", only height is constrained by maxHeight.
 * If mode="height", only width is constrained by maxWidth.
 * If mode="both", both constraints apply independently.
 */
export function useSizeObserver<T extends HTMLElement>(props: UserSizeObserverProps) {
  const { aspectRatio, maxWidth, maxHeight, mode = 'both' } = props;
  const ref = useRef<T | null>(null);
  const [size, setSize] = useState<Size>();

  useEffect(() => {
    const target = ref.current;
    if (!target) return;

    const measure = () => {
      const target = ref.current;
      if (!target) return;

      const rect = target.getBoundingClientRect(); // ✅ measure itself, not parent
      let { width, height } = rect;

      // Aspect Ratio Logic
      if (aspectRatio && !maxWidth && !maxHeight) {
        if (mode === 'horizontal') height = width / aspectRatio;
        else if (mode === 'vertical') width = height * aspectRatio;
      }

      // Max Dimension Logic (Overrides Aspect Ratio)
      if ((mode === 'horizontal' || mode === 'both') && maxHeight && height > maxHeight) {
        height = maxHeight;
      }

      if ((mode === 'vertical' || mode === 'both') && maxWidth && width > maxWidth) {
        width = maxWidth;
      }

      setSize({ width, height });
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(target); // observe itself
    window.addEventListener('resize', measure);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, [aspectRatio, maxWidth, maxHeight, mode]);

  return { ref, size };
}

