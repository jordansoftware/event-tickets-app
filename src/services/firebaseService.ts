import { 
  collection, 
  addDoc, 
  getDocs, 
  updateDoc, 
  deleteDoc, 
  doc, 
  query, 
  orderBy,
  onSnapshot,
  serverTimestamp,
 
} from 'firebase/firestore';
import { db } from '../firebase';
import type { Guest } from '../types';

// Collection Firestore
const GUESTS_COLLECTION = 'guests';

// Ajouter un invité
export const addGuestToFirebase = async (guest: Guest): Promise<string> => {
  try {
    const docRef = await addDoc(collection(db, GUESTS_COLLECTION), {
      ...guest,
      createdAt: serverTimestamp()
    });
    return docRef.id;
  } catch (error) {
    console.error('Erreur lors de l\'ajout de l\'invité:', error);
    throw error;
  }
};

// Récupérer tous les invités
export const getGuestsFromFirebase = async (): Promise<Guest[]> => {
  try {
    const q = query(collection(db, GUESTS_COLLECTION), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        ...data,
        id: doc.id,
        createdAt: data.createdAt?.toDate() || new Date()
      };
    }) as Guest[];
  } catch (error) {
    console.error('Erreur lors de la récupération des invités:', error);
    throw error;
  }
};

// Mettre à jour un invité
export const updateGuestInFirebase = async (guestId: string, updates: Partial<Guest>): Promise<void> => {
  try {
    const guestRef = doc(db, GUESTS_COLLECTION, guestId);
    await updateDoc(guestRef, {
      ...updates,
      updatedAt: serverTimestamp()
    });
  } catch (error) {
    console.error('Erreur lors de la mise à jour de l\'invité:', error);
    throw error;
  }
};

// Supprimer un invité
export const deleteGuestFromFirebase = async (guestId: string): Promise<void> => {
  try {
    const guestRef = doc(db, GUESTS_COLLECTION, guestId);
    await deleteDoc(guestRef);
  } catch (error) {
    console.error('Erreur lors de la suppression de l\'invité:', error);
    throw error;
  }
};

// Écouter les changements en temps réel
export const subscribeToGuests = (callback: (guests: Guest[]) => void) => {
  const q = query(collection(db, GUESTS_COLLECTION), orderBy('createdAt', 'desc'));
  
  return onSnapshot(q, (querySnapshot) => {
    const guests = querySnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        ...data,
        id: doc.id,
        createdAt: data.createdAt?.toDate() || new Date()
      };
    }) as Guest[];
    
    callback(guests);
  });
};

// Statistiques
export const getGuestStats = async () => {
  try {
    const guests = await getGuestsFromFirebase();
    
    return {
      total: guests.length,
      valid: guests.filter(g => g.ticketStatus === 'Valid').length,
      scanned: guests.filter(g => g.ticketStatus === 'Scanned').length,
      invalid: guests.filter(g => g.ticketStatus === 'Invalid').length,
      vip: guests.filter(g => g.status === 'VIP').length,
      standard: guests.filter(g => g.status === 'Standard').length
    };
  } catch (error) {
    console.error('Erreur lors du calcul des statistiques:', error);
    throw error;
  }
}; 