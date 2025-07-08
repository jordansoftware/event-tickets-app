# 🔥 Configuration Firebase pour l'Application

## Problème actuel
L'application ne peut pas se connecter à Firebase à cause des règles de sécurité Firestore qui bloquent l'accès.

## Solution

### 1. Installer Firebase CLI
```bash
npm install -g firebase-tools
```

### 2. Se connecter à Firebase
```bash
firebase login
```

### 3. Initialiser le projet Firebase
```bash
firebase init firestore --project YOUR_PROJECT_ID
```

### 4. Déployer les règles Firestore
```bash
firebase deploy --only firestore:rules --project YOUR_PROJECT_ID
```

### 5. Vérifier la configuration
Les règles Firestore sont dans le fichier `firestore.rules` et permettent l'accès complet à la collection `guests`.

## Configuration Firebase

### Variables d'environnement
Le fichier `.env` doit contenir :
```
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project_id.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

### Règles Firestore
Les règles dans `firestore.rules` permettent :
- Lecture et écriture sur la collection `guests`
- Accès complet pour le développement

## Test de connexion

### 1. Démarrer l'application
```bash
npm run dev
```

### 2. Ouvrir la console du navigateur
- Appuyer sur F12
- Aller dans l'onglet Console
- Vérifier les logs Firebase

### 3. Vérifier les logs
Vous devriez voir :
```
Configuration Firebase: { apiKey: "✅ Présent", ... }
🔍 Tentative de récupération des invités depuis Firebase...
✅ Query créée, tentative de récupération...
✅ Documents récupérés: 0
✅ Invités récupérés avec succès: 0
```

## Dépannage

### Erreur "permission-denied"
- Déployer les règles Firestore
- Vérifier que le projet Firebase est correct

### Erreur "unavailable"
- Vérifier la connexion internet
- Vérifier que Firebase est accessible

### Timeout
- Augmenter le timeout dans le code
- Vérifier la latence réseau

## Structure de la base de données

### Collection: `guests`
```javascript
{
  id: "auto-généré",
  fullName: "Nom complet",
  phoneNumber: "Téléphone",
  tableNumber: 1,
  status: "VIP" | "Standard",
  ticketId: "TKT-XXXXX-XXXX",
  ticketStatus: "Valid" | "Scanned" | "Invalid",
  createdAt: Date
}
```

## Commandes utiles

### Voir les règles actuelles
```bash
firebase firestore:rules:get --project YOUR_PROJECT_ID
```

### Tester les règles
```bash
firebase firestore:rules:test firestore.rules --project YOUR_PROJECT_ID
```

### Voir les données
```bash
firebase firestore:data:get --project YOUR_PROJECT_ID
``` 