export default function Header() {
  return (
    <header className="fixed top-0 w-full z-50 bg-gray-900">
      {/* Bandeau violet promotionnel */}
      <div className="bg-purple-600 py-2 px-4 text-center">
        <p className="text-white text-xs font-medium tracking-wide">
          ⭐ NUMERO 1 SUR BORDEAUX ET ENVOI POSTAL ⭐
        </p>
      </div>
      
      {/* Logo HashBurger */}
      <div className="bg-gray-900 py-4 px-4 text-center border-b border-gray-700">
        <h1 className="text-3xl md:text-4xl graffiti-text tracking-wider">
          HashBurger
        </h1>
        <p className="text-gray-400 text-xs mt-1 uppercase tracking-widest">
          Premium Concentrés
        </p>
      </div>
    </header>
  );
}