import { getTask, getTaskComments, getSubtasks, getParentTask } from "@/lib/queries/tasks";
import { getProjectMembers, getProjectLabels, getProject } from "@/lib/queries/projects";
import { TaskDetail } from "@/components/tasks/task-detail";
import { notFound } from "next/navigation";

export default async function TaskDetailPage({
  params,
}: {
  params: Promise<{ projectId: string; taskId: string }>;
}) {
  const { projectId, taskId } = await params;

  const task = await getTask(taskId);
  const project = await getProject(projectId);

  if (!task || !project) return notFound();

  const [comments, members, labels, subtasks, parentTask] = await Promise.all([
    getTaskComments(taskId),
    getProjectMembers(projectId),
    getProjectLabels(projectId),
    getSubtasks(taskId),
    getParentTask(task.parent_task_id),
  ]);

  return (
    <TaskDetail
      task={task}
      comments={comments}
      members={members}
      labels={labels}
      subtasks={subtasks}
      parentTask={parentTask}
      projectId={projectId}
      projectKey={project.key}
      statusConfig={project.status_config as Record<string, { label: string; enabled: boolean }> | null}
      priorityConfig={project.priority_config as Record<string, { label: string; enabled: boolean }> | null}
    />
  );
}
