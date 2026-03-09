import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const designs = [
  {
    id: 1,
    name: "Dark Gradient",
    description: "ダークモード + Violet/Fuchsia グラデーション",
    path: "/designs/1-dark-gradient",
    preview: "bg-gradient-to-br from-zinc-950 via-violet-950/20 to-zinc-950",
    accent: "from-violet-500 to-fuchsia-500",
  },
  {
    id: 2,
    name: "Glassmorphism",
    description: "ガラス風の透明感、ぼかし効果",
    path: "/designs/2-glass",
    preview: "bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20",
    accent: "from-blue-400 to-purple-400",
  },
  {
    id: 3,
    name: "Light Minimal",
    description: "白ベースのクリーンでシンプルなデザイン",
    path: "/designs/3-minimal",
    preview: "bg-gradient-to-br from-slate-50 to-white",
    accent: "from-slate-800 to-slate-600",
  },
  {
    id: 4,
    name: "Bento Grid",
    description: "Apple風の大胆なグリッドレイアウト",
    path: "/designs/4-bento",
    preview: "bg-gradient-to-br from-neutral-900 to-neutral-800",
    accent: "from-orange-400 to-amber-400",
  },
  {
    id: 5,
    name: "AI-Native",
    description: "AIプロダクト向けモダンUI、アニメーション",
    path: "/designs/5-ai-native",
    preview: "bg-gradient-to-br from-slate-900 via-emerald-950/30 to-slate-900",
    accent: "from-emerald-400 to-cyan-400",
  },
];

export default function DesignsPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
            LifeConnection デザイン候補
          </h1>
          <p className="text-zinc-400 text-lg">
            5つのデザインパターンから選んでください
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {designs.map((design) => (
            <Link key={design.id} href={design.path}>
              <Card className="bg-zinc-900/50 border-zinc-800 hover:border-zinc-600 transition-all cursor-pointer group overflow-hidden h-full">
                <div className={`h-40 ${design.preview} relative`}>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${design.accent} opacity-80 group-hover:scale-110 transition-transform`} />
                  </div>
                </div>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-zinc-500">0{design.id}</span>
                    <CardTitle className="text-white">{design.name}</CardTitle>
                  </div>
                  <CardDescription className="text-zinc-400">
                    {design.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link href="/" className="text-zinc-500 hover:text-white transition-colors">
            ← トップに戻る
          </Link>
        </div>
      </div>
    </div>
  );
}
