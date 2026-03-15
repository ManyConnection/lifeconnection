"use client";

import Link from "next/link";
import { TaskStatusBadge } from "./task-status-badge";

import { TaskComments } from "./task-comments";
import { SubtaskAdder } from "./subtask-adder";
import { deleteTask, updateTaskStatus, updateTask } from "@/lib/actions/tasks";
import { TASK_STATUSES, TASK_PRIORITIES } from "@/lib/constants";
import { format } from "date-fns";
import { Pencil, Trash2, ArrowLeft, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface Subtask {
  id: string;
  title: string;
  task_number: number;
  status: string;
  priority: string;
  assignee_id: string | null;
  assignee: { id: string; display_name: string; avatar_url: string | null } | null;
}

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
    parent_task_id: string | null;
    start_date: string | null;
    due_date: string | null;
    created_at: string;
    updated_at: string;
    task_labels: { label_id: string; labels: { id: string; name: string; color: string } | null }[];
  };
  subtasks: Subtask[];
  parentTask: { id: string; title: string; task_number: number; project_id: string } | null;
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

export function TaskDetail({ task, subtasks, parentTask, comments, projectId, projectKey }: Props) {
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

  const handlePriorityChange = async (priority: string) => {
    const result = await updateTask(task.id, projectId, { priority });
    if (result?.error) {
      toast.error(result.error);
    } else {
      toast.success("優先度を更新しました");
      router.refresh();
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Link
          href={parentTask ? `/projects/${projectId}/tasks/${parentTask.id}` : `/projects/${projectId}/tasks`}
          className="text-gray-300 hover:text-sky-500 transition-colors cursor-pointer"
        >
          <ArrowLeft size={20} />
        </Link>
        <div className="flex items-center gap-2">
          {parentTask && (
            <>
              <Link
                href={`/projects/${projectId}/tasks/${parentTask.id}`}
                className="text-gray-400 text-xs hover:text-sky-500 transition-colors cursor-pointer"
              >
                #{parentTask.task_number} {parentTask.title}
              </Link>
              <span className="text-gray-300">/</span>
            </>
          )}
          <span className="text-gray-400 text-sm font-bold">
            {projectKey}-{task.task_number}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-5">
          <div className="bg-white rounded-3xl p-7 shadow-sm border border-gray-100">
            <div className="flex items-start justify-between mb-4">
              <h1 className="text-xl font-extrabold font-heading text-gray-800">{task.title}</h1>
              <div className="flex gap-1.5">
                <Link
                  href={`/projects/${projectId}/tasks/${task.id}/edit`}
                  className="p-2 rounded-xl hover:bg-gray-50 text-gray-300 hover:text-sky-500 transition-colors cursor-pointer"
                >
                  <Pencil size={16} />
                </Link>
                <button
                  onClick={handleDelete}
                  className="p-2 rounded-xl hover:bg-rose-50 text-gray-300 hover:text-rose-500 transition-colors cursor-pointer"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
            {task.description && (
              <p className="text-gray-600 text-sm whitespace-pre-wrap leading-relaxed">
                {task.description}
              </p>
            )}
          </div>

          {/* Subtasks */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                Subtasks ({subtasks.length})
              </h2>
              <Link
                href={`/projects/${projectId}/tasks/new?parent=${task.id}`}
                className="flex items-center gap-1.5 text-xs font-semibold text-sky-500 hover:text-sky-600 transition-colors cursor-pointer"
              >
                <Plus size={14} />
                詳細作成
              </Link>
            </div>
            {subtasks.length > 0 && (
              <div className="space-y-1.5 mb-4">
                {subtasks.map((sub) => (
                  <Link
                    key={sub.id}
                    href={`/projects/${projectId}/tasks/${sub.id}`}
                    className="flex items-center justify-between py-2.5 px-4 rounded-2xl hover:bg-gray-50 transition-colors cursor-pointer"
                  >
                    <span className="text-sm font-medium text-gray-700">
                      <span className="text-gray-300 font-bold">#{sub.task_number}</span>{" "}
                      {sub.title}
                    </span>
                    <TaskStatusBadge status={sub.status as "open"} />
                  </Link>
                ))}
              </div>
            )}
            <SubtaskAdder projectId={projectId} parentTaskId={task.id} />
          </div>

          {/* Comments */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-5">
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
        <div>
          <div className="bg-white rounded-3xl p-6 space-y-5 shadow-sm border border-gray-100 sticky top-24">
            <div>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-2">Status</span>
              <select
                value={task.status}
                onChange={(e) => handleStatusChange(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-2xl bg-gray-50 border border-gray-100 text-sm text-gray-700 focus:outline-none cursor-pointer font-medium"
              >
                {TASK_STATUSES.map((s) => (
                  <option key={s.value} value={s.value}>
                    {s.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-2">Priority</span>
              <select
                value={task.priority}
                onChange={(e) => handlePriorityChange(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-2xl bg-gray-50 border border-gray-100 text-sm text-gray-700 focus:outline-none cursor-pointer font-medium"
              >
                {TASK_PRIORITIES.map((p) => (
                  <option key={p.value} value={p.value}>
                    {p.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-2">Assignee</span>
              {task.assignee ? (
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-sky-400 to-teal-400 flex items-center justify-center text-[10px] font-bold text-white ring-2 ring-white">
                    {task.assignee.display_name.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-sm font-medium text-gray-700">
                    {task.assignee.display_name}
                  </span>
                </div>
              ) : (
                <span className="text-sm text-gray-400">未割り当て</span>
              )}
            </div>

            {task.start_date && (
              <div>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-2">Start Date</span>
                <span className="text-sm font-medium text-gray-700">
                  {format(new Date(task.start_date), "yyyy/MM/dd")}
                </span>
              </div>
            )}

            {task.due_date && (
              <div>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-2">Due Date</span>
                <span
                  className={`text-sm font-medium ${
                    new Date(task.due_date) < new Date() &&
                    task.status !== "done" &&
                    task.status !== "closed"
                      ? "text-rose-500"
                      : "text-gray-700"
                  }`}
                >
                  {format(new Date(task.due_date), "yyyy/MM/dd")}
                </span>
              </div>
            )}

            {task.task_labels.length > 0 && (
              <div>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-2">Labels</span>
                <div className="flex flex-wrap gap-1.5">
                  {task.task_labels.map((tl) =>
                    tl.labels ? (
                      <span
                        key={tl.label_id}
                        className="px-2.5 py-1 rounded-full text-xs font-medium text-gray-600"
                        style={{ backgroundColor: tl.labels.color + "18" }}
                      >
                        {tl.labels.name}
                      </span>
                    ) : null
                  )}
                </div>
              </div>
            )}

            <div className="pt-3 border-t border-gray-50">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-2">Created</span>
              <span className="text-sm text-gray-500">
                {format(new Date(task.created_at), "yyyy/MM/dd HH:mm")}
              </span>
              {task.creator && (
                <span className="text-xs text-gray-400 block mt-0.5">
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
