"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema, type SignupInput } from "@/lib/validations/auth";
import { signup } from "@/lib/actions/auth";
import Link from "next/link";

export function SignupForm() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupInput>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data: SignupInput) => {
    setLoading(true);
    setError(null);
    const result = await signup(data);
    if (result?.error) {
      setError(result.error);
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {error && (
        <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400 text-sm">
          {error}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-slate-300 mb-1.5">
          表示名
        </label>
        <input
          type="text"
          {...register("displayName")}
          className="w-full px-4 py-2.5 rounded-xl bg-slate-900/60 border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/50"
          placeholder="Taro Yamada"
        />
        {errors.displayName && (
          <p className="text-rose-400 text-xs mt-1">{errors.displayName.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-300 mb-1.5">
          メールアドレス
        </label>
        <input
          type="email"
          {...register("email")}
          className="w-full px-4 py-2.5 rounded-xl bg-slate-900/60 border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/50"
          placeholder="you@example.com"
        />
        {errors.email && (
          <p className="text-rose-400 text-xs mt-1">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-300 mb-1.5">
          パスワード
        </label>
        <input
          type="password"
          {...register("password")}
          className="w-full px-4 py-2.5 rounded-xl bg-slate-900/60 border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/50"
          placeholder="••••••••"
        />
        {errors.password && (
          <p className="text-rose-400 text-xs mt-1">{errors.password.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-300 mb-1.5">
          パスワード確認
        </label>
        <input
          type="password"
          {...register("confirmPassword")}
          className="w-full px-4 py-2.5 rounded-xl bg-slate-900/60 border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/50"
          placeholder="••••••••"
        />
        {errors.confirmPassword && (
          <p className="text-rose-400 text-xs mt-1">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-2.5 rounded-xl bg-gradient-to-r from-violet-500 to-indigo-600 text-white font-medium hover:from-violet-600 hover:to-indigo-700 transition-all disabled:opacity-50"
      >
        {loading ? "作成中..." : "アカウント作成"}
      </button>

      <p className="text-center text-sm text-slate-400">
        既にアカウントをお持ちの方は{" "}
        <Link href="/auth/login" className="text-violet-400 hover:text-violet-300">
          ログイン
        </Link>
      </p>
    </form>
  );
}
