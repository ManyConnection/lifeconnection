import { format } from "date-fns";
import Link from "next/link";
import { TaskPriorityBadge } from "@/components/tasks/task-priority-badge";

interface OverdueTask {
  id: string;
  title: string;
  task_number: number;
  due_date: string | null;
  priority: string;
  project?: { id: string; name: string; key: string; color?: string } | null;
}

export function OverdueTasksList({ tasks }: { tasks: OverdueTask[] }) {
  return (
    <div className="space-y-2">
      {tasks.map((task) => (
        <Link
          key={task.id}
          href={
            task.project
              ? `/projects/${task.project.id}/tasks/${task.id}`
              : "#"
          }
          className="flex items-center justify-between py-2 px-3 rounded-xl hover:bg-rose-50 transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-3 min-w-0">
            <div className="min-w-0">
              <p className="text-sm text-gray-700 truncate">
                {task.project && (
                  <span className="text-gray-400">{task.project.key}-{task.task_number} </span>
                )}
                {task.title}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <TaskPriorityBadge priority={task.priority as "low" | "medium" | "high" | "critical"} />
            {task.due_date && (
              <span className="text-xs text-rose-500">
                {format(new Date(task.due_date), "MM/dd")}
              </span>
            )}
          </div>
        </Link>
      ))}
    </div>
  );
}
