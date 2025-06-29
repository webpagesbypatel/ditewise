import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { SidebarProvider } from '@/components/ui/sidebar';
import { EnhancedToaster } from "@/components/ui/toast-enhanced"
import { SmoothScroll } from "@/components/ui/smooth-scroll"

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap',
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'DietWise - Your AI-Powered Diet Companion',
  description: 'Transform your health with personalized AI-powered nutrition guidance, meal planning, and wellness tracking.',
  keywords: 'diet, nutrition, AI, health, wellness, meal planning, food tracking',
  authors: [{ name: 'DietWise Team' }],
  viewport: 'width=device-width, initial-scale=1, maximum-scale=5',
  themeColor: '#F0E68C',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <SidebarProvider defaultOpen={true}>
            <SmoothScroll />
            {children}
            <EnhancedToaster />
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}