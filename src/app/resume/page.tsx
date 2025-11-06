"use client";

import {
  CssBaseline,
  GlobalStyles,
  Link as MuiLink,
} from "@mui/material";

import { IconCmp } from "@/Themes/Default/Components/Icon";
import { SectionLabel } from "@/Themes/Default/Components/Resume/SectionLabel";
import { TallSection } from "@/Themes/Default/Components/Resume/TallSection";
import { Entry } from "@/Themes/Default/Components/Resume/Entry";

import { resumeData } from "@/Data/Resume/data";

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
  DividerBar,
  SectionHeader,
} from "./Resume.styled";

/* ===========================
   HELPERS
=========================== */

const bulletJoin = (arr: string[]) => arr.join(" • ");

/* ===========================
   PAGE COMPONENT
=========================== */

export default function Resume() {
  const { name, contact, skills, summary, experience, education } = resumeData;

  return (
    <div id="resume-page">
      <link
        href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800&display=swap"
        rel="stylesheet"
      />

      <CssBaseline />

      <GlobalStyles
        styles={{
          "@page": { size: "A4", margin: 0 },
          "html, body, #root": {
            margin: 0,
            padding: 0,
            height: "100%",
            background: "#000",
            fontFamily: "'Montserrat', sans-serif",
          },
        }}
      />

      {/* PAGE */}
      <PageContainer>
        {/* LEFT COLUMN */}
        <LeftColumn>
          {/* NAME */}
          <NameBlock>
            <FirstName>{name.first}</FirstName>
            <LastName>{name.last}</LastName>
            <Tagline>{name.tagline}</Tagline>
          </NameBlock>

          {/* CONTACT */}
          <ContactBlock>
            <SectionLabel>CONTACT</SectionLabel>

            <ContactRow>
              <IconCmp techName="Mail" height="4.2mm" />
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

          {/* SKILLS */}
          <SkillsBlock>
            <SectionLabel>TECHNICAL SKILLS</SectionLabel>

            <SkillGroup>
              <SkillGroupTitle>PROGRAMMING</SkillGroupTitle>
              <SkillGroupText>{`• ${bulletJoin(skills.programming)}`}</SkillGroupText>
            </SkillGroup>

            <SkillGroup>
              <SkillGroupTitle>API</SkillGroupTitle>
              <SkillGroupText>{`• ${bulletJoin(skills.api)}`}</SkillGroupText>
            </SkillGroup>

            <SkillGroup>
              <SkillGroupTitle>ENGINES</SkillGroupTitle>
              <SkillGroupText>{`• ${bulletJoin(skills.engines)}`}</SkillGroupText>
            </SkillGroup>

            <SkillGroup>
              <SkillGroupTitle>TOOLS</SkillGroupTitle>
              <SkillGroupText>{`• ${bulletJoin(skills.tools)}`}</SkillGroupText>
            </SkillGroup>

            <SkillGroup>
              <SectionLabel>LANGUAGES</SectionLabel>
              <SkillGroupText>
                {skills.languages
                  .map((l) => `• ${l.name}${l.level ? ` (${l.level})` : ""}`)
                  .join("\n")}
              </SkillGroupText>
            </SkillGroup>
          </SkillsBlock>
        </LeftColumn>

        {/* RIGHT COLUMN */}
        <RightColumn>
          {/* SUMMARY */}
          <TallSection title="SUMMARY">{summary}</TallSection>

          {/* EXPERIENCE */}
          <TallSection title="EXPERIENCE">
            <SectionHeader>WORK</SectionHeader>
            <DividerBar />
            {experience.work.map((item, i) => (
              <Entry key={i} {...item} />
            ))}

            <SectionHeader sx={{ marginTop: "clamp(2mm, 1vh, 3mm)" }}>
              PROJECTS
            </SectionHeader>
            <DividerBar />
            {experience.projects.map((item, i) => (
              <Entry key={i} {...item} />
            ))}
          </TallSection>

          {/* EDUCATION */}
          <TallSection title="EDUCATION">
            {education.map((item, i) => (
              <Entry key={i} {...item} />
            ))}
          </TallSection>
        </RightColumn>
      </PageContainer>
    </div>
  );
}
