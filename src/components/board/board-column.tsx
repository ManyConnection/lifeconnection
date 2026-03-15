"use client";

import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { TaskCard } from "@/components/tasks/task-card";
import { getStatusConfig } from "@/lib/constants";
import type { Database } from "@/lib/supabase/database.types";

type TaskStatus = Database["public"]["Enums"]["task_status"];

interface Task {
  id: string;
  task_number: number;
  title: string;
  status: TaskStatus;
  priority: "low" | "medium" | "high" | "critical";
  assignee: { id: string; display_name: string; avatar_url: string | null } | null;
  task_labels: { label_id: string; labels: { id: string; name: string; color: string } | null }[];
}

export function BoardColumn({
  status,
  tasks,
  projectId,
}: {
  status: TaskStatus;
  tasks: Task[];
  projectId: string;
}) {
  const { setNodeRef, isOver } = useDroppable({ id: status });
  const config = getStatusConfig(status);

  return (
    <div
      ref={setNodeRef}
      className={`flex flex-col min-h-[300px] w-72 shrink-0 rounded-2xl border transition-all ${
        isOver
          ? "bg-sky-50 border-sky-300 shadow-sm"
          : "bg-white/50 border-sky-100"
      }`}
    >
      <div className="flex items-center gap-2 px-4 py-3 border-b border-sky-100">
        <span className={`w-2 h-2 rounded-full ${config.dotColor}`} />
        <span className={`text-sm font-medium ${config.color}`}>
          {config.label}
        </span>
        <span className="text-xs text-gray-400 ml-auto">{tasks.length}</span>
      </div>
      <SortableContext
        items={tasks.map((t) => t.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="flex-1 p-2 space-y-2 overflow-y-auto">
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} projectId={projectId} />
          ))}
        </div>
      </SortableContext>
    </div>
  );
}
