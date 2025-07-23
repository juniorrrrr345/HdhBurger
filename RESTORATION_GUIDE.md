# 🔄 Guide de Restauration HashBurger - Base de Données

## 📋 Données HashBurger à Restaurer

### 🛍️ Produits (5 produits)
- Hash Marocain Premium - 15€
- Extraction à Froid - 25€
- Génétique Premium - 20€
- Hash Traditionnel - 12€
- Extraction Live - 30€

### 🏷️ Catégories (3 catégories)
- Hash
- Extractions
- Génétiques

### 🚜 Farms (3 farms)
- Maroc Premium
- Lab Premium
- Genetics Lab

### ⚙️ Settings
- Titre: HashBurger
- Sous-titre: Premium Concentrés
- Telegram: @hashburgerchannel
- Style: glow

### 📄 Pages
- Info: Contenu HashBurger original
- Contact: Contenu HashBurger original

### 🌐 Liens Sociaux
- Telegram: @hashburgerchannel
- Canal: @hashburgerchannel

## 🗄️ Instructions de Restauration MongoDB

### Option 1: Via MongoDB Compass
1. Ouvrez MongoDB Compass
2. Connectez-vous à votre base de données
3. Pour chaque collection (products, categories, farms, settings, pages, social-links):
   - Supprimez tous les documents existants
   - Importez les données HashBurger depuis les scripts créés

### Option 2: Via MongoDB Shell
```bash
# Connectez-vous à votre base MongoDB
mongosh "votre_connection_string"

# Restaurer les produits
use votre_base_de_donnees
db.products.deleteMany({})
db.products.insertMany([...produits_hashburger])

# Restaurer les catégories
db.categories.deleteMany({})
db.categories.insertMany([...categories_hashburger])

# Restaurer les farms
db.farms.deleteMany({})
db.farms.insertMany([...farms_hashburger])

# Restaurer les settings
db.settings.deleteMany({})
db.settings.insertOne({...settings_hashburger})

# Restaurer les pages
db.pages.deleteMany({})
db.pages.insertMany([...pages_hashburger])

# Restaurer les liens sociaux
db.social-links.deleteMany({})
db.social-links.insertMany([...social_links_hashburger])
```

## ✅ Vérification
Après restauration, vérifiez que :
- [ ] 5 produits sont visibles
- [ ] 3 catégories sont disponibles
- [ ] 3 farms sont disponibles
- [ ] Le titre affiche "HashBurger"
- [ ] Les pages Info/Contact affichent le contenu original
- [ ] Le lien Telegram pointe vers @hashburgerchannel

## 🆘 En Cas de Problème
1. Vérifiez votre connection MongoDB
2. Consultez les logs de l'application
3. Vérifiez que toutes les collections sont restaurées
4. Redémarrez l'application si nécessaire

---

**🔄 HashBurger sera complètement restauré avec tout son contenu original !**
