import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/sonner';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Shaquib Khan - Architect | Interior & Production Designer',
  description: 'Professional architect specializing in architectural design, interior design, and production design services.',
  keywords: 'architect, interior design, production design, Shaquib Khan, architectural services',
  authors: [{ name: 'Shaquib Khan' }],
  creator: 'Shaquib Khan',
  openGraph: {
    type: 'website',
    title: 'Shaquib Khan - Architect | Interior & Production Designer',
    description: 'Professional architect specializing in architectural design, interior design, and production design services.',
    siteName: 'Shaquib Khan Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Shaquib Khan - Architect | Interior & Production Designer',
    description: 'Professional architect specializing in architectural design, interior design, and production design services.',
  },
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}