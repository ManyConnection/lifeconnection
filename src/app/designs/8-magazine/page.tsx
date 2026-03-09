import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function MagazineDesign() {
  return (
    <div className="min-h-screen bg-stone-100 text-stone-900">
      {/* Design Label */}
      <div className="fixed top-4 left-4 z-50">
        <Link href="/designs">
          <Badge className="bg-stone-800 hover:bg-stone-700 cursor-pointer">
            ← Design 08: Magazine
          </Badge>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-stone-100 border-b border-stone-300">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            <span className="text-sm tracking-[0.3em] uppercase font-medium">Life Connection</span>
            <div className="flex items-center gap-6 text-sm">
              <Link href="#" className="hover:underline">特集</Link>
              <Link href="#" className="hover:underline">機能</Link>
              <Link href="#" className="hover:underline">はじめる</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero - Magazine Style */}
      <section className="pt-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-12 gap-4 min-h-[80vh]">
            {/* Main Feature */}
            <div className="col-span-12 md:col-span-8 bg-white p-12 flex flex-col justify-between">
              <div>
                <div className="text-xs tracking-[0.3em] uppercase text-stone-500 mb-4">
                  Issue 01 — 2024
                </div>
                <h1 className="text-5xl md:text-7xl font-serif leading-[0.9] mb-8">
                  暮らしを
                  <br />
                  <em className="italic">ひとつに</em>
                  <br />
                  まとめる
                </h1>
                <p className="text-lg text-stone-600 max-w-md leading-relaxed">
                  健康、家計、習慣。散らばったデータを
                  美しく整理する、新しいライフスタイル。
                </p>
              </div>
              <div className="mt-12">
                <Button className="bg-stone-900 hover:bg-stone-800 text-white rounded-none px-8 py-6 text-sm tracking-wide uppercase">
                  Read More →
                </Button>
              </div>
            </div>

            {/* Side Stats */}
            <div className="col-span-12 md:col-span-4 flex flex-col gap-4">
              <div className="bg-amber-100 p-8 flex-1 flex flex-col justify-between">
                <div className="text-xs tracking-[0.2em] uppercase text-amber-800">Weekly Steps</div>
                <div>
                  <div className="text-5xl font-serif">52,340</div>
                  <div className="text-sm text-amber-700 mt-2">+12% from last week</div>
                </div>
              </div>
              <div className="bg-stone-800 text-white p-8 flex-1 flex flex-col justify-between">
                <div className="text-xs tracking-[0.2em] uppercase text-stone-400">Monthly Budget</div>
                <div>
                  <div className="text-5xl font-serif">¥142,500</div>
                  <div className="text-sm text-stone-400 mt-2">On track</div>
                </div>
              </div>
              <div className="bg-indigo-100 p-8 flex-1 flex flex-col justify-between">
                <div className="text-xs tracking-[0.2em] uppercase text-indigo-800">Avg. Sleep</div>
                <div>
                  <div className="text-5xl font-serif">7.2h</div>
                  <div className="text-sm text-indigo-700 mt-2">Quality: Good</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Editorial Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-12 md:col-span-4">
              <div className="text-xs tracking-[0.3em] uppercase text-stone-500 mb-4">Features</div>
              <h2 className="text-4xl font-serif leading-tight">
                シンプルに、
                <br />
                美しく、
                <br />
                暮らす。
              </h2>
            </div>
            <div className="col-span-12 md:col-span-8">
              <div className="grid grid-cols-2 gap-8">
                <div className="border-t border-stone-300 pt-6">
                  <div className="text-xs tracking-[0.2em] uppercase text-stone-500 mb-3">01</div>
                  <h3 className="text-xl font-medium mb-2">統合ダッシュボード</h3>
                  <p className="text-stone-600 text-sm leading-relaxed">
                    すべてのデータを一つの場所で。シンプルで見やすい画面設計。
                  </p>
                </div>
                <div className="border-t border-stone-300 pt-6">
                  <div className="text-xs tracking-[0.2em] uppercase text-stone-500 mb-3">02</div>
                  <h3 className="text-xl font-medium mb-2">つながりの発見</h3>
                  <p className="text-stone-600 text-sm leading-relaxed">
                    睡眠と運動、食事と体調。データ間の関係が見えてくる。
                  </p>
                </div>
                <div className="border-t border-stone-300 pt-6">
                  <div className="text-xs tracking-[0.2em] uppercase text-stone-500 mb-3">03</div>
                  <h3 className="text-xl font-medium mb-2">プライバシー重視</h3>
                  <p className="text-stone-600 text-sm leading-relaxed">
                    あなたのデータは、あなただけのもの。安心の設計。
                  </p>
                </div>
                <div className="border-t border-stone-300 pt-6">
                  <div className="text-xs tracking-[0.2em] uppercase text-stone-500 mb-3">04</div>
                  <h3 className="text-xl font-medium mb-2">複数アプリ連携</h3>
                  <p className="text-stone-600 text-sm leading-relaxed">
                    お気に入りのアプリをそのまま使える。データだけが集まる。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-stone-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-xs tracking-[0.3em] uppercase text-stone-500 mb-6">Start Today</div>
          <h2 className="text-4xl md:text-5xl font-serif mb-8 leading-tight">
            新しい暮らしの記録、
            <br />
            はじめませんか。
          </h2>
          <Button className="bg-white text-stone-900 hover:bg-stone-100 rounded-none px-12 py-6 text-sm tracking-wide uppercase">
            無料で始める
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 sm:px-6 lg:px-8 bg-stone-100 border-t border-stone-300">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <span className="text-xs tracking-[0.2em] uppercase">Life Connection</span>
          <span className="text-xs text-stone-500">© 2024 ManyConnection</span>
        </div>
      </footer>
    </div>
  );
}
