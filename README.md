# HashBurger - Boutique de Concentrés Premium

## 🚀 Déploiement sur Vercel

### 1. Préparation

1. **Créer un compte Vercel** sur [vercel.com](https://vercel.com)
2. **Connecter votre repository GitHub** à Vercel

### 2. Configuration des variables d'environnement

Dans le dashboard Vercel, allez dans **Settings > Environment Variables** et ajoutez :

```
MONGODB_URI = mongodb+srv://votre-string-mongodb-atlas
```

⚠️ **Important**: Assurez-vous que votre MongoDB Atlas autorise l'IP `0.0.0.0/0` (toutes les IPs) pour les déploiements Vercel.

### 3. Déploiement

1. **Méthode automatique** (recommandée) :
   - Connectez votre repo GitHub à Vercel
   - Vercel déploiera automatiquement à chaque push

2. **Méthode manuelle** :
   ```bash
   npm install -g vercel
   vercel login
   vercel --prod
   ```

### 4. Configuration MongoDB Atlas

1. Dans MongoDB Atlas, allez dans **Network Access**
2. Ajoutez l'IP `0.0.0.0/0` pour autoriser Vercel
3. Ou utilisez les IPs spécifiques de Vercel si préféré

### 5. Initialisation de la base de données

Après le déploiement, visitez :
```
https://votre-app.vercel.app/api/init-db
```

Cela créera les données initiales (catégories, farms, produits d'exemple).

## 🛠️ Fonctionnalités

- **Interface utilisateur** : Catalogue de produits avec filtres
- **Panel Admin** : Gestion complète des produits, catégories, paramètres
- **Responsive Design** : Optimisé mobile, tablette, desktop
- **Personnalisation** : Arrière-plan, styles de titre, texte défilant
- **Upload d'images** : Téléchargement d'images depuis mobile

## 🔧 Technologies

- **Frontend** : Next.js 14, React 18, TypeScript, Tailwind CSS
- **Backend** : Next.js API Routes, MongoDB, Mongoose
- **Déploiement** : Vercel
- **Base de données** : MongoDB Atlas

## 📱 Accès Admin

URL : `https://votre-app.vercel.app/admin`
Mot de passe par défaut : `admin123`

## 🎨 Personnalisation

Le panel admin permet de modifier :
- Titre et sous-titre de la boutique
- Styles du titre (gradient, néon, etc.)
- Arrière-plan personnalisé avec upload
- Texte défilant
- Liens Telegram et Canal
- Contenu des pages Info et Contact

## 📞 Support

Pour toute question technique, consultez la documentation Vercel ou MongoDB Atlas.