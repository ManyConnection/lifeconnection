import { getStatusConfig } from "@/lib/constants";
import type { Database } from "@/lib/supabase/database.types";

type TaskStatus = Database["public"]["Enums"]["task_status"];

export function TaskStatusBadge({ status }: { status: TaskStatus }) {
  const config = getStatusConfig(status);
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${config.bgColor} ${config.color}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${config.dotColor}`} />
      {config.label}
    </span>
  );
}
