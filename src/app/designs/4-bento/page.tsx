import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function BentoDesign() {
  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      {/* Design Label */}
      <div className="fixed top-4 left-4 z-50">
        <Link href="/designs">
          <Badge className="bg-orange-500 hover:bg-orange-400 cursor-pointer">
            ← Design 04: Bento Grid
          </Badge>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-neutral-950/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <span className="text-xl font-bold">LifeConnection</span>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" className="text-neutral-400 hover:text-white">
                ログイン
              </Button>
              <Button className="bg-white text-neutral-900 hover:bg-neutral-200">
                始める
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero + Bento Grid */}
      <section className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Hero Text */}
          <div className="text-center mb-12">
            <h1 className="text-6xl sm:text-7xl md:text-8xl font-bold mb-6 tracking-tight">
              Life
              <span className="bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent">Connection</span>
            </h1>
            <p className="text-xl text-neutral-400 max-w-xl mx-auto">
              あなたの人生を、ひとつに繋げる
            </p>
          </div>

          {/* Bento Grid */}
          <div className="grid grid-cols-4 md:grid-cols-6 gap-4 auto-rows-[120px] md:auto-rows-[140px]">
            {/* Large Hero Card */}
            <div className="col-span-4 md:col-span-4 row-span-2 rounded-3xl bg-gradient-to-br from-orange-500 to-amber-500 p-8 flex flex-col justify-between overflow-hidden relative group cursor-pointer">
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
              <div className="relative z-10">
                <Badge className="bg-white/20 text-white border-0 mb-4">NEW</Badge>
                <h2 className="text-3xl md:text-4xl font-bold mb-2">統合ダッシュボード</h2>
                <p className="text-white/80 text-lg">全アプリのデータを一画面で</p>
              </div>
              <div className="relative z-10">
                <Button className="bg-white text-orange-600 hover:bg-white/90">
                  詳しく見る →
                </Button>
              </div>
            </div>

            {/* Stats Card */}
            <div className="col-span-2 row-span-2 rounded-3xl bg-neutral-900 p-6 flex flex-col justify-between border border-neutral-800 hover:border-neutral-700 transition-colors cursor-pointer">
              <div className="text-neutral-500 text-sm">今週の歩数</div>
              <div>
                <div className="text-5xl font-bold mb-1">52,340</div>
                <div className="text-emerald-400 text-sm flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                  </svg>
                  +12%
                </div>
              </div>
            </div>

            {/* AI Card */}
            <div className="col-span-2 md:col-span-3 row-span-2 rounded-3xl bg-gradient-to-br from-purple-600 to-indigo-600 p-6 flex flex-col justify-between overflow-hidden relative group cursor-pointer">
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
              <div className="relative z-10">
                <div className="text-5xl mb-2">🧠</div>
                <h3 className="text-2xl font-bold">AI分析</h3>
              </div>
              <p className="text-white/80 relative z-10">パターンを発見し、インサイトを提供</p>
            </div>

            {/* Money Card */}
            <div className="col-span-2 md:col-span-3 row-span-1 rounded-3xl bg-neutral-900 p-6 flex items-center justify-between border border-neutral-800 hover:border-neutral-700 transition-colors cursor-pointer">
              <div>
                <div className="text-neutral-500 text-sm">今月の支出</div>
                <div className="text-2xl font-bold">¥142,500</div>
              </div>
              <Badge className="bg-emerald-500/20 text-emerald-400 border-0">予算内</Badge>
            </div>

            {/* Sleep Card */}
            <div className="col-span-2 row-span-1 rounded-3xl bg-indigo-950 p-6 flex items-center justify-between border border-indigo-900 hover:border-indigo-800 transition-colors cursor-pointer">
              <div>
                <div className="text-indigo-400 text-sm">平均睡眠</div>
                <div className="text-2xl font-bold">7.2h</div>
              </div>
              <div className="text-3xl">😴</div>
            </div>

            {/* Cross App Card */}
            <div className="col-span-2 md:col-span-2 row-span-2 rounded-3xl bg-gradient-to-br from-emerald-600 to-teal-600 p-6 flex flex-col justify-between cursor-pointer group">
              <div>
                <div className="text-4xl mb-2">🔗</div>
                <h3 className="text-xl font-bold">クロスアプリ連携</h3>
              </div>
              <p className="text-white/80 text-sm">関連データを自動で紐付け</p>
            </div>

            {/* Privacy Card */}
            <div className="col-span-2 row-span-1 rounded-3xl bg-neutral-900 p-6 flex items-center gap-4 border border-neutral-800 hover:border-neutral-700 transition-colors cursor-pointer">
              <div className="text-3xl">🔒</div>
              <div>
                <div className="font-semibold">プライバシー重視</div>
                <div className="text-neutral-500 text-sm">ローカル優先設計</div>
              </div>
            </div>

            {/* Apps Card */}
            <div className="col-span-2 row-span-1 rounded-3xl bg-neutral-900 p-6 border border-neutral-800 hover:border-neutral-700 transition-colors cursor-pointer">
              <div className="text-neutral-500 text-sm mb-2">連携アプリ</div>
              <div className="flex -space-x-2">
                {['bg-emerald-500', 'bg-blue-500', 'bg-purple-500', 'bg-pink-500', 'bg-orange-500'].map((color, i) => (
                  <div key={i} className={`w-8 h-8 rounded-full ${color} border-2 border-neutral-900`} />
                ))}
                <div className="w-8 h-8 rounded-full bg-neutral-800 border-2 border-neutral-900 flex items-center justify-center text-xs">+3</div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-12 text-center">
            <Button size="lg" className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 text-lg px-12 py-6">
              無料で始める
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-neutral-900 py-12 px-4 sm:px-6 lg:px-8 mt-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-orange-500 to-amber-500" />
            <span className="font-bold">LifeConnection</span>
          </div>
          <div className="text-neutral-500 text-sm">© 2024 ManyConnection LLC</div>
        </div>
      </footer>
    </div>
  );
}
