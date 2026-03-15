import { ProjectForm } from "@/components/projects/project-form";

export default function NewProjectPage() {
  return (
    <div className="max-w-lg mx-auto">
      <h1 className="text-2xl font-extrabold font-heading text-gray-800 mb-6">New Project</h1>
      <div className="bg-white rounded-3xl p-7 shadow-sm border border-gray-100">
        <ProjectForm />
      </div>
    </div>
  );
}
