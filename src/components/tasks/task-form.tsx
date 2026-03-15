"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { taskSchema, type TaskInput } from "@/lib/validations/task";
import { createTask, updateTask } from "@/lib/actions/tasks";
import { getProjectStatuses, getProjectPriorities, type StatusConfig, type PriorityConfig } from "@/lib/constants";
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
  parentTaskId?: string;
  statusConfig?: StatusConfig | null;
  priorityConfig?: PriorityConfig | null;
}

export function TaskForm({ projectId, members, labels, task, parentTaskId, statusConfig, priorityConfig }: Props) {
  const router = useRouter();
  const statuses = getProjectStatuses(statusConfig);
  const priorities = getProjectPriorities(priorityConfig);
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

    const payload = {
      ...data,
      label_ids: selectedLabels,
      parent_task_id: parentTaskId ?? task?.parent_task_id ?? null,
    };

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
      if (parentTaskId) {
        router.push(`/projects/${projectId}/tasks/${parentTaskId}`);
      } else {
        router.push(`/projects/${projectId}/tasks`);
      }
    }
  };

  const inputClass =
    "w-full px-4 py-3 rounded-2xl bg-gray-50 border border-gray-200 text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400 focus:bg-white transition-colors";
  const selectClass = `${inputClass} appearance-none cursor-pointer`;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {error && (
        <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-600 text-sm font-medium">
          {error}
        </div>
      )}

      <div>
        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">タイトル</label>
        <input {...register("title")} className={inputClass} placeholder="タスクのタイトル" />
        {errors.title && <p className="text-rose-500 text-xs mt-1">{errors.title.message}</p>}
      </div>

      <div>
        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">説明</label>
        <textarea
          {...register("description")}
          rows={4}
          className={`${inputClass} resize-none`}
          placeholder="タスクの詳細説明（任意）"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">ステータス</label>
          <select {...register("status")} className={selectClass}>
            {statuses.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">優先度</label>
          <select {...register("priority")} className={selectClass}>
            {priorities.map((p) => (
              <option key={p.value} value={p.value}>
                {p.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">担当者</label>
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
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">開始日</label>
          <input type="date" {...register("start_date")} className={inputClass} />
        </div>
        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">期限</label>
          <input type="date" {...register("due_date")} className={inputClass} />
        </div>
      </div>

      {labels.length > 0 && (
        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">ラベル</label>
          <div className="flex flex-wrap gap-2">
            {labels.map((label) => (
              <button
                key={label.id}
                type="button"
                onClick={() => toggleLabel(label.id)}
                className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-2xl text-xs font-semibold transition-all border cursor-pointer ${
                  selectedLabels.includes(label.id)
                    ? "border-sky-300 bg-sky-50 text-sky-700"
                    : "border-gray-200 bg-gray-50 text-gray-500 hover:bg-gray-100"
                }`}
              >
                <div
                  className="w-2.5 h-2.5 rounded-full"
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
        className="w-full py-3 rounded-2xl bg-gradient-to-r from-sky-500 to-teal-500 text-white font-semibold hover:from-sky-600 hover:to-teal-600 transition-all disabled:opacity-50 shadow-lg shadow-sky-200/40 cursor-pointer text-sm"
      >
        {loading ? (task ? "更新中..." : "作成中...") : task ? "タスクを更新" : "タスクを作成"}
      </button>
    </form>
  );
}
