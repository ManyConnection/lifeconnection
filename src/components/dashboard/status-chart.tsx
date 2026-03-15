"use client";

import { TASK_STATUSES } from "@/lib/constants";

export function StatusChart({
  distribution,
  total,
}: {
  distribution: Record<string, number>;
  total: number;
}) {
  if (total === 0) {
    return <p className="text-gray-400 text-sm">データがありません</p>;
  }

  return (
    <div className="space-y-3">
      {TASK_STATUSES.map((status) => {
        const count = distribution[status.value] ?? 0;
        const percentage = total > 0 ? Math.round((count / total) * 100) : 0;
        return (
          <div key={status.value}>
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${status.dotColor}`} />
                <span className="text-xs text-gray-600">{status.label}</span>
              </div>
              <span className="text-xs text-gray-400">
                {count} ({percentage}%)
              </span>
            </div>
            <div className="h-1.5 bg-pink-100 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full ${status.dotColor} transition-all`}
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
