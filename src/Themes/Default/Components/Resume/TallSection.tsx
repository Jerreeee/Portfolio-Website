import { ReactNode } from "react";
import {
  TallSectionWrapper,
  TallBar,
  TallContent,
  TallTitle,
  TallDivider,
} from "./ResumeCmp";

export interface TallSectionProps {
  title: ReactNode;
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
