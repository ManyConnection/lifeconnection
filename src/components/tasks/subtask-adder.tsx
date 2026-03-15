"use client";

import { useState } from "react";
import { createTask } from "@/lib/actions/tasks";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function SubtaskAdder({
  projectId,
  parentTaskId,
}: {
  projectId: string;
  parentTaskId: string;
}) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    setLoading(true);
    const result = await createTask(projectId, {
      title: title.trim(),
      parent_task_id: parentTaskId,
    });
    if (result?.error) {
      toast.error(result.error);
    } else {
      toast.success("サブタスクを追加しました");
      setTitle("");
      setOpen(false);
      router.refresh();
    }
    setLoading(false);
  };

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 w-full py-2.5 px-4 rounded-2xl border-2 border-dashed border-gray-200 text-sm text-gray-400 hover:text-sky-500 hover:border-sky-300 transition-all cursor-pointer"
      >
        <Plus size={16} />
        サブタスクを追加
      </button>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        autoFocus
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="サブタスクのタイトル"
        className="flex-1 px-4 py-2.5 rounded-2xl bg-gray-50 border border-gray-200 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:border-sky-400"
        onKeyDown={(e) => {
          if (e.key === "Escape") {
            setOpen(false);
            setTitle("");
          }
        }}
      />
      <button
        type="submit"
        disabled={loading || !title.trim()}
        className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-sky-500 to-teal-500 text-white text-sm font-semibold disabled:opacity-50 cursor-pointer"
      >
        {loading ? "..." : "追加"}
      </button>
      <button
        type="button"
        onClick={() => {
          setOpen(false);
          setTitle("");
        }}
        className="px-3 py-2.5 rounded-2xl text-sm text-gray-400 hover:text-gray-600 cursor-pointer"
      >
        取消
      </button>
    </form>
  );
}
