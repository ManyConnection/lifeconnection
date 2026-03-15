"use client";

import Link from "next/link";
import { TaskStatusBadge } from "./task-status-badge";
import { TaskPriorityBadge } from "./task-priority-badge";
import { updateTaskStatus } from "@/lib/actions/tasks";
import { TASK_STATUSES } from "@/lib/constants";
import { format } from "date-fns";

interface Task {
  id: string;
  task_number: number;
  title: string;
  status: "open" | "in_progress" | "in_review" | "done" | "closed";
  priority: "low" | "medium" | "high" | "critical";
  assignee: { id: string; display_name: string; avatar_url: string | null } | null;
  due_date: string | null;
  task_labels: { label_id: string; labels: { id: string; name: string; color: string } | null }[];
  subtasks: { id: string }[];
}

export function TaskListRow({
  task,
  projectId,
}: {
  task: Task;
  projectId: string;
}) {
  const isOverdue =
    task.due_date &&
    new Date(task.due_date) < new Date() &&
    task.status !== "done" &&
    task.status !== "closed";

  const handleStatusChange = async (newStatus: string) => {
    await updateTaskStatus(task.id, projectId, newStatus);
  };

  return (
    <div className="grid grid-cols-[1fr_120px_100px_120px_100px] gap-2 px-4 py-3 border-b border-pink-100 hover:bg-pink-50/30 transition-colors items-center">
      <div className="min-w-0">
        <Link
          href={`/projects/${projectId}/tasks/${task.id}`}
          className="text-sm text-gray-700 hover:text-pink-600 transition-colors truncate block cursor-pointer"
        >
          <span className="text-gray-400 mr-2">#{task.task_number}</span>
          {task.title}
        </Link>
        {task.task_labels.length > 0 && (
          <div className="flex gap-1 mt-1">
            {task.task_labels.map((tl) =>
              tl.labels ? (
                <span
                  key={tl.label_id}
                  className="inline-block px-1.5 py-0.5 rounded text-[10px] text-gray-600"
                  style={{ backgroundColor: tl.labels.color + "20" }}
                >
                  {tl.labels.name}
                </span>
              ) : null
            )}
          </div>
        )}
      </div>

      <div>
        <select
          value={task.status}
          onChange={(e) => handleStatusChange(e.target.value)}
          className="bg-transparent border-none text-xs cursor-pointer focus:outline-none p-0"
        >
          {TASK_STATUSES.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
        <div className="mt-0.5">
          <TaskStatusBadge status={task.status} />
        </div>
      </div>

      <div>
        <TaskPriorityBadge priority={task.priority} />
      </div>

      <div>
        {task.assignee ? (
          <div className="flex items-center gap-1.5">
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-pink-400 to-rose-500 flex items-center justify-center text-[10px] text-white shrink-0">
              {task.assignee.display_name.charAt(0).toUpperCase()}
            </div>
            <span className="text-xs text-gray-500 truncate">
              {task.assignee.display_name}
            </span>
          </div>
        ) : (
          <span className="text-xs text-gray-300">-</span>
        )}
      </div>

      <div>
        {task.due_date ? (
          <span
            className={`text-xs ${isOverdue ? "text-rose-500" : "text-gray-500"}`}
          >
            {format(new Date(task.due_date), "MM/dd")}
          </span>
        ) : (
          <span className="text-xs text-gray-300">-</span>
        )}
      </div>
    </div>
  );
}
