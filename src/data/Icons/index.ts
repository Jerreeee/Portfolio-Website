'use client';

import ErrorIcon from './error.svg';
import CPlusPlusIcon from './cplusplus.svg';
import UnityIcon from './unity.svg';
import UnrealIcon from './unreal.svg';
import VsCodeIcon from './vscode.svg';
import HoudiniIcon from './houdini.svg';

export const icons = {
  Error: {rawSvg: ErrorIcon, isGrayScale: true },
  'C++': { rawSvg: CPlusPlusIcon, isGrayScale: false },
  Unity: { rawSvg: UnityIcon, isGrayScale: true },
  Unreal: { rawSvg: UnrealIcon, isGrayScale: true },
  VSCode: { rawSvg: VsCodeIcon, isGrayScale: false },
  Houdini: { rawSvg: HoudiniIcon, isGrayScale: false },
} as const;

export type IconKey = keyof typeof icons;
export type IconData = (typeof icons)[IconKey];
