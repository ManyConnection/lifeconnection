import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-8 w-48 bg-slate-800/50" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-32 rounded-2xl bg-slate-800/50" />
        ))}
      </div>
      <Skeleton className="h-64 rounded-2xl bg-slate-800/50" />
    </div>
  );
}
