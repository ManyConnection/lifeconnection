"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function createLabel(
  projectId: string,
  data: { name: string; color: string }
) {
  const supabase = await createClient();
  const { error } = await supabase.from("labels").insert({
    project_id: projectId,
    name: data.name,
    color: data.color,
  });

  if (error) {
    if (error.code === "23505") {
      return { error: "このラベル名は既に使用されています" };
    }
    return { error: "ラベルの作成に失敗しました" };
  }

  revalidatePath(`/projects/${projectId}`);
  return { success: true };
}

export async function deleteLabel(labelId: string, projectId: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("labels").delete().eq("id", labelId);

  if (error) {
    return { error: "ラベルの削除に失敗しました" };
  }

  revalidatePath(`/projects/${projectId}`);
  return { success: true };
}
