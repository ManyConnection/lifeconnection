"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { TaskPriorityBadge } from "./task-priority-badge";
import { Plus } from "lucide-react";
import Link from "next/link";

interface TaskCardProps {
  task: {
    id: string;
    task_number: number;
    title: string;
    priority: "low" | "medium" | "high" | "critical";
    parent_task_id: string | null;
    assignee: { id: string; display_name: string; avatar_url: string | null } | null;
    task_labels: { label_id: string; labels: { id: string; name: string; color: string } | null }[];
  };
  projectId: string;
}

export function TaskCard({ task, projectId }: TaskCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`group bg-white border border-gray-100 rounded-2xl p-4 cursor-grab active:cursor-grabbing hover:shadow-md transition-all ${
        isDragging ? "opacity-50 shadow-xl rotate-2" : ""
      }`}
    >
      <Link
        href={`/projects/${projectId}/tasks/${task.id}`}
        className="block"
        onClick={(e) => {
          if (isDragging) e.preventDefault();
        }}
      >
        {task.parent_task_id && (
          <span className="text-[9px] font-semibold text-sky-400 bg-sky-50 px-1.5 py-0.5 rounded-md mb-1 inline-block">子チケット</span>
        )}
        <span className="text-[10px] font-bold text-gray-300">#{task.task_number}</span>
        <p className="text-sm font-medium text-gray-700 mt-1 line-clamp-2 leading-snug">{task.title}</p>

        {task.task_labels.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-3">
            {task.task_labels.map((tl) =>
              tl.labels ? (
                <span
                  key={tl.label_id}
                  className="px-2 py-0.5 rounded-full text-[10px] font-medium text-gray-600"
                  style={{ backgroundColor: tl.labels.color + "18" }}
                >
                  {tl.labels.name}
                </span>
              ) : null
            )}
          </div>
        )}

        <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-50">
          <TaskPriorityBadge priority={task.priority} />
          <div className="flex items-center gap-1.5">
            {task.assignee && (
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-sky-400 to-teal-400 flex items-center justify-center text-[10px] font-bold text-white ring-2 ring-white">
                {task.assignee.display_name.charAt(0).toUpperCase()}
              </div>
            )}
          </div>
        </div>
      </Link>
      <Link
        href={`/projects/${projectId}/tasks/new?parent=${task.id}`}
        className="opacity-0 group-hover:opacity-100 flex items-center gap-1.5 mt-2 pt-2 border-t border-dashed border-gray-100 text-[11px] text-gray-400 hover:text-sky-500 transition-all cursor-pointer"
        onClick={(e) => e.stopPropagation()}
      >
        <Plus size={12} />
        子チケット作成
      </Link>
    </div>
  );
}
