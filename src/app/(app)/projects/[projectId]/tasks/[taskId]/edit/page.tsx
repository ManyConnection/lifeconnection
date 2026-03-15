import { getTask } from "@/lib/queries/tasks";
import { getProjectMembers, getProjectLabels } from "@/lib/queries/projects";
import { TaskForm } from "@/components/tasks/task-form";
import { notFound } from "next/navigation";

export default async function EditTaskPage({
  params,
}: {
  params: Promise<{ projectId: string; taskId: string }>;
}) {
  const { projectId, taskId } = await params;

  const [task, members, labels] = await Promise.all([
    getTask(taskId).catch(() => null),
    getProjectMembers(projectId).catch(() => []),
    getProjectLabels(projectId).catch(() => []),
  ]);

  if (!task) return notFound();

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-xl font-bold font-heading text-gray-800 mb-6">Edit Task</h2>
      <div className="bg-white/70 backdrop-blur-sm border border-sky-100 rounded-2xl p-6 shadow-sm">
        <TaskForm
          projectId={projectId}
          members={members}
          labels={labels}
          task={task}
        />
      </div>
    </div>
  );
}
