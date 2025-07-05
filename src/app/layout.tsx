import type { Metadata } from 'next';
import { Inter, Playfair_Display, Montserrat } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { SidebarProvider } from '@/components/ui/sidebar';
import { EnhancedToaster } from "@/components/ui/toast-enhanced"
import { SmoothScroll } from "@/components/ui/smooth-scroll"

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
});

const playfairDisplay = Playfair_Display({
  variable: '--font-playfair',
  subsets: ['latin'],
  display: 'swap',
});

const montserrat = Montserrat({
  variable: '--font-montserrat',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'DietWise Premium - Your Luxury AI-Powered Nutrition Companion',
  description: 'Experience the pinnacle of personalized nutrition with DietWise Premium. Luxury AI-powered guidance, exclusive meal planning, and premium wellness tracking for the discerning health enthusiast.',
  keywords: 'premium diet, luxury nutrition, AI wellness, personalized health, premium meal planning, luxury food tracking',
  authors: [{ name: 'DietWise Premium Team' }],
  viewport: 'width=device-width, initial-scale=1, maximum-scale=5',
  themeColor: '#1e3a8a',
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
      <body className={`${inter.variable} ${playfairDisplay.variable} ${montserrat.variable} font-sans antialiased bg-background text-foreground`}>
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