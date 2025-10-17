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
  // Convert to browser-usable URL path
  url: () => makePath("/" + value
    .replace(/^\/?public\//, "") //remove leading public
    .replace(/^\/?src\/app\//, "") //remove leading src/app
    .replace(/^\/?src\//, "") //remove extra leading src
    .replace(/^\/+/, "") // remove extra leading slashes
  ),
  import: () => makePath("@/" + value.replace(/^src\//, "")),
  append: (segment: string) => {
    const separator = value.endsWith("/") ? "" : "/";
    return makePath(value + separator + segment);
  },
});

const BASE = {
  SRC_DATA: "src/Data",
  SRC_PAGE: 'src/app',
  SRC_PROJECT_PAGE: 'src/app/projects',
  SRC_PROJECTS: "src/Data/Projects",
  PUBLIC_PROJECTS: "public/projects",
  SRC_THEMES: "src/Themes",
  TYPES: "src/Types",
  SRC_ICONS: 'src/Data/Icons',
  PUBLIC_ICONS: 'public/Icons',
} as const;

const BASE_PATHS = Object.fromEntries(
  Object.entries(BASE).map(([key, value]) => [key, () => makePath(value)])
) as {
  [K in keyof typeof BASE]: () => PathObject;
};

const PATHS = {
  ...BASE_PATHS,

  PAGE: ({ page}: { page: string }) =>
    makePath(`${BASE.SRC_PAGE}/${page}/`),

  PROJECT_PAGE: ({ slug }: { slug: string }) =>
      makePath(`${BASE.SRC_PROJECT_PAGE}/${slug}/`),

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

export default PATHS;

