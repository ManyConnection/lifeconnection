import { redirect } from "next/navigation";

// トップページはデザイン一覧にリダイレクト
export default function Home() {
  redirect("/designs");
}
