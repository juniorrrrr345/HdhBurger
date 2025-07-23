#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔄 Restauration HashBurger - Version Originale\n');

function restoreHashBurger() {
  try {
    console.log('📝 Restauration du contenu HashBurger...\n');
    
    // 1. Restaurer le contentCache.ts
    const contentCachePath = 'src/lib/contentCache.ts';
    let contentCache = fs.readFileSync(contentCachePath, 'utf8');
    
    // Restaurer les valeurs HashBurger
    contentCache = contentCache.replace(/shopTitle: '[^']*'/, `shopTitle: 'HashBurger'`);
    contentCache = contentCache.replace(/shopSubtitle: '[^']*'/, `shopSubtitle: 'Premium Concentrés'`);
    contentCache = contentCache.replace(/scrollingText: '[^']*'/, `scrollingText: 'REJOIGNEZ NOUS SUR NOS RÉSEAUX 📲 • CONTACT'`);
    contentCache = contentCache.replace(/telegramLink: '[^']*'/, `telegramLink: 'https://t.me/hashburgerchannel'`);
    
    // Restaurer le contenu Info HashBurger
    const infoContent = `# À propos de HashBurger

**HashBurger** est votre référence premium pour les concentrés de cannabis.

## Nos Spécialités
- Hash Marocain Premium
- Extractions à froid
- Génétiques premium

## Nos Services
- Livraison Bordeaux
- Expédition France
- Support 24/7`;
    
    contentCache = contentCache.replace(/# À propos de [^`]*`/, infoContent + '`');
    
    // Restaurer le contenu Contact HashBurger
    const contactContent = `# Contactez HashBurger

## Contact
**Telegram:** @hashburgerchannel  
**Disponibilité:** 24h/24

## Livraison
**Bordeaux:** Livraison rapide  
**France:** Expédition sécurisée`;
    
    contentCache = contentCache.replace(/# Contactez [^`]*`/, contactContent + '`');
    
    fs.writeFileSync(contentCachePath, contentCache);
    console.log('✅ ContentCache restauré');
    
    // 2. Restaurer le message de bienvenue
    const pagePath = 'src/app/page.tsx';
    let pageContent = fs.readFileSync(pagePath, 'utf8');
    pageContent = pageContent.replace(/Bienvenu\(e\)s chez [^📲]*📲/, `Bienvenu(e)s chez HashBurger 📲`);
    fs.writeFileSync(pagePath, pageContent);
    console.log('✅ Message de bienvenue restauré');
    
    // 3. Restaurer les métadonnées
    const layoutPath = 'src/app/layout.tsx';
    if (fs.existsSync(layoutPath)) {
      let layoutContent = fs.readFileSync(layoutPath, 'utf8');
      layoutContent = layoutContent.replace(/title: '[^']*'/, `title: 'HashBurger'`);
      layoutContent = layoutContent.replace(/description: '[^']*'/, `description: 'HashBurger - Premium Concentrés'`);
      fs.writeFileSync(layoutPath, layoutContent);
      console.log('✅ Métadonnées restaurées');
    }
    
    // 4. Restaurer le package.json
    const packagePath = 'package.json';
    if (fs.existsSync(packagePath)) {
      const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
      packageJson.name = 'hashtag-bot';
      packageJson.description = 'HashBurger - Boutique E-commerce Complète';
      fs.writeFileSync(packagePath, JSON.stringify(packageJson, null, 2));
      console.log('✅ Package.json restauré');
    }
    
    // 5. Supprimer le fichier de configuration personnalisé
    const configPath = 'shop-config.js';
    if (fs.existsSync(configPath)) {
      fs.unlinkSync(configPath);
      console.log('✅ Fichier de configuration supprimé');
    }
    
    console.log('\n🎉 Restauration HashBurger terminée avec succès !\n');
    console.log('📋 HashBurger est maintenant restauré à son état original :');
    console.log('- Nom : HashBurger');
    console.log('- Description : Premium Concentrés');
    console.log('- Telegram : @hashburgerchannel');
    console.log('- Contenu Info/Contact : Original');
    console.log('\n🛡️ HashBurger est protégé !');
    
  } catch (error) {
    console.error('❌ Erreur lors de la restauration :', error.message);
  }
}

restoreHashBurger();