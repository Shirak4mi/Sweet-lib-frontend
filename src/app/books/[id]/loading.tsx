import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="min-h-screen bg-dot-pattern">
      <div className="max-w-6xl mx-auto p-6">
        <div className="mb-8">
          <Skeleton className="h-10 w-32" />
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Skeleton className="aspect-[3/4] rounded-2xl" />
          <div className="space-y-6">
            <div>
              <Skeleton className="h-10 w-3/4 mb-2" />
              <Skeleton className="h-6 w-1/2" />
            </div>
            <div className="flex gap-6">
              <Skeleton className="h-6 w-20" />
              <Skeleton className="h-6 w-20" />
              <Skeleton className="h-6 w-20" />
            </div>
            <Skeleton className="h-48 rounded-lg" />
          </div>
        </div>

        <div className="space-y-8">
          <Skeleton className="h-8 w-32" />
          <div className="space-y-6">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-32 rounded-lg" />
            ))}
          </div>
          <Skeleton className="h-64 rounded-lg" />
        </div>
      </div>
    </div>
  );
}
