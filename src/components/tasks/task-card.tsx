"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { TaskPriorityBadge } from "./task-priority-badge";
import Link from "next/link";

interface TaskCardProps {
  task: {
    id: string;
    task_number: number;
    title: string;
    priority: "low" | "medium" | "high" | "critical";
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
      className={`bg-white border border-sky-100 rounded-xl p-3 cursor-grab active:cursor-grabbing hover:border-sky-300 hover:shadow-sm transition-all ${
        isDragging ? "opacity-50 shadow-lg shadow-sky-200/50" : ""
      }`}
    >
      <Link
        href={`/projects/${projectId}/tasks/${task.id}`}
        className="block"
        onClick={(e) => {
          if (isDragging) e.preventDefault();
        }}
      >
        <span className="text-[10px] text-gray-400">#{task.task_number}</span>
        <p className="text-sm text-gray-700 mt-0.5 line-clamp-2">{task.title}</p>

        {task.task_labels.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            {task.task_labels.map((tl) =>
              tl.labels ? (
                <span
                  key={tl.label_id}
                  className="px-1.5 py-0.5 rounded text-[10px] text-gray-600"
                  style={{ backgroundColor: tl.labels.color + "20" }}
                >
                  {tl.labels.name}
                </span>
              ) : null
            )}
          </div>
        )}

        <div className="flex items-center justify-between mt-2">
          <TaskPriorityBadge priority={task.priority} />
          {task.assignee && (
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-sky-400 to-cyan-500 flex items-center justify-center text-[10px] text-white">
              {task.assignee.display_name.charAt(0).toUpperCase()}
            </div>
          )}
        </div>
      </Link>
    </div>
  );
}
