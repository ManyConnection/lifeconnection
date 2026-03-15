import { ProjectForm } from "@/components/projects/project-form";

export default function NewProjectPage() {
  return (
    <div className="max-w-lg mx-auto">
      <h1 className="text-2xl font-bold font-heading text-gray-800 mb-6">New Project</h1>
      <div className="bg-white/70 backdrop-blur-sm border border-sky-100 rounded-2xl p-6 shadow-sm">
        <ProjectForm />
      </div>
    </div>
  );
}
