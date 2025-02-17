"use client";
import useIsomorphicLayoutEffect from "./useIsoLayout";
import { useMemo, useState } from "react";

import type { TUseMeasureRect, TUseMeasureResult } from "@/types/hooks";

const defaultState: TUseMeasureRect = { x: 0, y: 0, width: 0, height: 0, top: 0, left: 0, bottom: 0, right: 0 };

function useMeasure<E extends Element = Element>(): TUseMeasureResult<E> {
  // State
  const [rect, setRect] = useState<TUseMeasureRect>(defaultState);
  const [element, ref] = useState<E | null>(null);

  // Memos
  const observer = useMemo(
    () =>
      new window.ResizeObserver((entries) => {
        if (!entries[0]) return;
        const { x, y, width, height, top, left, bottom, right } = entries[0].contentRect;
        setRect(() => ({ x, y, width, height, top, left, bottom, right }));
      }),
    []
  );

  // Effects
  useIsomorphicLayoutEffect(() => {
    if (!element) return;
    observer.observe(element);
    return () => observer.disconnect();
  }, [element]);

  return [ref, rect];
}

export default typeof window !== "undefined" && typeof (window as typeof globalThis).ResizeObserver !== "undefined"
  ? useMeasure
  : ((() => [() => {}, defaultState]) as typeof useMeasure);
