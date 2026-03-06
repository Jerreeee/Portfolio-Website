import OpenInNewIcon from "@mui/icons-material/OpenInNew";
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
        <EntryTitle>
          {title}
          {link && (
            <EntryLink href={`https://${link}`} target="_blank" rel="noreferrer" underline="none" sx={{ display: 'inline-flex', alignItems: 'center', ml: '1.5mm', verticalAlign: 'baseline' }}>
              <OpenInNewIcon sx={{ fontSize: '1em', color: '#0a84ff' }} />
            </EntryLink>
          )}
        </EntryTitle>
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
    </EntryWrapper>
  );
}
