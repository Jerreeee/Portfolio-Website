import type { Theme } from '@mui/material/styles';
import type { OutlineFilterSettings } from './OutlineFilter';
import type { InnerGlowFilterSettings } from './InnerGlowFilter';
import type { CombinedFilterSettings } from './CombinedFilter';

export type { OutlineFilterSettings } from './OutlineFilter';
export type { InnerGlowFilterSettings } from './InnerGlowFilter';
export type { CombinedFilterSettings } from './CombinedFilter';
export { OutlineFilter } from './OutlineFilter';
export { InnerGlowFilter } from './InnerGlowFilter';
export { CombinedFilter } from './CombinedFilter';
export { SvgFilterDefs } from './SvgFilterDefs';

export type SvgFilterDef =
  | OutlineFilterSettings
  | InnerGlowFilterSettings
  | CombinedFilterSettings;

/** A filter entry — either a resolved spec or a factory that receives the live theme. */
export type SvgFilterEntry = SvgFilterDef | ((theme: Theme) => SvgFilterDef);
