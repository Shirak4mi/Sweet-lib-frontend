"use client";
import { type ProfilerOnRenderCallback, type ReactNode, Profiler } from "react";

import type { IProfilerProps } from "@/types/components.tsx";

export default function RenderTimeProfiler({ id = "", children }: IProfilerProps): ReactNode {
  const onRender: ProfilerOnRenderCallback = (_id, _phase, actualDuration, _startTime, _commitTime) => {
    console.log(`render time : ${actualDuration.toFixed(2)}ms`);
  };

  return (
    <Profiler id={id} onRender={onRender}>
      {children}
    </Profiler>
  );
}
