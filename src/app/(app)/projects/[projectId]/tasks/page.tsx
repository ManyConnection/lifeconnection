import { getTasks } from "@/lib/queries/tasks";
import { getProjectMembers, getProjectLabels, getProject } from "@/lib/queries/projects";
import { TaskList } from "@/components/tasks/task-list";
import { TaskFilters } from "@/components/tasks/task-filters";
import Link from "next/link";
import { Plus } from "lucide-react";
import type { StatusConfig, PriorityConfig } from "@/lib/constants";

export default async function TasksPage({
  params,
  searchParams,
}: {
  params: Promise<{ projectId: string }>;
  searchParams: Promise<{ status?: string; priority?: string; assignee?: string; q?: string }>;
}) {
  const { projectId } = await params;
  const sp = await searchParams;

  const [tasks, members, labels, project] = await Promise.all([
    getTasks(projectId, {
      status: sp.status,
      priority: sp.priority,
      assignee_id: sp.assignee,
      search: sp.q,
    }),
    getProjectMembers(projectId),
    getProjectLabels(projectId),
    getProject(projectId),
  ]);

  const statusConfig = project?.status_config as StatusConfig | null;
  const priorityConfig = project?.priority_config as PriorityConfig | null;

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <TaskFilters members={members} statusConfig={statusConfig} priorityConfig={priorityConfig} />
        <Link
          href={`/projects/${projectId}/tasks/new`}
          className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-gradient-to-r from-sky-500 to-teal-500 text-white text-sm font-semibold hover:from-sky-600 hover:to-teal-600 transition-all shadow-lg shadow-sky-200/40 cursor-pointer"
        >
          <Plus size={16} />
          New Task
        </Link>
      </div>
      <TaskList tasks={tasks} projectId={projectId} labels={labels} statusConfig={statusConfig} priorityConfig={priorityConfig} />
    </div>
  );
}
