'use client';

import CPlusPlusIcon from './cplusplus.svg';
import UnityIcon from './unity.svg';
import UnrealIcon from './unreal.svg';
import VsCodeIcon from './vscode.svg';
import HoudiniIcon from './houdini.svg';

export const icons = {
  'C++': { component: CPlusPlusIcon, isGrayScale: false },
  Unity: { component: UnityIcon, isGrayScale: true },
  Unreal: { component: UnrealIcon, isGrayScale: true },
  VSCode: { component: VsCodeIcon, isGrayScale: false },
  Houdini: { component: HoudiniIcon, isGrayScale: false },
};
