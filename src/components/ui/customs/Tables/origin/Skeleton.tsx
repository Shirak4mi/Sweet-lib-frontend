import type { ReactNode } from "react";

export default function TableSkeleton(): ReactNode {
  return (
    <div className="w-full">
      <div className="flex items-center space-x-4 py-5">
        <div className="h-9 w-60 animate-pulse rounded-md bg-muted"></div>
        <div className="h-9 w-24 animate-pulse rounded-md bg-muted"></div>
        <div className="h-9 w-24 animate-pulse rounded-md bg-muted"></div>
      </div>
      <div className="rounded-md border">
        <div className="border-b">
          <div className="flex h-11 items-center space-x-6 px-3">
            <div className="h-4 w-4 animate-pulse rounded bg-muted"></div>
            <div className="h-4 w-[180px] animate-pulse rounded bg-muted"></div>
            <div className="h-4 w-[220px] animate-pulse rounded bg-muted"></div>
            <div className="h-4 w-[180px] animate-pulse rounded bg-muted"></div>
            <div className="h-4 w-[100px] animate-pulse rounded bg-muted"></div>
            <div className="h-4 w-[120px] animate-pulse rounded bg-muted"></div>
          </div>
        </div>
        <div>
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex h-16 items-center space-x-6 border-b px-3 last:border-0">
              <div className="h-4 w-4 animate-pulse rounded bg-muted"></div>
              <div className="h-4 w-[180px] animate-pulse rounded bg-muted"></div>
              <div className="h-4 w-[220px] animate-pulse rounded bg-muted"></div>
              <div className="h-4 w-[180px] animate-pulse rounded bg-muted"></div>
              <div className="h-4 w-[100px] animate-pulse rounded bg-muted"></div>
              <div className="h-4 w-[120px] animate-pulse rounded bg-muted"></div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center justify-between py-5">
        <div className="h-9 w-[150px] animate-pulse rounded-md bg-muted"></div>
        <div className="flex space-x-2">
          <div className="h-9 w-9 animate-pulse rounded-md bg-muted"></div>
          <div className="h-9 w-9 animate-pulse rounded-md bg-muted"></div>
          <div className="h-9 w-9 animate-pulse rounded-md bg-muted"></div>
          <div className="h-9 w-9 animate-pulse rounded-md bg-muted"></div>
        </div>
      </div>
    </div>
  );
}
