import { cache } from "react";
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

  if (error) return [];
  return data;
}

// cache() deduplicates within a single request/render
export const getProject = cache(async (projectId: string) => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("id", projectId)
    .single();

  if (error) return null;
  return data;
});

export const getProjectMembers = cache(async (projectId: string) => {
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

  if (error) return [];
  return data;
});

export const getProjectLabels = cache(async (projectId: string) => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("labels")
    .select("*")
    .eq("project_id", projectId)
    .order("name");

  if (error) return [];
  return data;
});
