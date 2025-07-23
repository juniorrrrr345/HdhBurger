# 🔄 Guide de Restauration HashBurger - Cloudinary

## 📋 Vos Produits HashBurger avec Cloudinary

### 🛍️ Produits à Restaurer (5 produits)
1. **Hash Marocain Premium** - 15€
   - Image: Cloudinary hash-premium.jpg
   - Vidéo: Cloudinary hash-premium.mp4
   
2. **Extraction à Froid** - 25€
   - Image: Cloudinary extraction-cold.jpg
   - Vidéo: Cloudinary extraction-cold.mp4
   
3. **Génétique Premium** - 20€
   - Image: Cloudinary genetics-premium.jpg
   - Vidéo: Cloudinary genetics-premium.mp4
   
4. **Hash Traditionnel** - 12€
   - Image: Cloudinary hash-traditional.jpg
   - Vidéo: Cloudinary hash-traditional.mp4
   
5. **Extraction Live** - 30€
   - Image: Cloudinary live-resin.jpg
   - Vidéo: Cloudinary live-resin.mp4

### 🏷️ Catégories (3)
- Hash
- Extractions
- Génétiques

### 🚜 Farms (3)
- Maroc Premium
- Lab Premium
- Genetics Lab

## 🗄️ Instructions de Restauration

### Option 1: Script MongoDB Complet
```bash
# 1. Connectez-vous à votre base MongoDB
mongosh "votre_connection_string"

# 2. Exécutez le script complet
load("scripts/restore-mongodb-hashburger.js")
```

### Option 2: Scripts Individuels
```bash
# Restaurer les produits
load("scripts/restore-mongodb-hashburger.js")

# Restaurer les catégories
load("scripts/restore-categories-mongo.js")

# Restaurer les farms
load("scripts/restore-farms-mongo.js")

# Restaurer les settings
load("scripts/restore-settings-mongo.js")

# Restaurer les pages
load("scripts/restore-pages-mongo.js")

# Restaurer les liens sociaux
load("scripts/restore-social-links-mongo.js")
```

### Option 3: Via MongoDB Compass
1. Ouvrez MongoDB Compass
2. Connectez-vous à votre base de données
3. Pour chaque collection :
   - Supprimez tous les documents existants
   - Importez les données HashBurger depuis les scripts

## ✅ Vérification
Après restauration, vérifiez que :
- [ ] 5 produits sont visibles avec images/vidéos Cloudinary
- [ ] Les vidéos se lancent correctement
- [ ] Les images s'affichent bien
- [ ] 3 catégories sont disponibles
- [ ] 3 farms sont disponibles
- [ ] Le titre affiche "HashBurger"
- [ ] Les pages Info/Contact affichent le contenu original
- [ ] Le lien Telegram pointe vers @hashburgerchannel

## 🔧 Si les Liens Cloudinary ne Fonctionnent Pas

### Vérifier vos Vrais Liens Cloudinary
1. Connectez-vous à votre compte Cloudinary
2. Récupérez les vrais URLs de vos médias
3. Remplacez les liens dans le script par vos vrais liens

### Exemple de Remplacement
```javascript
// Remplacer dans le script
image: "https://res.cloudinary.com/VOTRE_CLOUD/image/upload/v1/VOTRE_FOLDER/hash-premium.jpg",
video: "https://res.cloudinary.com/VOTRE_CLOUD/video/upload/v1/VOTRE_FOLDER/hash-premium.mp4",
```

## 🆘 En Cas de Problème
1. Vérifiez votre connection MongoDB
2. Vérifiez que vos liens Cloudinary sont corrects
3. Consultez les logs de l'application
4. Redémarrez l'application si nécessaire

---

**🔄 Vos produits HashBurger avec Cloudinary seront restaurés !**
