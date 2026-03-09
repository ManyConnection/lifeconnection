import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const features = [
  { title: "まとめて見る", description: "いろんなアプリのデータを一つの画面で", icon: "📋" },
  { title: "つながりを発見", description: "健康と習慣、お金と生活の関係が見える", icon: "🔍" },
  { title: "かんたん共有", description: "家族やパートナーとデータをシェア", icon: "👥" },
  { title: "あなただけの記録", description: "プライバシーを大切に、安心して使える", icon: "📔" },
];

export default function WarmNaturalDesign() {
  return (
    <div className="min-h-screen bg-amber-50 text-stone-800">
      {/* Design Label */}
      <div className="fixed top-4 left-4 z-50">
        <Link href="/designs">
          <Badge className="bg-amber-700 hover:bg-amber-600 cursor-pointer">
            ← Design 06: Warm Natural
          </Badge>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-amber-50/90 backdrop-blur-sm border-b border-amber-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-amber-200 flex items-center justify-center text-xl">
                🏠
              </div>
              <span className="text-xl font-medium text-stone-700">LifeConnection</span>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" className="text-stone-600 hover:text-stone-800 hover:bg-amber-100">
                ログイン
              </Button>
              <Button className="bg-amber-600 hover:bg-amber-700 text-white rounded-full px-6">
                はじめる
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-28 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-100 text-amber-800 text-sm mb-8">
            <span>🌿</span>
            <span>毎日をもっとシンプルに</span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight text-stone-800">
            暮らしの記録を
            <br />
            <span className="text-amber-700">ひとつにまとめる</span>
          </h1>
          
          <p className="text-lg text-stone-600 max-w-xl mx-auto mb-10 leading-relaxed">
            健康、お金、習慣…バラバラだった記録を
            ひとつの場所で確認できます。
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-amber-600 hover:bg-amber-700 text-white rounded-full text-lg px-8 py-6">
              無料ではじめる
            </Button>
            <Button size="lg" variant="outline" className="border-amber-300 text-stone-700 hover:bg-amber-100 rounded-full text-lg px-8 py-6">
              もっと詳しく
            </Button>
          </div>
        </div>
      </section>

      {/* Simple Preview */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl shadow-sm border border-amber-100 p-8">
            <div className="text-center text-stone-500 text-sm mb-6">今週のまとめ</div>
            <div className="grid grid-cols-3 gap-6 text-center">
              <div className="p-4 rounded-2xl bg-amber-50">
                <div className="text-3xl mb-2">🚶</div>
                <div className="text-2xl font-bold text-stone-800">52,340</div>
                <div className="text-sm text-stone-500">歩</div>
              </div>
              <div className="p-4 rounded-2xl bg-orange-50">
                <div className="text-3xl mb-2">💰</div>
                <div className="text-2xl font-bold text-stone-800">¥14.2万</div>
                <div className="text-sm text-stone-500">支出</div>
              </div>
              <div className="p-4 rounded-2xl bg-yellow-50">
                <div className="text-3xl mb-2">😴</div>
                <div className="text-2xl font-bold text-stone-800">7.2h</div>
                <div className="text-sm text-stone-500">睡眠</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-stone-800 mb-4">できること</h2>
            <p className="text-stone-600">シンプルに、わかりやすく</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="p-6 rounded-2xl bg-amber-50 hover:bg-amber-100 transition-colors"
              >
                <div className="text-3xl mb-4">{feature.icon}</div>
                <h3 className="text-lg font-semibold text-stone-800 mb-2">{feature.title}</h3>
                <p className="text-stone-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-gradient-to-br from-amber-100 to-orange-100 rounded-3xl p-12">
            <div className="text-4xl mb-4">🌱</div>
            <h2 className="text-2xl font-bold text-stone-800 mb-4">
              今日から始めてみませんか？
            </h2>
            <p className="text-stone-600 mb-8">
              無料で使えます。クレジットカードも不要です。
            </p>
            <Button size="lg" className="bg-amber-600 hover:bg-amber-700 text-white rounded-full px-8 py-6">
              アカウントを作成
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-amber-200 py-8 px-4 sm:px-6 lg:px-8 bg-amber-50">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 text-stone-600">
            <span>🏠</span>
            <span>LifeConnection</span>
          </div>
          <div className="text-stone-500 text-sm">© 2024 ManyConnection</div>
        </div>
      </footer>
    </div>
  );
}
