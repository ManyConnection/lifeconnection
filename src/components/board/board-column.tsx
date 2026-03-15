"use client";

import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { TaskCard } from "@/components/tasks/task-card";
import { getStatusConfig, type StatusConfig } from "@/lib/constants";
import type { Database } from "@/lib/supabase/database.types";

type TaskStatus = Database["public"]["Enums"]["task_status"];

interface Task {
  id: string;
  task_number: number;
  title: string;
  status: TaskStatus;
  priority: "low" | "medium" | "high" | "critical";
  parent_task_id: string | null;
  assignee: { id: string; display_name: string; avatar_url: string | null } | null;
  task_labels: { label_id: string; labels: { id: string; name: string; color: string } | null }[];
}

export function BoardColumn({
  status,
  tasks,
  projectId,
  statusConfig,
}: {
  status: TaskStatus;
  tasks: Task[];
  projectId: string;
  statusConfig?: StatusConfig | null;
}) {
  const { setNodeRef, isOver } = useDroppable({ id: status });
  const config = getStatusConfig(status, statusConfig);

  return (
    <div
      ref={setNodeRef}
      className={`flex flex-col min-h-[300px] w-72 shrink-0 rounded-3xl border transition-all ${
        isOver
          ? "bg-sky-50/60 border-sky-200 shadow-md"
          : "bg-gray-50/50 border-gray-100"
      }`}
    >
      <div className="flex items-center gap-2.5 px-5 py-4">
        <span className={`w-3 h-3 rounded-full ${config.dotColor}`} />
        <span className="text-sm font-bold text-gray-700">
          {config.label}
        </span>
        <span className="text-[11px] font-bold text-gray-300 bg-gray-100 rounded-full px-2 py-0.5 ml-auto">
          {tasks.length}
        </span>
      </div>
      <SortableContext
        items={tasks.map((t) => t.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="flex-1 px-2.5 pb-3 space-y-2.5 overflow-y-auto">
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} projectId={projectId} />
          ))}
        </div>
      </SortableContext>
    </div>
  );
}
