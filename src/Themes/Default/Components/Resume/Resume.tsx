"use client";

import { useLayoutEffect, useRef, useState } from "react";
import {
  PageContainer,
  RightColumn,
  SummaryText,
  ResumeHeader,
  HeaderName,
  HeaderFirstName,
  HeaderLastName,
  HeaderRight,
  HeaderContactRow,
  HeaderContactLink,
  HeaderContactText,
  HeaderDivider,
} from "./ResumeCmp";
import EmailIcon from "@mui/icons-material/Email";
import LanguageIcon from "@mui/icons-material/Language";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";

import { aboutInfo } from "@/Data/about";
import { TallSection } from "./TallSection";
import { Entry } from "./Entry";
import { ExperienceSubSection } from "./ExperienceSubSection";
import type { EntryItem } from "@/Types/about";
import type { ResumeTailoring } from "@/Types/resume-tailoring";
import { applyResumeTailoring } from "@/Utils/applyResumeTailoring";

interface ResumeProps {
  tailoring?: ResumeTailoring;
}

export default function Resume({ tailoring }: ResumeProps = {}) {
  const { website, bio, contact, experience, education } = applyResumeTailoring(aboutInfo, tailoring);

  const pageContainerRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);
  const [sm, setSm] = useState(1);
  const [sf, setSf] = useState(1);
  const [overflowed, setOverflowed] = useState(false);

  useLayoutEffect(() => {
    const col = rightColRef.current;
    const page = pageContainerRef.current;
    if (!col || !page) return;

    // Measure available height (col has flex:1, fills remaining page space).
    const available = col.getBoundingClientRect().height;

    // Temporarily collapse to natural content height.
    col.style.flex = "none";
    const natural = col.getBoundingClientRect().height;
    col.style.flex = "";

    if (natural <= 0 || natural === available) return;

    // --sm/--sf only scale a fraction of total height so a simple ratio
    // under-corrects. Iterate: apply the property, remeasure, correct.
    const iterate = (prop: string, start: number, min: number, max: number) => {
      let v = Math.max(Math.min(start, max), min);
      for (let i = 0; i < 8; i++) {
        page.style.setProperty(prop, String(v));
        col.style.flex = "none";
        const h = col.getBoundingClientRect().height;
        col.style.flex = "";
        const ratio = available / h;
        if (Math.abs(ratio - 1) < 0.0005) break;
        v = Math.max(Math.min(v * ratio, max), min);
      }
      return v;
    };

    if (natural < available) {
      // Content is short — stretch spacing upward.
      setSm(iterate("--sm", available / natural, 1, 2));
    } else {
      // Content overflows — phase 1: compress spacing.
      const smVal = iterate("--sm", available / natural, 0.75, 1);
      setSm(smVal);

      // Remeasure after spacing compression.
      col.style.flex = "none";
      const afterPhase1 = col.getBoundingClientRect().height;
      col.style.flex = "";

      if (afterPhase1 > available) {
        // Phase 2: also compress font sizes.
        setSf(iterate("--sf", available / afterPhase1, 0.85, 1));
      }

      setOverflowed(true);
    }
  }, []);

  return (
    <div id="resume-page">
      <PageContainer
        ref={pageContainerRef}
        data-ready={sm !== 1 || sf !== 1 ? "true" : undefined}
        data-overflow={overflowed ? "true" : undefined}
        style={{ "--sm": sm, "--sf": sf } as React.CSSProperties}
      >
        <ResumeHeader>
          <HeaderName>
            <HeaderFirstName>{bio.firstName}</HeaderFirstName>{" "}
            <HeaderLastName>{bio.lastName}</HeaderLastName>
          </HeaderName>

          <HeaderRight>
            <HeaderContactRow>
              <EmailIcon sx={{ fontSize: '3.4mm', opacity: 0.5, flexShrink: 0 }} />
              <HeaderContactLink href={`mailto:${contact.email}`}>
                {contact.email}
              </HeaderContactLink>
            </HeaderContactRow>
            <HeaderContactRow>
              <LanguageIcon sx={{ fontSize: '3.4mm', opacity: 0.5, flexShrink: 0 }} />
              <HeaderContactLink href={website} target="_blank" rel="noreferrer">
                {String(website).replace(/^https?:\/\//, "")}
              </HeaderContactLink>
            </HeaderContactRow>
            {contact.gsm && (
              <HeaderContactRow>
                <PhoneAndroidIcon sx={{ fontSize: '3.4mm', opacity: 0.5, flexShrink: 0 }} />
                <HeaderContactText>{contact.gsm}</HeaderContactText>
              </HeaderContactRow>
            )}
          </HeaderRight>

          <HeaderDivider />
        </ResumeHeader>

        <RightColumn ref={rightColRef}>
          <TallSection title="SUMMARY">
            <SummaryText>{bio.description}</SummaryText>
          </TallSection>

          <TallSection title="EXPERIENCE">
            <ExperienceSubSection title="Work" items={experience.work} />
            <ExperienceSubSection title="Projects" items={experience.projects} />
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
