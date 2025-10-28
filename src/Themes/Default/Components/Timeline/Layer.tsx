export interface LayerProps {
  /** Optional human-readable name (used in the left column) */
  name?: string;
  /** Optional fixed height for this layer’s visual row */
  height?: number;
  /** Optional nested child layers */
  children?: React.ReactNode;
}

export type LayerCmp = React.ReactElement<LayerProps>;
