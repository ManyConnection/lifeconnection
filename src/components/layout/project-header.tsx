"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { List, Columns3, GanttChart, Settings } from "lucide-react";

const tabs = [
  { href: "tasks", label: "Tasks", icon: List },
  { href: "board", label: "Board", icon: Columns3 },
  { href: "gantt", label: "Gantt", icon: GanttChart },
  { href: "settings", label: "Settings", icon: Settings },
];

export function ProjectHeader({
  project,
}: {
  project: { id: string; name: string; key: string; color: string };
}) {
  const pathname = usePathname();
  const basePath = `/projects/${project.id}`;

  return (
    <div className="mb-6">
      <div className="flex items-center gap-4 mb-5">
        <div
          className="w-10 h-10 rounded-2xl flex items-center justify-center text-white text-sm font-bold shadow-md"
          style={{ backgroundColor: project.color }}
        >
          {project.key.charAt(0)}
        </div>
        <div>
          <h1 className="text-2xl font-extrabold font-heading text-gray-800">{project.name}</h1>
          <p className="text-[11px] text-gray-400 font-medium tracking-wide">{project.key}</p>
        </div>
      </div>
      <nav className="flex gap-1 bg-gray-100/60 rounded-2xl p-1 w-fit">
        {tabs.map((tab) => {
          const fullPath = `${basePath}/${tab.href}`;
          const isActive = pathname.startsWith(fullPath);
          return (
            <Link
              key={tab.href}
              href={fullPath}
              className={`flex items-center gap-2 px-4 py-2 text-[13px] font-semibold rounded-xl transition-all cursor-pointer ${
                isActive
                  ? "bg-white text-gray-800 shadow-sm"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              <tab.icon size={15} />
              {tab.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
