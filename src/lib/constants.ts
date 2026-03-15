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
    color: "text-slate-400",
    bgColor: "bg-slate-500/10 border-slate-500/20",
    dotColor: "bg-slate-400",
  },
  {
    value: "in_progress",
    label: "In Progress",
    color: "text-cyan-400",
    bgColor: "bg-cyan-500/10 border-cyan-500/20",
    dotColor: "bg-cyan-400",
  },
  {
    value: "in_review",
    label: "In Review",
    color: "text-violet-400",
    bgColor: "bg-violet-500/10 border-violet-500/20",
    dotColor: "bg-violet-400",
  },
  {
    value: "done",
    label: "Done",
    color: "text-emerald-400",
    bgColor: "bg-emerald-500/10 border-emerald-500/20",
    dotColor: "bg-emerald-400",
  },
  {
    value: "closed",
    label: "Closed",
    color: "text-slate-500",
    bgColor: "bg-slate-600/10 border-slate-600/20",
    dotColor: "bg-slate-500",
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
    color: "text-slate-400",
    bgColor: "bg-slate-500/10 border-slate-500/20",
  },
  {
    value: "medium",
    label: "Medium",
    color: "text-amber-400",
    bgColor: "bg-amber-500/10 border-amber-500/20",
  },
  {
    value: "high",
    label: "High",
    color: "text-orange-400",
    bgColor: "bg-orange-500/10 border-orange-500/20",
  },
  {
    value: "critical",
    label: "Critical",
    color: "text-rose-400",
    bgColor: "bg-rose-500/10 border-rose-500/20",
  },
];

export const PROJECT_COLORS = [
  "#8b5cf6", // violet
  "#06b6d4", // cyan
  "#10b981", // emerald
  "#f59e0b", // amber
  "#ef4444", // red
  "#ec4899", // pink
  "#3b82f6", // blue
  "#f97316", // orange
];

export function getStatusConfig(status: TaskStatus) {
  return TASK_STATUSES.find((s) => s.value === status) ?? TASK_STATUSES[0];
}

export function getPriorityConfig(priority: TaskPriority) {
  return TASK_PRIORITIES.find((p) => p.value === priority) ?? TASK_PRIORITIES[1];
}
