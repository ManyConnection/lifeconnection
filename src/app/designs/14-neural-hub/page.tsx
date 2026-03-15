import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const connectedApps = [
  { name: "家計簿", category: "Money", color: "bg-emerald-500", x: "left-[8%]", y: "top-[18%]" },
  { name: "カレンダー", category: "Time", color: "bg-blue-500", x: "left-[22%]", y: "top-[8%]" },
  { name: "タスク管理", category: "Productivity", color: "bg-violet-500", x: "left-[40%]", y: "top-[5%]" },
  { name: "睡眠", category: "Health", color: "bg-indigo-500", x: "right-[40%]", y: "top-[5%]" },
  { name: "歩数", category: "Health", color: "bg-cyan-500", x: "right-[22%]", y: "top-[8%]" },
  { name: "食事", category: "Health", color: "bg-teal-500", x: "right-[8%]", y: "top-[18%]" },
  { name: "読書", category: "Growth", color: "bg-amber-500", x: "left-[5%]", y: "top-[42%]" },
  { name: "学習", category: "Growth", color: "bg-orange-500", x: "right-[5%]", y: "top-[42%]" },
  { name: "SNS", category: "Social", color: "bg-pink-500", x: "left-[8%]", y: "bottom-[28%]" },
  { name: "メール", category: "Work", color: "bg-rose-500", x: "right-[8%]", y: "bottom-[28%]" },
  { name: "音楽", category: "Lifestyle", color: "bg-fuchsia-500", x: "left-[22%]", y: "bottom-[15%]" },
  { name: "移動", category: "Lifestyle", color: "bg-sky-500", x: "right-[22%]", y: "bottom-[15%]" },
];

const insights = [
  {
    title: "睡眠 × 生産性",
    description: "7.5h以上の睡眠時、翌日のタスク完了率が34%向上",
    trend: "+34%",
    trendColor: "text-emerald-400",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
      </svg>
    ),
  },
  {
    title: "支出 × 気分",
    description: "外食が週3回を超えると、月末の満足度が低下",
    trend: "パターン検出",
    trendColor: "text-amber-400",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: "運動 × 睡眠の質",
    description: "午前中のウォーキング後、深い睡眠が平均22分増加",
    trend: "+22min",
    trendColor: "text-cyan-400",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
  },
];

const dataCategories = [
  { name: "健康・フィットネス", count: 12, color: "from-cyan-500 to-teal-500", apps: "睡眠・歩数・心拍・食事・体重・ワークアウト..." },
  { name: "お金・家計", count: 8, color: "from-emerald-500 to-green-500", apps: "銀行・クレカ・家計簿・投資・サブスク..." },
  { name: "時間・生産性", count: 11, color: "from-violet-500 to-purple-500", apps: "カレンダー・タスク・ポモドーロ・スクリーンタイム..." },
  { name: "学習・成長", count: 7, color: "from-amber-500 to-orange-500", apps: "読書・オンライン講座・語学・メモ..." },
  { name: "ソーシャル・通信", count: 6, color: "from-pink-500 to-rose-500", apps: "メール・SNS・メッセンジャー・通話..." },
  { name: "ライフスタイル", count: 9, color: "from-sky-500 to-blue-500", apps: "音楽・移動・天気・写真・習慣トラッカー..." },
];

const weeklyData = [
  { day: "月", health: 72, money: 45, time: 88, learn: 60 },
  { day: "火", health: 85, money: 30, time: 92, learn: 45 },
  { day: "水", health: 68, money: 65, time: 75, learn: 80 },
  { day: "木", health: 90, money: 40, time: 85, learn: 55 },
  { day: "金", health: 78, money: 80, time: 70, learn: 30 },
  { day: "土", health: 95, money: 55, time: 40, learn: 90 },
  { day: "日", health: 88, money: 35, time: 30, learn: 95 },
];

