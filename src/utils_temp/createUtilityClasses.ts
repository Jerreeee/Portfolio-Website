export function createUtilityClasses<
  Name extends string,
  Slots extends readonly string[]
>(componentName: Name, slots: Slots) {
  type ClassKey = Slots[number];
  type Classes = Record<ClassKey, string>;

  function getUtilityClass(slot: ClassKey): string {
    return `${componentName}-${slot}`;
  }

  const classes: Classes = Object.fromEntries(
    slots.map(slot => [slot, getUtilityClass(slot)])
  ) as Classes;

  return { slots, getUtilityClass, classes };
}
