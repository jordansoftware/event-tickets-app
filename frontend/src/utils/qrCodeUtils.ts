import QRCode from 'qrcode';

// Fichier utilitaire pour la génération et la gestion des QR codes (frontend)
// Utilisé pour créer les QR codes des tickets invités.

// Fonction pour générer un QR code à partir d'une chaîne de caractères.
// Elle retourne une image sous forme de data URL.
export const generateQRCode = async (data: string): Promise<string> => {
  try {
    const qrCodeDataURL = await QRCode.toDataURL(data, {
      width: 300,
      margin: 2,
      color: {
        dark: '#000000',
        light: '#FFFFFF'
      },
      errorCorrectionLevel: 'M'
    });
    
    return qrCodeDataURL;
  } catch (error) {
    console.error('Erreur lors de la génération du QR code:', error);
    throw error;
  }
};

// Générer un QR code avec des options personnalisées
export const generateQRCodeWithOptions = async (
  data: string, 
  options: {
    width?: number;
    margin?: number;
    darkColor?: string;
    lightColor?: string;
    errorCorrectionLevel?: 'L' | 'M' | 'Q' | 'H';
  } = {}
): Promise<string> => {
  try {
    const qrCodeDataURL = await QRCode.toDataURL(data, {
      width: options.width || 300,
      margin: options.margin || 2,
      color: {
        dark: options.darkColor || '#000000',
        light: options.lightColor || '#FFFFFF'
      },
      errorCorrectionLevel: options.errorCorrectionLevel || 'M'
    });
    
    return qrCodeDataURL;
  } catch (error) {
    console.error('Erreur lors de la génération du QR code personnalisé:', error);
    throw error;
  }
};

// Générer un QR code pour un ticket d'invité
export const generateTicketQRCode = async (guestData: {
  ticketId: string;
  guestId: string;
  guestName: string;
  tableNumber: number;
  status: string;
}): Promise<string> => {
  const qrData = JSON.stringify(guestData);
  return generateQRCode(qrData);
};

// Valider si une chaîne est un QR code valide
export const validateQRCode = (data: string): boolean => {
  try {
    const parsed = JSON.parse(data);
    return !!(parsed.ticketId && parsed.guestId);
  } catch {
    return false;
  }
}; 