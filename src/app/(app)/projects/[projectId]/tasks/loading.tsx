import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          <Skeleton className="h-9 w-48 rounded-xl bg-gray-100" />
          <Skeleton className="h-9 w-28 rounded-xl bg-gray-100" />
          <Skeleton className="h-9 w-28 rounded-xl bg-gray-100" />
        </div>
        <Skeleton className="h-10 w-32 rounded-2xl bg-gray-100" />
      </div>
      <div className="bg-white rounded-3xl border border-gray-100 overflow-hidden">
        <div className="px-5 py-3.5 border-b border-gray-100">
          <Skeleton className="h-4 w-full bg-gray-50" />
        </div>
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="px-5 py-4 border-b border-gray-50">
            <Skeleton className="h-4 w-full bg-gray-50" />
          </div>
        ))}
      </div>
    </div>
  );
}
