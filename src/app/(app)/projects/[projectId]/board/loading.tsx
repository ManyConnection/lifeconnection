import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="flex gap-4 overflow-x-auto pb-4">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="w-72 shrink-0 rounded-3xl bg-gray-50/50 border border-gray-100 p-4">
          <Skeleton className="h-5 w-24 rounded bg-gray-100 mb-4" />
          {Array.from({ length: 3 - i % 2 }).map((_, j) => (
            <Skeleton key={j} className="h-28 w-full rounded-2xl bg-white mb-2.5" />
          ))}
        </div>
      ))}
    </div>
  );
}
