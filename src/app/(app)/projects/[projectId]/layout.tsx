import { getProject } from "@/lib/queries/projects";
import { ProjectHeader } from "@/components/layout/project-header";
import { notFound } from "next/navigation";

export default async function ProjectLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ projectId: string }>;
}) {
  const { projectId } = await params;

  let project;
  try {
    project = await getProject(projectId);
  } catch {
    notFound();
  }

  return (
    <div className="-m-6 lg:-m-8">
      <ProjectHeader project={project} />
      <div className="p-6 lg:p-8">{children}</div>
    </div>
  );
}
