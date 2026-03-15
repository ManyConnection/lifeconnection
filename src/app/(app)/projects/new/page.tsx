import { ProjectForm } from "@/components/projects/project-form";

export default function NewProjectPage() {
  return (
    <div className="max-w-lg mx-auto">
      <h1 className="text-2xl font-bold text-white mb-6">New Project</h1>
      <div className="bg-slate-900/40 border border-white/5 rounded-2xl p-6">
        <ProjectForm />
      </div>
    </div>
  );
}
