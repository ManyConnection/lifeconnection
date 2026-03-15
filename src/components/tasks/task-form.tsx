"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { taskSchema, type TaskInput } from "@/lib/validations/task";
import { createTask, updateTask } from "@/lib/actions/tasks";
import { TASK_STATUSES, TASK_PRIORITIES } from "@/lib/constants";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface Props {
  projectId: string;
  members: {
    user_id: string;
    profiles: { id: string; display_name: string } | null;
  }[];
  labels: { id: string; name: string; color: string }[];
  task?: {
    id: string;
    title: string;
    description: string;
    status: string;
    priority: string;
    assignee_id: string | null;
    parent_task_id: string | null;
    start_date: string | null;
    due_date: string | null;
    task_labels: { label_id: string }[];
  };
}

export function TaskForm({ projectId, members, labels, task }: Props) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedLabels, setSelectedLabels] = useState<string[]>(
    task?.task_labels?.map((tl) => tl.label_id) ?? []
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TaskInput>({
    resolver: zodResolver(taskSchema),
    defaultValues: task
      ? {
          title: task.title,
          description: task.description,
          status: task.status as TaskInput["status"],
          priority: task.priority as TaskInput["priority"],
          assignee_id: task.assignee_id,
          start_date: task.start_date,
          due_date: task.due_date,
        }
      : { status: "open", priority: "medium" },
  });

  const toggleLabel = (labelId: string) => {
    setSelectedLabels((prev) =>
      prev.includes(labelId)
        ? prev.filter((id) => id !== labelId)
        : [...prev, labelId]
    );
  };

  const onSubmit = async (data: TaskInput) => {
    setLoading(true);
    setError(null);

    const payload = { ...data, label_ids: selectedLabels };

    if (task) {
      const result = await updateTask(task.id, projectId, payload);
      if (result?.error) {
        setError(result.error);
        setLoading(false);
        return;
      }
      toast.success("タスクを更新しました");
      router.push(`/projects/${projectId}/tasks/${task.id}`);
    } else {
      const result = await createTask(projectId, payload);
      if (result?.error) {
        setError(result.error);
        setLoading(false);
        return;
      }
      toast.success("タスクを作成しました");
      router.push(`/projects/${projectId}/tasks`);
    }
  };

  const inputClass =
    "w-full px-4 py-2.5 rounded-xl bg-slate-900/60 border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/50";
  const selectClass = `${inputClass} appearance-none cursor-pointer`;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {error && (
        <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400 text-sm">
          {error}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-slate-300 mb-1.5">タイトル</label>
        <input {...register("title")} className={inputClass} placeholder="タスクのタイトル" />
        {errors.title && <p className="text-rose-400 text-xs mt-1">{errors.title.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-300 mb-1.5">説明</label>
        <textarea
          {...register("description")}
          rows={4}
          className={`${inputClass} resize-none`}
          placeholder="タスクの詳細説明（任意）"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1.5">ステータス</label>
          <select {...register("status")} className={selectClass}>
            {TASK_STATUSES.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1.5">優先度</label>
          <select {...register("priority")} className={selectClass}>
            {TASK_PRIORITIES.map((p) => (
              <option key={p.value} value={p.value}>
                {p.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-300 mb-1.5">担当者</label>
        <select {...register("assignee_id")} className={selectClass}>
          <option value="">未割り当て</option>
          {members.map((m) => (
            <option key={m.user_id} value={m.user_id}>
              {m.profiles?.display_name}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1.5">開始日</label>
          <input type="date" {...register("start_date")} className={inputClass} />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1.5">期限</label>
          <input type="date" {...register("due_date")} className={inputClass} />
        </div>
      </div>

      {labels.length > 0 && (
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1.5">ラベル</label>
          <div className="flex flex-wrap gap-2">
            {labels.map((label) => (
              <button
                key={label.id}
                type="button"
                onClick={() => toggleLabel(label.id)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all border ${
                  selectedLabels.includes(label.id)
                    ? "border-white/20 bg-white/10 text-white"
                    : "border-white/5 bg-white/5 text-slate-400 hover:bg-white/10"
                }`}
              >
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: label.color }}
                />
                {label.name}
              </button>
            ))}
          </div>
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full py-2.5 rounded-xl bg-gradient-to-r from-violet-500 to-indigo-600 text-white font-medium hover:from-violet-600 hover:to-indigo-700 transition-all disabled:opacity-50"
      >
        {loading ? (task ? "更新中..." : "作成中...") : task ? "タスクを更新" : "タスクを作成"}
      </button>
    </form>
  );
}
