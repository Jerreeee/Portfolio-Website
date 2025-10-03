// app/layout.tsx
import './globals.css';
import { Metadata } from 'next';
import Head from 'next/head';
import { ClientProviders } from './ClientProviders';

export const metadata: Metadata = {
  title: 'Jeroen Denayer Portfolio',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="bg-[#000000]">
      <Head>
        <meta name="emotion-insertion-point" content="" />
      </Head>
      <body>
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
