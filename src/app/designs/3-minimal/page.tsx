import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const features = [
  {
    title: "統合ダッシュボード",
    description: "全ManyConnectionアプリのデータを一画面で確認。健康、支出、習慣を統合管理。",
  },
  {
    title: "AI分析",
    description: "AIがあなたのライフデータを分析し、パターンを発見。インサイトを提供。",
  },
  {
    title: "クロスアプリ連携",
    description: "各アプリ間でデータを共有。運動と睡眠など、関連データを自動で紐付け。",
  },
  {
    title: "プライバシー重視",
    description: "データはあなたのもの。ローカル優先設計で、完全なコントロール。",
  },
];

const apps = ["HealthSync", "MoneyFlow", "HabitLoop", "MindSpace", "FoodLog", "SleepTrack"];

export default function MinimalDesign() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      {/* Design Label */}
      <div className="fixed top-4 left-4 z-50">
        <Link href="/designs">
          <Badge className="bg-slate-900 text-white hover:bg-slate-800 cursor-pointer">
            ← Design 03: Light Minimal
          </Badge>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <span className="text-xl font-semibold tracking-tight">LifeConnection</span>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <Link href="#" className="text-slate-600 hover:text-slate-900 transition-colors text-sm">機能</Link>
              <Link href="#" className="text-slate-600 hover:text-slate-900 transition-colors text-sm">連携アプリ</Link>
              <Link href="#" className="text-slate-600 hover:text-slate-900 transition-colors text-sm">料金</Link>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" className="text-slate-600 hover:text-slate-900">
                ログイン
              </Button>
              <Button className="bg-slate-900 hover:bg-slate-800 text-white">
                始める
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm text-slate-500 uppercase tracking-widest mb-4">
            ManyConnection エコシステム
          </p>
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-8 leading-[1.1] tracking-tight">
            あなたの人生を
            <br />
            ひとつに繋げる
          </h1>
          <p className="text-xl text-slate-600 max-w-xl mx-auto mb-12 leading-relaxed">
            全アプリから集めたデータを統合。
            AIがライフパターンを分析し、より良い毎日へ。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-slate-900 hover:bg-slate-800 text-white text-lg px-8 py-6">
              無料で始める
            </Button>
            <Button size="lg" variant="outline" className="border-slate-300 text-slate-700 hover:bg-slate-50 text-lg px-8 py-6">
              デモを見る
            </Button>
          </div>
        </div>
      </section>

      {/* Simple Dashboard Preview */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="rounded-2xl border border-slate-200 bg-slate-50/50 p-8">
            <div className="grid grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-sm text-slate-500 mb-2">今週の歩数</div>
                <div className="text-4xl font-bold text-slate-900">52,340</div>
                <div className="text-sm text-emerald-600 mt-2">+12%</div>
              </div>
              <div className="text-center border-x border-slate-200">
                <div className="text-sm text-slate-500 mb-2">今月の支出</div>
                <div className="text-4xl font-bold text-slate-900">¥142,500</div>
                <div className="text-sm text-slate-500 mt-2">予算内</div>
              </div>
              <div className="text-center">
                <div className="text-sm text-slate-500 mb-2">平均睡眠</div>
                <div className="text-4xl font-bold text-slate-900">7.2h</div>
                <div className="text-sm text-emerald-600 mt-2">+0.5h</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 tracking-tight">機能</h2>
            <p className="text-slate-600">シンプルに、すべてを繋げる</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {features.map((feature, index) => (
              <div key={index} className="group">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-900 font-semibold shrink-0 group-hover:bg-slate-900 group-hover:text-white transition-colors">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                    <p className="text-slate-600 leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Apps Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 tracking-tight">連携アプリ</h2>
            <p className="text-slate-600">ManyConnectionファミリーと連携</p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4">
            {apps.map((app, index) => (
              <div 
                key={index} 
                className="px-6 py-3 rounded-full border border-slate-200 bg-white text-slate-700 text-sm font-medium hover:border-slate-400 transition-colors cursor-pointer"
              >
                {app}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6 tracking-tight">
            今すぐ始めよう
          </h2>
          <p className="text-slate-600 text-lg mb-8">
            無料プランで体験してください。クレジットカード不要。
          </p>
          <Button size="lg" className="bg-slate-900 hover:bg-slate-800 text-white text-lg px-12 py-6">
            無料アカウントを作成
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-slate-900" />
            <span className="font-semibold">LifeConnection</span>
          </div>
          <div className="text-slate-500 text-sm">© 2024 ManyConnection LLC</div>
          <div className="flex items-center gap-6 text-sm text-slate-500">
            <Link href="#" className="hover:text-slate-900 transition-colors">プライバシー</Link>
            <Link href="#" className="hover:text-slate-900 transition-colors">利用規約</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
