"use client";
import { type ThemeProviderProps, ThemeProvider } from "next-themes";

import type { ReactNode } from "react";

export default function AppThemeProvider({ children, ...props }: ThemeProviderProps): ReactNode {
  return <ThemeProvider {...props}>{children}</ThemeProvider>;
}
