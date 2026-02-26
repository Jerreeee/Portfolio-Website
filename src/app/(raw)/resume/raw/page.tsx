'use client';
import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Resume from '@/Themes/Default/Components/Resume/Resume';
import { getTailoring } from '@/Data/Companies';

function RawResumeContent() {
  const params = useSearchParams();
  const tailoring = getTailoring(params.get('company'));
  return <Resume tailoring={tailoring} />;
}

export default function RawResumePage() {
  return (
    <Suspense fallback={<Resume />}>
      <RawResumeContent />
    </Suspense>
  );
}
