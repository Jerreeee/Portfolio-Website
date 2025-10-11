// makeSlot.ts
import React from 'react';
import { MuiStyledOptions, MUIStyledCommonProps } from '@mui/system';
import type { StyledOptions as EmotionStyledOptions } from '@mui/styled-engine';
import {
  styled,
  useTheme,
  SxProps,
  Theme,
} from '@mui/material/styles';
import type { CSSInterpolation } from '@mui/styled-engine';
import clsx from 'clsx';

/**
 * A refined version of MuiStyledOptions that prevents overriding `name` and `slot`.
 */
export interface StyledOptions
  extends Omit<MuiStyledOptions, 'name' | 'slot'>,
    Pick<EmotionStyledOptions, 'shouldForwardProp' | 'label'> {}

/**
 * Extracts props from a style function.
 */
type ExtractStyleProps<T> = T extends (props: infer P) => any ? P : unknown;

/**
 * MUI-accurate typing for a style argument.
 * Supports both plain style objects and prop-based style functions.
 */
type StyleArg<P = {}> =
  | CSSInterpolation
  | ((props: P & { theme: Theme }) => CSSInterpolation);

/**
 * Creates a single styled slot component.
 */
export function makeSlot<
  ElementType extends keyof React.JSX.IntrinsicElements | React.JSXElementConstructor<any>,
  SlotName extends string,
  ComponentName extends string
>(
  componentName: ComponentName,
  cmpClasses: { classes: Record<string, string> },
  element: ElementType,
  slot: SlotName,
  styledOptions?: StyledOptions
) {
  const muiStyledOptions: MuiStyledOptions = {
    ...styledOptions,
    name: componentName,
    slot: slot.charAt(0).toUpperCase() + slot.slice(1),
  };

  // ============= Create base styled component ===========
  const StyledComponent =
    typeof element === 'string'
      ? styled(element, muiStyledOptions)
      : styled(element as React.JSXElementConstructor<any>, muiStyledOptions);

  return function <
    P = unknown,
    StyleArgs extends StyleArg<P>[] = StyleArg<P>[]
  >(...styleArgs: StyleArgs) {
    // Add `& P` because props like `active` can’t be inferred correctly
    // eventhough we use `StyleArg<P>` above,
    // if the style function doesn’t explicitly type its params.
    // e.g. ({ theme, active }) => (...) makes `active: any` instead of
    //      ({ theme, active }: {theme: Theme: active: boolean}) => (...)
    // but `<ThumbButton active />` should still accept `active?: boolean`.
    type StyleProps = Omit<ExtractStyleProps<StyleArgs[number]>, 'theme'> & P;

    const Base = StyledComponent(...(styleArgs as any)) as React.ElementType;

    type CombinedProps = React.ComponentPropsWithRef<ElementType> &
      StyleProps & MUIStyledCommonProps<Theme> & {
        component?: React.ElementType;
        variant?: string;
        children?: React.ReactNode;
      };

    // ============= Wrapped slot component ==============
    const Wrapped = React.forwardRef<unknown, CombinedProps>((props, ref) => {
      const {
        className,
        as: asProp,
        component: componentProp,
        sx,
        ...rest
      } = props as any;

      const theme = useTheme();
      const anim =
        (theme.components as any)?.[componentName]?.slotAnimations ?? {};
      const slotAnim = anim[slot] ?? {};

      const combinedClassName = clsx(cmpClasses.classes[slot], className);
      const RenderComponent = componentProp || asProp || Base;

      const safeProps = {
        ref,
        className: combinedClassName,
        sx,
        ...slotAnim,
        ...rest,
      };

      return React.createElement(RenderComponent, safeProps);
    });

    Wrapped.displayName = `${componentName}${slot
      .charAt(0)
      .toUpperCase()}${slot.slice(1)}`;

    return Wrapped;
  };
}
