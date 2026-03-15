import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const designs = [
  {
    id: 14,
    name: "Neural Hub",
    description: "50+アプリを統合、AIが人生全体を分析する「人生のOS」",
    path: "/designs/14-neural-hub",
    preview: "bg-[#0a0a1a]",
    accent: "from-violet-500 to-indigo-600",
    isCool: true,
  },
  {
    id: 11,
    name: "Cyberpunk",
    description: "ネオン、グリッチエフェクト、サイバー感全開",
    path: "/designs/11-cyberpunk",
    preview: "bg-black",
    accent: "from-cyan-400 to-pink-500",
    isCool: true,
  },
  {
    id: 12,
    name: "Brutalist",
    description: "大胆なタイポグラフィ、型破りでRaw",
    path: "/designs/12-brutalist",
    preview: "bg-white",
    accent: "from-black to-zinc-800",
    isCool: true,
  },
  {
    id: 13,
    name: "Aurora",
    description: "オーロラのような美しいグラデーション",
    path: "/designs/13-aurora",
    preview: "bg-gradient-to-b from-slate-950 to-slate-900",
    accent: "from-emerald-400 via-purple-400 to-blue-400",
    isCool: true,
  },
  {
    id: 6,
    name: "Warm Natural",
    description: "アースカラー、温かみのある自然な雰囲気",
    path: "/designs/6-warm-natural",
    preview: "bg-gradient-to-br from-amber-100 to-orange-100",
    accent: "from-amber-500 to-orange-500",
    isNew: true,
  },
  {
    id: 7,
    name: "Friendly Pop",
    description: "丸みのあるポップで楽しいUI",
    path: "/designs/7-friendly-pop",
    preview: "bg-gradient-to-br from-sky-100 to-pink-100",
    accent: "from-sky-400 to-pink-400",
    isNew: true,
  },
  {
    id: 8,
    name: "Magazine",
    description: "雑誌風のエディトリアルレイアウト",
    path: "/designs/8-magazine",
    preview: "bg-gradient-to-br from-stone-200 to-stone-100",
    accent: "from-stone-600 to-stone-800",
    isNew: true,
  },
  {
    id: 9,
    name: "Cozy Life",
    description: "やわらかく生活感のある居心地の良いデザイン",
    path: "/designs/9-cozy-life",
    preview: "bg-gradient-to-br from-rose-100 to-rose-50",
    accent: "from-rose-400 to-rose-500",
    isNew: true,
  },
  {
    id: 10,
    name: "Japanese Zen",
    description: "和風ミニマル、余白を活かした静かなデザイン",
    path: "/designs/10-japanese-zen",
    preview: "bg-gradient-to-br from-stone-100 to-stone-50",
    accent: "from-stone-500 to-stone-700",
    isNew: true,
  },
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
    description: "AIプロダクト向けモダンUI",
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
            14パターンから選んでください
          </p>
        </div>

        {/* Cool Designs Section */}
        <div className="mb-12">
          <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <span className="text-cyan-400">🔥</span>
            クールなデザイン（COOL）
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {designs.filter(d => d.isCool).map((design) => (
              <Link key={design.id} href={design.path}>
                <Card className="bg-zinc-900/50 border-zinc-800 hover:border-cyan-500/50 transition-all cursor-pointer group overflow-hidden h-full">
                  <div className={`h-40 ${design.preview} relative border-b border-zinc-800`}>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${design.accent} opacity-80 group-hover:scale-110 transition-transform`} />
                    </div>
                    <Badge className="absolute top-2 right-2 bg-gradient-to-r from-cyan-500 to-pink-500 text-white border-0">COOL</Badge>
                  </div>
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-zinc-500">{String(design.id).padStart(2, '0')}</span>
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
        </div>

        {/* New Designs Section */}
        <div className="mb-12">
          <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <span className="text-amber-400">✨</span>
            AI感なしのデザイン（NEW）
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {designs.filter(d => d.isNew).map((design) => (
              <Link key={design.id} href={design.path}>
                <Card className="bg-zinc-900/50 border-zinc-800 hover:border-amber-500/50 transition-all cursor-pointer group overflow-hidden h-full">
                  <div className={`h-40 ${design.preview} relative`}>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${design.accent} opacity-80 group-hover:scale-110 transition-transform`} />
                    </div>
                    <Badge className="absolute top-2 right-2 bg-amber-500 text-white border-0">NEW</Badge>
                  </div>
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-zinc-500">{String(design.id).padStart(2, '0')}</span>
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
        </div>

        {/* Previous Designs Section */}
        <div>
          <h2 className="text-xl font-semibold mb-6 text-zinc-500">
            以前のデザイン（テック系）
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {designs.filter(d => !d.isNew && !d.isCool).map((design) => (
              <Link key={design.id} href={design.path}>
                <Card className="bg-zinc-900/30 border-zinc-800/50 hover:border-zinc-700 transition-all cursor-pointer group overflow-hidden h-full opacity-70 hover:opacity-100">
                  <div className={`h-32 ${design.preview} relative`}>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${design.accent} opacity-60 group-hover:scale-110 transition-transform`} />
                    </div>
                  </div>
                  <CardHeader className="py-4">
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold text-zinc-600">{String(design.id).padStart(2, '0')}</span>
                      <CardTitle className="text-zinc-400 text-base">{design.name}</CardTitle>
                    </div>
                    <CardDescription className="text-zinc-500 text-sm">
                      {design.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
