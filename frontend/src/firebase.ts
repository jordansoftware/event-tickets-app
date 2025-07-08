import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getDocs, collection } from 'firebase/firestore';

// Fichier de configuration et d'initialisation de Firebase côté frontend.
// Permet de connecter l'application à la base de données Firestore et à l'authentification Firebase.

// Configuration Firebase avec variables d'environnement
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

// Vérifier que la configuration est correcte
console.log('Configuration Firebase:', {
  apiKey: firebaseConfig.apiKey ? '✅ Présent' : '❌ Manquant',
  authDomain: firebaseConfig.authDomain ? '✅ Présent' : '❌ Manquant',
  projectId: firebaseConfig.projectId ? '✅ Présent' : '❌ Manquant',
  storageBucket: firebaseConfig.storageBucket ? '✅ Présent' : '❌ Manquant',
  messagingSenderId: firebaseConfig.messagingSenderId ? '✅ Présent' : '❌ Manquant',
  appId: firebaseConfig.appId ? '✅ Présent' : '❌ Manquant',
  measurementId: firebaseConfig.measurementId ? '✅ Présent' : '❌ Manquant'
});

// Initialiser Firebase
const app = initializeApp(firebaseConfig);

// Initialiser Firestore (base de données)
export const db = getFirestore(app);

// Initialiser Auth (authentification)
export const auth = getAuth(app);

// Fonction pour vérifier la connexion Firebase
export const checkFirebaseConnection = async (): Promise<boolean> => {
  try {
    // Test simple de connexion
    await getDocs(collection(db, 'test'));
    return true;
  } catch (error) {
    console.error('Erreur de connexion Firebase:', error);
    return false;
  }
};

export default app;

// Pour éviter les erreurs TypeScript sur import.meta.env, il faut déclarer les variables dans vite-env.d.ts
// Exemple à ajouter dans vite-env.d.ts :
// interface ImportMetaEnv {
//   VITE_FIREBASE_API_KEY: string;
//   VITE_FIREBASE_AUTH_DOMAIN: string;
//   VITE_FIREBASE_PROJECT_ID: string;
//   VITE_FIREBASE_STORAGE_BUCKET: string;
//   VITE_FIREBASE_MESSAGING_SENDER_ID: string;
//   VITE_FIREBASE_APP_ID: string;
//   VITE_FIREBASE_MEASUREMENT_ID: string;
// }
// interface ImportMeta {
//   readonly env: ImportMetaEnv;
// } 