export default function NeuralHubDesign() {
  return (
    <div className="min-h-screen bg-[#0a0a1a] text-white overflow-hidden">
      {/* Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-950/40 via-[#0a0a1a] to-[#0a0a1a]" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-violet-600/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-indigo-950/20 to-transparent" />
        {/* Subtle dot grid */}
        <div className="absolute inset-0 bg-[radial-gradient(circle,_rgba(139,92,246,0.06)_1px,_transparent_1px)] bg-[size:32px_32px]" />
      </div>

      {/* Design Label */}
      <div className="fixed top-4 left-4 z-50">
        <Link href="/designs">
          <Badge className="bg-violet-600 hover:bg-violet-500 cursor-pointer">
            ← Design 14: Neural Hub
          </Badge>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-[#0a0a1a]/70 backdrop-blur-2xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              {/* Logo: Neural/Connection symbol */}
              <div className="relative">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                    <circle cx="12" cy="12" r="3" />
                    <circle cx="4" cy="8" r="1.5" />
                    <circle cx="20" cy="8" r="1.5" />
                    <circle cx="4" cy="16" r="1.5" />
                    <circle cx="20" cy="16" r="1.5" />
                    <path d="M9.5 10.5L5.5 8.5M14.5 10.5L18.5 8.5M9.5 13.5L5.5 15.5M14.5 13.5L18.5 15.5" strokeLinecap="round" />
                  </svg>
                </div>
                <div className="absolute -inset-1 bg-gradient-to-br from-violet-500 to-indigo-600 rounded-xl blur opacity-25" />
              </div>
              <span className="text-xl font-bold tracking-tight">LifeConnection</span>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="ghost" className="text-slate-400 hover:text-white cursor-pointer">
                ログイン
              </Button>
              <Button className="bg-violet-600 hover:bg-violet-500 text-white font-medium cursor-pointer">
                無料で始める
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-28 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-500" />
            </span>
            <span className="text-sm text-violet-300">50以上のアプリを統合</span>
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6 leading-[1.1] tracking-tight">
            人生のすべてを
            <br />
            <span className="bg-gradient-to-r from-violet-400 via-indigo-400 to-cyan-400 bg-clip-text text-transparent">
              ひとつに繋げて、AIで分析
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            家計簿、時間管理、健康、学習、仕事——
            <br className="hidden sm:block" />
            バラバラだった50以上のアプリのデータを統合し、
            <br className="hidden sm:block" />
            AIがあなたの人生の「見えないつながり」を発見します。
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-16">
            <Button size="lg" className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-semibold text-lg px-8 py-6 cursor-pointer group">
              無料で始める
              <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Button>
            <Button size="lg" variant="outline" className="border-white/10 text-slate-300 hover:bg-white/5 text-lg px-8 py-6 cursor-pointer">
              仕組みを見る
            </Button>
          </div>
        </div>
      </section>

      {/* Neural Connection Visualization */}
      <section className="relative py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="relative h-[420px] sm:h-[480px] rounded-3xl bg-gradient-to-b from-slate-900/50 to-slate-950/50 border border-white/5 overflow-hidden">
            {/* Central AI Brain */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
              <div className="relative">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center shadow-2xl shadow-violet-500/30">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" />
                  </svg>
                </div>
                <div className="absolute -inset-4 rounded-full border border-violet-500/20 animate-[pulse_3s_ease-in-out_infinite]" />
                <div className="absolute -inset-8 rounded-full border border-violet-500/10 animate-[pulse_3s_ease-in-out_infinite_0.5s]" />
                <div className="absolute -inset-12 rounded-full border border-violet-500/5 animate-[pulse_3s_ease-in-out_infinite_1s]" />
              </div>
            </div>

            {/* Orbiting App Nodes */}
            {connectedApps.map((app, i) => (
              <div
                key={i}
                className={`absolute ${app.x} ${app.y} z-20 group`}
              >
                <div className="relative flex flex-col items-center gap-1">
                  <div className={`w-10 h-10 sm:w-11 sm:h-11 rounded-xl ${app.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform cursor-pointer`}>
                    <span className="text-[10px] font-bold text-white/90">{app.name.slice(0, 2)}</span>
                  </div>
                  <span className="text-[10px] text-slate-500 group-hover:text-slate-300 transition-colors">{app.name}</span>
                </div>
              </div>
            ))}

            {/* Connection lines (SVG) */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="rgba(139,92,246,0.3)" />
                  <stop offset="50%" stopColor="rgba(139,92,246,0.1)" />
                  <stop offset="100%" stopColor="rgba(139,92,246,0.3)" />
                </linearGradient>
              </defs>
              {/* Lines from each corner area to center */}
              {[
                "M 12% 22% L 50% 50%", "M 26% 12% L 50% 50%", "M 44% 9% L 50% 50%",
                "M 56% 9% L 50% 50%", "M 74% 12% L 50% 50%", "M 88% 22% L 50% 50%",
                "M 9% 46% L 50% 50%", "M 91% 46% L 50% 50%",
                "M 12% 68% L 50% 50%", "M 88% 68% L 50% 50%",
                "M 26% 81% L 50% 50%", "M 74% 81% L 50% 50%",
              ].map((d, i) => (
                <path key={i} d={d} stroke="url(#line-gradient)" strokeWidth="1" fill="none" opacity="0.6" />
              ))}
            </svg>

            {/* Label */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-center">
              <p className="text-xs text-slate-500">あなたの50以上のアプリが、ひとつのAIに繋がる</p>
            </div>
          </div>
        </div>
      </section>

      {/* Data Categories Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">あらゆるデータを、ひとつに</h2>
            <p className="text-slate-400 text-lg">6つのカテゴリ、50以上のアプリを統合</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {dataCategories.map((cat, i) => (
              <div
                key={i}
                className="group relative rounded-2xl bg-slate-900/40 border border-white/5 p-6 hover:border-white/10 transition-all cursor-pointer"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${cat.color} flex items-center justify-center opacity-80`}>
                    <span className="text-sm font-bold text-white">{cat.count}</span>
                  </div>
                  <svg className="w-5 h-5 text-slate-600 group-hover:text-slate-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-1">{cat.name}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{cat.apps}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Insights Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <Badge className="bg-violet-500/10 text-violet-400 border-violet-500/20 mb-4">
              AI Cross-Analysis
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              アプリをまたいだ
              <span className="text-violet-400">「発見」</span>
            </h2>
            <p className="text-slate-400 text-lg max-w-xl mx-auto">
              単体アプリでは見えない、あなたの人生のパターンをAIが発見
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {insights.map((insight, i) => (
              <div
                key={i}
                className="relative rounded-2xl bg-gradient-to-b from-slate-900/60 to-slate-950/60 border border-white/5 p-6 hover:border-violet-500/20 transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-violet-500/10 flex items-center justify-center text-violet-400">
                    {insight.icon}
                  </div>
                  <span className={`text-sm font-medium ${insight.trendColor}`}>{insight.trend}</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">{insight.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{insight.description}</p>
                {/* Decorative bottom line */}
                <div className="absolute bottom-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-violet-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dashboard Preview */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">人生のダッシュボード</h2>
            <p className="text-slate-400 text-lg">すべてのデータが、ひとつの画面に</p>
          </div>

          <div className="rounded-2xl bg-slate-900/40 border border-white/5 overflow-hidden">
            {/* Dashboard Header */}
            <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-violet-500" />
                <span className="text-sm text-slate-400">Weekly Overview</span>
              </div>
              <div className="flex gap-2">
                {["健康", "お金", "時間", "学習"].map((label, i) => (
                  <span key={i} className={`text-xs px-2.5 py-1 rounded-full ${
                    ["bg-cyan-500/10 text-cyan-400", "bg-emerald-500/10 text-emerald-400", "bg-violet-500/10 text-violet-400", "bg-amber-500/10 text-amber-400"][i]
                  }`}>
                    {label}
                  </span>
                ))}
              </div>
            </div>

            {/* Chart Area */}
            <div className="p-6">
              {/* Bar chart visualization */}
              <div className="flex items-end gap-3 h-48 mb-4">
                {weeklyData.map((day, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1">
                    <div className="w-full flex gap-0.5 items-end h-40">
                      <div className="flex-1 bg-cyan-500/60 rounded-t-sm transition-all hover:bg-cyan-500/80" style={{ height: `${day.health}%` }} />
                      <div className="flex-1 bg-emerald-500/60 rounded-t-sm transition-all hover:bg-emerald-500/80" style={{ height: `${day.money}%` }} />
                      <div className="flex-1 bg-violet-500/60 rounded-t-sm transition-all hover:bg-violet-500/80" style={{ height: `${day.time}%` }} />
                      <div className="flex-1 bg-amber-500/60 rounded-t-sm transition-all hover:bg-amber-500/80" style={{ height: `${day.learn}%` }} />
                    </div>
                    <span className="text-xs text-slate-500">{day.day}</span>
                  </div>
                ))}
              </div>

              {/* KPI Row */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-white/5">
                {[
                  { label: "ライフスコア", value: "82", unit: "/100", color: "text-violet-400" },
                  { label: "達成タスク", value: "34", unit: "件/週", color: "text-cyan-400" },
                  { label: "節約額", value: "¥12,400", unit: "vs先月", color: "text-emerald-400" },
                  { label: "学習時間", value: "8.5", unit: "h/週", color: "text-amber-400" },
                ].map((kpi, i) => (
                  <div key={i} className="text-center py-3">
                    <div className={`text-2xl font-bold ${kpi.color}`}>{kpi.value}</div>
                    <div className="text-xs text-slate-500 mt-1">{kpi.label}</div>
                    <div className="text-[10px] text-slate-600">{kpi.unit}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">3ステップで始める</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "アプリを接続",
                desc: "使っているアプリを選んでワンクリックで連携。50以上のサービスに対応。",
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m9.86-2.44a4.5 4.5 0 00-1.242-7.244l-4.5-4.5a4.5 4.5 0 00-6.364 6.364L4.34 8.798" />
                  </svg>
                ),
              },
              {
                step: "02",
                title: "AIが分析",
                desc: "クロスアプリの相関を自動検出。あなただけのインサイトを生成。",
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                  </svg>
                ),
              },
              {
                step: "03",
                title: "行動を変える",
                desc: "データに基づいた提案で、人生のあらゆる側面を最適化。",
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
                  </svg>
                ),
              },
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="inline-flex w-14 h-14 rounded-2xl bg-violet-500/10 items-center justify-center text-violet-400 mb-5">
                  {item.icon}
                </div>
                <div className="text-xs text-violet-500 font-mono mb-2">STEP {item.step}</div>
                <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="grid grid-cols-3 gap-8 mb-12">
            {[
              { value: "50+", label: "対応アプリ" },
              { value: "10万+", label: "分析済みデータポイント" },
              { value: "98%", label: "ユーザー満足度" },
            ].map((stat, i) => (
              <div key={i}>
                <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">{stat.value}</div>
                <div className="text-sm text-slate-500 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="relative rounded-3xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-violet-600 to-indigo-700" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(255,255,255,0.1),transparent)]" />
            <div className="relative p-10 sm:p-14 text-center">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-white">
                バラバラだったデータに、
                <br />
                つながりを。
              </h2>
              <p className="text-violet-200 text-lg mb-8 max-w-lg mx-auto">
                50以上のアプリのデータをAIが分析。あなたの人生の全体像が見えてくる。
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button size="lg" className="bg-white text-violet-700 hover:bg-violet-50 text-lg px-10 py-6 font-semibold cursor-pointer">
                  無料で始める
                </Button>
                <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 text-lg px-10 py-6 cursor-pointer">
                  もっと詳しく
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative border-t border-white/5 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600" />
            <span className="font-bold">LifeConnection</span>
          </div>
          <div className="text-slate-600 text-sm">© 2024 ManyConnection LLC</div>
        </div>
      </footer>
    </div>
  );
}
