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
    <div className="border-b border-white/5">
      <div className="px-6 lg:px-8 pt-6 pb-0">
        <div className="flex items-center gap-3 mb-4">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm font-bold"
            style={{ backgroundColor: project.color }}
          >
            {project.key.charAt(0)}
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">{project.name}</h1>
            <p className="text-xs text-slate-500">{project.key}</p>
          </div>
        </div>
        <nav className="flex gap-1">
          {tabs.map((tab) => {
            const fullPath = `${basePath}/${tab.href}`;
            const isActive = pathname.startsWith(fullPath);
            return (
              <Link
                key={tab.href}
                href={fullPath}
                className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-t-lg transition-colors border-b-2 ${
                  isActive
                    ? "border-violet-500 text-white bg-white/5"
                    : "border-transparent text-slate-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <tab.icon size={16} />
                {tab.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
