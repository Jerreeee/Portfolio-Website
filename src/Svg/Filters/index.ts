import type { Theme } from '@mui/material/styles';
import type { OutlineFilterSettings } from './OutlineFilter';
import type { InnerGlowFilterSettings } from './InnerGlowFilter';
import type { CombinedFilterSettings } from './CombinedFilter';
import type { OuterGlowFilterSettings } from './OuterGlowFilter';
import type { GradientFilterSettings } from './GradientFilter';

export type { OutlineFilterSettings } from './OutlineFilter';
export type { InnerGlowFilterSettings } from './InnerGlowFilter';
export type { CombinedFilterSettings } from './CombinedFilter';
export type { OuterGlowFilterSettings } from './OuterGlowFilter';
export type { GradientFilterSettings } from './GradientFilter';
export { OutlineFilter } from './OutlineFilter';
export { InnerGlowFilter } from './InnerGlowFilter';
export { CombinedFilter } from './CombinedFilter';
export { OuterGlowFilter } from './OuterGlowFilter';
export { GradientFilter } from './GradientFilter';
export { SvgFilterDefs } from './SvgFilterDefs';

export type SvgFilterDef =
  | OutlineFilterSettings
  | InnerGlowFilterSettings
  | CombinedFilterSettings
  | OuterGlowFilterSettings
  | GradientFilterSettings;

/** A filter entry — either a resolved spec or a factory that receives the live theme. */
export type SvgFilterEntry = SvgFilterDef | ((theme: Theme) => SvgFilterDef);
