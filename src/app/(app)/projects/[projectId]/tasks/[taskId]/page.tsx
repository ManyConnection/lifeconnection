import { getTask, getTaskComments } from "@/lib/queries/tasks";
import { getProjectMembers, getProjectLabels, getProject } from "@/lib/queries/projects";
import { TaskDetail } from "@/components/tasks/task-detail";
import { notFound } from "next/navigation";

export default async function TaskDetailPage({
  params,
}: {
  params: Promise<{ projectId: string; taskId: string }>;
}) {
  const { projectId, taskId } = await params;

  const task = await getTask(taskId).catch(() => null);
  const project = await getProject(projectId).catch(() => null);

  if (!task || !project) {
    notFound();
  }

  const [comments, members, labels] = await Promise.all([
    getTaskComments(taskId).catch(() => [] as Awaited<ReturnType<typeof getTaskComments>>),
    getProjectMembers(projectId).catch(() => [] as Awaited<ReturnType<typeof getProjectMembers>>),
    getProjectLabels(projectId).catch(() => [] as Awaited<ReturnType<typeof getProjectLabels>>),
  ]);

  return (
    <TaskDetail
      task={task}
      comments={comments}
      members={members}
      labels={labels}
      projectId={projectId}
      projectKey={project.key}
    />
  );
}
