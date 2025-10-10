// makeSlotFactory.ts
import {
  styled,
  useTheme,
  SxProps,
  Theme,
} from '@mui/material/styles';
import React from 'react';
import clsx from 'clsx';

type StyledOptionsLoose = {
  shouldForwardProp?: (prop: PropertyKey) => boolean;
  label?: string;
  overridesResolver?: (props: any, styles: Record<string, any>) => any;

  /** ✅ Optional fine-grained filtering */
  forward?: string[]; // props to always forward
  block?: string[];   // props to always block

  [key: string]: any; // allow 'name', 'slot', etc.
};

type ExtractStyleProps<T> = T extends (props: infer P) => any ? P : unknown;

export function makeSlotFactory<
  CmpName extends string,
  Classes extends { classes: Record<string, string> }
>(componentName: CmpName, cmpClasses: Classes) {
  return function makeSlot<
    ElementType extends keyof React.JSX.IntrinsicElements | React.JSXElementConstructor<any>,
    SlotName extends keyof Classes['classes'] & string
  >(
    element: ElementType,
    slot: SlotName,
    styledOptions?: StyledOptionsLoose
  ) {
    const baseOptions: StyledOptionsLoose = {
      name: componentName,
      slot: slot.charAt(0).toUpperCase() + slot.slice(1),
      ...styledOptions,
    };

    const StyledComponent =
      typeof element === 'string'
        ? styled(element, baseOptions)
        : styled(element as React.JSXElementConstructor<any>, baseOptions);

    type StyleArg =
      | Record<string, any>
      | ((props: { theme: Theme } & any) => Record<string, any>);

    return function <
      P = unknown,
      StyleArgs extends StyleArg[] = StyleArg[]
    >(...styleArgs: StyleArgs) {
      type InferredFromStyles = ExtractStyleProps<StyleArgs[number]>;
      type CombinedExtraProps = InferredFromStyles & P;

      // collect all inferred keys
      const customKeys = new Set(Object.keys({} as CombinedExtraProps));

      const { forward = [], block = [] } = baseOptions;

      // 🔧 Auto filtering logic (only for DOM tags)
      const autoShouldForwardProp =
        baseOptions.shouldForwardProp ??
        ((prop: PropertyKey) => {
          if (typeof element !== 'string') return true; // custom/motion cmp → forward all

          const key = String(prop);
          if (forward.includes(key)) return true;
          if (block.includes(key)) return false;

          // automatically block inferred props that aren't whitelisted
          return !customKeys.has(key);
        });

      const StyledWithFilter =
        typeof element === 'string'
          ? styled(element, { ...baseOptions, shouldForwardProp: autoShouldForwardProp })
          : StyledComponent;

      const Base = StyledWithFilter(...(styleArgs as any)) as React.ElementType;

      type CombinedProps = React.ComponentPropsWithRef<ElementType> &
        CombinedExtraProps &
        React.PropsWithChildren<{
          className?: string;
          sx?: SxProps<Theme>;
          as?: React.ElementType;
          component?: React.ElementType;
          ownerState?: Record<string, any>;
        }>;

      const Wrapped = React.forwardRef<unknown, CombinedProps>((props, ref) => {
        const {
          className,
          as: asProp,
          component: componentProp,
          sx,
          ownerState,
          ...rest
        } = props as any;

        const theme = useTheme();
        const anim =
          (theme.components as any)?.[componentName]?.slotAnimations ?? {};
        const slotAnim = anim[slot] ?? {};
        const combinedClassName = clsx(cmpClasses.classes[slot], className);

        const RenderComponent = componentProp || asProp || Base;

        return React.createElement(RenderComponent, {
          ref,
          className: combinedClassName,
          sx,
          ownerState: ownerState ?? props,
          ...slotAnim,
          ...rest,
        });
      });

      Wrapped.displayName = `${componentName}${slot
        .charAt(0)
        .toUpperCase()}${slot.slice(1)}`;
      return Wrapped;
    };
  };
}
