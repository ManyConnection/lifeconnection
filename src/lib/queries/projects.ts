import { createClient } from "@/lib/supabase/server";

export async function getProjects() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("projects")
    .select(
      `
      *,
      project_members(count),
      tasks(count)
    `
    )
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
}

export async function getProject(projectId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("id", projectId)
    .single();

  if (error) throw error;
  return data;
}

export async function getProjectMembers(projectId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("project_members")
    .select(
      `
      *,
      profiles:profiles!project_members_user_id_fkey(id, display_name, avatar_url)
    `
    )
    .eq("project_id", projectId);

  if (error) throw error;
  return data;
}

export async function getProjectLabels(projectId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("labels")
    .select("*")
    .eq("project_id", projectId)
    .order("name");

  if (error) throw error;
  return data;
}
