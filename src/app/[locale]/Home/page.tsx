import Switch2 from "@/components/ui/dmt2";
import ThemeSwitcherDMT3 from "@/components/ui/dmt3";
import ThemeToggle from "@/components/ui/dmToggle";
import { type ReactNode } from "react";

export default function HomePage(): ReactNode {
  return (
    <div>
      <ThemeToggle />
      <Switch2 />
      <ThemeSwitcherDMT3 />
    </div>
  );
}
