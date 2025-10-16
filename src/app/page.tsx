// import { redirect } from 'next/navigation';

// export default function HomePage() {
//   redirect('/projects');
// }

// app/page.tsx
"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function HomePage() {
  // Client-side redirect (fast)
  useEffect(() => {
    window.location.replace("/projects.html");
  }, []);

  return (
    <>
      {/* Static fallback redirect for non-JS environments */}
      <meta httpEquiv="refresh" content="0; url=/projects.html" />

      <p style={{ color: "white", textAlign: "center", marginTop: "2rem" }}>
        Redirecting to <Link href="/projects.html">/projects</Link>...
      </p>
    </>
  );
}
