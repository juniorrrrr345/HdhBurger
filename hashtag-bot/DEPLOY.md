# 🚀 Déploiement Hashtag Bot

## Étapes pour déployer sur GitHub et Vercel depuis votre téléphone :

### 1. GitHub (Repository)

1. **Créer un nouveau repo sur GitHub :**
   - Allez sur github.com depuis votre navigateur mobile
   - Cliquez sur "+" puis "New repository" 
   - Nom : `hashtag-bot-mobile`
   - Description : `Application mobile Hashtag Bot - Nord Pas de Calais`
   - Public/Private : au choix
   - Cliquez "Create repository"

2. **Ajouter les fichiers :**
   - Depuis votre workspace, copiez tous les fichiers du dossier `hashtag-bot/`
   - Uploadez-les sur GitHub via l'interface web mobile

### 2. Vercel (Déploiement)

1. **Connecter Vercel :**
   - Allez sur vercel.com depuis votre navigateur mobile
   - Cliquez "Sign up" puis "Continue with GitHub"
   - Autorisez Vercel à accéder à vos repos

2. **Déployer le projet :**
   - Cliquez "Import Project"
   - Sélectionnez votre repo `hashtag-bot-mobile`
   - Framework preset : "Next.js" (détecté automatiquement)
   - Cliquez "Deploy"

3. **Configuration automatique :**
   - Vercel détectera Next.js automatiquement
   - Build Command : `npm run build`
   - Output Directory : `.next`
   - Install Command : `npm install`

### 3. URL de l'application

Une fois déployé, vous aurez :
- URL de prod : `https://hashtag-bot-mobile.vercel.app`
- URL personnalisée possible : `https://your-domain.com`

### 4. Modifications futures

Pour modifier l'app :
1. Éditez les fichiers sur GitHub directement (interface mobile)
2. Ou utilisez GitHub mobile app pour les commits
3. Vercel redéployera automatiquement à chaque push

## 📱 Liens rapides une fois déployé :

- **Site web :** https://votre-app.vercel.app
- **GitHub :** https://github.com/votre-nom/hashtag-bot-mobile
- **Vercel Dashboard :** https://vercel.com/dashboard

## 🎯 Pages disponibles :

- `/` - Accueil avec produits
- `/promo` - Packs promotionnels  
- `/contact` - Contact et formulaire
- `/social` - Réseaux sociaux
- `/info` - Informations

L'application est entièrement responsive et optimisée pour mobile ! 📱✨
