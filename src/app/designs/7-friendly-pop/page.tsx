import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const apps = [
  { name: "けんこう", emoji: "💪", color: "bg-green-100 text-green-700" },
  { name: "おかね", emoji: "🐷", color: "bg-pink-100 text-pink-700" },
  { name: "しゅうかん", emoji: "✨", color: "bg-purple-100 text-purple-700" },
  { name: "すいみん", emoji: "🌙", color: "bg-blue-100 text-blue-700" },
  { name: "ごはん", emoji: "🍙", color: "bg-orange-100 text-orange-700" },
  { name: "きぶん", emoji: "😊", color: "bg-yellow-100 text-yellow-700" },
];

export default function FriendlyPopDesign() {
  return (
    <div className="min-h-screen bg-sky-50 text-slate-700">
      {/* Design Label */}
      <div className="fixed top-4 left-4 z-50">
        <Link href="/designs">
          <Badge className="bg-sky-500 hover:bg-sky-400 cursor-pointer">
            ← Design 07: Friendly Pop
          </Badge>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-white/80 backdrop-blur-sm shadow-sm">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="text-2xl">🎈</div>
              <span className="text-xl font-bold text-sky-600">Life Connection</span>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="ghost" className="text-slate-600 hover:text-sky-600 rounded-full">
                ログイン
              </Button>
              <Button className="bg-sky-500 hover:bg-sky-600 text-white rounded-full px-6 shadow-lg shadow-sky-200">
                無料で始める！
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-28 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block mb-6">
            <div className="flex items-center gap-1 text-4xl">
              <span className="animate-bounce" style={{ animationDelay: '0ms' }}>🎉</span>
              <span className="animate-bounce" style={{ animationDelay: '100ms' }}>🎊</span>
              <span className="animate-bounce" style={{ animationDelay: '200ms' }}>✨</span>
            </div>
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black mb-6 leading-tight">
            毎日の
            <span className="text-sky-500">きろく</span>を
            <br />
            <span className="text-pink-500">たのしく</span>まとめよう！
          </h1>
          
          <p className="text-lg text-slate-600 max-w-md mx-auto mb-10">
            いろんなアプリの情報が、ぜんぶここに集まるよ。
            かんたん、らくちん！
          </p>
          
          <Button size="lg" className="bg-gradient-to-r from-sky-400 to-pink-400 hover:from-sky-500 hover:to-pink-500 text-white rounded-full text-xl px-10 py-7 shadow-xl">
            🚀 はじめる！
          </Button>
        </div>
      </section>

      {/* Fun Stats */}
      <section className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-[32px] shadow-xl p-8 border-4 border-sky-100">
            <div className="text-center mb-6">
              <span className="inline-block px-4 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm font-medium">
                📊 こんしゅうのまとめ
              </span>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-green-50 rounded-2xl p-6 text-center transform hover:scale-105 transition-transform">
                <div className="text-4xl mb-2">👟</div>
                <div className="text-3xl font-black text-green-600">52,340</div>
                <div className="text-green-600 text-sm font-medium">あるいた！</div>
              </div>
              <div className="bg-pink-50 rounded-2xl p-6 text-center transform hover:scale-105 transition-transform">
                <div className="text-4xl mb-2">💸</div>
                <div className="text-3xl font-black text-pink-600">¥14万</div>
                <div className="text-pink-600 text-sm font-medium">つかった</div>
              </div>
              <div className="bg-purple-50 rounded-2xl p-6 text-center transform hover:scale-105 transition-transform">
                <div className="text-4xl mb-2">💤</div>
                <div className="text-3xl font-black text-purple-600">7.2h</div>
                <div className="text-purple-600 text-sm font-medium">ねた！</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Connected Apps */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-slate-700 mb-2">つかえるアプリ 🎮</h2>
            <p className="text-slate-500">すきなアプリとつなげよう</p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4">
            {apps.map((app, index) => (
              <div 
                key={index} 
                className={`${app.color} px-6 py-3 rounded-full font-medium flex items-center gap-2 transform hover:scale-110 transition-transform cursor-pointer shadow-md`}
              >
                <span className="text-xl">{app.emoji}</span>
                <span>{app.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-sky-50 rounded-3xl p-8 text-center">
              <div className="text-5xl mb-4">🎯</div>
              <h3 className="text-lg font-bold text-sky-700 mb-2">かんたん</h3>
              <p className="text-slate-600 text-sm">むずかしいことはなし！</p>
            </div>
            <div className="bg-pink-50 rounded-3xl p-8 text-center">
              <div className="text-5xl mb-4">🔒</div>
              <h3 className="text-lg font-bold text-pink-700 mb-2">あんしん</h3>
              <p className="text-slate-600 text-sm">データはしっかりまもるよ</p>
            </div>
            <div className="bg-yellow-50 rounded-3xl p-8 text-center">
              <div className="text-5xl mb-4">🆓</div>
              <h3 className="text-lg font-bold text-yellow-700 mb-2">むりょう</h3>
              <p className="text-slate-600 text-sm">ずっと無料でつかえる！</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-gradient-to-br from-sky-100 via-pink-100 to-yellow-100 rounded-[40px] p-12 shadow-lg">
            <div className="text-6xl mb-4">🌈</div>
            <h2 className="text-2xl font-black text-slate-700 mb-4">
              きょうからはじめよう！
            </h2>
            <p className="text-slate-600 mb-8">
              めんどうなことはなし。すぐにスタートできるよ！
            </p>
            <Button size="lg" className="bg-slate-800 hover:bg-slate-900 text-white rounded-full px-10 py-6 text-lg">
              アカウントをつくる ✨
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 sm:px-6 lg:px-8 bg-sky-50">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl">🎈</span>
            <span className="font-bold text-sky-600">Life Connection</span>
          </div>
          <div className="text-slate-500 text-sm">© 2024 ManyConnection</div>
        </div>
      </footer>
    </div>
  );
}
