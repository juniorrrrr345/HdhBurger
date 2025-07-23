import Layout from '@/components/Layout';

export default function AdminPage() {
  return (
    <Layout showBackButton currentPage="Admin">
      <div className="px-5 py-8">
        <h1 className="text-2xl font-bold mb-8 text-center">Panneau Admin</h1>
        
        <div className="bg-white/5 rounded-2xl p-6 max-w-lg mx-auto">
          <form className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Nom du produit</label>
              <input
                name="name"
                placeholder="Ex: Black Farm"
                required
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:bg-white/15 focus:border-blue-400 transition-colors"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Description</label>
              <textarea
                name="description"
                placeholder="Description détaillée du produit..."
                required
                rows={4}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:bg-white/15 focus:border-blue-400 transition-colors resize-vertical"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Prix</label>
              <textarea
                name="prices"
                placeholder="Ex: 5g:60&#10;10g:120&#10;20g:230"
                required
                rows={3}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:bg-white/15 focus:border-blue-400 transition-colors resize-vertical"
              />
              <p className="text-xs text-white/60 mt-1">Format: quantité:prix (une ligne par prix)</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Media (Image/Vidéo)</label>
              <input
                type="file"
                name="media"
                accept="image/*,video/*"
                required
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-blue-500 file:text-white file:font-medium hover:file:bg-blue-600 transition-colors"
              />
            </div>
            
            <button
              type="submit"
              className="w-full bg-red-500 hover:bg-red-600 text-white py-4 px-6 rounded-full font-bold transition-colors"
            >
              ➕ Ajouter le produit
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
}