"use client";

import { TaskStatusBadge } from "@/components/tasks/task-status-badge";
import { TaskPriorityBadge } from "@/components/tasks/task-priority-badge";
import { format } from "date-fns";
import { X, ExternalLink } from "lucide-react";
import Link from "next/link";

interface Task {
  id: string;
  task_number: number;
  title: string;
  status: "open" | "in_progress" | "in_review" | "done" | "closed";
  priority: "low" | "medium" | "high" | "critical";
  start_date: string | null;
  due_date: string | null;
  assignee: { id: string; display_name: string } | null;
}

export function GanttTaskModal({
  task,
  projectId,
  onClose,
}: {
  task: Task;
  projectId: string;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" onClick={onClose}>
      {/* Backdrop */}
      <div className="absolute inset-0 bg-gray-900/30 backdrop-blur-sm" />

      {/* Modal */}
      <div
        className="relative bg-white rounded-3xl shadow-2xl border border-gray-100 w-full max-w-md mx-4 p-6 animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-xl text-gray-300 hover:text-gray-500 hover:bg-gray-50 transition-colors cursor-pointer"
        >
          <X size={18} />
        </button>

        {/* Header */}
        <div className="mb-5">
          <span className="text-xs font-bold text-gray-300">#{task.task_number}</span>
          <h2 className="text-lg font-extrabold font-heading text-gray-800 mt-0.5 pr-8">
            {task.title}
          </h2>
        </div>

        {/* Details */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Status</span>
            <TaskStatusBadge status={task.status} />
          </div>

          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Priority</span>
            <TaskPriorityBadge priority={task.priority} />
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
                {task.start_date && format(new Date(task.start_date), "MM/dd")}
                {task.start_date && task.due_date && " → "}
                {task.due_date && format(new Date(task.due_date), "MM/dd")}
              </span>
            </div>
          )}
        </div>

        {/* Action */}
        <div className="mt-6 pt-4 border-t border-gray-100">
          <Link
            href={`/projects/${projectId}/tasks/${task.id}`}
            className="flex items-center justify-center gap-2 w-full py-2.5 rounded-2xl bg-gradient-to-r from-sky-500 to-teal-500 text-white text-sm font-semibold shadow-lg shadow-sky-200/40 cursor-pointer hover:from-sky-600 hover:to-teal-600 transition-all"
          >
            <ExternalLink size={14} />
            詳細を開く
          </Link>
        </div>
      </div>
    </div>
  );
}
