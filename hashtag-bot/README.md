# 📱 HASHTAG BOT - Mini-Application

Une application web mobile moderne développée avec Next.js 15, reproduisant fidèlement l'interface mobile de HASHTAG BOT.

## 🌟 Fonctionnalités

- **Interface Mobile-First** - Design optimisé pour smartphones
- **Navigation Fluide** - Navigation bottom avec 5 sections principales
- **Catalogue Produits** - Grille responsive avec cartes produits
- **Pages Détails** - Lecteur média avec contrôles vidéo
- **Design Moderne** - Interface sombre avec dégradés et animations
- **PWA Ready** - Installable comme application native

## 🚀 Technologies Utilisées

- **Next.js 15** - Framework React avec App Router
- **TypeScript** - Type safety et meilleure DX
- **Tailwind CSS** - Styling utility-first
- **PWA** - Manifest et service worker ready

## 📱 Structure de l'Application

### Pages Principales

- **🏠 Accueil** (`/`) - Liste des produits avec grille responsive
- **📦 Détails Produit** (`/product/[id]`) - Page détaillée avec lecteur média
- **⭐ Promotions** (`/promos`) - Packs et offres spéciales
- **ℹ️ Informations** (`/info`) - Conditions et informations légales
- **📱 Canal** (`/canal`) - Informations sur le canal Telegram
- **✉️ Contact** (`/contact`) - Moyens de contact et support
- **👨‍💼 Admin** (`/admin`) - Panel d'administration

### Composants

- **Layout** - Structure de page avec header et navigation
- **ProductCard** - Carte produit avec preview média
- **MediaPlayer** - Lecteur vidéo/image avec contrôles

## 🎨 Design System

### Couleurs
- **Background** - Dégradé sombre (`from-gray-900 to-gray-800`)
- **Accent Principal** - Rouge (`#e74c3c`)
- **Accent Secondaire** - Bleu (`#3498db`)
- **Texte** - Blanc avec variations d'opacité

### Typographie
- **Font Stack** - Apple System Fonts
- **Hiérarchie** - Tailles responsives avec Tailwind

### Animations
- **Transitions** - Smooth 150ms cubic-bezier
- **Hover Effects** - Scale et background changes
- **Loading States** - Skeleton et progressive loading

## 🛠️ Installation et Développement

### Prérequis
```bash
Node.js 18+ 
npm ou yarn
```

### Installation
```bash
# Cloner le projet
git clone <repository-url>
cd hashtag-bot

# Installer les dépendances
npm install

# Démarrer en développement
npm run dev
```

### Scripts Disponibles
```bash
npm run dev          # Serveur de développement
npm run build        # Build de production
npm run start        # Serveur de production
npm run lint         # Linting ESLint
```

## 📁 Structure du Projet

```
hashtag-bot/
├── src/
│   ├── app/                    # Pages (App Router)
│   │   ├── page.tsx           # Accueil
│   │   ├── product/[id]/      # Détails produit
│   │   ├── promos/            # Promotions
│   │   ├── info/              # Informations
│   │   ├── canal/             # Canal Telegram
│   │   ├── contact/           # Contact
│   │   └── admin/             # Administration
│   ├── components/            # Composants réutilisables
│   │   ├── Layout.tsx         # Layout principal
│   │   ├── ProductCard.tsx    # Carte produit
│   │   └── MediaPlayer.tsx    # Lecteur média
│   ├── types/                 # Types TypeScript
│   │   └── product.ts         # Interface Product
│   └── data/                  # Données mockées
│       └── products.ts        # Produits de démonstration
├── public/                    # Assets statiques
│   ├── manifest.json          # PWA Manifest
│   └── icons/                 # Icônes PWA
└── README.md
```

## 🎯 Fonctionnalités Détaillées

### Header Fixe
- **Logo** HASHTAG BOT avec émojis
- **Status Bar** simulation mobile (heure, batterie, réseau)
- **Bouton Retour** navigation contextuelle

### Navigation Bottom
- **5 Onglets** avec icônes émojis
- **État Actif** highlight de la page courante
- **Animations** smooth transitions

### Cartes Produits
- **Media Preview** image ou vidéo
- **Hover Effects** auto-play vidéo (desktop)
- **Informations** nom, description, prix
- **Call-to-Action** bouton "Voir détails"

### Page Détails
- **Lecteur Média** contrôles play/pause/skip
- **Section Prix** liste formatée des tarifs
- **Actions** boutons Commander et Contact

### Responsive Design
- **Mobile First** optimisé pour téléphones
- **Tablet** grille 2 colonnes
- **Desktop** grille 3 colonnes
- **Breakpoints** Tailwind standard

## 🔧 Personnalisation

### Ajouter un Produit
```typescript
// src/data/products.ts
const newProduct: Product = {
  id: 'unique-id',
  name: 'Nom du produit',
  description: 'Description...',
  prices: '5g:60\n10g:110',
  media: '/path/to/media.jpg',
  type: 'PREMIUM'
};
```

### Modifier les Couleurs
```css
/* src/app/globals.css */
:root {
  --primary: #e74c3c;
  --secondary: #3498db;
  --background: #1a1a1a;
}
```

### Ajouter une Page
```bash
# Créer le dossier
mkdir src/app/nouvelle-page

# Créer page.tsx
touch src/app/nouvelle-page/page.tsx
```

## 📱 PWA Features

- **Installable** - Peut être installée sur l'écran d'accueil
- **Offline Ready** - Cache des ressources critiques
- **App-like** - Plein écran sans barre de navigateur
- **Icons** - Icônes adaptées iOS/Android

## 🚀 Déploiement

### Vercel (Recommandé)
```bash
npm install -g vercel
vercel --prod
```

### Build Manuel
```bash
npm run build
npm start
```

## 📄 License

Ce projet est développé pour HASHTAG BOT. Tous droits réservés.

## 👥 Support

Pour toute question ou support :
- 📧 Email : support@hashtagbot.com
- 📱 Telegram : @HashtagBot_Official
- 🌐 Site web : [hashtagbot.com](https://hashtagbot.com)

---

**🌿 HASHTAG BOT - Numéro 1 dans le Nord Pas-de-Calais**
