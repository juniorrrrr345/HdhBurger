# 🚀 Guide de Déploiement Vercel - HASHTAG BOT

## Déploiement Rapide (1-Click)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/username/hashtag-bot-shop)

## Déploiement Manuel

### Prérequis
- Node.js 18+ installé
- Compte Vercel (gratuit)
- Git

### Étapes détaillées

1. **Cloner le repository**
   ```bash
   git clone <your-repo-url>
   cd hashtag-bot-shop
   ```

2. **Installer les dépendances**
   ```bash
   npm install
   ```

3. **Test en local**
   ```bash
   npm run dev
   ```
   Ouvrir http://localhost:3000

4. **Déploiement automatique**
   ```bash
   ./deploy.sh
   ```
   
   OU
   
   ```bash
   npm run deploy
   ```

### Configuration Vercel

1. **Via l'interface Vercel :**
   - Se connecter sur [vercel.com](https://vercel.com)
   - Importer le projet depuis GitHub
   - Configurer les variables d'environnement si nécessaire
   - Déployer

2. **Via CLI :**
   ```bash
   npm install -g vercel
   vercel login
   vercel
   ```

### Variables d'environnement (optionelles)

Créer un fichier `.env.local` :

```bash
NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app
NEXT_PUBLIC_SITE_NAME="HASHTAG BOT"
```

### Commandes utiles

| Commande | Description |
|----------|-------------|
| `npm run dev` | Développement local |
| `npm run build` | Build de production |
| `npm run preview` | Aperçu avant déploiement |
| `npm run deploy` | Déploiement production |
| `npm run lint` | Vérification du code |

### Structure optimisée pour Vercel

```
hashtag-bot-shop/
├── app/                 # Pages Next.js 14 (App Router)
├── public/             # Assets statiques
├── vercel.json         # Configuration Vercel
├── next.config.js      # Configuration Next.js
└── package.json        # Dépendances
```

### Performance

L'application est optimisée pour Vercel avec :
- ✅ Static Site Generation (SSG)
- ✅ Images optimisées
- ✅ Bundle splitting automatique
- ✅ Edge Functions support
- ✅ CDN global

### Domaines personnalisés

1. Dans le dashboard Vercel
2. Aller dans Settings > Domains
3. Ajouter votre domaine
4. Configurer les DNS

### Surveillance

Vercel fournit automatiquement :
- Analytics de performance
- Logs en temps réel
- Monitoring d'erreurs
- Core Web Vitals

## Support

Pour toute question technique :
- Documentation Vercel : https://vercel.com/docs
- Documentation Next.js : https://nextjs.org/docs

---

**Made with ❤️ for HASHTAG BOT - NUMERO 1 DANS LE NORD PAS DE CALAIS**