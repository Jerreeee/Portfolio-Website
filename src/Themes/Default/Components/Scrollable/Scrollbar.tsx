import { useState, CSSProperties } from "react";
import { ScrollBarCmp } from "../ScrollBar";
import { useScrollableContext } from "./Context";

interface ScrollbarProps {
  id: string;
  direction: "horizontal" | "vertical";
  style?: React.CSSProperties;
}

function Scrollbar({ id, direction, style }: ScrollbarProps) {
  const ctx = useScrollableContext();
  const [ratio, setRatio] = useState(0);

  const handleChange = (r: number) => {
    setRatio(r);
    ctx.updateScroll(id, direction, r);
  };

  const containers = ctx.getContainers(id).map((el) => ({ current: el }));

  // Explicitly type the default style
  const defaultStyle: CSSProperties =
    direction === "vertical"
      ? { display: "flex", flexDirection: "column", height: "100%" }
      : { display: "flex", flexDirection: "row", width: "100%" };

  return (
    <div style={{ ...defaultStyle, ...style }}>
      <ScrollBarCmp
        scrollContainer={containers}
        direction={direction}
        value={ratio}
        onChange={handleChange}
      />
    </div>
  );
}

// Optional shorthand wrappers
export const VerticalScrollbar = (props: Omit<ScrollbarProps, "direction">) => (
  <Scrollbar {...props} direction="vertical" />
);

export const HorizontalScrollbar = (props: Omit<ScrollbarProps, "direction">) => (
  <Scrollbar {...props} direction="horizontal" />
);

(VerticalScrollbar as any).__scrollableRole = 'vertical';
(HorizontalScrollbar as any).__scrollableRole = 'horizontal';
