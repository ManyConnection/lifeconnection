import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const features = [
  { title: "統合ダッシュボード", description: "全アプリのデータを一画面で確認", icon: "📊" },
  { title: "AI分析", description: "パターンを発見、インサイトを提供", icon: "🧠" },
  { title: "クロスアプリ連携", description: "関連データを自動で紐付け", icon: "🔗" },
  { title: "プライバシー重視", description: "ローカル優先、完全なコントロール", icon: "🔒" },
];

const stats = [
  { label: "今週の歩数", value: "52,340", change: "+12%", positive: true },
  { label: "今月の支出", value: "¥142,500", change: "予算内", positive: true },
  { label: "平均睡眠", value: "7.2h", change: "+0.5h", positive: true },
];

export default function GlassDesign() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 text-white overflow-hidden">
      {/* Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl" />
        <div className="absolute top-1/2 -right-20 w-80 h-80 bg-purple-500/30 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-pink-500/30 rounded-full blur-3xl" />
      </div>

      {/* Design Label */}
      <div className="fixed top-4 left-4 z-50">
        <Link href="/designs">
          <Badge className="bg-white/20 backdrop-blur-md border border-white/30 hover:bg-white/30 cursor-pointer">
            ← Design 02: Glassmorphism
          </Badge>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-white/10 backdrop-blur-xl border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-white/20 backdrop-blur-md flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <span className="text-xl font-bold">LifeConnection</span>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <Link href="#" className="text-white/70 hover:text-white transition-colors">機能</Link>
              <Link href="#" className="text-white/70 hover:text-white transition-colors">連携アプリ</Link>
              <Link href="#" className="text-white/70 hover:text-white transition-colors">料金</Link>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" className="text-white/70 hover:text-white hover:bg-white/10">
                ログイン
              </Button>
              <Button className="bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/30">
                無料で始める
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-8">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-sm text-white/80">ManyConnection エコシステム</span>
          </div>
          
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6 leading-tight">
            あなたの人生を
            <br />
            <span className="bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300 bg-clip-text text-transparent">
              ひとつに繋げる
            </span>
          </h1>
          
          <p className="text-xl text-white/70 max-w-2xl mx-auto mb-10">
            全アプリのデータを統合。AIがあなたのライフパターンを分析します。
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-purple-900 hover:bg-white/90 text-lg px-8 py-6 font-semibold">
              無料で始める
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Button>
            <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 text-lg px-8 py-6">
              デモを見る
            </Button>
          </div>

          {/* Glass Dashboard Preview */}
          <div className="mt-16 relative">
            <div className="rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 p-6 shadow-2xl">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {stats.map((stat, index) => (
                  <div key={index} className="rounded-xl bg-white/10 backdrop-blur-md border border-white/20 p-6">
                    <div className="text-white/60 text-sm mb-1">{stat.label}</div>
                    <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                    <div className={`text-sm ${stat.positive ? 'text-emerald-300' : 'text-red-300'}`}>
                      {stat.change}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">すべてを繋げる機能</h2>
            <p className="text-white/60 text-lg">散らばったライフデータを統合します</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 p-8 hover:bg-white/20 transition-all cursor-pointer group"
              >
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-white/60">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 p-12 text-center">
            <h2 className="text-4xl font-bold mb-4">今すぐ始めよう</h2>
            <p className="text-white/60 text-lg mb-8">無料プランで体験してください。</p>
            <Button size="lg" className="bg-white text-purple-900 hover:bg-white/90 text-lg px-8 py-6">
              無料アカウントを作成
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative border-t border-white/10 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-white/20 backdrop-blur-md" />
            <span className="font-bold">LifeConnection</span>
          </div>
          <div className="text-white/50 text-sm">© 2024 ManyConnection LLC</div>
        </div>
      </footer>
    </div>
  );
}
