import { getProjectMembers, getProjectLabels } from "@/lib/queries/projects";
import { TaskForm } from "@/components/tasks/task-form";

export default async function NewTaskPage({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const { projectId } = await params;
  const [members, labels] = await Promise.all([
    getProjectMembers(projectId),
    getProjectLabels(projectId),
  ]);

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-xl font-bold font-heading text-gray-800 mb-6">New Task</h2>
      <div className="bg-white/70 backdrop-blur-sm border border-sky-100 rounded-2xl p-6 shadow-sm">
        <TaskForm projectId={projectId} members={members} labels={labels} />
      </div>
    </div>
  );
}
