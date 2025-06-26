import Link from 'next/link';

export default function ProjectSlugLayout({ children }) {
  return (
    <div className="mx-auto p-4">
        {/* Left Sidebar */}
        <div className="md:col-span-1">
          <aside className="sticky top-10">
            <Link
              href="/projects"
              className="text-gray-600 dark:text-gray-300 hover:underline"
            >
              ← Back to Projects
            </Link>
          </aside>
        </div>

        {/* Main Content Area */}
        <div className="md:col-span-2">{children}</div>
    </div>
  );
}
