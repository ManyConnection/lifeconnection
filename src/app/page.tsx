import { redirect } from "next/navigation";

// トップページはダッシュボードにリダイレクト
export default function Home() {
  redirect("/dashboard");
}
