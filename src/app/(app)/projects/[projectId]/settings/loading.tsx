import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {Array.from({ length: 3 }).map((_, i) => (
        <Skeleton key={i} className="h-48 w-full rounded-2xl bg-white border border-gray-100" />
      ))}
    </div>
  );
}
