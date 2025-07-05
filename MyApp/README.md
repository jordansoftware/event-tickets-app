# 🎫 Gestionnaire d'Événement - Application Mobile

Une application mobile complète pour gérer les tickets et invités d'un événement avec génération de QR codes, scan de tickets et interface responsive.

## ✨ Fonctionnalités principales

### 📝 Gestion des invités
- **Ajout d'invités** avec informations complètes :
  - Nom complet
  - Numéro de téléphone
  - Numéro de table
  - Statut (VIP ou Standard)
- **Génération automatique** de tickets uniques avec QR codes
- **Liste des invités** avec filtres et recherche
- **Statuts en temps réel** : Valide, Scanné, Invalide

### 🎫 Tickets élégants
- **Design professionnel** avec gradients et couleurs
- **QR codes scannables** contenant toutes les informations du ticket
- **Informations complètes** : nom, table, statut, ID unique
- **Statut visuel** du ticket (Validé/Scanné/Invalide)

### 📱 Scanner QR intégré
- **Scanner de caméra** pour valider les tickets
- **Validation automatique** des tickets scannés
- **Interface intuitive** avec cadre de scan
- **Feedback visuel** pour les tickets valides/invalides

### 📊 Statistiques en temps réel
- **Tableau de bord** avec métriques clés
- **Progression des scans** avec graphiques
- **Répartition VIP/Standard**
- **Statuts des tickets** en temps réel

### 💾 Partage et export
- **Téléchargement en image** (PNG)
- **Export PDF** pour impression
- **Partage direct** via WhatsApp ou autres apps
- **Stockage local** des données

## 🚀 Installation et démarrage

### Prérequis
- Node.js (version 16 ou supérieure)
- npm ou yarn

### Installation
```bash
# Cloner le projet
git clone <repository-url>
cd MyApp

# Installer les dépendances
npm install

# Démarrer l'application en mode développement
npm run dev
```

### Build pour production
```bash
# Construire l'application
npm run build

# Prévisualiser la build
npm run preview
```

## 📱 Utilisation

### 1. Ajouter des invités
- Allez dans l'onglet "Invités"
- Remplissez le formulaire avec les informations
- Cliquez sur "Ajouter l'invité"
- Le ticket sera automatiquement généré

### 2. Gérer les tickets
- Dans l'onglet "Tickets", visualisez le ticket sélectionné
- Utilisez les boutons pour :
  - Télécharger en image
  - Exporter en PDF
  - Partager via WhatsApp

### 3. Scanner les tickets
- Allez dans l'onglet "Scanner"
- Autorisez l'accès à la caméra
- Scannez les QR codes des tickets
- Les statuts se mettent à jour automatiquement

### 4. Consulter les statistiques
- L'onglet "Statistiques" affiche :
  - Nombre total d'invités
  - Tickets validés/scannés/invalides
  - Répartition VIP/Standard
  - Progression des scans

## 🛠️ Technologies utilisées

- **React 19** - Framework frontend
- **TypeScript** - Typage statique
- **Vite** - Build tool et dev server
- **Tailwind CSS** - Framework CSS
- **Lucide React** - Icônes
- **QRCode** - Génération de QR codes
- **html2canvas** - Capture d'écran
- **jsPDF** - Génération de PDF
- **LocalStorage** - Persistance des données

## 📁 Structure du projet

```
src/
├── components/
│   ├── GuestForm.tsx      # Formulaire d'ajout d'invités
│   ├── GuestList.tsx      # Liste et gestion des invités
│   ├── Ticket.tsx         # Composant de ticket
│   └── QRScanner.tsx      # Scanner de QR codes
├── types.ts               # Types TypeScript
├── utils.ts               # Utilitaires (QR, PDF, etc.)
├── App.tsx                # Composant principal
├── App.css                # Styles personnalisés
└── index.css              # Styles Tailwind
```

## 🎨 Design et UX

- **Interface mobile-first** responsive
- **Design moderne** avec gradients et animations
- **Couleurs distinctives** pour VIP/Standard
- **Feedback visuel** pour toutes les actions
- **Navigation intuitive** par onglets

## 🔧 Configuration

### Variables d'environnement
L'application utilise le stockage local du navigateur pour persister les données. Aucune configuration supplémentaire n'est nécessaire.

### Personnalisation
- Modifiez les couleurs dans `tailwind.config.js`
- Ajustez les styles dans `src/App.css`
- Personnalisez les gradients de tickets dans les composants

## 📱 Compatibilité

- **Navigateurs modernes** : Chrome, Firefox, Safari, Edge
- **Mobile** : iOS Safari, Chrome Mobile, Samsung Internet
- **PWA ready** : Peut être installé comme application mobile

## 🤝 Contribution

1. Fork le projet
2. Créez une branche feature (`git checkout -b feature/AmazingFeature`)
3. Committez vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrez une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 🆘 Support

Pour toute question ou problème :
- Ouvrez une issue sur GitHub
- Consultez la documentation des dépendances
- Vérifiez la console du navigateur pour les erreurs

---

**Développé avec ❤️ pour simplifier la gestion d'événements**
