import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const features = [
  {
    title: "統合ダッシュボード",
    description: "全ManyConnectionアプリのデータを一画面で確認。健康、支出、習慣、スケジュールを統合管理。",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
      </svg>
    ),
  },
  {
    title: "AI分析",
    description: "AIがあなたのライフデータを分析し、パターンを発見。より良い生活のためのインサイトを提供。",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
  },
  {
    title: "クロスアプリ連携",
    description: "各アプリ間でデータを共有。運動と睡眠、食事と体重など、関連データを自動で紐付け。",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
      </svg>
    ),
  },
  {
    title: "プライバシー重視",
    description: "データはあなたのもの。ローカル優先設計で、クラウド同期は任意。完全なコントロール。",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
  },
];

const apps = [
  { name: "HealthSync", category: "健康", color: "bg-emerald-500" },
  { name: "MoneyFlow", category: "家計", color: "bg-blue-500" },
  { name: "HabitLoop", category: "習慣", color: "bg-purple-500" },
  { name: "MindSpace", category: "メンタル", color: "bg-pink-500" },
  { name: "FoodLog", category: "食事", color: "bg-orange-500" },
  { name: "SleepTrack", category: "睡眠", color: "bg-indigo-500" },
];

export default function DarkGradientDesign() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950 text-zinc-100">
      {/* Design Label */}
      <div className="fixed top-4 left-4 z-50">
        <Link href="/designs">
          <Badge className="bg-violet-600 hover:bg-violet-500 cursor-pointer">
            ← Design 01: Dark Gradient
          </Badge>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 border-b border-zinc-800/50 bg-zinc-950/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <span className="text-xl font-bold">LifeConnection</span>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <Link href="#features" className="text-zinc-400 hover:text-white transition-colors">機能</Link>
              <Link href="#apps" className="text-zinc-400 hover:text-white transition-colors">連携アプリ</Link>
              <Link href="#pricing" className="text-zinc-400 hover:text-white transition-colors">料金</Link>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" className="text-zinc-400 hover:text-white">
                ログイン
              </Button>
              <Button className="bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500">
                無料で始める
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <Badge variant="secondary" className="mb-6 bg-zinc-800 text-zinc-300 border-zinc-700">
            🚀 ManyConnection エコシステム
          </Badge>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
            あなたの人生を
            <br />
            ひとつに繋げる
          </h1>
          <p className="text-lg sm:text-xl text-zinc-400 max-w-2xl mx-auto mb-10">
            ManyConnectionの全アプリから集めたデータを統合。
            AIがあなたのライフパターンを分析し、より良い毎日へ導きます。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-lg px-8 py-6">
              無料で始める
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Button>
            <Button size="lg" variant="outline" className="border-zinc-700 text-zinc-300 hover:bg-zinc-800 text-lg px-8 py-6">
              デモを見る
            </Button>
          </div>

          {/* Dashboard Preview */}
          <div className="mt-16 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-violet-500/20 to-fuchsia-500/20 blur-3xl" />
            <div className="relative rounded-xl border border-zinc-800 bg-zinc-900/50 backdrop-blur-xl p-4 shadow-2xl">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="bg-zinc-800/50 border-zinc-700">
                  <CardHeader className="pb-2">
                    <CardDescription className="text-zinc-400">今週の歩数</CardDescription>
                    <CardTitle className="text-2xl text-white">52,340</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center text-emerald-400 text-sm">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                      </svg>
                      +12% 先週比
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-zinc-800/50 border-zinc-700">
                  <CardHeader className="pb-2">
                    <CardDescription className="text-zinc-400">今月の支出</CardDescription>
                    <CardTitle className="text-2xl text-white">¥142,500</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center text-amber-400 text-sm">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                      </svg>
                      予算内
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-zinc-800/50 border-zinc-700">
                  <CardHeader className="pb-2">
                    <CardDescription className="text-zinc-400">平均睡眠時間</CardDescription>
                    <CardTitle className="text-2xl text-white">7.2時間</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center text-emerald-400 text-sm">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                      </svg>
                      +0.5h 先週比
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">すべてを繋げる機能</h2>
            <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
              散らばったライフデータを統合し、あなただけのインサイトを提供します
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="bg-zinc-900/50 border-zinc-800 hover:border-zinc-700 transition-colors cursor-pointer group">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 flex items-center justify-center text-violet-400 mb-4 group-hover:scale-110 transition-transform">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-white">{feature.title}</CardTitle>
                  <CardDescription className="text-zinc-400">{feature.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Connected Apps Section */}
      <section id="apps" className="py-20 px-4 sm:px-6 lg:px-8 bg-zinc-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">連携アプリ</h2>
            <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
              ManyConnectionファミリーの各アプリとシームレスに連携
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {apps.map((app, index) => (
              <Card key={index} className="bg-zinc-800/30 border-zinc-700/50 hover:bg-zinc-800/50 transition-colors cursor-pointer text-center py-6">
                <CardContent className="p-0">
                  <div className={`w-12 h-12 rounded-xl ${app.color} mx-auto mb-3 flex items-center justify-center`}>
                    <span className="text-white font-bold text-lg">{app.name[0]}</span>
                  </div>
                  <div className="text-white font-medium text-sm">{app.name}</div>
                  <div className="text-zinc-500 text-xs mt-1">{app.category}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-violet-500/30 to-fuchsia-500/30 blur-3xl" />
            <div className="relative rounded-2xl border border-zinc-800 bg-zinc-900/50 backdrop-blur-xl p-12">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                あなたのライフデータを統合しよう
              </h2>
              <p className="text-zinc-400 text-lg mb-8 max-w-xl mx-auto">
                無料プランで始めて、LifeConnectionの力を体験してください。
              </p>
              <Button size="lg" className="bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-lg px-8 py-6">
                無料アカウントを作成
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-800 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-gradient-to-br from-violet-500 to-fuchsia-500" />
            <span className="font-bold">LifeConnection</span>
          </div>
          <div className="text-zinc-500 text-sm">© 2024 ManyConnection LLC</div>
        </div>
      </footer>
    </div>
  );
}
