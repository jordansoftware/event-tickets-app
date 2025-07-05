import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Configuration Firebase - À remplacer par tes vraies clés
const firebaseConfig = {
    apiKey: "AIzaSyD-JMV0AzDD9AqnCOuhYf-xN8S3G5udjok",
    authDomain: "myapp-5d335.firebaseapp.com",
    projectId: "myapp-5d335",
    storageBucket: "myapp-5d335.firebasestorage.app",
    messagingSenderId: "596568642110",
    appId: "1:596568642110:web:2fea44f3a3da5dbee4b76f",
    measurementId: "G-VDV8QZTL8G"
};

// Initialiser Firebase
const app = initializeApp(firebaseConfig);

// Initialiser Firestore (base de données)
export const db = getFirestore(app);

// Initialiser Auth (authentification)
export const auth = getAuth(app);

export default app; 