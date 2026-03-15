import { cache } from "react";
import { createClient } from "@/lib/supabase/server";
import type { Database } from "@/lib/supabase/database.types";

type TaskStatus = Database["public"]["Tables"]["tasks"]["Row"]["status"];
type TaskPriority = Database["public"]["Tables"]["tasks"]["Row"]["priority"];

export async function getTasks(
  projectId: string,
  filters?: {
    status?: string;
    priority?: string;
    assignee_id?: string;
    search?: string;
  }
) {
  const supabase = await createClient();
  let query = supabase
    .from("tasks")
    .select(
      `
      *,
      assignee:profiles!tasks_assignee_id_fkey(id, display_name, avatar_url),
      task_labels(label_id, labels!task_labels_label_id_fkey(id, name, color))
    `
    )
    .eq("project_id", projectId)
    .is("parent_task_id", null)
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });

  if (filters?.status) {
    query = query.eq("status", filters.status as TaskStatus);
  }
  if (filters?.priority) {
    query = query.eq("priority", filters.priority as TaskPriority);
  }
  if (filters?.assignee_id) {
    query = query.eq("assignee_id", filters.assignee_id);
  }
  if (filters?.search) {
    query = query.ilike("title", `%${filters.search}%`);
  }

  const { data, error } = await query;
  if (error) return [];
  return data;
}

export const getTask = cache(async (taskId: string) => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("tasks")
    .select(
      `
      *,
      assignee:profiles!tasks_assignee_id_fkey(id, display_name, avatar_url),
      creator:profiles!tasks_created_by_fkey(id, display_name, avatar_url),
      task_labels(label_id, labels!task_labels_label_id_fkey(id, name, color))
    `
    )
    .eq("id", taskId)
    .single();

  if (error) return null;
  return data;
});

// 親タスクを別クエリで取得
export async function getParentTask(parentTaskId: string | null) {
  if (!parentTaskId) return null;
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("tasks")
    .select("id, title, task_number, project_id")
    .eq("id", parentTaskId)
    .single();

  if (error) return null;
  return data;
}

// サブタスクを別クエリで取得（自己参照FK問題回避）
export async function getSubtasks(parentTaskId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("tasks")
    .select(
      `
      id, title, task_number, status, priority, assignee_id,
      assignee:profiles!tasks_assignee_id_fkey(id, display_name, avatar_url)
    `
    )
    .eq("parent_task_id", parentTaskId)
    .order("created_at", { ascending: true });

  if (error) return [];
  return data;
}

export async function getTaskComments(taskId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("task_comments")
    .select(
      `
      *,
      user:profiles!task_comments_user_id_fkey(id, display_name, avatar_url)
    `
    )
    .eq("task_id", taskId)
    .order("created_at", { ascending: true });

  if (error) return [];
  return data;
}

export async function getTasksForBoard(projectId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("tasks")
    .select(
      `
      *,
      assignee:profiles!tasks_assignee_id_fkey(id, display_name, avatar_url),
      task_labels(label_id, labels!task_labels_label_id_fkey(id, name, color))
    `
    )
    .eq("project_id", projectId)
    .is("parent_task_id", null)
    .order("sort_order", { ascending: true });

  if (error) return [];
  return data;
}

export async function getTasksForGantt(projectId: string) {
  const supabase = await createClient();
  const { data: tasks, error: tasksError } = await supabase
    .from("tasks")
    .select(
      `
      *,
      assignee:profiles!tasks_assignee_id_fkey(id, display_name, avatar_url)
    `
    )
    .eq("project_id", projectId)
    .is("parent_task_id", null)
    .not("start_date", "is", null)
    .order("start_date", { ascending: true });

  if (tasksError) return { tasks: [], dependencies: [] };

  const { data: dependencies, error: depsError } = await supabase
    .from("task_dependencies")
    .select("*")
    .in(
      "predecessor_id",
      (tasks ?? []).map((t) => t.id)
    );

  if (depsError) return { tasks: tasks ?? [], dependencies: [] };

  return { tasks: tasks ?? [], dependencies: dependencies ?? [] };
}
