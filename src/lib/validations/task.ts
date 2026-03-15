import { z } from "zod";

export const taskSchema = z.object({
  title: z.string().min(1, "タイトルを入力してください"),
  description: z.string().optional(),
  status: z.enum(["open", "in_progress", "in_review", "done", "closed"]).optional(),
  priority: z.enum(["low", "medium", "high", "critical"]).optional(),
  assignee_id: z.string().nullable().optional(),
  parent_task_id: z.string().nullable().optional(),
  start_date: z.string().nullable().optional(),
  due_date: z.string().nullable().optional(),
  label_ids: z.array(z.string()).optional(),
});

export type TaskInput = z.infer<typeof taskSchema>;

export const commentSchema = z.object({
  content: z.string().min(1, "コメントを入力してください"),
});

export type CommentInput = z.infer<typeof commentSchema>;
