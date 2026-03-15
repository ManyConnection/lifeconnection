import { LoginForm } from "@/components/auth/login-form";
import { Brain } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center mx-auto mb-4">
            <Brain size={28} className="text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white">LifeConnection</h1>
          <p className="text-slate-400 mt-1">アカウントにログイン</p>
        </div>
        <div className="bg-slate-900/40 border border-white/5 rounded-2xl p-6">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
