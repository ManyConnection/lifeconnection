import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Skeleton className="h-8 w-16 rounded-lg bg-gray-100" />
        <Skeleton className="h-8 w-16 rounded-lg bg-gray-100" />
        <Skeleton className="h-8 w-16 rounded-lg bg-gray-100" />
      </div>
      <Skeleton className="h-[400px] w-full rounded-2xl bg-white border border-gray-100" />
    </div>
  );
}
