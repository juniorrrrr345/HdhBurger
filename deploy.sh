#!/bin/bash

echo "🚀 Déploiement de HASHTAG BOT sur Vercel..."

# Vérifier si npm est installé
if ! command -v npm &> /dev/null; then
    echo "❌ NPM n'est pas installé"
    exit 1
fi

# Installer les dépendances
echo "📦 Installation des dépendances..."
npm install

# Construire l'application
echo "🔨 Construction de l'application..."
npm run build

# Vérifier si Vercel CLI est installé
if ! command -v vercel &> /dev/null; then
    echo "📥 Installation de Vercel CLI..."
    npm install -g vercel
fi

# Déployer sur Vercel
echo "🌐 Déploiement sur Vercel..."
vercel --prod

echo "✅ Déploiement terminé !"
echo "🎉 Votre boutique HASHTAG BOT est maintenant en ligne !"