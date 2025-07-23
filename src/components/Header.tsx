export default function Header() {
  return (
    <header className="fixed top-0 w-full z-50 bg-black/95 backdrop-blur-sm">
      {/* Bandeau blanc promotionnel */}
      <div className="bg-white text-black py-2 px-4 text-center">
        <p className="text-black text-xs font-bold tracking-wide">
          ⭐ NUMERO 1 SUR BORDEAUX ET ENVOI POSTAL ⭐
        </p>
      </div>
      
      {/* Logo HashBurger */}
      <div className="bg-black py-6 px-4 text-center border-b border-white/20">
        <h1 className="hashburger-title">
          HashBurger
        </h1>
        <p className="text-gray-400 text-xs mt-3 uppercase tracking-[0.3em] font-medium">
          Premium Concentrés
        </p>
      </div>
    </header>
  );
}