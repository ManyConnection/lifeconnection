import { getPriorityConfig } from "@/lib/constants";
import type { Database } from "@/lib/supabase/database.types";

type TaskPriority = Database["public"]["Enums"]["task_priority"];

export function TaskPriorityBadge({ priority }: { priority: TaskPriority }) {
  const config = getPriorityConfig(priority);
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${config.bgColor} ${config.color}`}
    >
      {config.label}
    </span>
  );
}
