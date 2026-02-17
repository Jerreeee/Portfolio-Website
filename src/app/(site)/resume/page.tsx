"use client";

import dynamic from "next/dynamic";

const ResumePageClient = dynamic(() => import("./ResumePageClient"), {
  ssr: false,
  loading: () => null,
});

export default function ResumePage() {
  return <ResumePageClient />;
}
