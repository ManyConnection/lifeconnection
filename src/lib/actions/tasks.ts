"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { taskSchema } from "@/lib/validations/task";
import type { Database } from "@/lib/supabase/database.types";

export async function createTask(
  projectId: string,
  formData: {
    title: string;
    description?: string;
    status?: string;
    priority?: string;
    assignee_id?: string | null;
    parent_task_id?: string | null;
    start_date?: string | null;
    due_date?: string | null;
    label_ids?: string[];
  }
) {
  const parsed = taskSchema.safeParse(formData);
  if (!parsed.success) {
    return { error: parsed.error.issues[0].message };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "認証が必要です" };

  const { data, error } = await supabase
    .from("tasks")
    .insert({
      project_id: projectId,
      title: parsed.data.title,
      description: parsed.data.description ?? "",
      status: parsed.data.status ?? "open",
      priority: parsed.data.priority ?? "medium",
      assignee_id: parsed.data.assignee_id || null,
      parent_task_id: parsed.data.parent_task_id || null,
      start_date: parsed.data.start_date || null,
      due_date: parsed.data.due_date || null,
      created_by: user.id,
    })
    .select()
    .single();

  if (error) {
    return { error: `タスクの作成に失敗しました: ${error.message}` };
  }

  // Assign labels
  if (parsed.data.label_ids && parsed.data.label_ids.length > 0) {
    await supabase.from("task_labels").insert(
      parsed.data.label_ids.map((labelId) => ({
        task_id: data.id,
        label_id: labelId,
      }))
    );
  }

  revalidatePath(`/projects/${projectId}`);
  revalidatePath("/dashboard");
  return { success: true, data };
}

export async function updateTask(
  taskId: string,
  projectId: string,
  formData: {
    title?: string;
    description?: string;
    status?: string;
    priority?: string;
    assignee_id?: string | null;
    parent_task_id?: string | null;
    start_date?: string | null;
    due_date?: string | null;
    label_ids?: string[];
  }
) {
  const supabase = await createClient();

  const updateData: Database["public"]["Tables"]["tasks"]["Update"] = {};
  if (formData.title !== undefined) updateData.title = formData.title;
  if (formData.description !== undefined) updateData.description = formData.description;
  if (formData.status !== undefined)
    updateData.status = formData.status as Database["public"]["Tables"]["tasks"]["Row"]["status"];
  if (formData.priority !== undefined)
    updateData.priority = formData.priority as Database["public"]["Tables"]["tasks"]["Row"]["priority"];
  if (formData.assignee_id !== undefined) updateData.assignee_id = formData.assignee_id || null;
  if (formData.parent_task_id !== undefined) updateData.parent_task_id = formData.parent_task_id || null;
  if (formData.start_date !== undefined) updateData.start_date = formData.start_date || null;
  if (formData.due_date !== undefined) updateData.due_date = formData.due_date || null;

  const { error } = await supabase
    .from("tasks")
    .update(updateData)
    .eq("id", taskId);

  if (error) {
    return { error: "タスクの更新に失敗しました" };
  }

  // Update labels if provided
  if (formData.label_ids !== undefined) {
    await supabase.from("task_labels").delete().eq("task_id", taskId);
    if (formData.label_ids.length > 0) {
      await supabase.from("task_labels").insert(
        formData.label_ids.map((labelId) => ({
          task_id: taskId,
          label_id: labelId,
        }))
      );
    }
  }

  revalidatePath(`/projects/${projectId}`);
  revalidatePath("/dashboard");
  return { success: true };
}

export async function updateTaskStatus(
  taskId: string,
  projectId: string,
  status: string
) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("tasks")
    .update({ status: status as "open" | "in_progress" | "in_review" | "done" | "closed" })
    .eq("id", taskId);

  if (error) {
    return { error: "ステータスの更新に失敗しました" };
  }

  revalidatePath(`/projects/${projectId}`);
  revalidatePath("/dashboard");
  return { success: true };
}

export async function updateTaskSortOrder(
  taskId: string,
  sortOrder: number,
  status: string,
  projectId: string
) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("tasks")
    .update({
      sort_order: sortOrder,
      status: status as "open" | "in_progress" | "in_review" | "done" | "closed",
    })
    .eq("id", taskId);

  if (error) {
    return { error: "並び順の更新に失敗しました" };
  }

  revalidatePath(`/projects/${projectId}`);
  return { success: true };
}

export async function deleteTask(taskId: string, projectId: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("tasks").delete().eq("id", taskId);

  if (error) {
    return { error: "タスクの削除に失敗しました" };
  }

  revalidatePath(`/projects/${projectId}`);
  revalidatePath("/dashboard");
  return { success: true };
}

export async function updateTaskDates(
  taskId: string,
  projectId: string,
  startDate: string | null,
  dueDate: string | null
) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("tasks")
    .update({ start_date: startDate, due_date: dueDate })
    .eq("id", taskId);

  if (error) {
    return { error: "日付の更新に失敗しました" };
  }

  revalidatePath(`/projects/${projectId}`);
  return { success: true };
}
