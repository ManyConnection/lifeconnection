import { getProjectMembers, getProjectLabels, getProject } from "@/lib/queries/projects";
import { getTask } from "@/lib/queries/tasks";
import { TaskForm } from "@/components/tasks/task-form";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { StatusConfig, PriorityConfig } from "@/lib/constants";

export default async function NewTaskPage({
  params,
  searchParams,
}: {
  params: Promise<{ projectId: string }>;
  searchParams: Promise<{ parent?: string }>;
}) {
  const { projectId } = await params;
  const { parent: parentId } = await searchParams;

  const [members, labels, project] = await Promise.all([
    getProjectMembers(projectId),
    getProjectLabels(projectId),
    getProject(projectId),
  ]);

  const parentTask = parentId ? await getTask(parentId) : null;

  return (
    <div className="max-w-2xl mx-auto">
      {parentTask && (
        <Link
          href={`/projects/${projectId}/tasks/${parentTask.id}`}
          className="flex items-center gap-2 text-sm text-gray-400 hover:text-sky-500 mb-4 transition-colors cursor-pointer"
        >
          <ArrowLeft size={16} />
          #{parentTask.task_number} {parentTask.title} のサブタスク
        </Link>
      )}
      <h2 className="text-xl font-extrabold font-heading text-gray-800 mb-6">
        {parentTask ? "New Subtask" : "New Task"}
      </h2>
      <div className="bg-white rounded-3xl p-7 shadow-sm border border-gray-100">
        <TaskForm
          projectId={projectId}
          members={members}
          labels={labels}
          parentTaskId={parentId}
          statusConfig={project?.status_config as StatusConfig | null}
          priorityConfig={project?.priority_config as PriorityConfig | null}
        />
      </div>
    </div>
  );
}
