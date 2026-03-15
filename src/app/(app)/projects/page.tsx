import { getProjects } from "@/lib/queries/projects";
import { ProjectCard } from "@/components/projects/project-card";
import Link from "next/link";
import { Plus } from "lucide-react";

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold font-heading text-gray-800">Projects</h1>
        <Link
          href="/projects/new"
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-sky-500 to-cyan-500 text-white text-sm font-medium hover:from-sky-600 hover:to-cyan-600 transition-all shadow-md shadow-sky-200 cursor-pointer"
        >
          <Plus size={16} />
          New Project
        </Link>
      </div>

      {projects.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-16 h-16 rounded-2xl bg-sky-50 border border-sky-200 flex items-center justify-center mb-4">
            <Plus size={24} className="text-sky-400" />
          </div>
          <p className="text-gray-400 mb-4">まだプロジェクトがありません</p>
          <Link
            href="/projects/new"
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-sky-500 to-cyan-500 text-white text-sm font-medium shadow-md shadow-sky-200 cursor-pointer"
          >
            最初のプロジェクトを作成
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </div>
  );
}
