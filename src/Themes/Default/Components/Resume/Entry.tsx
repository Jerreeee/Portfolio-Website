import {
  EntryWrapper,
  EntryRow,
  EntryTitle,
  EntryRight,
  EntrySub,
  EntryBody,
  EntryLink,
} from "./ResumeCmp";

export interface EntryProps {
  title: string;
  right?: string;
  sub?: string;
  body: string | string[];
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
      {Array.isArray(body) ? (
        <ul style={{ margin: 0, padding: 0, paddingLeft: '4mm', listStyleType: 'disc' }}>
          {body.map((item, i) => (
            <EntryBody component="li" key={i} sx={{ lineHeight: 1.25, margin: 0, padding: 0 }}>{item}</EntryBody>
          ))}
        </ul>
      ) : (
        <EntryBody>{body}</EntryBody>
      )}
      {link && <EntryLink href={link} underline="hover">{link}</EntryLink>}
    </EntryWrapper>
  );
}
