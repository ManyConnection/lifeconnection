"use client";

import { getStatusConfig } from "@/lib/constants";
import Link from "next/link";

interface Props {
  task: {
    id: string;
    title: string;
    status: "open" | "in_progress" | "in_review" | "done" | "closed";
  };
  left: number;
  width: number;
  projectId: string;
}

const statusGradients: Record<string, string> = {
  open: "from-slate-500 to-slate-600",
  in_progress: "from-cyan-500 to-cyan-600",
  in_review: "from-violet-500 to-violet-600",
  done: "from-emerald-500 to-emerald-600",
  closed: "from-slate-600 to-slate-700",
};

export function GanttTaskBar({ task, left, width, projectId }: Props) {
  const gradient = statusGradients[task.status] ?? statusGradients.open;

  return (
    <Link
      href={`/projects/${projectId}/tasks/${task.id}`}
      className={`absolute top-2 h-7 rounded-lg bg-gradient-to-r ${gradient} flex items-center px-2 text-[10px] text-white font-medium truncate hover:brightness-110 transition-all cursor-pointer shadow-sm`}
      style={{ left, width: Math.max(width, 30) }}
      title={task.title}
    >
      {width > 60 ? task.title : ""}
    </Link>
  );
}
