import type { ReactNode } from "react";

/** Profiler Props Interface <-- Just Syntax amenities --> */
export interface IProfilerProps {
  children?: ReactNode;
  id?: string;
}


export interface IRSC {
  children: ReactNode;
}

export interface IRSLC extends IRSC {
  params: { locale: string };
}

export interface IRC extends IRSC {
  className?: string;
}
