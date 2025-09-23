// import type { ComponentType } from 'react';

// export type Component<S, P = {}> =
//   ComponentType<P> & { __settingsType?: S };

import type { FunctionComponent } from 'react';

export type Component<S, P = {}> =
  FunctionComponent<P> & { __settingsType?: S };

export type ComponentDefinition<C> =
  C extends Component<infer S, infer P>
    ? { cmp: C; settings: S }
    : never;

export type BaseTheme<C extends Record<string, Component<any, any>>> = {
  name: string;
  components: {
    [K in keyof C]: ComponentDefinition<C[K]>;
  };
};
