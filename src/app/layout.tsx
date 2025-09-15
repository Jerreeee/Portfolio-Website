import './globals.css';
import { ThemeProvider } from '@/Themes/ThemeProvider';
import { PageWrapper } from '@/Components/PageWrapper';

export const metadata = {
  title: 'Jeroen Denayer Portfolio',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html className='bg-[#000000]'>
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
