export default function Home() {
  return (
    <div className="min-h-screen text-white" style={{background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 50%, #8B0000 100%)'}}>
      <div className="flex justify-between items-center p-5 bg-black bg-opacity-90">
        <div className="text-lg font-semibold">01:48</div>
        <div className="bg-white text-black px-2 py-1 rounded text-xs font-semibold">49</div>
      </div>
      
      <div className="text-center p-5 bg-black bg-opacity-80">
        <h1 className="text-lg font-bold mb-1">HASHTAG BOT #🔧</h1>
        <p className="text-xs text-gray-400">mini-application</p>
      </div>
      
      <div className="bg-red-500 text-white text-center py-2 text-sm font-semibold mb-5">
        ENVOIE O
      </div>
      
      <div className="px-5">
        <div className="text-center mb-8">
          <div className="w-32 h-32 bg-gray-800 rounded-full inline-flex items-center justify-center border-2 border-gray-600 text-5xl font-bold">
            ##
          </div>
        </div>
        
        <div className="bg-black bg-opacity-60 rounded-2xl p-6 mb-20">
          <div className="flex justify-between items-center mb-5">
            <h2 className="text-3xl font-bold">Black Farm</h2>
            <div className="bg-gray-800 text-white px-4 py-2 rounded-full text-xs font-semibold">
              DRY-SIFT 90U 🅰️🅰️ ☠️
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-4 mb-8">
            {[
              { weight: '25g', price: '150€' },
              { weight: '50g', price: '250€' },
              { weight: '100g', price: '450€' },
              { weight: '200g', price: '800€' },
              { weight: '500g', price: '1750€' },
              { weight: '1000g', price: '3400€' }
            ].map((item, index) => (
              <div key={index} className="bg-black bg-opacity-40 border border-gray-700 rounded-xl p-3 text-center">
                <div className="text-sm text-gray-400 mb-1">{item.weight}</div>
                <div className="text-lg font-bold text-blue-500">{item.price}</div>
              </div>
            ))}
          </div>
          
          <div className="flex flex-col gap-4">
            <button className="bg-sky-500 text-white rounded-full py-4 text-base font-semibold">
              ✈️ COMMANDER VIA TELEGRAM
            </button>
            <button className="bg-yellow-400 text-black rounded-full py-4 text-base font-semibold">
              👻 COMMANDER VIA SNAPCHAT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}