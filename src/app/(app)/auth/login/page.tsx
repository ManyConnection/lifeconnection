import { LoginForm } from "@/components/auth/login-form";
import { Heart } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-sky-400 to-teal-400 flex items-center justify-center mx-auto mb-5 shadow-xl shadow-sky-200/50">
            <Heart size={28} className="text-white fill-white" />
          </div>
          <h1 className="text-2xl font-extrabold font-heading text-gray-800">おかえりなさい</h1>
          <p className="text-sm text-gray-400 mt-1">アカウントにログイン</p>
        </div>
        <div className="bg-white rounded-3xl p-7 shadow-sm border border-gray-100">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
