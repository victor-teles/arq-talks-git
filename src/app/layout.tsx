import Header from '@/components/header';
import { Toaster } from '@/components/ui/sonner';
import { cn } from '@/lib/utils';
import type { Metadata } from 'next';
import { Inter as FontSans } from 'next/font/google';
import { Suspense } from 'react';
import './globals.css';
import { TooltipProvider } from '@/components/ui/tooltip';

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'ArqTalks - Do git ao desenvolvimento',
  description: 'ArqTalks - Do git ao desenvolvimento',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className="dark" lang="en">
      <body className={cn('min-h-screen bg-background font-sans antialiased', fontSans.variable)}>
        <Header />
        <TooltipProvider delayDuration={0}>{children}</TooltipProvider>
        <Suspense>
          <Toaster />
        </Suspense>
      </body>
    </html>
  );
}
