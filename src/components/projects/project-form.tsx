"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { projectSchema, type ProjectInput } from "@/lib/validations/project";
import { createProject } from "@/lib/actions/projects";
import { PROJECT_COLORS } from "@/lib/constants";

export function ProjectForm() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ProjectInput>({
    resolver: zodResolver(projectSchema),
    defaultValues: { color: PROJECT_COLORS[0] },
  });

  const selectedColor = watch("color");

  const onSubmit = async (data: ProjectInput) => {
    setLoading(true);
    setError(null);
    const result = await createProject(data);
    if (result?.error) {
      setError(result.error);
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {error && (
        <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-600 text-sm">
          {error}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1.5">
          プロジェクト名
        </label>
        <input
          {...register("name")}
          className="w-full px-4 py-2.5 rounded-xl bg-white border border-pink-200 text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-pink-400 focus:ring-1 focus:ring-pink-400"
          placeholder="My Project"
        />
        {errors.name && (
          <p className="text-rose-500 text-xs mt-1">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1.5">
          プロジェクトキー
        </label>
        <input
          {...register("key")}
          className="w-full px-4 py-2.5 rounded-xl bg-white border border-pink-200 text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-pink-400 focus:ring-1 focus:ring-pink-400 uppercase"
          placeholder="PROJ"
          maxLength={8}
        />
        {errors.key && (
          <p className="text-rose-500 text-xs mt-1">{errors.key.message}</p>
        )}
        <p className="text-xs text-gray-400 mt-1">
          タスク番号のプレフィックスに使用されます（例: PROJ-1）
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1.5">
          説明
        </label>
        <textarea
          {...register("description")}
          rows={3}
          className="w-full px-4 py-2.5 rounded-xl bg-white border border-pink-200 text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-pink-400 focus:ring-1 focus:ring-pink-400 resize-none"
          placeholder="プロジェクトの説明（任意）"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1.5">
          カラー
        </label>
        <div className="flex gap-2">
          {PROJECT_COLORS.map((color) => (
            <button
              key={color}
              type="button"
              onClick={() => setValue("color", color)}
              className={`w-8 h-8 rounded-lg transition-all cursor-pointer ${
                selectedColor === color
                  ? "ring-2 ring-pink-400 ring-offset-2 ring-offset-white scale-110"
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
        className="w-full py-2.5 rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 text-white font-medium hover:from-pink-600 hover:to-rose-600 transition-all disabled:opacity-50 shadow-md shadow-pink-200 cursor-pointer"
      >
        {loading ? "作成中..." : "プロジェクトを作成"}
      </button>
    </form>
  );
}
