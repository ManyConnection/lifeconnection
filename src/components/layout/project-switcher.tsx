"use client";

import { usePathname, useRouter } from "next/navigation";
import { ChevronDown, Plus, LayoutDashboard } from "lucide-react";
import { useState, useRef, useEffect } from "react";

interface Project {
  id: string;
  name: string;
  key: string;
  color: string;
}

export function ProjectSwitcher({ projects }: { projects: Project[] }) {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Extract current project from URL
  const projectMatch = pathname.match(/^\/projects\/([^/]+)/);
  const currentProjectId = projectMatch?.[1];
  const currentProject = projects.find((p) => p.id === currentProjectId);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const navigate = (path: string) => {
    setOpen(false);
    router.push(path);
  };

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer"
      >
        {currentProject ? (
          <>
            <div
              className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-xs font-bold shadow-sm"
              style={{ backgroundColor: currentProject.color }}
            >
              {currentProject.key.charAt(0)}
            </div>
            <span className="text-sm font-semibold text-gray-700 max-w-[160px] truncate">
              {currentProject.name}
            </span>
          </>
        ) : (
          <>
            <div className="w-7 h-7 rounded-lg bg-gray-100 flex items-center justify-center">
              <LayoutDashboard size={14} className="text-gray-400" />
            </div>
            <span className="text-sm font-semibold text-gray-500">
              {pathname.startsWith("/dashboard") ? "Dashboard" : "Select project"}
            </span>
          </>
        )}
        <ChevronDown size={14} className="text-gray-400" />
      </button>

      {open && (
        <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-50">
          {/* Dashboard */}
          <button
            onClick={() => navigate("/dashboard")}
            className={`flex items-center gap-3 w-full px-4 py-2.5 text-left text-sm transition-colors cursor-pointer ${
              pathname === "/dashboard"
                ? "bg-sky-50 text-sky-600 font-semibold"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            <LayoutDashboard size={16} />
            Dashboard
          </button>

          <div className="border-t border-gray-100 my-1.5" />

          <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest px-4 py-1.5">
            Projects
          </p>

          {projects.map((project) => (
            <button
              key={project.id}
              onClick={() => navigate(`/projects/${project.id}/tasks`)}
              className={`flex items-center gap-3 w-full px-4 py-2.5 text-left text-sm transition-colors cursor-pointer ${
                currentProjectId === project.id
                  ? "bg-sky-50 text-sky-600 font-semibold"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <div
                className="w-6 h-6 rounded-md flex items-center justify-center text-white text-[10px] font-bold"
                style={{ backgroundColor: project.color }}
              >
                {project.key.charAt(0)}
              </div>
              <span className="truncate">{project.name}</span>
              <span className="text-[10px] text-gray-400 ml-auto">{project.key}</span>
            </button>
          ))}

          <div className="border-t border-gray-100 my-1.5" />

          <button
            onClick={() => navigate("/projects/new")}
            className="flex items-center gap-3 w-full px-4 py-2.5 text-left text-sm text-gray-400 hover:text-sky-500 hover:bg-gray-50 transition-colors cursor-pointer"
          >
            <Plus size={16} />
            新規プロジェクト
          </button>
        </div>
      )}
    </div>
  );
}
