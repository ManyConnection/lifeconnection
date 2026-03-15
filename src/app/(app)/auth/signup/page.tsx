import { SignupForm } from "@/components/auth/signup-form";
import { Sparkles } from "lucide-react";

export default function SignupPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-pink-400 to-rose-500 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-pink-200">
            <Sparkles size={28} className="text-white" />
          </div>
          <h1 className="text-2xl font-bold font-heading bg-gradient-to-r from-pink-600 to-rose-500 bg-clip-text text-transparent">LifeConnection</h1>
          <p className="text-gray-500 mt-1">新しいアカウントを作成</p>
        </div>
        <div className="bg-white/70 backdrop-blur-sm border border-pink-100 rounded-2xl p-6 shadow-sm">
          <SignupForm />
        </div>
      </div>
    </div>
  );
}
