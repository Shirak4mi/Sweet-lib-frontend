"use client";
import { ThemeProvider } from "next-themes";

import type { IRSC } from "@/types/components.tsx";
import type { ReactNode } from "react";

export default function AppThemeProvider({ children }: IRSC): ReactNode {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      {children}
    </ThemeProvider>
  );
}
