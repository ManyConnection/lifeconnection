import type { Database } from "@/lib/supabase/database.types";

type TaskStatus = Database["public"]["Enums"]["task_status"];
type TaskPriority = Database["public"]["Enums"]["task_priority"];

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
    color: "text-pink-600",
    bgColor: "bg-pink-50 border-pink-200",
    dotColor: "bg-pink-400",
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
  "#ec4899", // pink
  "#f43f5e", // rose
  "#8b5cf6", // violet
  "#06b6d4", // cyan
  "#10b981", // emerald
  "#f59e0b", // amber
  "#3b82f6", // blue
  "#f97316", // orange
];

export function getStatusConfig(status: TaskStatus) {
  return TASK_STATUSES.find((s) => s.value === status) ?? TASK_STATUSES[0];
}

export function getPriorityConfig(priority: TaskPriority) {
  return TASK_PRIORITIES.find((p) => p.value === priority) ?? TASK_PRIORITIES[1];
}
