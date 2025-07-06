import type { Guest } from './types';
import { generateId, generateTicketId } from './utils';

// Données de démonstration pour tester l'application
export const demoGuests: Guest[] = [
  {
    id: generateId(),
    fullName: "Marie Dubois",
    tableNumber: 1,
    status: "VIP",
    ticketId: generateTicketId(),
    ticketStatus: "Valid",
    createdAt: new Date("2024-01-15T10:00:00Z")
  },
  {
    id: generateId(),
    fullName: "Jean Martin",
    tableNumber: 2,
    status: "Standard",
    ticketId: generateTicketId(),
    ticketStatus: "Scanned",
    createdAt: new Date("2024-01-15T10:30:00Z")
  },
  {
    id: generateId(),
    fullName: "Sophie Bernard",
    tableNumber: 3,
    status: "VIP",
    ticketId: generateTicketId(),
    ticketStatus: "Valid",
    createdAt: new Date("2024-01-15T11:00:00Z")
  },
  {
    id: generateId(),
    fullName: "Pierre Durand",
    tableNumber: 4,
    status: "Standard",
    ticketId: generateTicketId(),
    ticketStatus: "Invalid",
    createdAt: new Date("2024-01-15T11:30:00Z")
  },
  {
    id: generateId(),
    fullName: "Isabelle Moreau",
    tableNumber: 5,
    status: "VIP",
    ticketId: generateTicketId(),
    ticketStatus: "Scanned",
    createdAt: new Date("2024-01-15T12:00:00Z")
  },
  {
    id: generateId(),
    fullName: "François Petit",
    tableNumber: 6,
    status: "Standard",
    ticketId: generateTicketId(),
    ticketStatus: "Valid",
    createdAt: new Date("2024-01-15T12:30:00Z")
  },
  {
    id: generateId(),
    fullName: "Claire Roux",
    tableNumber: 7,
    status: "VIP",
    ticketId: generateTicketId(),
    ticketStatus: "Valid",
    createdAt: new Date("2024-01-15T13:00:00Z")
  },
  {
    id: generateId(),
    fullName: "Michel Simon",
    tableNumber: 8,
    status: "Standard",
    ticketId: generateTicketId(),
    ticketStatus: "Scanned",
    createdAt: new Date("2024-01-15T13:30:00Z")
  }
];

// Fonction pour charger les données de démonstration
export const loadDemoData = (): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('eventGuests', JSON.stringify(demoGuests));
    window.location.reload();
  }
};

// Fonction pour effacer toutes les données
export const clearAllData = (): void => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('eventGuests');
    window.location.reload();
  }
}; 