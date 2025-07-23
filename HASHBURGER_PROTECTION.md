# 🛡️ Guide de Protection HashBurger

Ce guide explique comment protéger HashBurger des modifications accidentelles lors de la duplication pour créer de nouvelles boutiques.

## 🚨 Problème Identifié

Quand vous dupliquez HashBurger pour créer une nouvelle boutique, le script de duplication modifie automatiquement :
- Le nom de la boutique
- Les textes et contenus
- Les liens Telegram
- Les métadonnées

**Résultat :** HashBurger peut être modifié par erreur !

## ✅ Solutions Mises en Place

### 1. **Branche de Protection**
- ✅ Branche `hashburger-original` créée
- ✅ Contient la version originale d'HashBurger
- ✅ Protégée contre les modifications

### 2. **Script de Duplication Sécurisé**
- ✅ Vérification de la branche avant duplication
- ✅ Blocage sur les branches principales
- ✅ Protection automatique d'HashBurger

### 3. **Workflow Sécurisé**
```bash
# ❌ NE JAMAIS FAIRE sur HashBurger
npm run setup-new-shop

# ✅ PROCÉDURE CORRECTE
# 1. Fork le repository sur GitHub
# 2. Clonez votre fork
# 3. Lancez la duplication sur votre fork
```

## 🔄 Procédure Correcte pour Créer une Nouvelle Boutique

### Étape 1 : Fork du Repository
1. Allez sur https://github.com/juniorrrrr345/HdhBurger
2. Cliquez sur **"Fork"** en haut à droite
3. Renommez le repository avec le nom de votre nouvelle boutique
4. Cliquez sur **"Create fork"**

### Étape 2 : Clonez votre Fork
```bash
git clone https://github.com/VOTRE_USERNAME/VOTRE_NOUVELLE_BOUTIQUE.git
cd VOTRE_NOUVELLE_BOUTIQUE
npm install
```

### Étape 3 : Lancez la Duplication
```bash
npm run setup-new-shop
```

### Étape 4 : Configuration
- Suivez les instructions à l'écran
- Configurez votre nouvelle boutique
- Déployez sur Vercel

## 🛡️ Protection Automatique

Le script de duplication vérifie maintenant :
- ✅ Si vous êtes sur une branche principale HashBurger
- ✅ Bloque la duplication sur `main` et `hashburger-original`
- ✅ Force l'utilisation d'un fork pour les nouvelles boutiques

## 🔧 Restauration en Cas de Problème

Si HashBurger a été modifié par erreur :

### Option 1 : Restaurer depuis la Branche de Protection
```bash
git checkout hashburger-original
git checkout main
git merge hashburger-original
git push origin main
```

### Option 2 : Restaurer depuis un Commit Précédent
```bash
git log --oneline | grep "HashBurger"
git reset --hard <commit-hash>
git push --force origin main
```

## 📋 Checklist de Sécurité

Avant de lancer une duplication :
- [ ] Êtes-vous sur un FORK du repository ?
- [ ] Êtes-vous sur une branche autre que `main` ?
- [ ] Avez-vous sauvegardé HashBurger ?
- [ ] Êtes-vous prêt à créer une nouvelle boutique ?

## 🎯 Bonnes Pratiques

### ✅ À FAIRE
- Utilisez toujours un fork pour les nouvelles boutiques
- Testez la duplication en local d'abord
- Sauvegardez régulièrement HashBurger
- Utilisez des noms de branches descriptifs

### ❌ À ÉVITER
- Ne lancez jamais la duplication sur HashBurger directement
- Ne modifiez pas les branches principales
- Ne forcez pas les modifications
- N'ignorez pas les avertissements du script

## 🆘 En Cas de Problème

1. **HashBurger modifié par erreur :**
   ```bash
   git checkout hashburger-original
   git checkout main
   git merge hashburger-original
   ```

2. **Script de duplication bloqué :**
   - Vérifiez que vous êtes sur un fork
   - Créez une nouvelle branche
   - Relancez la duplication

3. **Conflits de duplication :**
   - Annulez les modifications
   - Recommencez sur un nouveau fork
   - Utilisez la branche de protection

## 📞 Support

En cas de problème :
1. Vérifiez ce guide
2. Consultez les logs du script
3. Restaurez depuis la branche de protection
4. Contactez l'équipe de développement

---

**🛡️ HashBurger est maintenant protégé contre les modifications accidentelles !**