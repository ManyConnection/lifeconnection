import { getTask } from "@/lib/queries/tasks";
import { getProjectMembers, getProjectLabels, getProject } from "@/lib/queries/projects";
import { TaskForm } from "@/components/tasks/task-form";
import { notFound } from "next/navigation";
import type { StatusConfig, PriorityConfig } from "@/lib/constants";

export default async function EditTaskPage({
  params,
}: {
  params: Promise<{ projectId: string; taskId: string }>;
}) {
  const { projectId, taskId } = await params;

  const [task, members, labels, project] = await Promise.all([
    getTask(taskId).catch(() => null),
    getProjectMembers(projectId).catch(() => []),
    getProjectLabels(projectId).catch(() => []),
    getProject(projectId).catch(() => null),
  ]);

  if (!task) return notFound();

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-xl font-extrabold font-heading text-gray-800 mb-6">Edit Task</h2>
      <div className="bg-white rounded-3xl p-7 shadow-sm border border-gray-100">
        <TaskForm
          projectId={projectId}
          members={members}
          labels={labels}
          task={task}
          statusConfig={project?.status_config as StatusConfig | null}
          priorityConfig={project?.priority_config as PriorityConfig | null}
        />
      </div>
    </div>
  );
}
