import  { useEffect, useState } from 'react';
import { generateQRCode } from '../utils/qrCodeUtils';
import type { Guest } from '../types';

interface TicketModalProps {
  guest: Guest;
  onShare?: (guest: Guest) => void;
}

export const TicketModal = ({ guest, onShare }: TicketModalProps) => {
  const [qrCode, setQrCode] = useState<string>('');

  useEffect(() => {
    const generateQR = async () => {
      try {
        const qrData = JSON.stringify({
          ticketId: guest.ticketId,
          guestId: guest.id,
          guestName: guest.fullName,
          tableNumber: guest.tableNumber,
          status: guest.status
        });
        const qrCodeDataURL = await generateQRCode(qrData);
        setQrCode(qrCodeDataURL);
      } catch (error) {
        setQrCode('');
      }
    };
    generateQR();
  }, [guest]);

  // Date et heure fixes (à personnaliser si besoin)
  const date = 'SAMEDI 16 AOÛT 2025';
  const heure = '20H';

  return (
    <div style={{ background: 'white', borderRadius: 16, boxShadow: '0 4px 24px rgba(0,0,0,0.15)', padding: 24, maxWidth: 900, overflow: 'hidden', boxSizing: 'border-box' }}>
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', background: 'white' }}>
        {/* Infos à gauche */}
        <div style={{ flex: 1, minWidth: 200, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'flex-start', marginRight: 0 }}>
          <div style={{ fontWeight: 'bold', fontSize: 22, color: '#222', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8, whiteSpace: 'nowrap' }}>
            Billet Invitation
          </div>
          <div style={{ fontSize: 16, color: '#444', marginBottom: 2 }}>{date}</div>
          <div style={{ fontSize: 16, color: '#444', marginBottom: 0 }}>{heure}</div>
        </div>
        {/* QR code à droite */}
        <div style={{ flex: '0 0 auto', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
          {qrCode ? (
            <img src={qrCode} alt="QR Code" style={{ width: 140, height: 140, background: 'white', border: '2px solid #333', borderRadius: 8 }} />
          ) : (
            <div style={{ width: 140, height: 140, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#888' }}>QR en cours...</div>
          )}
        </div>
      </div>
      {/* Bouton partager si besoin */}
      {onShare && (
        <button onClick={() => onShare(guest)} style={{marginTop: 16, background: '#7c3aed', color: 'white', padding: '10px 20px', borderRadius: 8, fontWeight: 'bold', border: 'none', cursor: 'pointer'}}>
          Partager
        </button>
      )}
    </div>
  );
}; 