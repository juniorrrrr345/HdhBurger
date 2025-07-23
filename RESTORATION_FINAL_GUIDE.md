# 🚀 Script de Restauration Finale HashBurger

## ⚠️ IMPORTANT : Configuration Requise

Avant d'utiliser ce script, modifiez la configuration dans `scripts/restore-hashburger-final.js` :

```javascript
const CLOUDINARY_CONFIG = {
  cloudName: "VOTRE_CLOUD_NAME", // Remplacez par votre cloud name
  folder: "hashburger", // Remplacez par votre dossier
};
```

## 🗄️ Instructions d'Exécution

### Option 1: MongoDB Shell
```bash
# 1. Connectez-vous à votre base MongoDB
mongosh "votre_connection_string"

# 2. Exécutez le script
load("scripts/restore-mongodb-final.js")
```

### Option 2: MongoDB Compass
1. Ouvrez MongoDB Compass
2. Connectez-vous à votre base de données
3. Ouvrez la console MongoDB
4. Copiez-collez le contenu du script
5. Exécutez

### Option 3: Via l'Application
1. Allez sur votre panel admin
2. Supprimez tous les produits existants
3. Ajoutez manuellement les produits HashBurger
4. Utilisez vos vrais liens Cloudinary

## ✅ Vérification Post-Restauration

Après exécution, vérifiez que :
- [ ] 5 produits sont visibles
- [ ] Les images Cloudinary s'affichent
- [ ] Les vidéos Cloudinary se lancent
- [ ] 3 catégories sont disponibles
- [ ] 3 farms sont disponibles
- [ ] Le titre affiche "HashBurger"
- [ ] Les pages Info/Contact sont correctes
- [ ] Le lien Telegram fonctionne

## 🔧 Personnalisation

### Changer les Liens Cloudinary
Modifiez les noms de fichiers dans le script :
```javascript
image: `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/v1/${FOLDER}/VOTRE_FICHIER.jpg`,
video: `https://res.cloudinary.com/${CLOUD_NAME}/video/upload/v1/${FOLDER}/VOTRE_FICHIER.mp4`,
```

### Ajouter des Produits
Ajoutez de nouveaux produits dans le tableau `HASHBURGER_PRODUCTS`

### Modifier les Prix
Changez les valeurs `price` dans le script

## 🆘 En Cas de Problème

1. **Liens Cloudinary ne fonctionnent pas :**
   - Vérifiez votre cloud name et folder
   - Testez les liens directement dans le navigateur
   - Vérifiez que les fichiers existent sur Cloudinary

2. **Erreur MongoDB :**
   - Vérifiez votre connection string
   - Assurez-vous d'avoir les permissions d'écriture
   - Vérifiez que la base de données existe

3. **Produits ne s'affichent pas :**
   - Vérifiez les logs de l'application
   - Redémarrez l'application
   - Vérifiez le cache du navigateur

---

**🔄 HashBurger sera complètement restauré avec vos médias Cloudinary !**
