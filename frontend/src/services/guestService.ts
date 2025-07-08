import { 
  collection, 
  addDoc, 
  getDocs, 
  updateDoc, 
  deleteDoc, 
  doc, 
  query, 
 
} from 'firebase/firestore';
import { db } from '../firebase';
import type { Guest } from '../types';

// Collection Firestore pour les invités
const GUESTS_COLLECTION = 'guests';

// Service pour gérer les invités dans Firestore (ajout, suppression, stats, etc.)
// Utilisé côté frontend pour interagir avec la base de données Firebase.

// Générer un ID de ticket unique
const generateTicketId = (): string => {
  const prefix = 'TKT';
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substr(2, 4).toUpperCase();
  return `${prefix}-${timestamp}-${random}`;
};

export const guestService = {
  // Méthode utilitaire pour parser les dates
  parseCreatedAt(createdAt: any): Date {
    if (!createdAt) return new Date();
    
    // Si c'est un Timestamp Firestore
    if (createdAt && typeof createdAt.toDate === 'function') {
      return createdAt.toDate();
    }
    
    // Si c'est une chaîne ISO
    if (typeof createdAt === 'string') {
      return new Date(createdAt);
    }
    
    // Si c'est déjà un objet Date
    if (createdAt instanceof Date) {
      return createdAt;
    }
    
    // Par défaut
    return new Date();
  },

  // Fonction pour récupérer tous les invités depuis Firestore.
  async getAllGuests(): Promise<Guest[]> {
    try {
      console.log('🔍 Tentative de récupération des invités depuis Firebase...');
      console.log('📊 Collection:', GUESTS_COLLECTION);
      console.log('🌐 Base de données:', db);
      
      // Test de connexion simple d'abord
      const testQuery = query(collection(db, GUESTS_COLLECTION));
      console.log('✅ Query créée, tentative de récupération...');
      
      const querySnapshot = await getDocs(testQuery);
      console.log('✅ Documents récupérés:', querySnapshot.size);
      
      const guests: Guest[] = [];
      
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        console.log('📄 Document:', doc.id, data);
        guests.push({
          id: doc.id,
          fullName: data.fullName || '',
          tableNumber: data.tableNumber || 1,
          status: data.status || 'Standard',
          ticketId: data.ticketId || '',
          ticketStatus: data.ticketStatus || 'Valid',
          createdAt: this.parseCreatedAt(data.createdAt)
        });
      });
      
      console.log('✅ Invités récupérés avec succès:', guests.length);
      return guests;
    } catch (error: any) {
      console.error('❌ Erreur lors de la récupération des invités:', error);
      console.error('🔍 Détails de l\'erreur:', {
        message: error?.message || 'Erreur inconnue',
        code: error?.code || 'CODE_INCONNU',
        stack: error?.stack || 'Stack non disponible'
      });
      throw error; // Relancer l'erreur pour la gestion dans App.tsx
    }
  },

  // Ajouter un nouvel invité
  async addGuest(guestData: {
    fullName: string;
    tableNumber: string;
    status: 'VIP' | 'Standard';
  }): Promise<Guest> {
    try {
      console.log('Service addGuest appelé avec:', guestData);
      
      const newGuest = {
        ...guestData,
        tableNumber: parseInt(guestData.tableNumber) || 1,
        ticketId: generateTicketId(),
        ticketStatus: 'Valid' as const,
        createdAt: new Date()
      };

      console.log('Nouvel invité préparé:', newGuest);
      console.log('Tentative d\'ajout à Firebase...');

      const docRef = await addDoc(collection(db, GUESTS_COLLECTION), newGuest);
      
      console.log('Document ajouté avec ID:', docRef.id);
      
      const result = {
        id: docRef.id,
        ...newGuest
      };
      
      console.log('Résultat final:', result);
      return result;
    } catch (error) {
      console.error('Erreur lors de l\'ajout de l\'invité:', error);
      throw error;
    }
  },

  // Mettre à jour le statut d'un invité
  async updateGuestStatus(guestId: string, ticketStatus: 'Valid' | 'Scanned' | 'Invalid'): Promise<void> {
    try {
      const guestRef = doc(db, GUESTS_COLLECTION, guestId);
      await updateDoc(guestRef, {
        ticketStatus,
        updatedAt: new Date()
      });
    } catch (error) {
      console.error('Erreur lors de la mise à jour du statut:', error);
      throw error;
    }
  },

  // Supprimer un invité
  async deleteGuest(guestId: string): Promise<void> {
    try {
      const guestRef = doc(db, GUESTS_COLLECTION, guestId);
      await deleteDoc(guestRef);
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'invité:', error);
      throw error;
    }
  },

  // Rechercher des invités
  async searchGuests(searchTerm: string): Promise<Guest[]> {
    try {
      const allGuests = await this.getAllGuests();
      return allGuests.filter(guest => 
        guest.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        guest.ticketId.includes(searchTerm)
      );
    } catch (error) {
      console.error('Erreur lors de la recherche:', error);
      throw error;
    }
  },

  // Obtenir les statistiques
  async getStats() {
    try {
      const guests = await this.getAllGuests();
      return {
        total: guests.length,
        valid: guests.filter(g => g.ticketStatus === 'Valid').length,
        scanned: guests.filter(g => g.ticketStatus === 'Scanned').length,
        invalid: guests.filter(g => g.ticketStatus === 'Invalid').length,
        vip: guests.filter(g => g.status === 'VIP').length,
        standard: guests.filter(g => g.status === 'Standard').length
      };
    } catch (error) {
      console.error('Erreur lors de la récupération des statistiques:', error);
      throw error;
    }
  }
}; 