import type { CardTheme } from '@/Components/ProjectCard';

type ColorSet = {
    foreground: string;
    background: string;
} & Record<string, string>;

type ComponentThemes = {
    Card: CardTheme;
};

export type BaseTheme = {
  name: string;
  colors: ColorSet;
  invertIconColor: boolean;
  components: ComponentThemes;
};
