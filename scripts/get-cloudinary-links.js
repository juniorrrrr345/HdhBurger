#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔍 Récupération des Liens Cloudinary HashBurger\n');

// Guide pour récupérer les vrais liens Cloudinary
const cloudinaryGuide = `
# 🔍 Comment Récupérer vos Vrais Liens Cloudinary

## 📋 Étapes pour Récupérer vos Liens

### 1. Connectez-vous à Cloudinary
1. Allez sur https://cloudinary.com/
2. Connectez-vous à votre compte
3. Allez dans votre Media Library

### 2. Trouvez vos Médias HashBurger
1. Cherchez vos images/vidéos HashBurger
2. Notez les noms de fichiers
3. Copiez les URLs complètes

### 3. Structure des Liens Cloudinary
Vos liens ressemblent à :
\`\`\`
https://res.cloudinary.com/VOTRE_CLOUD_NAME/image/upload/v1/VOTRE_FOLDER/nom-fichier.jpg
https://res.cloudinary.com/VOTRE_CLOUD_NAME/video/upload/v1/VOTRE_FOLDER/nom-fichier.mp4
\`\`\`

### 4. Remplacez dans le Script
Dans le fichier \`scripts/restore-mongodb-hashburger.js\`, remplacez :
\`\`\`javascript
// Exemple de remplacement
image: "https://res.cloudinary.com/VOTRE_CLOUD/image/upload/v1/VOTRE_FOLDER/hash-premium.jpg",
video: "https://res.cloudinary.com/VOTRE_CLOUD/video/upload/v1/VOTRE_FOLDER/hash-premium.mp4",
\`\`\`

## 🛍️ Produits à Restaurer

### Hash Marocain Premium
- Image: hash-premium.jpg
- Vidéo: hash-premium.mp4
- Prix: 15€

### Extraction à Froid
- Image: extraction-cold.jpg
- Vidéo: extraction-cold.mp4
- Prix: 25€

### Génétique Premium
- Image: genetics-premium.jpg
- Vidéo: genetics-premium.mp4
- Prix: 20€

### Hash Traditionnel
- Image: hash-traditional.jpg
- Vidéo: hash-traditional.mp4
- Prix: 12€

### Extraction Live
- Image: live-resin.jpg
- Vidéo: live-resin.mp4
- Prix: 30€

## 🔧 Script de Remplacement Automatique

Si vous connaissez votre cloud name et folder, utilisez ce script :

\`\`\`javascript
// Remplacez VOTRE_CLOUD_NAME et VOTRE_FOLDER
const CLOUD_NAME = "VOTRE_CLOUD_NAME";
const FOLDER = "VOTRE_FOLDER";

const products = [
  {
    name: "Hash Marocain Premium",
    image: \`https://res.cloudinary.com/\${CLOUD_NAME}/image/upload/v1/\${FOLDER}/hash-premium.jpg\`,
    video: \`https://res.cloudinary.com/\${CLOUD_NAME}/video/upload/v1/\${FOLDER}/hash-premium.mp4\`,
    // ... autres propriétés
  },
  // ... autres produits
];
\`\`\`

## ✅ Vérification
Après remplacement, vérifiez que :
- [ ] Les liens pointent vers vos vrais médias Cloudinary
- [ ] Les images s'affichent correctement
- [ ] Les vidéos se lancent bien
- [ ] Tous les produits sont visibles

---

**🔍 Suivez ce guide pour récupérer vos vrais liens Cloudinary !**
`;

// Créer le guide
fs.writeFileSync('CLOUDINARY_LINKS_GUIDE.md', cloudinaryGuide);

console.log('✅ Guide de récupération Cloudinary créé');
console.log('\n📋 Prochaines étapes :');
console.log('1. Consultez CLOUDINARY_LINKS_GUIDE.md');
console.log('2. Récupérez vos vrais liens Cloudinary');
console.log('3. Remplacez les liens dans le script MongoDB');
console.log('4. Exécutez la restauration');
console.log('\n🔄 Vos médias Cloudinary seront restaurés !');