import { getProject, getProjectMembers, getProjectLabels } from "@/lib/queries/projects";
import { ProjectSettingsForm } from "@/components/projects/project-settings-form";
import { notFound } from "next/navigation";

export default async function ProjectSettingsPage({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const { projectId } = await params;

  const [project, members, labels] = await Promise.all([
    getProject(projectId).catch(() => null),
    getProjectMembers(projectId).catch(() => []),
    getProjectLabels(projectId).catch(() => []),
  ]);

  if (!project) return notFound();

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <ProjectSettingsForm project={project} members={members} labels={labels} />
    </div>
  );
}
