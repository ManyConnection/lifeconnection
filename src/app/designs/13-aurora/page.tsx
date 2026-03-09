"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const apps = [
  { name: "HealthSync", emoji: "💚", desc: "健康データ統合" },
  { name: "MoneyFlow", emoji: "💎", desc: "支出管理" },
  { name: "HabitLoop", emoji: "🔮", desc: "習慣トラッキング" },
  { name: "MindSpace", emoji: "🌸", desc: "メンタルケア" },
  { name: "FoodLog", emoji: "🍵", desc: "食事記録" },
  { name: "SleepTrack", emoji: "🌙", desc: "睡眠分析" },
];

export default function AuroraDesign() {
  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-hidden">
      {/* Aurora Background */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950" />
        
        {/* Aurora layers */}
        <div 
          className="absolute top-0 left-0 right-0 h-[70vh] opacity-60"
          style={{
            background: `
              radial-gradient(ellipse 80% 50% at 20% 30%, rgba(34, 197, 94, 0.4), transparent),
              radial-gradient(ellipse 60% 40% at 50% 20%, rgba(168, 85, 247, 0.3), transparent),
              radial-gradient(ellipse 70% 35% at 80% 40%, rgba(59, 130, 246, 0.35), transparent)
            `,
            animation: 'aurora 15s ease-in-out infinite',
          }}
        />
        <div 
          className="absolute top-0 left-0 right-0 h-[60vh] opacity-40"
          style={{
            background: `
              radial-gradient(ellipse 50% 40% at 30% 25%, rgba(20, 184, 166, 0.5), transparent),
              radial-gradient(ellipse 40% 30% at 70% 35%, rgba(236, 72, 153, 0.3), transparent)
            `,
            animation: 'aurora2 12s ease-in-out infinite',
          }}
        />
        
        {/* Stars */}
        <div className="absolute inset-0 opacity-50" style={{
          backgroundImage: `
            radial-gradient(1px 1px at 20% 30%, white, transparent),
            radial-gradient(1px 1px at 40% 70%, white, transparent),
            radial-gradient(1px 1px at 50% 20%, white, transparent),
            radial-gradient(1px 1px at 60% 50%, white, transparent),
            radial-gradient(1px 1px at 70% 80%, white, transparent),
            radial-gradient(1px 1px at 80% 40%, white, transparent),
            radial-gradient(1px 1px at 90% 60%, white, transparent),
            radial-gradient(1.5px 1.5px at 25% 45%, white, transparent),
            radial-gradient(1.5px 1.5px at 75% 25%, white, transparent),
            radial-gradient(1.5px 1.5px at 55% 65%, white, transparent),
            radial-gradient(2px 2px at 35% 85%, white, transparent),
            radial-gradient(2px 2px at 85% 15%, white, transparent)
          `,
          backgroundSize: '400px 400px',
        }} />
      </div>

      {/* Design Label */}
      <div className="fixed top-4 left-4 z-50">
        <Link href="/designs">
          <Badge className="bg-emerald-500/80 hover:bg-emerald-400 cursor-pointer border border-emerald-400/50 backdrop-blur-sm">
            ← 13 Aurora
          </Badge>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 backdrop-blur-xl bg-slate-950/30 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 via-purple-400 to-blue-400 flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
              </div>
              <span className="text-lg font-medium tracking-wide">LifeConnection</span>
            </div>
            <div className="hidden md:flex items-center gap-8 text-sm text-white/60">
              <Link href="#" className="hover:text-white transition-colors">機能</Link>
              <Link href="#" className="hover:text-white transition-colors">連携アプリ</Link>
              <Link href="#" className="hover:text-white transition-colors">料金</Link>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="ghost" className="text-white/70 hover:text-white hover:bg-white/5">
                ログイン
              </Button>
              <Button className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 border-0">
                始める
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 pt-40 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-white/70 mb-8 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            ManyConnection エコシステム
          </div>
          
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light tracking-tight mb-6">
            <span className="block text-white/90">すべてを</span>
            <span className="block bg-gradient-to-r from-emerald-300 via-purple-300 to-blue-300 bg-clip-text text-transparent font-medium">
              ひとつに繋げる
            </span>
          </h1>
          
          <p className="text-lg sm:text-xl text-white/50 max-w-2xl mx-auto mb-12 font-light leading-relaxed">
            ManyConnectionの全アプリからデータを統合。<br />
            あなたのライフパターンを可視化し、より良い毎日へ。
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-lg px-8 py-6 rounded-full">
              無料で始める
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Button>
            <Button size="lg" variant="outline" className="border-white/10 text-white/70 hover:bg-white/5 text-lg px-8 py-6 rounded-full backdrop-blur-sm">
              デモを見る
            </Button>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="relative z-10 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: "52,340", label: "今週の歩数", change: "+12%", color: "emerald" },
              { value: "¥142,500", label: "今月の支出", change: "予算内", color: "blue" },
              { value: "7.2時間", label: "平均睡眠", change: "+0.5h", color: "purple" },
              { value: "23日", label: "継続日数", change: "最長記録", color: "pink" },
            ].map((stat, i) => (
              <div 
                key={i} 
                className="relative group p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/5 hover:border-white/10 transition-all"
              >
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br from-${stat.color}-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity`} />
                <div className="relative">
                  <div className="text-2xl sm:text-3xl font-medium text-white mb-1">{stat.value}</div>
                  <div className="text-sm text-white/40 mb-2">{stat.label}</div>
                  <div className="text-xs text-emerald-400">{stat.change}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-light mb-4">
              <span className="text-white/90">シームレスな</span>
              <span className="text-emerald-300 ml-2">統合</span>
            </h2>
            <p className="text-white/40 max-w-xl mx-auto">
              散らばったデータを一つの美しいダッシュボードに
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { 
                title: "統合ダッシュボード", 
                desc: "全アプリのデータを一画面で。健康、支出、習慣をまとめて管理。",
                icon: "◈"
              },
              { 
                title: "AI分析", 
                desc: "あなたのライフパターンを分析し、インサイトを提供。",
                icon: "◉"
              },
              { 
                title: "クロスアプリ連携", 
                desc: "運動と睡眠、食事と体重を自動で紐付け。",
                icon: "◎"
              },
              { 
                title: "プライバシー優先", 
                desc: "データはあなたのもの。ローカル優先設計。",
                icon: "◇"
              },
            ].map((feature, i) => (
              <div 
                key={i}
                className="group p-8 rounded-3xl bg-gradient-to-br from-white/5 to-transparent border border-white/5 hover:border-white/10 transition-all cursor-pointer"
              >
                <div className="text-3xl text-emerald-400 mb-4 group-hover:scale-110 transition-transform inline-block">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-medium text-white mb-2">{feature.title}</h3>
                <p className="text-white/40 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Apps */}
      <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-light mb-4">
              <span className="text-white/90">連携</span>
              <span className="text-purple-300 ml-2">アプリ</span>
            </h2>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {apps.map((app, i) => (
              <div 
                key={i}
                className="group p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/5 hover:border-white/10 transition-all cursor-pointer text-center"
              >
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform inline-block">
                  {app.emoji}
                </div>
                <div className="font-medium text-white mb-1">{app.name}</div>
                <div className="text-sm text-white/40">{app.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 via-purple-500/20 to-blue-500/20 blur-3xl" />
            <div className="relative rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-12">
              <h2 className="text-3xl sm:text-4xl font-light mb-4 text-white">
                始めよう、<span className="text-emerald-300">今日から</span>
              </h2>
              <p className="text-white/50 mb-8 max-w-md mx-auto">
                無料プランで全機能を体験。あなたのデータを統合しましょう。
              </p>
              <Button size="lg" className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-lg px-8 py-6 rounded-full">
                無料アカウントを作成
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/5 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-gradient-to-br from-emerald-400 to-blue-400" />
            <span className="font-medium text-white/70">LifeConnection</span>
          </div>
          <div className="text-white/30 text-sm">© 2024 ManyConnection LLC</div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes aurora {
          0%, 100% { transform: translateX(0) translateY(0) scale(1); }
          25% { transform: translateX(5%) translateY(-5%) scale(1.05); }
          50% { transform: translateX(-3%) translateY(3%) scale(0.95); }
          75% { transform: translateX(-5%) translateY(-3%) scale(1.02); }
        }
        @keyframes aurora2 {
          0%, 100% { transform: translateX(0) translateY(0); opacity: 0.4; }
          33% { transform: translateX(-5%) translateY(5%); opacity: 0.6; }
          66% { transform: translateX(5%) translateY(-3%); opacity: 0.3; }
        }
      `}</style>
    </div>
  );
}
