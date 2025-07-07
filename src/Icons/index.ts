'use client';

import CPlusPlusIcon from './cplusplus.svg';
import UnityIcon from './unity.svg';
import UnrealIcon from './unreal.svg';
import VsCodeIcon from './vscode.svg';
import HoudiniIcon from './houdini.svg';

interface IconData {
  rawSvg: string;
  isGrayScale: boolean;
}

export const icons = {
  'C++': { rawSvg: CPlusPlusIcon, isGrayScale: false } as IconData,
  Unity: { rawSvg: UnityIcon, isGrayScale: true } as IconData,
  Unreal: { rawSvg: UnrealIcon, isGrayScale: true } as IconData,
  VSCode: { rawSvg: VsCodeIcon, isGrayScale: false } as IconData,
  Houdini: { rawSvg: HoudiniIcon, isGrayScale: false } as IconData,

