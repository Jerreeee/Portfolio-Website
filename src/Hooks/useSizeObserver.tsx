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

  /** NEW — choose whether we measure the element itself or its parent */
  measure?: 'self' | 'parent';
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
  const {
    aspectRatio,
    maxWidth,
    maxHeight,
    mode = 'both',

    measure = 'self', // NEW default
  } = props;

  const ref = useRef<T | null>(null);
  const [size, setSize] = useState<Size>();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // NEW — decide what we measure
    const target = measure === 'parent' ? (el.parentElement as HTMLElement | null) : el;

    if (!target) return;

    const measureSize = () => {
      const rect = target.getBoundingClientRect(); // may now be parent or self
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

    measureSize();
    const observer = new ResizeObserver(measureSize);
    observer.observe(target); // observe the correct element
    window.addEventListener('resize', measureSize);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', measureSize);
    };
  }, [aspectRatio, maxWidth, maxHeight, mode, measure]);

  return { ref, size };
}
