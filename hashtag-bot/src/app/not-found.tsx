import Layout from '@/components/Layout';
import Link from 'next/link';

export default function NotFound() {
  return (
    <Layout showBackButton>
      <div className="px-5 py-16 text-center">
        <div className="text-center py-8">
          <div className="w-30 h-30 bg-white/10 rounded-full mx-auto mb-5 flex items-center justify-center text-5xl font-bold">
            <span className="text-blue-400">#</span>
            <span className="text-white">#</span>
          </div>
        </div>

        <div className="text-8xl mb-6">😵</div>
        <h1 className="text-3xl font-bold mb-4">Page introuvable</h1>
        <p className="text-lg opacity-80 mb-8 max-w-md mx-auto">
          Désolé, la page que vous cherchez n'existe pas ou a été déplacée.
        </p>
        
        <div className="space-y-4">
          <Link 
            href="/"
            className="block bg-red-500 hover:bg-red-600 text-white py-4 px-8 rounded-full font-bold transition-colors max-w-sm mx-auto"
          >
            🏠 Retour à l'accueil
          </Link>
          
          <Link 
            href="/contact"
            className="block bg-white/10 hover:bg-white/20 text-white border-2 border-white/30 py-4 px-8 rounded-full font-bold transition-colors max-w-sm mx-auto"
          >
            💬 Contacter le support
          </Link>
        </div>
      </div>
    </Layout>
  );
}