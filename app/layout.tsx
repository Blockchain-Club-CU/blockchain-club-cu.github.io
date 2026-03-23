import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from './providers'; // Import the new provider
import { CustomCursor } from './components/ui/CustomCursor';
import { BackgroundBeams } from './components/ui/BackgroundBeams';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'BCCU | Blockchain Club Chandigarh University',
  description:
    'A student-led community focused on learning Blockchain and Web3.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // 1. Add suppressHydrationWarning
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        {/* 2. Wrap children in ThemeProvider */}
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <BackgroundBeams />
          <CustomCursor />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
