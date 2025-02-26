"use client";
import { useEffect, useState } from "react";

import type { TWindowObjSize } from "@/types/hooks.ts";

export default function useWindowSize() {
  // State
  const [windowSize, setWindowSize] = useState<TWindowObjSize>({ width: undefined, height: undefined });

  function handleResize() {
    setWindowSize(() => ({ width: window.innerWidth, height: window.innerHeight }));
  }
  
  // Effects
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
}
