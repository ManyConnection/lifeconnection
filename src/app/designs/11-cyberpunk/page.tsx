import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const apps = [
  { name: "HealthSync", desc: "健康データ", icon: "⚡" },
  { name: "MoneyFlow", desc: "家計管理", icon: "💎" },
  { name: "HabitLoop", desc: "習慣トラック", icon: "🔄" },
  { name: "MindSpace", desc: "メンタル", icon: "🧠" },
  { name: "FoodLog", desc: "食事記録", icon: "🍜" },
  { name: "SleepTrack", desc: "睡眠分析", icon: "🌙" },
];

const stats = [
  { label: "STEPS", value: "52,340", change: "+12%" },
  { label: "SPENT", value: "¥142K", change: "ON TRACK" },
  { label: "SLEEP", value: "7.2H", change: "+0.5H" },
  { label: "STREAK", value: "23日", change: "ACTIVE" },
];

export default function CyberpunkDesign() {
  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Animated Background Grid */}
      <div className="fixed inset-0 z-0">
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }}
        />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/20 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-yellow-500/10 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* Design Label */}
      <div className="fixed top-4 left-4 z-50">
        <Link href="/designs">
          <Badge className="bg-cyan-500/80 hover:bg-cyan-400 cursor-pointer border border-cyan-400 text-black font-mono">
            ← 11_CYBERPUNK.exe
          </Badge>
        </Link>
      </div>

      {/* Glitch Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 border-b border-cyan-500/30 bg-black/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-pink-500 rounded-sm rotate-45" />
                <div className="absolute inset-0 w-10 h-10 bg-gradient-to-br from-cyan-400 to-pink-500 rounded-sm rotate-45 animate-ping opacity-20" />
              </div>
              <span className="text-xl font-mono font-bold tracking-wider">
                <span className="text-cyan-400">LIFE</span>
                <span className="text-pink-400">CONNECTION</span>
              </span>
            </div>
            <div className="hidden md:flex items-center gap-6 font-mono text-sm">
              <Link href="#" className="text-zinc-400 hover:text-cyan-400 transition-colors tracking-wider">[FEATURES]</Link>
              <Link href="#" className="text-zinc-400 hover:text-cyan-400 transition-colors tracking-wider">[APPS]</Link>
              <Link href="#" className="text-zinc-400 hover:text-cyan-400 transition-colors tracking-wider">[PRICING]</Link>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" className="border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10 font-mono text-sm">
                LOGIN
              </Button>
              <Button className="bg-gradient-to-r from-cyan-500 to-pink-500 hover:from-cyan-400 hover:to-pink-400 text-black font-mono font-bold">
                JACK IN
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block mb-6 px-4 py-1 border border-cyan-500/50 bg-cyan-500/10 text-cyan-400 font-mono text-sm">
              ◈ SYSTEM.ONLINE ◈ VERSION 2.0
            </div>
            
            {/* Glitch Title */}
            <h1 className="relative text-5xl sm:text-7xl md:text-8xl font-black mb-6 tracking-tighter">
              <span className="block text-white" style={{ textShadow: '2px 0 #ff0080, -2px 0 #00ffff' }}>
                YOUR LIFE
              </span>
              <span className="block bg-gradient-to-r from-cyan-400 via-pink-400 to-yellow-400 bg-clip-text text-transparent">
                CONNECTED
              </span>
            </h1>
            
            <p className="text-lg sm:text-xl text-zinc-400 max-w-2xl mx-auto mb-10 font-mono">
              すべてのデータを統合。AIがパターンを解析。
              <br />
              <span className="text-cyan-400">_未来のライフログがここに。</span>
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-gradient-to-r from-cyan-500 to-cyan-400 hover:from-cyan-400 hover:to-cyan-300 text-black font-mono font-bold text-lg px-8 py-6 group">
                <span className="group-hover:animate-pulse">▶</span> START_SESSION
              </Button>
              <Button size="lg" variant="outline" className="border-pink-500/50 text-pink-400 hover:bg-pink-500/10 font-mono text-lg px-8 py-6">
                ◎ VIEW_DEMO
              </Button>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
            {stats.map((stat, i) => (
              <div 
                key={i}
                className="relative border border-cyan-500/30 bg-black/50 backdrop-blur p-6 group hover:border-cyan-400 transition-all"
              >
                <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-cyan-400" />
                <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-cyan-400" />
                <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-cyan-400" />
                <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-cyan-400" />
                
                <div className="text-zinc-500 font-mono text-xs tracking-widest mb-2">{stat.label}</div>
                <div className="text-3xl font-black text-white mb-1">{stat.value}</div>
                <div className="text-cyan-400 font-mono text-xs">{stat.change}</div>
              </div>
            ))}
          </div>

          {/* Dashboard Preview */}
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/20 via-pink-500/20 to-yellow-500/20 blur-xl" />
            <div className="relative border-2 border-cyan-500/50 bg-black/80 backdrop-blur-xl p-6">
              {/* Terminal Header */}
              <div className="flex items-center gap-2 mb-4 pb-4 border-b border-cyan-500/30">
                <div className="w-3 h-3 rounded-full bg-pink-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-cyan-500" />
                <span className="ml-4 font-mono text-sm text-zinc-500">lifeconnection://dashboard</span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Activity Graph */}
                <div className="md:col-span-2 border border-zinc-800 bg-zinc-900/50 p-4">
                  <div className="text-xs font-mono text-zinc-500 mb-3">WEEKLY_ACTIVITY.log</div>
                  <div className="flex items-end gap-2 h-32">
                    {[65, 45, 80, 60, 90, 75, 85].map((h, i) => (
                      <div key={i} className="flex-1 flex flex-col items-center gap-1">
                        <div 
                          className="w-full bg-gradient-to-t from-cyan-500 to-pink-500 rounded-sm"
                          style={{ height: `${h}%` }}
                        />
                        <span className="text-xs font-mono text-zinc-600">
                          {['M', 'T', 'W', 'T', 'F', 'S', 'S'][i]}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Status Panel */}
                <div className="border border-zinc-800 bg-zinc-900/50 p-4">
                  <div className="text-xs font-mono text-zinc-500 mb-3">SYSTEM_STATUS</div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-zinc-400 font-mono text-sm">Health</span>
                      <span className="text-cyan-400 font-mono text-sm">● SYNCED</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-zinc-400 font-mono text-sm">Finance</span>
                      <span className="text-cyan-400 font-mono text-sm">● SYNCED</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-zinc-400 font-mono text-sm">Sleep</span>
                      <span className="text-yellow-400 font-mono text-sm">○ PENDING</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-zinc-400 font-mono text-sm">AI Core</span>
                      <span className="text-pink-400 font-mono text-sm animate-pulse">◉ ACTIVE</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Apps Section */}
      <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
              <span className="text-white">CONNECTED </span>
              <span className="text-cyan-400">APPS</span>
            </h2>
            <p className="text-zinc-500 font-mono mt-2">// ManyConnection Ecosystem</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {apps.map((app, i) => (
              <div 
                key={i}
                className="group relative border border-zinc-800 hover:border-cyan-500/50 bg-zinc-900/30 p-6 text-center transition-all cursor-pointer"
              >
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">{app.icon}</div>
                <div className="font-mono font-bold text-white text-sm">{app.name}</div>
                <div className="font-mono text-zinc-500 text-xs mt-1">{app.desc}</div>
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-cyan-500 scale-x-0 group-hover:scale-x-100 transition-transform" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="relative border-2 border-pink-500/50 bg-black/80 p-12 text-center">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-black px-4">
              <span className="font-mono text-pink-400 text-sm">◈ INITIATE ◈</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl font-black mb-4">
              <span className="text-white">READY TO </span>
              <span className="text-pink-400">CONNECT?</span>
            </h2>
            <p className="text-zinc-400 font-mono mb-8">
              無料で始めよう。あなたのデータはあなたのもの。
            </p>
            <Button size="lg" className="bg-gradient-to-r from-pink-500 to-pink-400 hover:from-pink-400 hover:to-pink-300 text-black font-mono font-bold text-lg px-8 py-6">
              CREATE_ACCOUNT ▸
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-zinc-800 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 font-mono text-sm">
            <span className="text-cyan-400">LIFE</span>
            <span className="text-pink-400">CONNECTION</span>
          </div>
          <div className="text-zinc-600 font-mono text-xs">© 2024 MANYCONNECTION LLC // ALL_RIGHTS_RESERVED</div>
        </div>
      </footer>
    </div>
  );
}
