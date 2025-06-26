import './globals.css';
import { Navbar } from '@/Components/Navbar';
import { ThemeProvider } from '@/Themes/ThemeProvider';
import { PageWrapper } from '@/Components/PageWrapper';

export const metadata = {
  title: 'Jeroen Denayer Portfolio',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        <ThemeProvider>
          <PageWrapper>
            <div className="sticky top-0 z-50">
              <Navbar />
            </div>
            <div className="pt-4">
              {children}
            </div>
          </PageWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}
