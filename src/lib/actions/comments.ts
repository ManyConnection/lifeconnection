"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function createComment(
  taskId: string,
  projectId: string,
  content: string
) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "認証が必要です" };

  const { error } = await supabase.from("task_comments").insert({
    task_id: taskId,
    user_id: user.id,
    content,
  });

  if (error) {
    return { error: "コメントの投稿に失敗しました" };
  }

  revalidatePath(`/projects/${projectId}/tasks/${taskId}`);
  return { success: true };
}

export async function deleteComment(
  commentId: string,
  taskId: string,
  projectId: string
) {
  const supabase = await createClient();
  const { error } = await supabase.from("task_comments").delete().eq("id", commentId);

  if (error) {
    return { error: "コメントの削除に失敗しました" };
  }

  revalidatePath(`/projects/${projectId}/tasks/${taskId}`);
  return { success: true };
}
