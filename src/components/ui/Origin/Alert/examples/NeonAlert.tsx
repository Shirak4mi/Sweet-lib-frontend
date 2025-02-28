import { ArrowRight, TriangleAlert } from "lucide-react";

import type { ReactNode } from "react";

export default function NeonAlert(): ReactNode {
  return (
    <div className="rounded-lg border border-amber-500/50 px-4 py-3 text-amber-600 bg-background/55 supports-[backdrop-filter]:bg-background/40 backdrop-blur-xl">
      <div className="flex gap-3">
        <TriangleAlert className="mt-0.5 shrink-0 opacity-60" size={16} strokeWidth={2} aria-hidden="true" />
        <div className="flex grow justify-between gap-3">
          <p className="text-sm">Some information is missing!</p>
          <a href="#" className="group whitespace-nowrap text-sm font-medium">
            Link
            <ArrowRight
              className="-mt-0.5 ms-1 inline-flex opacity-60 transition-transform group-hover:translate-x-0.5"
              aria-hidden="true"
              strokeWidth={2}
              size={16}
            />
          </a>
        </div>
      </div>
    </div>
  );
}
