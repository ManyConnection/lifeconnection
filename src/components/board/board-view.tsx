"use client";

import { useState } from "react";
import {
  DndContext,
  DragOverlay,
  closestCorners,
  PointerSensor,
  useSensor,
  useSensors,
  type DragStartEvent,
  type DragEndEvent,
} from "@dnd-kit/core";
import { BoardColumn } from "./board-column";
import { TaskCard } from "@/components/tasks/task-card";
import { updateTaskSortOrder } from "@/lib/actions/tasks";
import { TASK_STATUSES } from "@/lib/constants";
import type { Database } from "@/lib/supabase/database.types";

type TaskStatus = Database["public"]["Enums"]["task_status"];

interface Task {
  id: string;
  task_number: number;
  title: string;
  status: TaskStatus;
  priority: "low" | "medium" | "high" | "critical";
  sort_order: number;
  assignee: { id: string; display_name: string; avatar_url: string | null } | null;
  task_labels: { label_id: string; labels: { id: string; name: string; color: string } | null }[];
}

export function BoardView({
  tasks: initialTasks,
  projectId,
}: {
  tasks: Task[];
  projectId: string;
}) {
  const [tasks, setTasks] = useState(initialTasks);
  const [activeTask, setActiveTask] = useState<Task | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } })
  );

  const handleDragStart = (event: DragStartEvent) => {
    const task = tasks.find((t) => t.id === event.active.id);
    if (task) setActiveTask(task);
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    setActiveTask(null);
    const { active, over } = event;
    if (!over) return;

    const taskId = active.id as string;
    const overStatus = over.id as string;

    // Determine target status - if dropped on another task, find its status
    let targetStatus: TaskStatus;
    const overTask = tasks.find((t) => t.id === overStatus);
    if (overTask) {
      targetStatus = overTask.status;
    } else {
      targetStatus = overStatus as TaskStatus;
    }

    const task = tasks.find((t) => t.id === taskId);
    if (!task || task.status === targetStatus) return;

    // Optimistic update
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, status: targetStatus } : t))
    );

    await updateTaskSortOrder(taskId, task.sort_order, targetStatus, projectId);
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="flex gap-4 overflow-x-auto pb-4">
        {TASK_STATUSES.map((status) => (
          <BoardColumn
            key={status.value}
            status={status.value}
            tasks={tasks.filter((t) => t.status === status.value)}
            projectId={projectId}
          />
        ))}
      </div>
      <DragOverlay>
        {activeTask ? (
          <div className="rotate-3">
            <TaskCard task={activeTask} projectId={projectId} />
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
