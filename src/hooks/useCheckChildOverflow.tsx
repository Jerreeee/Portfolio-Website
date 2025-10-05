import { useEffect, useState, RefObject } from 'react';

/**
 * Detects whether an element's content overflows horizontally or vertically.
 *
 * @param containerRef - React ref of the scrollable container
 * @param deps - Additional dependencies to trigger recalculation (optional)
 * @returns { overflowsX, overflowsY }
 */
export function useCheckChildOverflow(
  containerRef: RefObject<HTMLElement | null>,
  deps: React.DependencyList = []
) {
  const [overflowsX, setOverflowsX] = useState(false);
  const [overflowsY, setOverflowsY] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // define inside effect
    const checkOverflow = () => {
      if (!el) return;
      const hasX = el.scrollWidth > el.clientWidth;
      const hasY = el.scrollHeight > el.clientHeight;
      setOverflowsX(hasX);
      setOverflowsY(hasY);
    };

    // Initial check
    checkOverflow();

    // Observe content size changes dynamically
    const content = el.firstElementChild as HTMLElement | null;
    const contentObserver = new ResizeObserver(checkOverflow);
    if (content) contentObserver.observe(content);

    // Observe container size changes
    const containerObserver = new ResizeObserver(checkOverflow);
    containerObserver.observe(el);

    // Also re-check on window resize
    window.addEventListener('resize', checkOverflow);

    return () => {
      contentObserver.disconnect();
      containerObserver.disconnect();
      window.removeEventListener('resize', checkOverflow);
    };
  }, [containerRef, ...deps]);

  return { overflowsX, overflowsY };
}
