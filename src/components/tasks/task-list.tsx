import { TaskListRow } from "./task-list-row";

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

export function TaskList({
  tasks,
  projectId,
  labels: _labels,
}: {
  tasks: Task[];
  projectId: string;
  labels: { id: string; name: string; color: string }[];
}) {
  if (tasks.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-gray-400">タスクがありません</p>
      </div>
    );
  }

  return (
    <div className="bg-white/70 backdrop-blur-sm border border-sky-100 rounded-2xl overflow-hidden shadow-sm">
      <div className="grid grid-cols-[1fr_120px_100px_120px_100px] gap-2 px-4 py-3 text-xs font-medium text-gray-400 border-b border-sky-100">
        <span>Task</span>
        <span>Status</span>
        <span>Priority</span>
        <span>Assignee</span>
        <span>Due</span>
      </div>
      {tasks.map((task) => (
        <TaskListRow key={task.id} task={task} projectId={projectId} />
      ))}
    </div>
  );
}
