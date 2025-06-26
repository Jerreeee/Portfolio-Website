import './globals.css';
import { Navbar } from '@/Components/Navbar';
import { ThemeProvider } from '@/ThemeProvider';

export const metadata = {
  title: 'Jeroen Denayer Portfolio',
  description: 'Portfolio website showcasing projects and skills',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link id="theme-link" rel="stylesheet" href="/Themes/Dark/theme.css" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  var systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                  var resolvedTheme = theme === 'system' ? systemTheme : (theme || 'dark');
                  var link = document.getElementById('theme-link');
                  if (link) {
                    link.href = '/Themes/' + (resolvedTheme === 'dark' ? 'Dark' : 'Light') + '/theme.css';
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body style={{ background: 'var(--background)', color: 'var(--foreground)' }}>
        <ThemeProvider>
          <div className="sticky top-0 z-50">
            <Navbar />
          </div>
          <div className="pt-4">
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
