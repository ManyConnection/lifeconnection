import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function JapaneseZenDesign() {
  return (
    <div className="min-h-screen bg-stone-50 text-stone-800">
      {/* Design Label */}
      <div className="fixed top-4 left-4 z-50">
        <Link href="/designs">
          <Badge className="bg-stone-700 hover:bg-stone-600 cursor-pointer">
            ← Design 10: Japanese Zen
          </Badge>
        </Link>
      </div>

      {/* Navigation - Minimal */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-stone-50/80 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto px-8 sm:px-12 lg:px-16">
          <div className="flex items-center justify-between h-20">
            <span className="text-lg tracking-widest text-stone-600">結</span>
            <div className="flex items-center gap-8">
              <Link href="#" className="text-sm text-stone-500 hover:text-stone-800 transition-colors">機能</Link>
              <Link href="#" className="text-sm text-stone-500 hover:text-stone-800 transition-colors">始める</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero - Zen Style with lots of whitespace */}
      <section className="min-h-screen flex items-center justify-center px-8 sm:px-12 lg:px-16">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-16">
            <span className="text-6xl sm:text-8xl font-light text-stone-300">結</span>
          </div>
          
          <h1 className="text-2xl sm:text-3xl font-light mb-8 leading-relaxed tracking-wide text-stone-700">
            暮らしを
            <br />
            静かに
            <br />
            むすぶ
          </h1>
          
          <p className="text-sm text-stone-500 leading-loose mb-12 max-w-sm mx-auto">
            散らばった日々の記録を
            <br />
            ひとつの場所に集めます
          </p>
          
          <Button className="bg-stone-800 hover:bg-stone-700 text-stone-50 rounded-none px-12 py-4 text-sm tracking-widest">
            始める
          </Button>
        </div>
      </section>

      {/* Stats - Minimal */}
      <section className="py-32 px-8 sm:px-12 lg:px-16 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-20">
            <span className="text-xs tracking-[0.5em] uppercase text-stone-400">週の記録</span>
          </div>
          
          <div className="grid grid-cols-3 gap-16">
            <div className="text-center">
              <div className="text-4xl sm:text-5xl font-light text-stone-700 mb-4">52,340</div>
              <div className="text-xs tracking-widest text-stone-400">歩</div>
            </div>
            <div className="text-center border-x border-stone-100 px-8">
              <div className="text-4xl sm:text-5xl font-light text-stone-700 mb-4">14.2</div>
              <div className="text-xs tracking-widest text-stone-400">万円</div>
            </div>
            <div className="text-center">
              <div className="text-4xl sm:text-5xl font-light text-stone-700 mb-4">7.2</div>
              <div className="text-xs tracking-widest text-stone-400">時間</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features - Vertical */}
      <section className="py-32 px-8 sm:px-12 lg:px-16">
        <div className="max-w-3xl mx-auto">
          <div className="space-y-24">
            <div className="flex items-start gap-12">
              <div className="text-3xl text-stone-300">一</div>
              <div>
                <h3 className="text-lg font-light text-stone-700 mb-3">集める</h3>
                <p className="text-sm text-stone-500 leading-loose">
                  いくつものアプリに散らばった記録を<br />
                  ひとつの場所に静かに集めます
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-12">
              <div className="text-3xl text-stone-300">二</div>
              <div>
                <h3 className="text-lg font-light text-stone-700 mb-3">見つめる</h3>
                <p className="text-sm text-stone-500 leading-loose">
                  日々の暮らしの流れを<br />
                  静かに見つめ直すことができます
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-12">
              <div className="text-3xl text-stone-300">三</div>
              <div>
                <h3 className="text-lg font-light text-stone-700 mb-3">守る</h3>
                <p className="text-sm text-stone-500 leading-loose">
                  あなたの記録は あなただけのもの<br />
                  大切に守ります
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 px-8 sm:px-12 lg:px-16 bg-stone-100">
        <div className="max-w-xl mx-auto text-center">
          <span className="text-4xl text-stone-300 mb-8 block">○</span>
          <h2 className="text-xl font-light text-stone-700 mb-8 tracking-wide">
            静かに、始める
          </h2>
          <Button className="bg-stone-800 hover:bg-stone-700 text-stone-50 rounded-none px-12 py-4 text-sm tracking-widest">
            無料で始める
          </Button>
        </div>
      </section>

      {/* Footer - Minimal */}
      <footer className="py-12 px-8 sm:px-12 lg:px-16 bg-stone-50">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <span className="text-lg text-stone-400">結</span>
          <span className="text-xs text-stone-400">© 2024</span>
        </div>
      </footer>
    </div>
  );
}
