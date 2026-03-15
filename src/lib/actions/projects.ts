"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { projectSchema } from "@/lib/validations/project";

export async function createProject(formData: {
  name: string;
  key: string;
  description?: string;
  color?: string;
}) {
  const parsed = projectSchema.safeParse(formData);
  if (!parsed.success) {
    return { error: parsed.error.issues[0].message };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "認証が必要です" };

  const { data, error } = await supabase
    .from("projects")
    .insert({
      name: parsed.data.name,
      key: parsed.data.key,
      description: parsed.data.description ?? "",
      color: parsed.data.color ?? "#8b5cf6",
      owner_id: user.id,
    })
    .select()
    .single();

  if (error) {
    if (error.code === "23505") {
      return { error: "このプロジェクトキーは既に使用されています" };
    }
    return { error: "プロジェクトの作成に失敗しました" };
  }

  revalidatePath("/projects");
  revalidatePath("/dashboard");
  redirect(`/projects/${data.id}/tasks`);
}

export async function updateProject(
  projectId: string,
  formData: {
    name: string;
    key: string;
    description?: string;
    color?: string;
  }
) {
  const parsed = projectSchema.safeParse(formData);
  if (!parsed.success) {
    return { error: parsed.error.issues[0].message };
  }

  const supabase = await createClient();
  const { error } = await supabase
    .from("projects")
    .update({
      name: parsed.data.name,
      key: parsed.data.key,
      description: parsed.data.description ?? "",
      color: parsed.data.color ?? "#8b5cf6",
    })
    .eq("id", projectId);

  if (error) {
    return { error: "プロジェクトの更新に失敗しました" };
  }

  revalidatePath(`/projects/${projectId}`);
  revalidatePath("/projects");
  revalidatePath("/dashboard");
  return { success: true };
}

export async function deleteProject(projectId: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("projects").delete().eq("id", projectId);

  if (error) {
    return { error: "プロジェクトの削除に失敗しました" };
  }

  revalidatePath("/projects");
  revalidatePath("/dashboard");
  redirect("/projects");
}

export async function addProjectMember(
  projectId: string,
  email: string,
  role: "admin" | "member" | "viewer"
) {
  const supabase = await createClient();

  // Find user by email via profiles
  const { data: profiles } = await supabase
    .from("profiles")
    .select("id, display_name")
    .ilike("display_name", `%${email}%`);

  if (!profiles || profiles.length === 0) {
    return { error: "ユーザーが見つかりません" };
  }

  const { error } = await supabase.from("project_members").insert({
    project_id: projectId,
    user_id: profiles[0].id,
    role,
  });

  if (error) {
    if (error.code === "23505") {
      return { error: "このユーザーは既にメンバーです" };
    }
    return { error: "メンバーの追加に失敗しました" };
  }

  revalidatePath(`/projects/${projectId}/settings`);
  return { success: true };
}

export async function removeProjectMember(projectId: string, memberId: string) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("project_members")
    .delete()
    .eq("id", memberId);

  if (error) {
    return { error: "メンバーの削除に失敗しました" };
  }

  revalidatePath(`/projects/${projectId}/settings`);
  return { success: true };
}
