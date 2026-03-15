import { getPriorityConfig, type PriorityConfig } from "@/lib/constants";
import type { Database } from "@/lib/supabase/database.types";

type TaskPriority = Database["public"]["Enums"]["task_priority"];

export function TaskPriorityBadge({ priority, priorityConfig }: { priority: TaskPriority; priorityConfig?: PriorityConfig | null }) {
  const config = getPriorityConfig(priority, priorityConfig);
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${config.bgColor} ${config.color}`}
    >
      {config.label}
    </span>
  );
}
