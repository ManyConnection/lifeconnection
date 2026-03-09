import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const weekDays = ["月", "火", "水", "木", "金", "土", "日"];

export default function CozyLifeDesign() {
  return (
    <div className="min-h-screen bg-rose-50 text-stone-700">
      {/* Design Label */}
      <div className="fixed top-4 left-4 z-50">
        <Link href="/designs">
          <Badge className="bg-rose-400 hover:bg-rose-300 cursor-pointer">
            ← Design 09: Cozy Life
          </Badge>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-rose-50/90 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <span className="text-2xl">☕</span>
              <span className="font-medium text-stone-600">ライフコネクション</span>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" className="text-stone-500 hover:text-stone-700 rounded-xl">
                ログイン
              </Button>
              <Button className="bg-rose-400 hover:bg-rose-500 text-white rounded-xl">
                はじめる
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-28 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-3xl p-10 shadow-sm">
            <div className="flex items-center gap-2 text-rose-400 text-sm mb-6">
              <span>🏡</span>
              <span>おうちでゆったり管理</span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl font-medium mb-6 leading-relaxed text-stone-700">
              毎日の暮らしを、
              <br />
              やさしく記録する。
            </h1>
            
            <p className="text-stone-500 leading-relaxed mb-8">
              お気に入りのアプリからデータが集まって、
              <br />
              自分だけの暮らしの手帖ができあがります。
            </p>
            
            <div className="flex gap-3">
              <Button className="bg-rose-400 hover:bg-rose-500 text-white rounded-xl px-6">
                無料ではじめる
              </Button>
              <Button variant="outline" className="border-rose-200 text-stone-600 hover:bg-rose-50 rounded-xl px-6">
                詳しく見る
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Weekly Overview - Cozy Style */}
      <section className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-3xl p-8 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-medium text-stone-600">今週のようす</h2>
              <span className="text-sm text-stone-400">3月4日〜10日</span>
            </div>
            
            {/* Simple Week View */}
            <div className="grid grid-cols-7 gap-2 mb-8">
              {weekDays.map((day, i) => (
                <div key={i} className="text-center">
                  <div className="text-xs text-stone-400 mb-2">{day}</div>
                  <div className={`w-10 h-10 rounded-xl mx-auto flex items-center justify-center ${
                    i < 6 ? 'bg-rose-100' : 'bg-stone-100'
                  }`}>
                    {i < 6 ? (
                      <span className="text-lg">{['😊', '😴', '🏃', '📖', '🍳', '✨'][i]}</span>
                    ) : (
                      <span className="text-stone-300">?</span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-green-50 rounded-2xl p-4">
                <div className="text-xs text-green-600 mb-1">歩数</div>
                <div className="text-xl font-medium text-green-700">52,340</div>
                <div className="text-xs text-green-500">いい調子 ✓</div>
              </div>
              <div className="bg-amber-50 rounded-2xl p-4">
                <div className="text-xs text-amber-600 mb-1">支出</div>
                <div className="text-xl font-medium text-amber-700">¥14.2万</div>
                <div className="text-xs text-amber-500">予算内 ✓</div>
              </div>
              <div className="bg-indigo-50 rounded-2xl p-4">
                <div className="text-xs text-indigo-600 mb-1">睡眠</div>
                <div className="text-xl font-medium text-indigo-700">7.2h</div>
                <div className="text-xs text-indigo-500">ぐっすり ✓</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features - Card Style */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <span className="text-2xl mb-3 block">📚</span>
              <h3 className="font-medium text-stone-700 mb-2">まとめて見る</h3>
              <p className="text-sm text-stone-500">いろんなアプリの情報がひとつに</p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <span className="text-2xl mb-3 block">🔗</span>
              <h3 className="font-medium text-stone-700 mb-2">つながりを発見</h3>
              <p className="text-sm text-stone-500">睡眠と運動の関係など</p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <span className="text-2xl mb-3 block">👨‍👩‍👧</span>
              <h3 className="font-medium text-stone-700 mb-2">家族とシェア</h3>
              <p className="text-sm text-stone-500">大切な人と共有できる</p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <span className="text-2xl mb-3 block">🔐</span>
              <h3 className="font-medium text-stone-700 mb-2">安心設計</h3>
              <p className="text-sm text-stone-500">プライバシーをしっかり守る</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-3xl p-10 shadow-sm text-center">
            <span className="text-4xl mb-4 block">🌸</span>
            <h2 className="text-2xl font-medium text-stone-700 mb-4">
              今日から、やさしい記録をはじめよう
            </h2>
            <p className="text-stone-500 mb-8">
              無料で使えます。気軽にどうぞ。
            </p>
            <Button className="bg-rose-400 hover:bg-rose-500 text-white rounded-xl px-8 py-6">
              アカウントを作る
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 sm:px-6 lg:px-8 bg-rose-50">
        <div className="max-w-3xl mx-auto flex items-center justify-between text-sm text-stone-500">
          <div className="flex items-center gap-2">
            <span>☕</span>
            <span>ライフコネクション</span>
          </div>
          <span>© 2024 ManyConnection</span>
        </div>
      </footer>
    </div>
  );
}
