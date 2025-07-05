# 📱 Instructions d'utilisation - Gestionnaire d'Événement

## 🚀 Démarrage rapide

1. **Ouvrez votre navigateur** et allez à l'adresse affichée par Vite (généralement `http://localhost:5173`)

2. **Testez l'application** :
   - Cliquez sur "Charger données de démo" pour voir des exemples
   - Explorez les différents onglets
   - Testez l'ajout d'invités

## 📋 Fonctionnalités principales

### 1. 📝 Gestion des invités
- **Onglet "Invités"** : Ajoutez des invités avec leurs informations
- **Formulaire complet** : Nom, téléphone, table, statut (VIP/Standard)
- **Génération automatique** de tickets avec QR codes uniques

### 2. 🎫 Visualisation des tickets
- **Onglet "Tickets"** : Affiche le ticket de l'invité sélectionné
- **Design élégant** avec gradients et couleurs selon le statut
- **QR code scannable** contenant toutes les informations

### 3. 📱 Scanner QR
- **Onglet "Scanner"** : Validez les tickets en scannant les QR codes
- **Accès caméra** : Autorisez l'accès pour scanner
- **Validation automatique** : Les statuts se mettent à jour

### 4. 📊 Statistiques
- **Onglet "Statistiques"** : Tableau de bord complet
- **Métriques en temps réel** : Invités, tickets, progression
- **Graphiques visuels** pour suivre l'événement

## 🎯 Utilisation étape par étape

### Ajouter un invité
1. Allez dans l'onglet "Invités"
2. Remplissez le formulaire :
   - **Nom complet** : Prénom et nom
   - **Téléphone** : Format international (+33...)
   - **Table** : Numéro de table (1, 2, 3...)
   - **Statut** : VIP ou Standard
3. Cliquez sur "Ajouter l'invité"
4. Le ticket est automatiquement généré

### Gérer un ticket
1. Après avoir ajouté un invité, vous êtes redirigé vers l'onglet "Tickets"
2. Visualisez le ticket avec :
   - Informations de l'invité
   - QR code unique
   - Statut du ticket
3. Utilisez les boutons d'action :
   - **Image** : Télécharger en PNG
   - **PDF** : Exporter en PDF
   - **Partager** : Envoyer via WhatsApp

### Scanner un ticket
1. Allez dans l'onglet "Scanner"
2. Cliquez sur "Démarrer le scan"
3. Autorisez l'accès à la caméra
4. Placez le QR code dans le cadre
5. Le ticket est automatiquement validé

### Consulter les statistiques
1. Allez dans l'onglet "Statistiques"
2. Visualisez :
   - Nombre total d'invités
   - Tickets validés/scannés/invalides
   - Répartition VIP/Standard
   - Progression des scans

## 🔧 Fonctionnalités avancées

### Filtres et recherche
- **Recherche** : Par nom, téléphone ou ID ticket
- **Filtres** : Par statut (Valide/Scanné/Invalide) et type (VIP/Standard)
- **Tri automatique** par date de création

### Gestion des statuts
- **Valide** : Ticket créé, prêt à être utilisé
- **Scanné** : Ticket validé à l'entrée
- **Invalide** : Ticket rejeté ou expiré

### Export et partage
- **Images PNG** : Haute qualité pour impression
- **PDF** : Format professionnel
- **Partage mobile** : Via WhatsApp, email, etc.

## 📱 Utilisation mobile

### Installation PWA
1. Ouvrez l'application sur votre mobile
2. Dans le navigateur, cliquez sur "Installer" ou "Ajouter à l'écran d'accueil"
3. L'application s'installe comme une app native

### Optimisations mobile
- **Interface responsive** : S'adapte à tous les écrans
- **Navigation tactile** : Optimisée pour les doigts
- **Scanner caméra** : Utilise la caméra arrière

## 🛠️ Dépannage

### Problèmes courants

**L'application ne se charge pas**
- Vérifiez que le serveur de développement est démarré
- Rafraîchissez la page
- Vérifiez la console du navigateur

**Le scanner ne fonctionne pas**
- Autorisez l'accès à la caméra
- Utilisez HTTPS en production
- Vérifiez que votre navigateur supporte l'API MediaDevices

**Les tickets ne se téléchargent pas**
- Vérifiez les permissions de téléchargement
- Utilisez un navigateur moderne
- Vérifiez l'espace disque disponible

### Support technique
- **Console du navigateur** : F12 pour voir les erreurs
- **LocalStorage** : Les données sont sauvegardées localement
- **Mode démo** : Utilisez les données d'exemple pour tester

## 🎨 Personnalisation

### Couleurs et thème
- Modifiez `tailwind.config.js` pour changer les couleurs
- Ajustez `src/App.css` pour les styles personnalisés
- Personnalisez les gradients de tickets

### Données
- Les données sont stockées dans le localStorage
- Utilisez "Effacer toutes les données" pour recommencer
- Exportez les données via les tickets générés

## 📞 Support

Pour toute question ou problème :
1. Consultez ce fichier d'instructions
2. Vérifiez la console du navigateur
3. Testez avec les données de démonstration
4. Redémarrez l'application si nécessaire

---

**🎉 Bonne utilisation de votre Gestionnaire d'Événement !** 