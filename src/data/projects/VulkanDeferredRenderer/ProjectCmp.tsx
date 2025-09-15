'use client';

import React from 'react';
import Image from 'next/image';
import { useTheme } from '@/Themes/ThemeProvider';
import { ProjectInfo } from '@/data/projects/project'
import { data } from './data'

export default function ProjectCmp() {
  const { theme: activeTheme } = useTheme();

  const H1 = activeTheme.components.h1.cmp;
  const P = activeTheme.components.p.cmp;

  return (
 <div className="space-y-6">
      {/* Project title */}
      <H1>{data.title}</H1>

      {/* Hero image */}
      <div className="relative w-full max-w-3xl mx-auto">
        <Image
          src={data.heroImage}
          alt={`${data.title} hero image`}
          width={1200}
          height={600}
          className="rounded-xl object-cover"
        />
      </div>

      {/* Description paragraph */}
      <P>
        {data.shortDescription}
      </P>
    </div>
  );
}
