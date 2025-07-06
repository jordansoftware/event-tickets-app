export interface Guest {
  id: string;
  fullName: string;
  tableNumber: number;
  status: 'VIP' | 'Standard';
  ticketId: string;
  ticketStatus: 'Valid' | 'Scanned' | 'Invalid';
  createdAt: Date;
}

export interface Ticket {
  id: string;
  guestId: string;
  qrCode: string;
  guest: Guest;
} 