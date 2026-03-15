"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { projectSchema, type ProjectInput } from "@/lib/validations/project";
import { updateProject, deleteProject } from "@/lib/actions/projects";
import { createLabel, deleteLabel } from "@/lib/actions/labels";
import { PROJECT_COLORS } from "@/lib/constants";
import { Trash2, Plus, X } from "lucide-react";
import { toast } from "sonner";

interface Props {
  project: { id: string; name: string; key: string; description: string; color: string };
  members: {
    id: string;
    role: string;
    profiles: { id: string; display_name: string; avatar_url: string | null } | null;
  }[];
  labels: { id: string; name: string; color: string }[];
}

export function ProjectSettingsForm({ project, members, labels }: Props) {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [newLabelName, setNewLabelName] = useState("");
  const [newLabelColor, setNewLabelColor] = useState("#0ea5e9");

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ProjectInput>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      name: project.name,
      key: project.key,
      description: project.description,
      color: project.color,
    },
  });

  const selectedColor = watch("color");

  const onSubmit = async (data: ProjectInput) => {
    setLoading(true);
    setError(null);
    const result = await updateProject(project.id, data);
    if (result?.error) {
      setError(result.error);
    } else {
      toast.success("プロジェクトを更新しました");
    }
    setLoading(false);
  };

  const handleDelete = async () => {
    if (!confirm("このプロジェクトを削除しますか？この操作は取り消せません。")) return;
    await deleteProject(project.id);
  };

  const handleAddLabel = async () => {
    if (!newLabelName.trim()) return;
    const result = await createLabel(project.id, {
      name: newLabelName.trim(),
      color: newLabelColor,
    });
    if (result?.error) {
      toast.error(result.error);
    } else {
      setNewLabelName("");
      toast.success("ラベルを追加しました");
    }
  };

  const handleDeleteLabel = async (labelId: string) => {
    await deleteLabel(labelId, project.id);
    toast.success("ラベルを削除しました");
  };

  return (
    <div className="space-y-8">
      {/* Project Settings */}
      <div className="bg-white/70 backdrop-blur-sm border border-sky-100 rounded-2xl p-6 shadow-sm">
        <h2 className="text-lg font-semibold font-heading text-gray-800 mb-4">Project Settings</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {error && (
            <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-600 text-sm">
              {error}
            </div>
          )}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1.5">名前</label>
            <input
              {...register("name")}
              className="w-full px-4 py-2.5 rounded-xl bg-white border border-sky-200 text-gray-800 focus:outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400"
            />
            {errors.name && <p className="text-rose-500 text-xs mt-1">{errors.name.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1.5">キー</label>
            <input
              {...register("key")}
              className="w-full px-4 py-2.5 rounded-xl bg-white border border-sky-200 text-gray-800 focus:outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400 uppercase"
            />
            {errors.key && <p className="text-rose-500 text-xs mt-1">{errors.key.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1.5">説明</label>
            <textarea
              {...register("description")}
              rows={3}
              className="w-full px-4 py-2.5 rounded-xl bg-white border border-sky-200 text-gray-800 focus:outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400 resize-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1.5">カラー</label>
            <div className="flex gap-2">
              {PROJECT_COLORS.map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => setValue("color", color)}
                  className={`w-8 h-8 rounded-lg transition-all cursor-pointer ${
                    selectedColor === color
                      ? "ring-2 ring-sky-400 ring-offset-2 ring-offset-white scale-110"
                      : "hover:scale-110"
                  }`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-cyan-500 text-white font-medium hover:from-sky-600 hover:to-cyan-600 transition-all disabled:opacity-50 shadow-md shadow-sky-200 cursor-pointer"
          >
            {loading ? "更新中..." : "更新"}
          </button>
        </form>
      </div>

      {/* Members */}
      <div className="bg-white/70 backdrop-blur-sm border border-sky-100 rounded-2xl p-6 shadow-sm">
        <h2 className="text-lg font-semibold font-heading text-gray-800 mb-4">Members</h2>
        <div className="space-y-2">
          {members.map((m) => (
            <div key={m.id} className="flex items-center justify-between py-2 px-3 rounded-xl bg-sky-50/50">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-sky-400 to-cyan-500 flex items-center justify-center text-xs text-white font-medium">
                  {(m.profiles?.display_name ?? "?").charAt(0).toUpperCase()}
                </div>
                <span className="text-sm text-gray-700">{m.profiles?.display_name}</span>
              </div>
              <span className="text-xs text-gray-400 capitalize">{m.role}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Labels */}
      <div className="bg-white/70 backdrop-blur-sm border border-sky-100 rounded-2xl p-6 shadow-sm">
        <h2 className="text-lg font-semibold font-heading text-gray-800 mb-4">Labels</h2>
        <div className="space-y-2 mb-4">
          {labels.map((label) => (
            <div
              key={label.id}
              className="flex items-center justify-between py-2 px-3 rounded-xl bg-sky-50/50"
            >
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: label.color }} />
                <span className="text-sm text-gray-700">{label.name}</span>
              </div>
              <button
                onClick={() => handleDeleteLabel(label.id)}
                className="text-gray-400 hover:text-rose-500 transition-colors cursor-pointer"
              >
                <X size={14} />
              </button>
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            type="color"
            value={newLabelColor}
            onChange={(e) => setNewLabelColor(e.target.value)}
            className="w-10 h-10 rounded-lg border border-sky-200 bg-transparent cursor-pointer"
          />
          <input
            value={newLabelName}
            onChange={(e) => setNewLabelName(e.target.value)}
            placeholder="新しいラベル名"
            className="flex-1 px-4 py-2.5 rounded-xl bg-white border border-sky-200 text-gray-700 placeholder:text-gray-400 focus:outline-none focus:border-sky-400"
            onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleAddLabel())}
          />
          <button
            onClick={handleAddLabel}
            className="px-3 py-2.5 rounded-xl bg-sky-50 border border-sky-200 text-sky-500 hover:bg-sky-100 transition-colors cursor-pointer"
          >
            <Plus size={16} />
          </button>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="bg-white/70 backdrop-blur-sm border border-rose-200 rounded-2xl p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-rose-500 mb-2">Danger Zone</h2>
        <p className="text-sm text-gray-500 mb-4">
          プロジェクトを削除すると、すべてのタスク、コメント、ラベルが完全に削除されます。
        </p>
        <button
          onClick={handleDelete}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-rose-50 border border-rose-200 text-rose-500 hover:bg-rose-100 transition-colors text-sm cursor-pointer"
        >
          <Trash2 size={16} />
          プロジェクトを削除
        </button>
      </div>
    </div>
  );
}
