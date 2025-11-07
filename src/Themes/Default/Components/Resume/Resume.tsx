"use client";

import { Box, CssBaseline, GlobalStyles, Link as MuiLink } from "@mui/material";
import {
  PageContainer,
  LeftColumn,
  RightColumn,
  NameBlock,
  FirstName,
  LastName,
  Tagline,
  ContactBlock,
  ContactRow,
  SocialRow,
  QRWrapper,
  SkillsBlock,
  SkillGroup,
  SkillGroupTitle,
  SkillGroupText,
  SkillGrid3,
  DividerBar,
  SectionHeaderRight,
} from "./Resume.styled";

import { resumeData } from "@/Data/Resume/data";
import { IconCmp } from "@/Themes/Default/Components/Icon";
import { SectionLabel } from "@/Themes/Default/Components/Resume/SectionLabel";
import { TallSection } from "@/Themes/Default/Components/Resume/TallSection";
import { Entry } from "@/Themes/Default/Components/Resume/Entry";

/* --------- Helpers --------- */

function renderSkills(items: string[]) {
  if (items.length <= 2) {
    return <SkillGroupText>{items.map((x) => `• ${x}`).join("   ")}</SkillGroupText>;
  }

  const cols = 3;
  const rows = Math.ceil(items.length / cols);
  const normalized = Array.from({ length: rows * cols }, (_, i) => items[i] ?? null);

  return (
    <SkillGrid3>
      {normalized.map((x, i) =>
        x ? <SkillGroupText key={i}>{`• ${x}`}</SkillGroupText> : <span key={i} />
      )}
    </SkillGrid3>
  );
}

/* --------- Component --------- */

export default function Resume({ scale }: { scale: number }) {
  const { name, contact, skills, summary, experience, education } = resumeData;

  return (
    <div id="resume-page">
      <CssBaseline />

      <GlobalStyles
        styles={{
          "@page": { size: "A4", margin: 0 },
          "html, body, #root": {
            margin: 0,
            padding: 0,
            height: "100%",
            background: "#000",
          },
        }}
      />

      <Box
        sx={{
          width: "210mm",
          height: "297mm",
          transform: `scale(${scale})`,
          transformOrigin: "top left",
        }}
      >
        <PageContainer>
          {/* LEFT COLUMN */}
          <LeftColumn>
            <NameBlock>
              <FirstName>{name.first}</FirstName>
              <LastName>{name.last}</LastName>
              <Tagline>{name.tagline}</Tagline>
            </NameBlock>

            <ContactBlock>
              <SectionLabel>CONTACT</SectionLabel>
              <ContactRow>
                <MuiLink
                  href={`mailto:${contact.email}`}
                  color="#b3ffc8"
                  underline="hover"
                  sx={{ fontSize: "clamp(2.4mm, 0.8vw, 3.2mm)" }}
                >
                  {contact.email}
                </MuiLink>
              </ContactRow>
              <SocialRow>
                {contact.links.github && (
                  <MuiLink href={contact.links.github} underline="none">
                    <IconCmp techName="Github" height="4.2mm" />
                  </MuiLink>
                )}
                {contact.links.linkedin && (
                  <MuiLink href={contact.links.linkedin} underline="none">
                    <IconCmp techName="Linkedin" height="4.2mm" />
                  </MuiLink>
                )}
                {contact.links.artstation && (
                  <MuiLink href={contact.links.artstation} underline="none">
                    <IconCmp techName="ArtStation" height="4.2mm" />
                  </MuiLink>
                )}
              </SocialRow>
              {contact.qrSrc && (
                <QRWrapper>
                  <img src={contact.qrSrc} alt="QR Code" />
                </QRWrapper>
              )}
            </ContactBlock>

            <SkillsBlock>
              <SkillGroup>
                <SectionLabel>LANGUAGES</SectionLabel>
                {renderSkills(
                  skills.languages.map((l) => l.name + (l.level ? ` (${l.level})` : ""))
                )}
              </SkillGroup>

              <SectionLabel>TECHNICAL SKILLS</SectionLabel>

              <SkillGroup>
                <SkillGroupTitle>PROGRAMMING</SkillGroupTitle>
                {renderSkills(skills.programming)}
              </SkillGroup>

              <SkillGroup>
                <SkillGroupTitle>API</SkillGroupTitle>
                {renderSkills(skills.api)}
              </SkillGroup>

              <SkillGroup>
                <SkillGroupTitle>ENGINES</SkillGroupTitle>
                {renderSkills(skills.engines)}
              </SkillGroup>

              <SkillGroup>
                <SkillGroupTitle>TOOLS</SkillGroupTitle>
                {renderSkills(skills.tools)}
              </SkillGroup>
            </SkillsBlock>
          </LeftColumn>

          {/* RIGHT COLUMN */}
          <RightColumn>
            <TallSection title="SUMMARY">{summary}</TallSection>

            <TallSection title="EXPERIENCE">
              <SectionHeaderRight>Work</SectionHeaderRight>
              <DividerBar />
              {experience.work.map((item, i) => (
                <Entry key={i} {...item} />
              ))}
              <SectionHeaderRight>Projects</SectionHeaderRight>
              <DividerBar />
              {experience.projects.map((item, i) => (
                <Entry key={i} {...item} />
              ))}
            </TallSection>

            <TallSection title="EDUCATION">
              {education.map((item, i) => (
                <Entry key={i} {...item} />
              ))}
            </TallSection>
          </RightColumn>
        </PageContainer>
      </Box>
    </div>
  );
}
