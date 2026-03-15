import { getTasksForBoard } from "@/lib/queries/tasks";
import { getProject } from "@/lib/queries/projects";
import { BoardView } from "@/components/board/board-view";
import type { StatusConfig } from "@/lib/constants";

export default async function BoardPage({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const { projectId } = await params;
  const [tasks, project] = await Promise.all([
    getTasksForBoard(projectId),
    getProject(projectId),
  ]);

  return (
    <BoardView
      tasks={tasks}
      projectId={projectId}
      statusConfig={project?.status_config as StatusConfig | null}
    />
  );
}
