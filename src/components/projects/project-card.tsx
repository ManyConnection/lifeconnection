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
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-200 overflow-hidden relative">
        {/* Top color accent */}
        <div
          className="absolute top-0 left-0 right-0 h-1 rounded-t-3xl"
          style={{ backgroundColor: project.color }}
        />

        <div className="flex items-start gap-4 mb-3 mt-1">
          <div
            className="w-11 h-11 rounded-2xl flex items-center justify-center text-white text-sm font-bold shrink-0 shadow-md"
            style={{ backgroundColor: project.color }}
          >
            {project.key.substring(0, 2)}
          </div>
          <div className="min-w-0">
            <h3 className="text-gray-800 font-bold text-base group-hover:text-sky-600 transition-colors truncate">
              {project.name}
            </h3>
            <p className="text-[11px] text-gray-400 font-medium tracking-wide">{project.key}</p>
          </div>
        </div>
        {project.description && (
          <p className="text-sm text-gray-500 mb-4 line-clamp-2 leading-relaxed">
            {project.description}
          </p>
        )}
        <div className="flex items-center gap-5 text-xs text-gray-400 font-medium pt-3 border-t border-gray-50">
          <span className="flex items-center gap-1.5">
            <FolderKanban size={13} />
            {taskCount} tasks
          </span>
          <span className="flex items-center gap-1.5">
            <Users size={13} />
            {memberCount} members
          </span>
        </div>
      </div>
    </Link>
  );
}
