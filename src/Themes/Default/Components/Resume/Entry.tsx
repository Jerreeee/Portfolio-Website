import {
  EntryWrapper,
  EntryRow,
  EntryTitle,
  EntryRight,
  EntrySub,
  EntryBody,
  EntryLink,
} from "./Resume.styled";

export interface EntryProps {
  title: string;
  right?: string;
  sub?: string;
  body: string;
  link?: string;
}

export function Entry({ title, right, sub, body, link }: EntryProps) {
  return (
    <EntryWrapper>
      <EntryRow>
        <EntryTitle>{title}</EntryTitle>
        {right && <EntryRight>{right}</EntryRight>}
      </EntryRow>
      {sub && <EntrySub>{sub}</EntrySub>}
      <EntryBody>{body}</EntryBody>
      {link && <EntryLink href={link} underline="hover">{link}</EntryLink>}
    </EntryWrapper>
  );
}
