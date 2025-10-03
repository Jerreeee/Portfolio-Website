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
    window.location.replace("/projects");
  }, []);

  return (
    <html>
      <head>
        {/* Static fallback redirect for non-JS environments */}
        <meta httpEquiv="refresh" content="0; url=/projects" />
      </head>
      <body>
        <p>
          Redirecting to <Link href="/projects">/projects</Link>...
        </p>
      </body>
    </html>
  );
}
