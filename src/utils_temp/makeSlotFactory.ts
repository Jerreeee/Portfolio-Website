import { makeSlot } from './makeSlot';
import { StyledOptions } from './makeSlot'

/**
 * Creates a makeSlot() function scoped to a component and its classes.
 */
export function makeSlotFactory<
  CmpName extends string,
  Classes extends { classes: Record<string, string> }
>(componentName: CmpName, cmpClasses: Classes) {
  return function <
    ElementType extends keyof React.JSX.IntrinsicElements | React.JSXElementConstructor<any>,
    SlotName extends keyof Classes['classes'] & string
  >(
    element: ElementType,
    slot: SlotName,
    styledOptions?: StyledOptions
  ) {
    return makeSlot(componentName, cmpClasses, element, slot, styledOptions);
  };
}
