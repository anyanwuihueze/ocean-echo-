import type { Metadata } from 'next';
import './globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';

export const metadata: Metadata = {
  title: 'Echoes at Dusk',
  description: 'Discover and connect with others through shared vibes.',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Echoes at Dusk',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;900&display=swap" rel="stylesheet" />
        <meta name="theme-color" content="#000000" />
      </head>
      <body className={cn('font-body antialiased min-h-screen bg-black text-white')}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}