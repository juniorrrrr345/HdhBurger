# HashBurger 🍃

Une application web moderne pour la vente de concentrés premium avec design mobile-first et thème sombre.

## 🚀 Fonctionnalités

- **Design Mobile-First** : Interface optimisée pour mobile avec Tailwind CSS
- **Thème Sombre** : Interface élégante avec palette de couleurs sombres
- **Logo Graffiti** : Branding HashBurger avec style graffiti flashy
- **Filtres Dynamiques** : Filtrage par catégorie et farm
- **Grille Produits** : Affichage en grille 2x2 pour mobile
- **Détail Produit** : Vue détaillée avec vidéo/image, prix et commande
- **Navigation Bottom** : Barre de navigation fixe en bas

## 🛠 Technologies

- **Next.js 14** avec App Router
- **React 18** avec TypeScript
- **Tailwind CSS** pour le styling
- **Google Fonts** (Inter)

## 🎨 Composants

### `Header`
- Bandeau violet promotionnel
- Logo HashBurger en style graffiti
- Fixé en haut de page

### `CategoryFilter`
- Dropdown "Toutes les catégories" (120U ++, FROZEN SIFT, etc.)
- Dropdown "Toutes les farms"
- Filtrage en temps réel

### `ProductCard`
- Image produit avec badge catégorie
- Nom en majuscules + nom de farm
- Prix de base affiché
- Effet hover animé

### `ProductDetail`
- Vue plein écran avec vidéo/image
- Badge "CURE AU TOP 🔥"
- Liste complète des prix (5g à 200g)
- Bouton "Commander via Telegram"
- Informations de livraison

### `BottomNav`
- 4 boutons : Menu, Infos, Canal, Contact
- Icônes SVG personnalisées
- Navigation et lien Telegram

## 📁 Structure

```
src/
├── app/
│   ├── layout.tsx          # Layout global avec métadonnées
│   ├── page.tsx            # Page d'accueil avec logique
│   └── globals.css         # Styles globaux et graffiti
└── components/
    ├── Header.tsx          # Header fixe avec logo
    ├── CategoryFilter.tsx  # Filtres dropdown
    ├── ProductCard.tsx     # Carte produit
    ├── ProductDetail.tsx   # Détail produit modal
    └── BottomNav.tsx       # Navigation bottom
```

## 🎯 Données

L'application utilise des données statiques avec 6 produits d'exemple :
- COOKIES GELATO (Real Farmz)
- PURPLE HAZE (Green House)
- OG KUSH (Royal Seeds)
- BLUE DREAM (Blue Dream Farm)
- AMNESIA HAZE (Golden Leaf)
- GELATO 41 (Real Farmz)

Chaque produit contient :
- Nom, farm, catégorie
- Image (Unsplash placeholders)
- Prix pour 6 quantités (5g à 200g)

## 🚀 Installation

```bash
# Installer les dépendances
npm install

# Lancer en développement
npm run dev

# Build production
npm run build
npm start
```

## 🎨 Personnalisation

### Couleurs principales
- **Violet** : `bg-purple-600` (badges, accents)
- **Gris foncé** : `bg-gray-900` (background)
- **Gris moyen** : `bg-gray-800` (cartes)
- **Bleu** : `bg-blue-600` (Telegram)

### Police
- **Inter** : Police principale pour lisibilité
- **Graffiti** : Classe `.graffiti-text` pour le logo

### Responsive
- **Mobile** : 2 colonnes en grille
- **Desktop** : Conserve l'aspect mobile (mobile-first)

## 📱 Navigation

- **Menu** : Page principale (actuel)
- **Infos** : Informations boutique
- **Canal** : Lien direct vers Telegram
- **Contact** : Coordonnées

## 🔗 Liens Telegram

- Canal principal : `https://t.me/hashburgerchannel`
- Utilisé pour le bouton "Canal" et "Commander"

---

**HashBurger** - *Premium Concentrés • #1 Bordeaux • Envoi Postal*