# Configuration des Variables d'Environnement

## 🔐 Sécurité Firebase

Pour protéger vos clés Firebase, créez un fichier `.env` à la racine du projet avec les variables suivantes :

```env
VITE_FIREBASE_API_KEY=votre_api_key_ici
VITE_FIREBASE_AUTH_DOMAIN=votre_projet.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=votre_project_id
VITE_FIREBASE_STORAGE_BUCKET=votre_projet.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=votre_sender_id
VITE_FIREBASE_APP_ID=votre_app_id
VITE_FIREBASE_MEASUREMENT_ID=votre_measurement_id
```

## 📋 Étapes de configuration

1. **Créez le fichier `.env`** à la racine du projet
2. **Copiez vos clés Firebase** depuis la console Firebase
3. **Remplacez les valeurs** dans le fichier `.env`
4. **Ne committez jamais** le fichier `.env` (il est déjà dans .gitignore)

## 🚀 Déploiement

### Netlify
Dans les paramètres de Netlify, ajoutez ces variables d'environnement :
- `VITE_FIREBASE_API_KEY`
- `VITE_FIREBASE_AUTH_DOMAIN`
- `VITE_FIREBASE_PROJECT_ID`
- `VITE_FIREBASE_STORAGE_BUCKET`
- `VITE_FIREBASE_MESSAGING_SENDER_ID`
- `VITE_FIREBASE_APP_ID`
- `VITE_FIREBASE_MEASUREMENT_ID`

### Vercel
Dans les paramètres de Vercel, ajoutez les mêmes variables.

## ⚠️ Important

- Le fichier `.env` est automatiquement ignoré par Git
- Ne partagez jamais vos clés Firebase publiquement
- Utilisez des variables d'environnement pour tous les secrets 