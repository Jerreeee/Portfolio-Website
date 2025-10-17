"use client";

import { useEffect } from "react";
import Link from "next/link";
import PATHS from "@/Config/paths";

export default function HomePage() {
  const url = PATHS.PAGE({page: 'projects'}).url().value;

  // Client-side redirect (fast)
  useEffect(() => {
    window.location.replace(url);
  }, [url]);

  return (
    <>
      {/* Static fallback redirect for non-JS environments */}
      <meta httpEquiv="refresh" content={`0; url=${url}`} />

      <p style={{ color: "white", textAlign: "center", marginTop: "2rem" }}>
        Redirecting to <Link href="/projects">/projects</Link>...
      </p>
    </>
  );
}
