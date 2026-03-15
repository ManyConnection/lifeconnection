import { format } from "date-fns";
import Link from "next/link";
import { TaskPriorityBadge } from "@/components/tasks/task-priority-badge";

interface OverdueTask {
  id: string;
  title: string;
  task_number: number;
  due_date: string | null;
  priority: "low" | "medium" | "high" | "critical";
  project?: { id: string; name: string; key: string } | null;
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
          className="flex items-center justify-between py-2 px-3 rounded-xl hover:bg-white/5 transition-colors"
        >
          <div className="flex items-center gap-3 min-w-0">
            <div className="min-w-0">
              <p className="text-sm text-white truncate">
                {task.project && (
                  <span className="text-slate-500">{task.project.key}-{task.task_number} </span>
                )}
                {task.title}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <TaskPriorityBadge priority={task.priority} />
            {task.due_date && (
              <span className="text-xs text-rose-400">
                {format(new Date(task.due_date), "MM/dd")}
              </span>
            )}
          </div>
        </Link>
      ))}
    </div>
  );
}
