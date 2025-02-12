"use client";
import { type ProfilerOnRenderCallback, type ReactNode, Profiler } from "react";

import type { IProfilerProps } from "@/types";

export default function RenderTimeProfiler({ id = "", children }: IProfilerProps): ReactNode {
  const onRender: ProfilerOnRenderCallback = (id, phase, actualDuration, startTime, commitTime) => {
    console.log(`render time : ${actualDuration.toFixed(2)}ms`);
  };

  return (
    <Profiler id={id} onRender={onRender}>
      {children}
    </Profiler>
  );
}
