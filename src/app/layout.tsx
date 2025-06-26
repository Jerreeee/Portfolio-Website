import './globals.css';
import { Navbar } from '@/Components/Navbar';
import { ThemeProvider } from '@/ThemeProvider';

export const metadata = {
  title: 'Jeroen Denayer Portfolio',
};

export default function RootLayout({ children }) {
  return (
    <html>
      <head>
        <link id="theme-link" rel="stylesheet" href="/Themes/Dark/theme.css" />
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
