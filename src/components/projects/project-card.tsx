import Link from "next/link";
import { FolderKanban, Users } from "lucide-react";

interface ProjectCardProps {
  project: {
    id: string;
    name: string;
    key: string;
    description: string;
    color: string;
    project_members: { count: number }[];
    tasks: { count: number }[];
  };
}

export function ProjectCard({ project }: ProjectCardProps) {
  const memberCount = project.project_members?.[0]?.count ?? 0;
  const taskCount = project.tasks?.[0]?.count ?? 0;

  return (
    <Link href={`/projects/${project.id}/tasks`} className="group block">
      <div className="bg-slate-900/40 border border-white/5 rounded-2xl p-5 hover:border-white/10 transition-all hover:bg-slate-900/60">
        <div className="flex items-start gap-3 mb-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-sm font-bold shrink-0"
            style={{ backgroundColor: project.color }}
          >
            {project.key.substring(0, 2)}
          </div>
          <div className="min-w-0">
            <h3 className="text-white font-semibold group-hover:text-violet-300 transition-colors truncate">
              {project.name}
            </h3>
            <p className="text-xs text-slate-500">{project.key}</p>
          </div>
        </div>
        {project.description && (
          <p className="text-sm text-slate-400 mb-3 line-clamp-2">
            {project.description}
          </p>
        )}
        <div className="flex items-center gap-4 text-xs text-slate-500">
          <span className="flex items-center gap-1">
            <FolderKanban size={14} />
            {taskCount} tasks
          </span>
          <span className="flex items-center gap-1">
            <Users size={14} />
            {memberCount} members
          </span>
        </div>
      </div>
    </Link>
  );
}
