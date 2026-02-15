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
  ResumeHeader,
  HeaderName,
  HeaderFirstName,
  HeaderLastName,
  HeaderRight,
  HeaderContactRow,
  HeaderLabel,
  HeaderContactLink,
  HeaderContactText,
  HeaderDivider,
} from "./Resume.styled";


import { aboutInfo } from "@/Data/about";
import { IconCmp } from "@/Themes/Default/Components/Icon";
import { SectionLabel } from "@/Themes/Default/Components/Resume/SectionLabel";
import { TallSection } from "@/Themes/Default/Components/Resume/TallSection";
import { Entry } from "@/Themes/Default/Components/Resume/Entry";
import type { ContactLink, SkillGroup as SkillGroupType, EntryItem, Language } from "@/Types/about";

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
      {normalized.map((x: string | null, i: number) =>
        x ? <SkillGroupText key={i}>{`• ${x}`}</SkillGroupText> : <span key={i} />
      )}
    </SkillGrid3>
  );
}

/* --------- Component --------- */

export default function Resume() {
  const { website, bio, contact, skills, experience, education } = aboutInfo;

  return (
    <div id="resume-page">
      <CssBaseline />

      {/* Print layout rules */}
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

      <PageContainer>
        {/* LEFT COLUMN */}
        {/* <LeftColumn>
          <NameBlock>
            <FirstName>{bio.firstName}</FirstName>
            <LastName>{bio.lastName}</LastName>
            <Tagline>{bio.tagline}</Tagline>
          </NameBlock>

          <ContactBlock>
            <SectionLabel>CONTACT</SectionLabel>

            <ContactRow>
              <MuiLink
                href={`mailto:${contact.email}`}
                color="#b3ffc8"
                underline="hover"
                sx={{ fontSize: "3.2mm" }}
              >
                {contact.email}
              </MuiLink>
            </ContactRow>

            <SocialRow>
              {(Object.values(contact.links) as ContactLink[]).map(
                (link: ContactLink) => (
                  <MuiLink key={link.label} href={link.href} underline="none">
                    <IconCmp techName={link.icon} height="4.2mm" />
                  </MuiLink>
                )
              )}
            </SocialRow>

            {contact.qrSrc && (
              <>
                <Box
                  sx={{
                    fontSize: "3mm",
                    textAlign: "center",
                    opacity: 0.9,
                    marginY: '0.5mm',
                    lineHeight: 1.3,
                  }}
                >
                  Visit my website at{" "}
                  <MuiLink
                    href="https://jeroen.denayer.com"
                    color="#b3ffc8"
                    underline="hover"
                    sx={{ fontSize: "3mm" }}
                  >
                    jeroen.denayer.com
                  </MuiLink>
                  <br />
                  or scan the QR code
                </Box>

                <QRWrapper>
                  <img src={contact.qrSrc} alt="QR Code" />
                </QRWrapper>
              </>
            )}
          </ContactBlock>

          <SkillsBlock>
            <SkillGroup>
              <SectionLabel>LANGUAGES</SectionLabel>
              {renderSkills(
                skills.languages.map((l: Language) =>
                  l.level ? `${l.name} (${l.level})` : l.name
                )
              )}
            </SkillGroup>

            <SectionLabel>TECHNICAL SKILLS</SectionLabel>

            {skills.groups.map((group: SkillGroupType) => (
              <SkillGroup key={group.title}>
                <SkillGroupTitle>{group.title.toUpperCase()}</SkillGroupTitle>

                <Box
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    flexDirection: "row",
                    justifyContent: "center",
                    gap: "1.8mm",
                    mt: "0.8mm",
                  }}
                >
                  {group.items.map((item: string) => (
                    <Box
                      key={item}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        height: "5mm",
                        opacity: 0.9,
                        transition: "transform 0.15s ease",
                        "&:hover": { transform: "scale(1.1)" },
                      }}
                    >
                      <IconCmp techName={item} showDisplayName />
                    </Box>
                  ))}
                </Box>
              </SkillGroup>
            ))}
          </SkillsBlock>
        </LeftColumn> */}

        {/* ===== HEADER (single line / no icons) ===== */}
<ResumeHeader>
  <HeaderName>
    <HeaderFirstName>{bio.firstName}</HeaderFirstName>{" "}
    <HeaderLastName>{bio.lastName}</HeaderLastName>
  </HeaderName>

  <HeaderRight>
    <HeaderContactRow>
      <HeaderLabel>Email:</HeaderLabel>
      <HeaderContactLink href={`mailto:${contact.email}`}>
        {contact.email}
      </HeaderContactLink>
    </HeaderContactRow>

    <HeaderContactRow>
      <HeaderLabel>Website:</HeaderLabel>
      <HeaderContactLink href={website} target="_blank" rel="noreferrer">
        {String(website).replace(/^https?:\/\//, "")}
      </HeaderContactLink>
    </HeaderContactRow>

    {contact.gsm && (
      <HeaderContactRow>
        <HeaderLabel>GSM:</HeaderLabel>
        <HeaderContactText>{contact.gsm}</HeaderContactText>
      </HeaderContactRow>
    )}
  </HeaderRight>

  <HeaderDivider />
</ResumeHeader>

        {/* RIGHT COLUMN */}
        <RightColumn>
          <TallSection title="SUMMARY">{bio.description}</TallSection>

          <TallSection title="EXPERIENCE">
            <SectionHeaderRight>Work</SectionHeaderRight>
            <DividerBar />
            {experience.work.map((item: EntryItem, i: number) => (
              <Entry key={i} {...item} />
            ))}

            <SectionHeaderRight>Projects</SectionHeaderRight>
            <DividerBar />
            {experience.projects.map((item: EntryItem, i: number) => (
              <Entry key={i} {...item} />
            ))}
          </TallSection>

          <TallSection title="EDUCATION">
            {education.map((item: EntryItem, i: number) => (
              <Entry key={i} {...item} />
            ))}
          </TallSection>
        </RightColumn>
      </PageContainer>
    </div>
  );
}
