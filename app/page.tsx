'use client'

export default function Home() {
  return (
    <div className="min-h-screen text-white overflow-x-hidden" 
         style={{
           background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 50%, #8B0000 100%)',
           fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
         }}>
      
      {/* Background overlay */}
      <div className="fixed bottom-0 left-0 right-0 h-[200px] z-[-1]"
           style={{background: 'linear-gradient(to top, #8B0000, transparent)'}}></div>
      
      <div className="fixed bottom-[100px] left-0 right-0 text-center text-[48px] font-[900] z-[-1]"
           style={{color: 'rgba(139, 0, 0, 0.3)', letterSpacing: '10px'}}>
        HASHTAG
      </div>

      {/* Header */}
      <div className="flex justify-between items-center p-5 bg-black/90 relative">
        <div className="text-lg font-semibold">01:48</div>
        <div className="flex items-center gap-[5px]">
          <div className="flex gap-[2px]">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="w-1 h-1 bg-white rounded-full"></div>
            ))}
          </div>
          <div className="text-sm ml-[5px]">📶</div>
          <div className="bg-white text-black px-[6px] py-[2px] rounded text-sm font-semibold ml-[5px]">
            49
          </div>
        </div>
      </div>

      {/* Top section */}
      <div className="text-center p-5 bg-black/80">
        <div className="absolute left-5 top-5 text-blue-500 text-sm">Fermer</div>
        <h1 className="text-lg font-bold mb-[5px]">HASHTAG BOT #🔧</h1>
        <p className="text-xs text-gray-500 mb-[10px]">mini-application</p>
        <div className="absolute right-5 top-5 text-gray-500 text-lg">⋯</div>
      </div>

      {/* Envoie banner */}
      <div className="bg-red-500 text-white text-center p-2 text-sm font-semibold mb-5">
        ENVOIE O
      </div>

      {/* Main content */}
      <div className="px-5">
        <a href="#" className="flex items-center gap-[10px] text-white text-base mb-5 no-underline">
          <span className="text-xl">←</span>
          Retour
        </a>

        {/* Logo */}
        <div className="text-center mb-[30px]">
          <div className="w-[120px] h-[120px] bg-gray-700 rounded-full inline-flex items-center justify-center border-[3px] border-gray-600 text-[48px] font-bold">
            ##
          </div>
        </div>

        {/* Product section */}
        <div className="bg-black/60 rounded-[15px] p-[25px] mb-5">
          <div className="flex justify-between items-center mb-5">
            <h2 className="text-[32px] font-bold">Black Farm</h2>
            <div className="bg-gray-700 text-white px-4 py-2 rounded-[20px] text-xs font-semibold flex items-center gap-[5px]">
              DRY-SIFT 90U 🅰️🅰️
              <span className="text-sm">☠️</span>
            </div>
          </div>

          <div className="mb-5">
            <div className="flex items-center gap-2 mb-[10px] text-base">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>Orangeade 🍊</span>
            </div>
            <div className="flex items-center gap-2 mb-[10px] text-base">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>Lemon Cherry Gelato 🍋🍒</span>
            </div>
          </div>

          <div className="text-gray-500 text-sm leading-[1.4] mb-[25px]">
            90u feu feu top farm ☠️⚱️🔥<br />
            Curage au top, terpenes de fou 🤩
          </div>

          <div className="grid grid-cols-3 gap-[15px] mb-[30px]">
            {[
              { weight: '25g', price: '150€' },
              { weight: '50g', price: '250€' },
              { weight: '100g', price: '450€' },
              { weight: '200g', price: '800€' },
              { weight: '500g', price: '1750€' },
              { weight: '1000g', price: '3400€' }
            ].map((item, i) => (
              <div key={i} className="bg-black/40 border border-gray-700 rounded-[10px] p-[15px_10px] text-center transition-all duration-300 hover:border-blue-500 hover:-translate-y-[2px]">
                <div className="text-sm text-gray-500 mb-[5px]">{item.weight}</div>
                <div className="text-lg font-bold text-blue-500">{item.price}</div>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-[15px] mb-[30px]">
            <button className="bg-sky-500 text-white border-none rounded-[25px] p-[15px] text-base font-semibold flex items-center justify-center gap-[10px] cursor-pointer transition-opacity duration-300 hover:opacity-90">
              ✈️ COMMANDER VIA TELEGRAM
            </button>
            <button className="bg-yellow-400 text-black border-none rounded-[25px] p-[15px] text-base font-semibold flex items-center justify-center gap-[10px] cursor-pointer transition-opacity duration-300 hover:opacity-90">
              👻 COMMANDER VIA SNAPCHAT
            </button>
          </div>
        </div>
      </div>

      {/* Bottom navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-black/95 flex justify-around py-[15px] border-t border-gray-700">
        {[
          { icon: '🏠', label: 'Menu', active: true },
          { icon: '⭐', label: 'Pack Promo', active: false },
          { icon: 'ℹ️', label: 'Infos', active: false },
          { icon: '✈️', label: 'Canal', active: false },
          { icon: '✉️', label: 'Contact', active: false }
        ].map((item, i) => (
          <a key={i} href="#" className={`flex flex-col items-center gap-[5px] no-underline text-xs ${item.active ? 'text-blue-500' : 'text-gray-500'}`}>
            <div className="text-xl">{item.icon}</div>
            <div>{item.label}</div>
          </a>
        ))}
      </div>
    </div>
  )
}