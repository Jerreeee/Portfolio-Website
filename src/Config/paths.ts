import { ThemeName } from "@/Themes";

const BASE = {
  SRC_DATA: '/src/Data',
  SRC_PROJECTS: '/src/Data/Projects',
  PUBLIC_PROJECTS: '/public/Projects',
  SRC_THEMES: '/src/Themes',
  TYPES: '/src/Types',
};

type BasePaths = {
  [K in keyof typeof BASE]: () => string;
};

const BASE_PATHS = Object.fromEntries(
  Object.entries(BASE).map(([key, value]) => [key, () => value])
) as BasePaths;

const EXTRA_PATHS = {
    PROJECT_DATA: ({ projectName }: { projectName: string }) =>
    `${BASE.SRC_PROJECTS}/${projectName}/data`,
    PROJECT_MANIFEST: ({ projectName }: { projectName: string }) =>
    `${BASE.SRC_PROJECTS}/${projectName}/manifest`,
    PROJECT_COMPONENT: ({ projectName }: { projectName: string }) =>
    `${BASE.SRC_PROJECTS}/${projectName}/ProjectCmp`,
    PROJECT_IMAGE: ({ projectName, fileName }: { projectName: string; fileName?: string }) =>
    `/Projects/${projectName}/Images${fileName ? `/${fileName}` : ''}`,
    PROJECT_CODE: ({ projectName, fileName }: { projectName: string; fileName?: string }) =>
    `/Projects/${projectName}/Code${fileName ? `/${fileName}` : ''}`,
    COMPONENTS: (theme: ThemeName = "Default" as ThemeName) =>
    `${BASE.SRC_THEMES}/${theme}/Components`,
    COMPONENT_ANIMATIONS: () => `${BASE.TYPES}/componentAnimations.d.ts`,
    COMPONENT_SETTINGS: () => `${BASE.TYPES}/componentSettings.d.ts`,
    MUI_THEME_AUGMENTATION: () => `${BASE.TYPES}/Overrides/mui-theme-augmentation.d.ts`,
} as const;

const PATHS: BasePaths & typeof EXTRA_PATHS = {
  ...BASE_PATHS,
  ...EXTRA_PATHS,
};

export default PATHS;
