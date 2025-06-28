import './globals.css';
import { Navbar } from '@/Themes/Default/Components/Navbar';
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
            {children}
          </PageWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}
