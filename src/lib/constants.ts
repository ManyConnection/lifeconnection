import type { Database } from "@/lib/supabase/database.types";

type TaskStatus = Database["public"]["Enums"]["task_status"];
type TaskPriority = Database["public"]["Enums"]["task_priority"];

// --- Config types for per-project customization ---

export type StatusConfigItem = { label: string; enabled: boolean };
export type PriorityConfigItem = { label: string; enabled: boolean };
export type StatusConfig = Partial<Record<TaskStatus, StatusConfigItem>>;
export type PriorityConfig = Partial<Record<TaskPriority, PriorityConfigItem>>;

// --- Default definitions ---

export const TASK_STATUSES: {
  value: TaskStatus;
  label: string;
  color: string;
  bgColor: string;
  dotColor: string;
}[] = [
  {
    value: "open",
    label: "Open",
    color: "text-gray-500",
    bgColor: "bg-gray-100 border-gray-200",
    dotColor: "bg-gray-400",
  },
  {
    value: "in_progress",
    label: "In Progress",
    color: "text-sky-600",
    bgColor: "bg-sky-50 border-sky-200",
    dotColor: "bg-sky-400",
  },
  {
    value: "in_review",
    label: "In Review",
    color: "text-violet-600",
    bgColor: "bg-violet-50 border-violet-200",
    dotColor: "bg-violet-400",
  },
  {
    value: "done",
    label: "Done",
    color: "text-emerald-600",
    bgColor: "bg-emerald-50 border-emerald-200",
    dotColor: "bg-emerald-400",
  },
  {
    value: "closed",
    label: "Closed",
    color: "text-gray-400",
    bgColor: "bg-gray-50 border-gray-200",
    dotColor: "bg-gray-400",
  },
];

export const TASK_PRIORITIES: {
  value: TaskPriority;
  label: string;
  color: string;
  bgColor: string;
}[] = [
  {
    value: "low",
    label: "Low",
    color: "text-gray-500",
    bgColor: "bg-gray-100 border-gray-200",
  },
  {
    value: "medium",
    label: "Medium",
    color: "text-amber-600",
    bgColor: "bg-amber-50 border-amber-200",
  },
  {
    value: "high",
    label: "High",
    color: "text-orange-600",
    bgColor: "bg-orange-50 border-orange-200",
  },
  {
    value: "critical",
    label: "Critical",
    color: "text-rose-600",
    bgColor: "bg-rose-50 border-rose-200",
  },
];

export const PROJECT_COLORS = [
  "#0ea5e9", // sky
  "#14b8a6", // teal
  "#8b5cf6", // violet
  "#06b6d4", // cyan
  "#10b981", // emerald
  "#f59e0b", // amber
  "#3b82f6", // blue
  "#f97316", // orange
];

// --- Helpers that merge project config with defaults ---

export function getProjectStatuses(statusConfig?: StatusConfig | null) {
  return TASK_STATUSES
    .filter((s) => {
      const override = statusConfig?.[s.value];
      return override ? override.enabled !== false : true;
    })
    .map((s) => {
      const override = statusConfig?.[s.value];
      return override?.label ? { ...s, label: override.label } : s;
    });
}

export function getProjectPriorities(priorityConfig?: PriorityConfig | null) {
  return TASK_PRIORITIES
    .filter((p) => {
      const override = priorityConfig?.[p.value];
      return override ? override.enabled !== false : true;
    })
    .map((p) => {
      const override = priorityConfig?.[p.value];
      return override?.label ? { ...p, label: override.label } : p;
    });
}

export function getStatusConfig(status: TaskStatus, statusConfig?: StatusConfig | null) {
  const base = TASK_STATUSES.find((s) => s.value === status) ?? TASK_STATUSES[0];
  const override = statusConfig?.[status];
  return override?.label ? { ...base, label: override.label } : base;
}

export function getPriorityConfig(priority: TaskPriority, priorityConfig?: PriorityConfig | null) {
  const base = TASK_PRIORITIES.find((p) => p.value === priority) ?? TASK_PRIORITIES[1];
  const override = priorityConfig?.[priority];
  return override?.label ? { ...base, label: override.label } : base;
}
