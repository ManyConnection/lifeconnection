import { getProjects } from "@/lib/queries/projects";
import { ProjectCard } from "@/components/projects/project-card";
import Link from "next/link";
import { Plus } from "lucide-react";

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-extrabold font-heading text-gray-800">Projects</h1>
          <p className="text-sm text-gray-400 mt-1">プロジェクト一覧</p>
        </div>
        <Link
          href="/projects/new"
          className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-gradient-to-r from-sky-500 to-teal-500 text-white text-sm font-semibold hover:from-sky-600 hover:to-teal-600 transition-all shadow-lg shadow-sky-200/40 cursor-pointer"
        >
          <Plus size={16} />
          New Project
        </Link>
      </div>

      {projects.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="w-20 h-20 rounded-3xl bg-gray-50 border-2 border-dashed border-gray-200 flex items-center justify-center mb-5">
            <Plus size={28} className="text-gray-300" />
          </div>
          <p className="text-gray-400 mb-5 text-sm">まだプロジェクトがありません</p>
          <Link
            href="/projects/new"
            className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-sky-500 to-teal-500 text-white text-sm font-semibold shadow-lg shadow-sky-200/40 cursor-pointer"
          >
            最初のプロジェクトを作成
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </div>
  );
}
