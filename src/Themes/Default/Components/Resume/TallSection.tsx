import { ReactNode } from "react";
import {
  TallSectionWrapper,
  TallBar,
  TallContent,
  TallTitle,
  TallDivider,
} from "./Resume.styled";

export interface TallSectionProps {
  title: string;
  children: ReactNode;
}

export function TallSection({ title, children }: TallSectionProps) {
  return (
    <TallSectionWrapper>
      <TallBar />
      <TallContent>
        <TallTitle>{title}</TallTitle>
        <TallDivider />
        {children}
      </TallContent>
    </TallSectionWrapper>
  );
}
