// app/layout.tsx
import './globals.css';
import { Metadata } from 'next';
import { ClientProviders } from './ClientProviders';

export const metadata: Metadata = {
  title: 'Jeroen Denayer Portfolio',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="bg-[#000000]">
      <head>
        <meta name="emotion-insertion-point" content="" />
      </head>
      <body>
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
