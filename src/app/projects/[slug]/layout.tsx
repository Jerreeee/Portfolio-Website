import Link from 'next/link';

export default function ProjectSlugLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[1fr_70%_1fr] gap-8 p-4">
      {/* Left column (auto-sizing)*/}
      <aside className=" top-10 justify-self-start">
        <Link
          href="/projects"
          className="text-gray-600 dark:text-gray-300 hover:underline"
        >
          ← Back to Projects
        </Link>
      </aside>

      {/* Center column – fixed 70% width */}
      <main>
        {children}
      </main>

      {/* Right column (auto-sizing)*/}
      <aside />
    </div>
  );
}
