"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FolderKanban,
  List,
  Columns3,
  GanttChart,
  Settings,
  Menu,
  X,
  Heart,
  Plus,
} from "lucide-react";
import { useState } from "react";

const globalNav = [
  { href: "/dashboard", label: "ダッシュボード", icon: LayoutDashboard },
  { href: "/projects", label: "プロジェクト一覧", icon: FolderKanban },
];

const projectNav = [
  { href: "tasks", label: "タスク", icon: List },
  { href: "board", label: "ボード", icon: Columns3 },
  { href: "gantt", label: "ガントチャート", icon: GanttChart },
  { href: "settings", label: "設定", icon: Settings },
];

export function AppSidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Detect if we're inside a project
  const projectMatch = pathname.match(/^\/projects\/([^/]+)/);
  const projectId = projectMatch?.[1];
  const isInProject = !!projectId && projectId !== "new";

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="fixed top-5 left-5 z-50 lg:hidden p-2.5 rounded-full bg-white border border-gray-200 text-sky-500 shadow-lg shadow-sky-100 cursor-pointer"
      >
        {mobileOpen ? <X size={18} /> : <Menu size={18} />}
      </button>

      {/* Backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-gray-900/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 h-full w-[240px] bg-white border-r border-gray-100 transition-transform duration-300 lg:translate-x-0 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo */}
        <div className="px-5 pt-7 pb-6">
          <Link href="/dashboard" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-sky-400 to-teal-400 flex items-center justify-center shadow-lg shadow-sky-200/60">
              <Heart size={18} className="text-white fill-white" />
            </div>
            <div>
              <span className="text-base font-extrabold font-heading text-gray-800 block leading-tight">
                Life
              </span>
              <span className="text-[11px] font-medium text-sky-500 tracking-wider uppercase">
                Connection
              </span>
            </div>
          </Link>
        </div>

        <nav className="px-3 space-y-1">
          {/* Global nav */}
          <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest px-3 mb-2">
            Menu
          </p>
          {globalNav.map((item) => {
            const isActive =
              item.href === "/projects"
                ? pathname === "/projects"
                : pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-2xl text-[13px] font-semibold transition-all cursor-pointer ${
                  isActive && !isInProject
                    ? "bg-gradient-to-r from-sky-50 to-teal-50 text-sky-600 shadow-sm"
                    : "text-gray-400 hover:text-gray-700 hover:bg-gray-50"
                }`}
              >
                <item.icon size={18} strokeWidth={isActive && !isInProject ? 2.5 : 2} />
                {item.label}
              </Link>
            );
          })}

          {/* Project nav - only when inside a project */}
          {isInProject && (
            <>
              <div className="border-t border-gray-100 my-4" />
              <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest px-3 mb-2">
                Views
              </p>
              {projectNav.map((item) => {
                const fullPath = `/projects/${projectId}/${item.href}`;
                const isActive = pathname.startsWith(fullPath);
                return (
                  <Link
                    key={item.href}
                    href={fullPath}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center gap-3 px-4 py-2.5 rounded-2xl text-[13px] font-semibold transition-all cursor-pointer ${
                      isActive
                        ? "bg-gradient-to-r from-sky-50 to-teal-50 text-sky-600 shadow-sm"
                        : "text-gray-400 hover:text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <item.icon size={18} strokeWidth={isActive ? 2.5 : 2} />
                    {item.label}
                  </Link>
                );
              })}

              {/* Quick add task */}
              <Link
                href={`/projects/${projectId}/tasks/new`}
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-3 px-4 py-2.5 rounded-2xl text-[13px] font-semibold text-gray-400 hover:text-sky-500 hover:bg-sky-50/50 transition-all cursor-pointer mt-2"
              >
                <Plus size={18} />
                タスク追加
              </Link>
            </>
          )}
        </nav>
      </aside>
    </>
  );
}
