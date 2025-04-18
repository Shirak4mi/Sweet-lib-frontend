import { AppThemeProvider, MainAppWrapper } from "@/components";
import { geistMono, geistSans } from "@/fonts";
import "@/css/globals.css";

import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import type { IRSLCC } from "@/types";
import { cn } from "@/utils/functions";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({ children, params: { locale } }: Readonly<IRSLCC>): ReactNode {
  // Fonts Variable, only reason for this to exist is to make syntax readable
  const fonts = cn(geistSans.variable, geistMono.variable);

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${fonts} antialiased`}>
        <AppThemeProvider>
          <MainAppWrapper>{children}</MainAppWrapper>
        </AppThemeProvider>
      </body>
    </html>
  );
}
