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
        <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-600 text-sm">
          {error}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1.5">
          表示名
        </label>
        <input
          type="text"
          {...register("displayName")}
          className="w-full px-4 py-2.5 rounded-xl bg-white border border-pink-200 text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-pink-400 focus:ring-1 focus:ring-pink-400"
          placeholder="Taro Yamada"
        />
        {errors.displayName && (
          <p className="text-rose-500 text-xs mt-1">{errors.displayName.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1.5">
          メールアドレス
        </label>
        <input
          type="email"
          {...register("email")}
          className="w-full px-4 py-2.5 rounded-xl bg-white border border-pink-200 text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-pink-400 focus:ring-1 focus:ring-pink-400"
          placeholder="you@example.com"
        />
        {errors.email && (
          <p className="text-rose-500 text-xs mt-1">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1.5">
          パスワード
        </label>
        <input
          type="password"
          {...register("password")}
          className="w-full px-4 py-2.5 rounded-xl bg-white border border-pink-200 text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-pink-400 focus:ring-1 focus:ring-pink-400"
          placeholder="••••••••"
        />
        {errors.password && (
          <p className="text-rose-500 text-xs mt-1">{errors.password.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1.5">
          パスワード確認
        </label>
        <input
          type="password"
          {...register("confirmPassword")}
          className="w-full px-4 py-2.5 rounded-xl bg-white border border-pink-200 text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-pink-400 focus:ring-1 focus:ring-pink-400"
          placeholder="••••••••"
        />
        {errors.confirmPassword && (
          <p className="text-rose-500 text-xs mt-1">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-2.5 rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 text-white font-medium hover:from-pink-600 hover:to-rose-600 transition-all disabled:opacity-50 shadow-md shadow-pink-200 cursor-pointer"
      >
        {loading ? "作成中..." : "アカウント作成"}
      </button>

      <p className="text-center text-sm text-gray-500">
        既にアカウントをお持ちの方は{" "}
        <Link href="/auth/login" className="text-pink-500 hover:text-pink-600">
          ログイン
        </Link>
      </p>
    </form>
  );
}
