import { type ReactNode } from "react";
import Navbar from "./Navbar.tsx";

import type { IRSC } from "@/types/components";

export default function MainAppWrapper({ children }: IRSC): ReactNode {
  return (
    <>
      <Navbar />
      <main>{children}</main>
    </>
  );
}
