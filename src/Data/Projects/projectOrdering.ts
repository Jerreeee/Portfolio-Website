import type { ValidProjectSlug } from "@/Data/Projects";

//Use online NanoID generator (16 chars)
//https://nanoid.yuuniworks.com/
//include numbers, lower and upper cases, symbols
//exlucde look-alikes

export const projectOrderings: Record<string, ValidProjectSlug[]> = {
  "8UPRpbt882EkMBRV": [ // Pixel-Nexus
    "MayaReferencePlaneSetup",
    'PythonHoudiniTrackTool',
    'LuaCPPSnake',
  ],
  "3GweQp8wkPX3VaA3": [ // sidefx
    "PythonHoudiniTrackTool",
    "VulkanDeferredRenderer",
    "DualRasterizer",
  ]
};
