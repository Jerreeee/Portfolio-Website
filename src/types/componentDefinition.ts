// mui
import type {
  ComponentsProps,
  ComponentsOverrides,
  ComponentsVariants,
  Theme
} from '@mui/material/styles';

// custom
import type { ComponentsAnimations } from './componentAnimations';
import { ComponentsSettings } from './componentSettings';

/**
 * Generic helper for a theme component definition.
 * Ensures Name is a key of ComponentsProps.
 */
export type ThemedComponent<Name extends keyof ComponentsProps> = {
  defaultProps?: Partial<ComponentsProps[Name]>;
  styleOverrides?: ComponentsOverrides<Theme>[Extract<Name, keyof ComponentsOverrides<Theme>>];
  variants?: ComponentsVariants<Theme>[Extract<Name, keyof ComponentsVariants<Theme>>];
  slotAnimations?: ComponentsAnimations<Theme>[Extract<Name, keyof ComponentsAnimations<Theme>>];
  settings?: ComponentsSettings<Theme>[Extract<Name, keyof ComponentsSettings<Theme>>];
};
