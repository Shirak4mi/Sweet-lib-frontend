"use client";
import { ThemeProvider } from "next-themes";

import type { ReactNode } from "react";
import type { IRSC } from "@/types";

export default function AppThemeProvider({ children }: IRSC): ReactNode {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      {children}
    </ThemeProvider>
  );
}
