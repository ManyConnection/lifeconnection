"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { projectSchema, type ProjectInput } from "@/lib/validations/project";
import { updateProject, deleteProject, addProjectMember, removeProjectMember, updateProjectConfig } from "@/lib/actions/projects";
import { createLabel, deleteLabel } from "@/lib/actions/labels";
import { PROJECT_COLORS, TASK_STATUSES, TASK_PRIORITIES, type StatusConfig, type PriorityConfig } from "@/lib/constants";
import { Trash2, Plus, X, UserPlus, RotateCcw } from "lucide-react";
import { toast } from "sonner";

interface Props {
  project: {
    id: string;
    name: string;
    key: string;
    description: string;
    color: string;
    status_config?: unknown;
    priority_config?: unknown;
  };
  members: {
    id: string;
    role: string;
    profiles: { id: string; display_name: string; avatar_url: string | null } | null;
  }[];
  labels: { id: string; name: string; color: string }[];
}

const MEMBER_ROLES = [
  { value: "admin", label: "管理者" },
  { value: "member", label: "メンバー" },
  { value: "viewer", label: "閲覧者" },
] as const;

export function ProjectSettingsForm({ project, members, labels }: Props) {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [newLabelName, setNewLabelName] = useState("");
  const [newLabelColor, setNewLabelColor] = useState("#0ea5e9");
  const [memberSearch, setMemberSearch] = useState("");
  const [memberRole, setMemberRole] = useState<"admin" | "member" | "viewer">("member");
  const [memberLoading, setMemberLoading] = useState(false);

  // Status/Priority config state
  const [statusConfig, setStatusConfig] = useState<StatusConfig>(() => {
    const cfg: StatusConfig = {};
    for (const s of TASK_STATUSES) {
      const override = (project.status_config as StatusConfig)?.[s.value];
      cfg[s.value] = {
        label: override?.label ?? s.label,
        enabled: override?.enabled !== false,
      };
    }
    return cfg;
  });
  const [priorityConfig, setPriorityConfig] = useState<PriorityConfig>(() => {
    const cfg: PriorityConfig = {};
    for (const p of TASK_PRIORITIES) {
      const override = (project.priority_config as PriorityConfig)?.[p.value];
      cfg[p.value] = {
        label: override?.label ?? p.label,
        enabled: override?.enabled !== false,
      };
    }
    return cfg;
  });
  const [configLoading, setConfigLoading] = useState(false);

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

  const handleAddMember = async () => {
    if (!memberSearch.trim()) return;
    setMemberLoading(true);
    const result = await addProjectMember(project.id, memberSearch.trim(), memberRole);
    if (result?.error) {
      toast.error(result.error);
    } else {
      setMemberSearch("");
      toast.success("メンバーを追加しました");
    }
    setMemberLoading(false);
  };

  const handleRemoveMember = async (memberId: string, displayName: string) => {
    if (!confirm(`${displayName} をプロジェクトから削除しますか？`)) return;
    const result = await removeProjectMember(project.id, memberId);
    if (result?.error) {
      toast.error(result.error);
    } else {
      toast.success("メンバーを削除しました");
    }
  };

  const handleSaveConfig = async () => {
    setConfigLoading(true);
    const result = await updateProjectConfig(project.id, {
      status_config: statusConfig,
      priority_config: priorityConfig,
    });
    if (result?.error) {
      toast.error(result.error);
    } else {
      toast.success("ステータス・優先度設定を保存しました");
    }
    setConfigLoading(false);
  };

  const handleResetConfig = () => {
    const sCfg: StatusConfig = {};
    for (const s of TASK_STATUSES) {
      sCfg[s.value] = { label: s.label, enabled: true };
    }
    setStatusConfig(sCfg);
    const pCfg: PriorityConfig = {};
    for (const p of TASK_PRIORITIES) {
      pCfg[p.value] = { label: p.label, enabled: true };
    }
    setPriorityConfig(pCfg);
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

  const inputClass =
    "w-full px-4 py-3 rounded-2xl bg-gray-50 border border-gray-200 text-gray-800 focus:outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400 focus:bg-white transition-colors";

  return (
    <div className="space-y-8">
      {/* Project Settings */}
      <div className="bg-white rounded-3xl p-7 shadow-sm border border-gray-100">
        <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-5">Project Settings</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {error && (
            <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-600 text-sm font-medium">
              {error}
            </div>
          )}
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">名前</label>
            <input {...register("name")} className={inputClass} />
            {errors.name && <p className="text-rose-500 text-xs mt-1">{errors.name.message}</p>}
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">キー</label>
            <input {...register("key")} className={`${inputClass} uppercase`} />
            {errors.key && <p className="text-rose-500 text-xs mt-1">{errors.key.message}</p>}
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">説明</label>
            <textarea {...register("description")} rows={3} className={`${inputClass} resize-none`} />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">カラー</label>
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
            className="px-6 py-3 rounded-2xl bg-gradient-to-r from-sky-500 to-teal-500 text-white font-semibold hover:from-sky-600 hover:to-teal-600 transition-all disabled:opacity-50 shadow-lg shadow-sky-200/40 cursor-pointer text-sm"
          >
            {loading ? "更新中..." : "更新"}
          </button>
        </form>
      </div>

      {/* Status & Priority Config */}
      <div className="bg-white rounded-3xl p-7 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider">ステータス・優先度</h2>
          <button
            onClick={handleResetConfig}
            className="flex items-center gap-1.5 text-[11px] font-semibold text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
          >
            <RotateCcw size={12} />
            デフォルトに戻す
          </button>
        </div>

        {/* Statuses */}
        <div className="mb-6">
          <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">ステータス</p>
          <div className="space-y-2">
            {TASK_STATUSES.map((s) => {
              const cfg = statusConfig[s.value];
              return (
                <div key={s.value} className="flex items-center gap-3 py-2.5 px-4 rounded-2xl bg-gray-50">
                  <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${s.dotColor}`} />
                  <input
                    value={cfg?.label ?? s.label}
                    onChange={(e) =>
                      setStatusConfig((prev) => ({
                        ...prev,
                        [s.value]: { ...prev[s.value]!, label: e.target.value },
                      }))
                    }
                    className="flex-1 bg-transparent text-sm font-medium text-gray-700 focus:outline-none border-b border-transparent focus:border-sky-300 transition-colors"
                  />
                  <label className="flex items-center gap-2 cursor-pointer shrink-0">
                    <input
                      type="checkbox"
                      checked={cfg?.enabled !== false}
                      onChange={(e) =>
                        setStatusConfig((prev) => ({
                          ...prev,
                          [s.value]: { ...prev[s.value]!, enabled: e.target.checked },
                        }))
                      }
                      className="w-4 h-4 rounded border-gray-300 text-sky-500 focus:ring-sky-400 cursor-pointer"
                    />
                    <span className="text-[11px] text-gray-400">有効</span>
                  </label>
                </div>
              );
            })}
          </div>
        </div>

        {/* Priorities */}
        <div className="mb-6">
          <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">優先度</p>
          <div className="space-y-2">
            {TASK_PRIORITIES.map((p) => {
              const cfg = priorityConfig[p.value];
              return (
                <div key={p.value} className="flex items-center gap-3 py-2.5 px-4 rounded-2xl bg-gray-50">
                  <span className={`text-sm ${p.color}`}>●</span>
                  <input
                    value={cfg?.label ?? p.label}
                    onChange={(e) =>
                      setPriorityConfig((prev) => ({
                        ...prev,
                        [p.value]: { ...prev[p.value]!, label: e.target.value },
                      }))
                    }
                    className="flex-1 bg-transparent text-sm font-medium text-gray-700 focus:outline-none border-b border-transparent focus:border-sky-300 transition-colors"
                  />
                  <label className="flex items-center gap-2 cursor-pointer shrink-0">
                    <input
                      type="checkbox"
                      checked={cfg?.enabled !== false}
                      onChange={(e) =>
                        setPriorityConfig((prev) => ({
                          ...prev,
                          [p.value]: { ...prev[p.value]!, enabled: e.target.checked },
                        }))
                      }
                      className="w-4 h-4 rounded border-gray-300 text-sky-500 focus:ring-sky-400 cursor-pointer"
                    />
                    <span className="text-[11px] text-gray-400">有効</span>
                  </label>
                </div>
              );
            })}
          </div>
        </div>

        <button
          onClick={handleSaveConfig}
          disabled={configLoading}
          className="px-6 py-3 rounded-2xl bg-gradient-to-r from-sky-500 to-teal-500 text-white font-semibold hover:from-sky-600 hover:to-teal-600 transition-all disabled:opacity-50 shadow-lg shadow-sky-200/40 cursor-pointer text-sm"
        >
          {configLoading ? "保存中..." : "設定を保存"}
        </button>
      </div>

      {/* Members */}
      <div className="bg-white rounded-3xl p-7 shadow-sm border border-gray-100">
        <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-5">Members</h2>
        <div className="space-y-2 mb-5">
          {members.map((m) => (
            <div key={m.id} className="flex items-center justify-between py-3 px-4 rounded-2xl bg-gray-50 group">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-sky-400 to-teal-400 flex items-center justify-center text-xs font-bold text-white ring-2 ring-white">
                  {(m.profiles?.display_name ?? "?").charAt(0).toUpperCase()}
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-700 block">
                    {m.profiles?.display_name}
                  </span>
                  <span className="text-[11px] text-gray-400 capitalize">{m.role === "admin" ? "管理者" : m.role === "member" ? "メンバー" : "閲覧者"}</span>
                </div>
              </div>
              {m.role !== "admin" && (
                <button
                  onClick={() => handleRemoveMember(m.id, m.profiles?.display_name ?? "")}
                  className="opacity-0 group-hover:opacity-100 p-1.5 rounded-xl text-gray-300 hover:text-rose-500 hover:bg-rose-50 transition-all cursor-pointer"
                >
                  <X size={14} />
                </button>
              )}
            </div>
          ))}
        </div>
        <div className="border-t border-gray-100 pt-5">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">メンバーを追加</p>
          <div className="flex gap-2">
            <input
              value={memberSearch}
              onChange={(e) => setMemberSearch(e.target.value)}
              placeholder="ユーザー名で検索..."
              className="flex-1 px-4 py-3 rounded-2xl bg-gray-50 border border-gray-200 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:border-sky-400 focus:bg-white transition-colors"
              onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleAddMember())}
            />
            <select
              value={memberRole}
              onChange={(e) => setMemberRole(e.target.value as "admin" | "member" | "viewer")}
              className="px-3 py-3 rounded-2xl bg-gray-50 border border-gray-200 text-sm text-gray-600 focus:outline-none focus:border-sky-400 appearance-none cursor-pointer font-medium"
            >
              {MEMBER_ROLES.map((r) => (
                <option key={r.value} value={r.value}>{r.label}</option>
              ))}
            </select>
            <button
              onClick={handleAddMember}
              disabled={memberLoading || !memberSearch.trim()}
              className="px-4 py-3 rounded-2xl bg-gradient-to-r from-sky-500 to-teal-500 text-white hover:from-sky-600 hover:to-teal-600 transition-all disabled:opacity-50 shadow-md shadow-sky-200/40 cursor-pointer flex items-center gap-2 text-sm font-semibold shrink-0"
            >
              <UserPlus size={16} />
              {memberLoading ? "追加中..." : "追加"}
            </button>
          </div>
          <p className="text-[11px] text-gray-400 mt-2">登録済みユーザーの表示名で検索できます</p>
        </div>
      </div>

      {/* Labels */}
      <div className="bg-white rounded-3xl p-7 shadow-sm border border-gray-100">
        <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-5">Labels</h2>
        <div className="space-y-2 mb-5">
          {labels.map((label) => (
            <div key={label.id} className="flex items-center justify-between py-2.5 px-4 rounded-2xl bg-gray-50 group">
              <div className="flex items-center gap-2.5">
                <div className="w-3.5 h-3.5 rounded-full" style={{ backgroundColor: label.color }} />
                <span className="text-sm font-medium text-gray-700">{label.name}</span>
              </div>
              <button
                onClick={() => handleDeleteLabel(label.id)}
                className="opacity-0 group-hover:opacity-100 p-1.5 rounded-xl text-gray-300 hover:text-rose-500 hover:bg-rose-50 transition-all cursor-pointer"
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
            className="w-12 h-12 rounded-2xl border border-gray-200 bg-transparent cursor-pointer"
          />
          <input
            value={newLabelName}
            onChange={(e) => setNewLabelName(e.target.value)}
            placeholder="新しいラベル名"
            className="flex-1 px-4 py-3 rounded-2xl bg-gray-50 border border-gray-200 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:border-sky-400 focus:bg-white transition-colors"
            onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleAddLabel())}
          />
          <button
            onClick={handleAddLabel}
            className="px-4 py-3 rounded-2xl bg-gray-50 border border-gray-200 text-gray-500 hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <Plus size={16} />
          </button>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="bg-white rounded-3xl p-7 shadow-sm border border-rose-100">
        <h2 className="text-xs font-bold text-rose-500 uppercase tracking-wider mb-2">Danger Zone</h2>
        <p className="text-sm text-gray-500 mb-5">
          プロジェクトを削除すると、すべてのタスク、コメント、ラベルが完全に削除されます。
        </p>
        <button
          onClick={handleDelete}
          className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-500 hover:bg-rose-100 transition-colors text-sm font-semibold cursor-pointer"
        >
          <Trash2 size={16} />
          プロジェクトを削除
        </button>
      </div>
    </div>
  );
}
