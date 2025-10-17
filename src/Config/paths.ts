import path from "path";
import { ThemeName } from "@/Themes";

export type PathObject = {
  value: string;
  fs: () => PathObject;
  url: () => PathObject;
  import: () => PathObject;
  append: (segment: string) => PathObject;
};

const makePath = (value: string): PathObject => ({
  value,
  fs: () => makePath(path.join(process.cwd(), value.replace(/^\//, ""))),
  url: () => makePath("/" + value.replace(/^public\//, "").replace(/^src\//, "")),
  import: () => makePath("@/" + value.replace(/^src\//, "")),
  append: (segment: string) => {
    const separator = value.endsWith("/") ? "" : "/";
    return makePath(value + separator + segment);
  },
});

const BASE = {
  SRC_DATA: "src/Data",
  SRC_PROJECTS: "src/Data/Projects",
  PUBLIC_PROJECTS: "public/projects",
  SRC_THEMES: "src/Themes",
  TYPES: "src/Types",
} as const;

const BASE_PATHS = Object.fromEntries(
  Object.entries(BASE).map(([key, value]) => [key, () => makePath(value)])
) as {
  [K in keyof typeof BASE]: () => PathObject;
};

// const PATHS = {
//     ...BASE_PATHS,
//     // APP_LINK: ({ path }: { path: string }) => `/${path}.html`,
//     // APP_PROJECT_PAGE: ({ slug }: { slug: string }) =>
//     //   `${BASE.PUBLIC_PROJECTS_REL}/${slug}.html`,
//     PROJECT_DATA: ({ projectName }: { projectName: string }) =>
//     `${BASE.SRC_PROJECTS}/${projectName}/data`,
//     PROJECT_MANIFEST: ({ projectName }: { projectName: string }) =>
//     `${BASE.SRC_PROJECTS}/${projectName}/manifest`,
//     PROJECT_COMPONENT: ({ projectName }: { projectName: string }) =>
//     `${BASE.SRC_PROJECTS}/${projectName}/ProjectCmp`,
//     PROJECT_IMAGE: ({ projectName, fileName }: { projectName: string; fileName?: string }) =>
//     `${BASE.PUBLIC_PROJECTS}/${projectName}/Images${fileName ? `/${fileName}` : ''}`,
//     PROJECT_CODE: ({ projectName, fileName }: { projectName: string; fileName?: string }) =>
//     `${BASE.PUBLIC_PROJECTS}/${projectName}/Code${fileName ? `/${fileName}` : ''}`,
//     COMPONENTS: (theme: ThemeName = "Default" as ThemeName) =>
//     `${BASE.SRC_THEMES}/${theme}/Components`,
//     COMPONENT_ANIMATIONS: () => `${BASE.TYPES}/componentAnimations.d.ts`,
//     COMPONENT_SETTINGS: () => `${BASE.TYPES}/componentSettings.d.ts`,
//     MUI_THEME_AUGMENTATION: () => `${BASE.TYPES}/Overrides/mui-theme-augmentation.d.ts`,
// } as const;

const PATHS = {
  ...BASE_PATHS,

  PROJECT_DATA: ({ projectName }: { projectName: string }) =>
    makePath(`${BASE.SRC_PROJECTS}/${projectName}/data`),

  PROJECT_MANIFEST: ({ projectName }: { projectName: string }) =>
    makePath(`${BASE.SRC_PROJECTS}/${projectName}/manifest`),

  PROJECT_COMPONENT: ({ projectName }: { projectName: string }) =>
    makePath(`${BASE.SRC_PROJECTS}/${projectName}/ProjectCmp`),

  PROJECT_IMAGE: ({ projectName, fileName }: { projectName: string; fileName?: string }) =>
    makePath(`${BASE.PUBLIC_PROJECTS}/${projectName}/Images${fileName ? `/${fileName}` : ""}`),

  PROJECT_CODE: ({ projectName, fileName }: { projectName: string; fileName?: string }) =>
    makePath(`${BASE.PUBLIC_PROJECTS}/${projectName}/Code${fileName ? `/${fileName}` : ""}`),

  COMPONENTS: (theme: ThemeName = "Default" as ThemeName) =>
    makePath(`${BASE.SRC_THEMES}/${theme}/Components`),

  COMPONENT_ANIMATIONS: () =>
    makePath(`${BASE.TYPES}/componentAnimations.d.ts`),

  COMPONENT_SETTINGS: () =>
    makePath(`${BASE.TYPES}/componentSettings.d.ts`),

  MUI_THEME_AUGMENTATION: () =>
    makePath(`${BASE.TYPES}/Overrides/mui-theme-augmentation.d.ts`),
} as const;

// const PATHS: BasePaths & typeof EXTRA_PATHS = {
//   ...BASE_PATHS,
//   ...EXTRA_PATHS,
// };

export default PATHS;

//######################
//Helpers
//######################

// Convert to a filesystem path (for Node scripts)
export const fsPath = (rel: string) => path.join(process.cwd(), rel);

// Convert to an import alias path (for TS/Next)
export const importPath = (rel: string) =>
  `@/${rel.replace(/^\/?src\//, "")}`;

// Convert to a public URL (for browser / HTML)
export const urlPath = (rel: string) => `/${rel.replace(/^public\//, "")}`;

