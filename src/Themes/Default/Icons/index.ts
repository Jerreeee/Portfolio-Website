'use client';

import CPlusPlusIcon from './cplusplus.svg';
import UnityIcon from './unity.svg';
import UnrealIcon from './unreal.svg';
import VsCodeIcon from './vscode.svg';
import HoudiniIcon from './houdini.svg';

export const icons = {
  'C++': { svg: CPlusPlusIcon, isGrayScale: false },
  Unity: { svg: UnityIcon, isGrayScale: true },
  Unreal: { svg: UnrealIcon, isGrayScale: true },
  VSCode: { svg: VsCodeIcon, isGrayScale: false },
  Houdini: { svg: HoudiniIcon, isGrayScale: false },
};
