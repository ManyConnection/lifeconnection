import { getTasksForBoard } from "@/lib/queries/tasks";
import { BoardView } from "@/components/board/board-view";

export default async function BoardPage({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const { projectId } = await params;
  const tasks = await getTasksForBoard(projectId);

  return <BoardView tasks={tasks} projectId={projectId} />;
}
