import { createClient } from "@/lib/supabase/server";
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
  const supabase = await createClient();

  const { data: project, error } = await supabase
    .from("projects")
    .select("*")
    .eq("id", projectId)
    .single();

  if (error || !project) {
    return notFound();
  }

  return (
    <div>
      <ProjectHeader project={project} />
      <div className="p-6 lg:p-8">{children}</div>
    </div>
  );
}
