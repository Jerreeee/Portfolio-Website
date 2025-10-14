'use client';

import vulkan from './vulkan.svg';
import cplusplus from './cplusplus.svg';
import unity from './unity.svg';
import unreal from './unreal.svg';
import vscode from './vscode.svg';
import houdini from './houdini.svg';
import nvidia from './nvidia.svg';
import renderdoc from './renderdoc.svg';
import errorIcon from './error.svg';

// ================================================================
// ========================= Type Setup ============================

export interface IconData {
  /** For PNGs, JPGs, etc. */
  fileName?: string;
  /** For inline-loaded SVGs */
  rawSvg?: string;
  /** If true, icon is monochrome */
  isGrayScale?: boolean;
}

// ================================================================
// ========================= Icon Mapping ==========================

export const _icons = {
  Error: { rawSvg: errorIcon, isGrayScale: true },
  'C++': { rawSvg: cplusplus },
  Unity: { rawSvg: unity, isGrayScale: true },
  Unreal: { rawSvg: unreal, isGrayScale: true },
  VSCode: { rawSvg: vscode },
  Houdini: { rawSvg: houdini },
  Vulkan: { rawSvg: vulkan },
  NVidia: { rawSvg: nvidia },
  RenderDoc: { rawSvg: renderdoc },
};

export const icons: Record<string, IconData> = _icons;

export type IconKey = keyof typeof _icons;
