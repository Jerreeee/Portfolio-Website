'use client';

import React from 'react';
import { ProjectInfo } from '@/data/projects/project'
import { data } from './data'

export default function ProjectCmp() {
  return (
    <section className="p-6 bg-gray-100 rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Bubble Bobble Demo</h2>
      <p>{data.slug}</p>
    </section>
  );
}
