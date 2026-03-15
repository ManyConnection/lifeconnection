"use client";

import { useState, useEffect, useCallback } from "react";
import { TaskStatusBadge } from "@/components/tasks/task-status-badge";
import { TaskPriorityBadge } from "@/components/tasks/task-priority-badge";
import { updateTaskStatus, updateTask } from "@/lib/actions/tasks";
import { createComment, deleteComment } from "@/lib/actions/comments";
import { createClient } from "@/lib/supabase/client";
import { TASK_STATUSES, TASK_PRIORITIES } from "@/lib/constants";
import { format } from "date-fns";
import { X, Send, Trash2, ExternalLink, MessageSquare } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface Task {
  id: string;
  task_number: number;
  title: string;
  status: "open" | "in_progress" | "in_review" | "done" | "closed";
  priority: "low" | "medium" | "high" | "critical";
  start_date: string | null;
  due_date: string | null;
  description: string;
  assignee: { id: string; display_name: string } | null;
}

interface Comment {
  id: string;
  content: string;
  created_at: string;
  user: { id: string; display_name: string; avatar_url: string | null } | null;
}

export function GanttTaskModal({
  task: initialTask,
  projectId,
  onClose,
}: {
  task: Task;
  projectId: string;
  onClose: () => void;
}) {
  const router = useRouter();
  const [task, setTask] = useState(initialTask);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loadingComments, setLoadingComments] = useState(true);
  const [newComment, setNewComment] = useState("");
  const [sendingComment, setSendingComment] = useState(false);

  // Fetch comments on mount
  const fetchComments = useCallback(async () => {
    const supabase = createClient();
    const { data } = await supabase
      .from("task_comments")
      .select("*, user:profiles!task_comments_user_id_fkey(id, display_name, avatar_url)")
      .eq("task_id", initialTask.id)
      .order("created_at", { ascending: true });
    setComments(data ?? []);
    setLoadingComments(false);
  }, [initialTask.id]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  // Close on Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  const handleStatusChange = async (status: string) => {
    setTask((prev) => ({ ...prev, status: status as Task["status"] }));
    await updateTaskStatus(task.id, projectId, status);
    router.refresh();
    toast.success("ステータスを更新しました");
  };

  const handlePriorityChange = async (priority: string) => {
    setTask((prev) => ({ ...prev, priority: priority as Task["priority"] }));
    await updateTask(task.id, projectId, { priority });
    router.refresh();
    toast.success("優先度を更新しました");
  };

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    setSendingComment(true);
    const result = await createComment(task.id, projectId, newComment.trim());
    if (result?.error) {
      toast.error(result.error);
    } else {
      setNewComment("");
      await fetchComments();
    }
    setSendingComment(false);
  };

  const handleDeleteComment = async (commentId: string) => {
    await deleteComment(commentId, task.id, projectId);
    setComments((prev) => prev.filter((c) => c.id !== commentId));
    toast.success("コメントを削除しました");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-end" onClick={onClose}>
      {/* Backdrop */}
      <div className="absolute inset-0 bg-gray-900/30 backdrop-blur-sm" />

      {/* Slide-in Panel */}
      <div
        className="relative bg-white h-full w-full max-w-lg shadow-2xl border-l border-gray-100 overflow-y-auto animate-in slide-in-from-right duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white/90 backdrop-blur-sm border-b border-gray-100 px-6 py-4 flex items-center justify-between z-10">
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-gray-300">#{task.task_number}</span>
            <Link
              href={`/projects/${projectId}/tasks/${task.id}`}
              className="text-gray-400 hover:text-sky-500 transition-colors cursor-pointer"
              title="タスク詳細ページへ"
            >
              <ExternalLink size={14} />
            </Link>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-gray-300 hover:text-gray-500 hover:bg-gray-50 transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        <div className="px-6 py-5 space-y-6">
          {/* Title */}
          <h2 className="text-lg font-extrabold font-heading text-gray-800">
            {task.title}
          </h2>

          {/* Description */}
          {task.description && (
            <p className="text-sm text-gray-600 whitespace-pre-wrap leading-relaxed">
              {task.description}
            </p>
          )}

          {/* Editable fields */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Status</span>
              <select
                value={task.status}
                onChange={(e) => handleStatusChange(e.target.value)}
                className="px-3 py-1.5 rounded-xl bg-gray-50 border border-gray-100 text-sm text-gray-700 focus:outline-none cursor-pointer font-medium"
              >
                {TASK_STATUSES.map((s) => (
                  <option key={s.value} value={s.value}>{s.label}</option>
                ))}
              </select>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Priority</span>
              <select
                value={task.priority}
                onChange={(e) => handlePriorityChange(e.target.value)}
                className="px-3 py-1.5 rounded-xl bg-gray-50 border border-gray-100 text-sm text-gray-700 focus:outline-none cursor-pointer font-medium"
              >
                {TASK_PRIORITIES.map((p) => (
                  <option key={p.value} value={p.value}>{p.label}</option>
                ))}
              </select>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Assignee</span>
              {task.assignee ? (
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-sky-400 to-teal-400 flex items-center justify-center text-[10px] font-bold text-white">
                    {task.assignee.display_name.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-sm text-gray-700">{task.assignee.display_name}</span>
                </div>
              ) : (
                <span className="text-sm text-gray-400">未割り当て</span>
              )}
            </div>

            {(task.start_date || task.due_date) && (
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Period</span>
                <span className="text-sm text-gray-700">
                  {task.start_date && format(new Date(task.start_date), "yyyy/MM/dd")}
                  {task.start_date && task.due_date && " → "}
                  {task.due_date && format(new Date(task.due_date), "yyyy/MM/dd")}
                </span>
              </div>
            )}
          </div>

          {/* Comments */}
          <div className="border-t border-gray-100 pt-5">
            <div className="flex items-center gap-2 mb-4">
              <MessageSquare size={14} className="text-gray-400" />
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                Comments ({comments.length})
              </span>
            </div>

            {loadingComments ? (
              <div className="text-sm text-gray-400 py-4 text-center">読み込み中...</div>
            ) : (
              <div className="space-y-3 mb-4">
                {comments.map((comment) => (
                  <div key={comment.id} className="group">
                    <div className="flex items-start gap-2.5">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-br from-sky-400 to-teal-400 flex items-center justify-center text-[9px] font-bold text-white shrink-0 mt-0.5">
                        {(comment.user?.display_name ?? "?").charAt(0).toUpperCase()}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-semibold text-gray-700">
                            {comment.user?.display_name}
                          </span>
                          <span className="text-[10px] text-gray-400">
                            {format(new Date(comment.created_at), "MM/dd HH:mm")}
                          </span>
                          <button
                            onClick={() => handleDeleteComment(comment.id)}
                            className="opacity-0 group-hover:opacity-100 text-gray-300 hover:text-rose-500 transition-all ml-auto cursor-pointer"
                          >
                            <Trash2 size={11} />
                          </button>
                        </div>
                        <p className="text-sm text-gray-600 mt-0.5 whitespace-pre-wrap">
                          {comment.content}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <form onSubmit={handleAddComment} className="flex gap-2">
              <input
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="コメントを入力..."
                className="flex-1 px-3.5 py-2 rounded-xl bg-gray-50 border border-gray-200 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:border-sky-400"
              />
              <button
                type="submit"
                disabled={sendingComment || !newComment.trim()}
                className="px-3 py-2 rounded-xl bg-sky-50 text-sky-500 hover:bg-sky-100 transition-colors disabled:opacity-50 cursor-pointer"
              >
                <Send size={14} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
