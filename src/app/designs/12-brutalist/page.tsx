"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";

const apps = [
  { name: "HEALTHSYNC", category: "HEALTH" },
  { name: "MONEYFLOW", category: "FINANCE" },
  { name: "HABITLOOP", category: "HABITS" },
  { name: "MINDSPACE", category: "MENTAL" },
  { name: "FOODLOG", category: "FOOD" },
  { name: "SLEEPTRACK", category: "SLEEP" },
];

export default function BrutalistDesign() {
  return (
    <div className="min-h-screen bg-white text-black selection:bg-black selection:text-white">
      {/* Design Label */}
      <div className="fixed top-4 left-4 z-50">
        <Link href="/designs">
          <Badge className="bg-black hover:bg-zinc-800 cursor-pointer text-white font-mono uppercase tracking-wider">
            ← 12 BRUTALIST
          </Badge>
        </Link>
      </div>

      {/* Navigation - Raw, Bold */}
      <nav className="fixed top-0 left-0 right-0 z-40 border-b-4 border-black bg-white">
        <div className="px-4 sm:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="font-black text-2xl tracking-tighter">
              LIFE<br className="md:hidden" />CONNECTION
            </div>
            <div className="hidden md:flex items-center gap-8 font-bold uppercase tracking-wider text-sm">
              <Link href="#" className="hover:line-through">Features</Link>
              <Link href="#" className="hover:line-through">Apps</Link>
              <Link href="#" className="hover:line-through">About</Link>
            </div>
            <button className="bg-black text-white px-6 py-3 font-bold uppercase tracking-wider hover:bg-zinc-800 transition-colors">
              Start Now →
            </button>
          </div>
        </div>
      </nav>

      {/* Hero - Massive Typography */}
      <section className="pt-32 pb-12 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="border-4 border-black">
            {/* Giant Title */}
            <div className="p-8 sm:p-12 border-b-4 border-black">
              <h1 className="text-[12vw] sm:text-[10vw] font-black leading-[0.85] tracking-tighter uppercase">
                Your
                <br />
                Life,
                <br />
                <span className="text-white bg-black px-4 inline-block -ml-1">Connected.</span>
              </h1>
            </div>
            
            {/* Subtext Block */}
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="p-8 border-b-4 md:border-b-0 md:border-r-4 border-black">
                <p className="text-xl sm:text-2xl font-bold leading-tight">
                  すべてのManyConnectionアプリからデータを統合。
                  AIが分析。パターンを発見。より良い生活へ。
                </p>
              </div>
              <div className="p-8 bg-black text-white">
                <div className="text-6xl sm:text-8xl font-black">6+</div>
                <div className="text-xl font-bold uppercase tracking-wider mt-2">Connected Apps</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="px-4 sm:px-8 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { value: "52K", label: "歩数" },
              { value: "¥142K", label: "支出" },
              { value: "7.2H", label: "睡眠" },
              { value: "23日", label: "連続" },
            ].map((stat, i) => (
              <div key={i} className="border-4 border-black p-6 hover:bg-black hover:text-white transition-colors cursor-pointer">
                <div className="text-4xl sm:text-5xl font-black">{stat.value}</div>
                <div className="text-sm font-bold uppercase tracking-wider mt-2">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features - Grid of Boxes */}
      <section className="px-4 sm:px-8 py-12">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl sm:text-6xl font-black uppercase tracking-tighter mb-8 border-b-4 border-black pb-4">
            Features_
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border-4 border-black p-8 hover:bg-yellow-300 transition-colors">
              <div className="text-6xl font-black mb-4">01</div>
              <h3 className="text-2xl font-black uppercase mb-2">統合ダッシュボード</h3>
              <p className="font-bold text-zinc-600">
                すべてのデータを一画面で。健康、支出、習慣、睡眠。
              </p>
            </div>
            
            <div className="border-4 border-black p-8 hover:bg-cyan-300 transition-colors">
              <div className="text-6xl font-black mb-4">02</div>
              <h3 className="text-2xl font-black uppercase mb-2">AI分析</h3>
              <p className="font-bold text-zinc-600">
                パターンを自動検出。インサイトを提供。
              </p>
            </div>
            
            <div className="border-4 border-black p-8 hover:bg-pink-300 transition-colors">
              <div className="text-6xl font-black mb-4">03</div>
              <h3 className="text-2xl font-black uppercase mb-2">クロスアプリ連携</h3>
              <p className="font-bold text-zinc-600">
                運動と睡眠、食事と体重。関連データを自動紐付け。
              </p>
            </div>
            
            <div className="border-4 border-black p-8 hover:bg-lime-300 transition-colors">
              <div className="text-6xl font-black mb-4">04</div>
              <h3 className="text-2xl font-black uppercase mb-2">プライバシー重視</h3>
              <p className="font-bold text-zinc-600">
                ローカル優先。クラウドは任意。完全コントロール。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Apps - Raw List */}
      <section className="px-4 sm:px-8 py-12 bg-black text-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl sm:text-6xl font-black uppercase tracking-tighter mb-8 border-b-4 border-white pb-4">
            Apps_
          </h2>
          
          <div className="space-y-2">
            {apps.map((app, i) => (
              <div 
                key={i}
                className="group flex items-center justify-between border-b-2 border-white/30 py-4 hover:bg-white hover:text-black px-4 -mx-4 cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-4">
                  <span className="font-mono text-zinc-500 group-hover:text-zinc-400">0{i + 1}</span>
                  <span className="text-2xl sm:text-4xl font-black uppercase tracking-tighter">{app.name}</span>
                </div>
                <span className="text-sm font-bold uppercase tracking-wider text-zinc-400 group-hover:text-zinc-600">
                  {app.category} →
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Marquee */}
      <section className="py-8 border-y-4 border-black overflow-hidden">
        <div className="flex whitespace-nowrap animate-marquee">
          {[...Array(10)].map((_, i) => (
            <span key={i} className="text-4xl sm:text-6xl font-black uppercase tracking-tighter mx-8">
              LifeConnection • データ統合 • AI分析 • プライバシー優先 • 
            </span>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 sm:px-8 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl sm:text-7xl md:text-8xl font-black uppercase tracking-tighter leading-none mb-8">
            Ready?<br />
            <span className="bg-black text-white px-4 inline-block">Let&apos;s Go.</span>
          </h2>
          <button className="bg-black text-white px-12 py-6 font-black uppercase tracking-wider text-xl hover:bg-zinc-800 transition-colors">
            無料で始める →
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t-4 border-black px-4 sm:px-8 py-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="font-black text-xl tracking-tighter">LIFECONNECTION</div>
          <div className="font-bold text-zinc-500 uppercase tracking-wider text-sm">
            © 2024 ManyConnection LLC
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
      `}</style>
    </div>
  );
}
