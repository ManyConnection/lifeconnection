"use client";

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
  open: "from-gray-400 to-gray-500",
  in_progress: "from-sky-400 to-sky-500",
  in_review: "from-violet-400 to-violet-500",
  done: "from-emerald-400 to-emerald-500",
  closed: "from-gray-500 to-gray-600",
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
