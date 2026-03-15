"use client";

import Link from "next/link";
import { TaskStatusBadge } from "./task-status-badge";
import { TaskPriorityBadge } from "./task-priority-badge";
import { TaskComments } from "./task-comments";
import { deleteTask, updateTaskStatus } from "@/lib/actions/tasks";
import { TASK_STATUSES } from "@/lib/constants";
import { format } from "date-fns";
import { Pencil, Trash2, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface Props {
  task: {
    id: string;
    task_number: number;
    title: string;
    description: string;
    status: "open" | "in_progress" | "in_review" | "done" | "closed";
    priority: "low" | "medium" | "high" | "critical";
    assignee: { id: string; display_name: string; avatar_url: string | null } | null;
    creator: { id: string; display_name: string } | null;
    start_date: string | null;
    due_date: string | null;
    created_at: string;
    updated_at: string;
    task_labels: { label_id: string; labels: { id: string; name: string; color: string } | null }[];
    subtasks: {
      id: string;
      title: string;
      task_number: number;
      status: string;
      priority: string;
      assignee_id: string | null;
    }[];
  };
  comments: {
    id: string;
    content: string;
    created_at: string;
    user: { id: string; display_name: string; avatar_url: string | null } | null;
  }[];
  members: unknown[];
  labels: unknown[];
  projectId: string;
  projectKey: string;
}

export function TaskDetail({ task, comments, projectId, projectKey }: Props) {
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm("このタスクを削除しますか？")) return;
    const result = await deleteTask(task.id, projectId);
    if (result?.error) {
      toast.error(result.error);
    } else {
      toast.success("タスクを削除しました");
      router.push(`/projects/${projectId}/tasks`);
    }
  };

  const handleStatusChange = async (status: string) => {
    await updateTaskStatus(task.id, projectId, status);
    toast.success("ステータスを更新しました");
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Link
          href={`/projects/${projectId}/tasks`}
          className="text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft size={20} />
        </Link>
        <span className="text-slate-500 text-sm">
          {projectKey}-{task.task_number}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-slate-900/40 border border-white/5 rounded-2xl p-6">
            <div className="flex items-start justify-between mb-4">
              <h1 className="text-xl font-bold text-white">{task.title}</h1>
              <div className="flex gap-2">
                <Link
                  href={`/projects/${projectId}/tasks/${task.id}/edit`}
                  className="p-2 rounded-lg hover:bg-white/5 text-slate-400 hover:text-white transition-colors"
                >
                  <Pencil size={16} />
                </Link>
                <button
                  onClick={handleDelete}
                  className="p-2 rounded-lg hover:bg-rose-500/10 text-slate-400 hover:text-rose-400 transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
            {task.description && (
              <p className="text-slate-300 text-sm whitespace-pre-wrap">
                {task.description}
              </p>
            )}
          </div>

          {/* Subtasks */}
          {task.subtasks.length > 0 && (
            <div className="bg-slate-900/40 border border-white/5 rounded-2xl p-6">
              <h2 className="text-sm font-semibold text-slate-300 mb-3">
                Subtasks ({task.subtasks.length})
              </h2>
              <div className="space-y-2">
                {task.subtasks.map((sub) => (
                  <Link
                    key={sub.id}
                    href={`/projects/${projectId}/tasks/${sub.id}`}
                    className="flex items-center justify-between py-2 px-3 rounded-xl hover:bg-white/5 transition-colors"
                  >
                    <span className="text-sm text-white">
                      <span className="text-slate-500">#{sub.task_number}</span>{" "}
                      {sub.title}
                    </span>
                    <TaskStatusBadge status={sub.status as "open"} />
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Comments */}
          <div className="bg-slate-900/40 border border-white/5 rounded-2xl p-6">
            <h2 className="text-sm font-semibold text-slate-300 mb-4">
              Comments ({comments.length})
            </h2>
            <TaskComments
              comments={comments}
              taskId={task.id}
              projectId={projectId}
            />
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <div className="bg-slate-900/40 border border-white/5 rounded-2xl p-5 space-y-4">
            <div>
              <span className="text-xs text-slate-500 block mb-1">Status</span>
              <select
                value={task.status}
                onChange={(e) => handleStatusChange(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-800/50 border border-white/10 text-sm text-white focus:outline-none cursor-pointer"
              >
                {TASK_STATUSES.map((s) => (
                  <option key={s.value} value={s.value}>
                    {s.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <span className="text-xs text-slate-500 block mb-1">Priority</span>
              <TaskPriorityBadge priority={task.priority} />
            </div>

            <div>
              <span className="text-xs text-slate-500 block mb-1">Assignee</span>
              {task.assignee ? (
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-[10px] text-white">
                    {task.assignee.display_name.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-sm text-white">
                    {task.assignee.display_name}
                  </span>
                </div>
              ) : (
                <span className="text-sm text-slate-500">未割り当て</span>
              )}
            </div>

            {task.start_date && (
              <div>
                <span className="text-xs text-slate-500 block mb-1">Start Date</span>
                <span className="text-sm text-white">
                  {format(new Date(task.start_date), "yyyy/MM/dd")}
                </span>
              </div>
            )}

            {task.due_date && (
              <div>
                <span className="text-xs text-slate-500 block mb-1">Due Date</span>
                <span
                  className={`text-sm ${
                    new Date(task.due_date) < new Date() &&
                    task.status !== "done" &&
                    task.status !== "closed"
                      ? "text-rose-400"
                      : "text-white"
                  }`}
                >
                  {format(new Date(task.due_date), "yyyy/MM/dd")}
                </span>
              </div>
            )}

            {task.task_labels.length > 0 && (
              <div>
                <span className="text-xs text-slate-500 block mb-1">Labels</span>
                <div className="flex flex-wrap gap-1">
                  {task.task_labels.map((tl) =>
                    tl.labels ? (
                      <span
                        key={tl.label_id}
                        className="px-2 py-0.5 rounded text-xs text-white/80"
                        style={{ backgroundColor: tl.labels.color + "30" }}
                      >
                        {tl.labels.name}
                      </span>
                    ) : null
                  )}
                </div>
              </div>
            )}

            <div>
              <span className="text-xs text-slate-500 block mb-1">Created</span>
              <span className="text-sm text-slate-400">
                {format(new Date(task.created_at), "yyyy/MM/dd HH:mm")}
              </span>
              {task.creator && (
                <span className="text-xs text-slate-500 block">
                  by {task.creator.display_name}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
