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
      <h2 className="text-xl font-extrabold font-heading text-gray-800 mb-6">New Task</h2>
      <div className="bg-white rounded-3xl p-7 shadow-sm border border-gray-100">
        <TaskForm projectId={projectId} members={members} labels={labels} />
      </div>
    </div>
  );
}
