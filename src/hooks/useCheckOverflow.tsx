import { useEffect, useRef, useState } from 'react';

/**
 * Detects whether an element's content overflows horizontally or vertically.
 *
 * Returns both the ref and overflow booleans.
 *
 * @param deps - Additional dependencies to trigger recalculation (optional)
 * @returns { ref, overflowsX, overflowsY }
 */
export function useCheckOverflow<T extends HTMLElement = HTMLElement>(
  deps: React.DependencyList = []
) {
  const ref = useRef<T | null>(null);
  const [overflowsX, setOverflowsX] = useState(false);
  const [overflowsY, setOverflowsY] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const checkOverflow = () => {
      if (!el) return;
      const hasX = el.scrollWidth > el.clientWidth;
      const hasY = el.scrollHeight > el.clientHeight;
      setOverflowsX(hasX);
      setOverflowsY(hasY);
    };

    checkOverflow();

    const content = el.firstElementChild as HTMLElement | null;
    const contentObserver = new ResizeObserver(checkOverflow);
    if (content) contentObserver.observe(content);

    const containerObserver = new ResizeObserver(checkOverflow);
    containerObserver.observe(el);

    window.addEventListener('resize', checkOverflow);
    return () => {
      contentObserver.disconnect();
      containerObserver.disconnect();
      window.removeEventListener('resize', checkOverflow);
    };
  }, deps);

  return { ref, overflowsX, overflowsY };
}
