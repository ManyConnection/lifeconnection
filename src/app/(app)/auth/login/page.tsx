import { LoginForm } from "@/components/auth/login-form";
import { Heart } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-sky-400 to-cyan-500 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-sky-200">
            <Heart size={26} className="text-white fill-white" />
          </div>
          <h1 className="text-2xl font-bold font-heading text-gray-700">LifeConnection</h1>
          <p className="text-gray-500 mt-1">アカウントにログイン</p>
        </div>
        <div className="bg-white/70 backdrop-blur-sm border border-sky-100 rounded-2xl p-6 shadow-sm">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
