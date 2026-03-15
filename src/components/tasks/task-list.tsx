import { TaskListRow } from "./task-list-row";
import type { StatusConfig, PriorityConfig } from "@/lib/constants";

interface Task {
  id: string;
  task_number: number;
  title: string;
  status: "open" | "in_progress" | "in_review" | "done" | "closed";
  priority: "low" | "medium" | "high" | "critical";
  assignee: { id: string; display_name: string; avatar_url: string | null } | null;
  due_date: string | null;
  parent_task_id: string | null;
  task_labels: { label_id: string; labels: { id: string; name: string; color: string } | null }[];
}

export function TaskList({
  tasks,
  projectId,
  labels: _labels,
  statusConfig,
  priorityConfig,
}: {
  tasks: Task[];
  projectId: string;
  labels: { id: string; name: string; color: string }[];
  statusConfig?: StatusConfig | null;
  priorityConfig?: PriorityConfig | null;
}) {
  if (tasks.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-400 text-sm">タスクがありません</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100">
      <div className="grid grid-cols-[1fr_120px_100px_120px_100px_40px] gap-2 px-5 py-3.5 text-[11px] font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100">
        <span>Task</span>
        <span>Status</span>
        <span>Priority</span>
        <span>Assignee</span>
        <span>Due</span>
        <span></span>
      </div>
      {tasks.map((task) => (
        <TaskListRow key={task.id} task={task} projectId={projectId} statusConfig={statusConfig} priorityConfig={priorityConfig} />
      ))}
    </div>
  );
}
