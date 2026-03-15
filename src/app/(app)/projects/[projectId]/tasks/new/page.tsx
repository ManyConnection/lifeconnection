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
      <h2 className="text-xl font-bold text-white mb-6">New Task</h2>
      <div className="bg-slate-900/40 border border-white/5 rounded-2xl p-6">
        <TaskForm projectId={projectId} members={members} labels={labels} />
      </div>
    </div>
  );
}
