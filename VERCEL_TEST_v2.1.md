# 🧪 Tests de Vérification - HashBurger v2.1

## 🎯 TESTS CRITIQUES À EFFECTUER

### ⚠️ PROBLÈMES RÉSOLUS À TESTER

1. **🗑️ Test Suppression Produit (CRITIQUE)**
   ```
   ✅ Aller sur /admin
   ✅ Login: admin / admin123
   ✅ Gestion des Produits
   ✅ Cliquer 🗑️ sur un produit
   ✅ Confirmer la suppression
   
   RÉSULTAT ATTENDU:
   - ⏳ Message "Suppression en cours..."
   - ✅ Message "Produit supprimé avec succès!" OU
   - ❌ Message d'erreur précis (ex: "Produit non trouvé en base")
   - Produit disparaît de la liste seulement si succès
   ```

2. **💰 Test Gestion Prix (CRITIQUE)**
   ```
   ✅ Aller sur /admin → Gestion Produits
   ✅ Cliquer ✏️ Modifier sur un produit  
   ✅ Onglet "Prix"
   
   RÉSULTAT ATTENDU:
   - Tous les prix existants s'affichent (même vides)
   - Bouton 🗑️ visible à côté de chaque prix
   - Cliquer 🗑️ supprime le prix instantanément
   - Possibilité d'ajouter nouveaux prix
   ```

3. **🧹 Test Nettoyage Prix (NOUVEAU)**
   ```
   ✅ Aller sur /admin → Gestion Produits
   ✅ Si alerte rouge visible → Cliquer "🧹 Nettoyer maintenant"
   ✅ OU cliquer "🧹 Nettoyer les prix" en haut
   ✅ Confirmer le nettoyage
   
   RÉSULTAT ATTENDU:
   - Message de confirmation avec nombre de prix nettoyés
   - Alerte rouge disparaît si problèmes résolus
   ```

### 📋 TESTS FONCTIONNELS GÉNÉRAUX

4. **🏪 Test Boutique Principal**
   ```
   ✅ Page d'accueil / → Produits s'affichent
   ✅ Cliquer sur un produit → Détails OK
   ✅ Navigation mobile fonctionne
   ```

5. **⚙️ Test Admin Global**
   ```
   ✅ /admin → Login fonctionne
   ✅ Dashboard accessible
   ✅ Upload image background
   ✅ Gestion catégories/farms
   ✅ Paramètres généraux
   ```

## 🌐 URLs DE TEST

### Boutique
- **Principal**: `https://hdh-burger.vercel.app/`
- **Admin**: `https://hdh-burger.vercel.app/admin`
- **API Health**: `https://hdh-burger.vercel.app/api/health`

### APIs de Debug
- **Test DB**: `https://hdh-burger.vercel.app/api/test-db`
- **Debug Settings**: `https://hdh-burger.vercel.app/api/debug-settings`
- **Products API**: `https://hdh-burger.vercel.app/api/products`

## 🚨 SIGNALER LES PROBLÈMES

Si problèmes détectés, noter :

1. **URL exacte** où ça ne marche pas
2. **Action effectuée** (clic, formulaire, etc.)
3. **Résultat obtenu** vs **résultat attendu**
4. **Message d'erreur** exact (copier-coller)
5. **Device** (mobile/desktop) et navigateur

## ✅ VALIDATION v2.1

- [ ] Suppression produits: ✅ Fonctionne / ❌ Problème
- [ ] Gestion prix: ✅ Fonctionne / ❌ Problème  
- [ ] Nettoyage prix: ✅ Fonctionne / ❌ Problème
- [ ] Boutique general: ✅ Fonctionne / ❌ Problème
- [ ] Admin général: ✅ Fonctionne / ❌ Problème

---
**Version testée**: v2.1 (commit: d92bfdc)
**Déploiement**: Auto Vercel depuis GitHub
**Priorité**: 🔴 CRITIQUE - Validation des corrections majeures