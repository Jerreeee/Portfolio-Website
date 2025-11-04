import { ReactNode } from "react";

export interface ItemProps {
  label: string;
  children?: ReactNode;
};

export function Item({ children }: ItemProps) {
  return <>{children}</>;
};