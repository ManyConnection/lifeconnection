import { getTasksForGantt } from "@/lib/queries/tasks";
import { GanttView } from "@/components/gantt/gantt-view";

export default async function GanttPage({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const { projectId } = await params;
  const { tasks, dependencies } = await getTasksForGantt(projectId);

  return <GanttView tasks={tasks} dependencies={dependencies} projectId={projectId} />;
}
