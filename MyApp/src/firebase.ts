import { initializeApp } from 'firebase/app';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getDocs, collection } from 'firebase/firestore';

// Configuration Firebase avec variables d'environnement
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyD-JMV0AzDD9AqnCOuhYf-xN8S3G5udjok",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "myapp-5d335.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "myapp-5d335",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "myapp-5d335.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "596568642110",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:596568642110:web:2fea44f3a3da5dbee4b76f",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-VDV8QZTL8G"
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
    const testDoc = await getDocs(collection(db, 'test'));
    return true;
  } catch (error) {
    console.error('Erreur de connexion Firebase:', error);
    return false;
  }
};

export default app; 