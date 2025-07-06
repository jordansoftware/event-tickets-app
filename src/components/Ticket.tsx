import React, { useState, useEffect, useRef } from 'react';
import { Download, Share2, FileText } from 'lucide-react';
import { generateQRCode } from '../utils/qrCodeUtils';
import type { Guest } from '../types';
import allianceImg from '../assets/alliance.png';

interface TicketProps {
  guest: Guest;
  onDownloadImage: (ticketRef: React.RefObject<HTMLDivElement>, guest: Guest) => void;
  onDownloadPDF: (ticketRef: React.RefObject<HTMLDivElement>, guest: Guest) => void;
  onShare: (ticketRef: React.RefObject<HTMLDivElement>, guest: Guest) => void;
}

export const Ticket = ({ guest, onDownloadImage, onDownloadPDF, onShare }: TicketProps) => {
  const [qrCode, setQrCode] = useState<string>('');
  const [qrLoaded, setQrLoaded] = useState(false);
  const ticketRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.log('Ticket component mounted for guest:', guest.fullName, guest.ticketId);
    setQrLoaded(false);
    setQrCode('');
    
    const generateQR = async () => {
      try {
        console.log('Generating QR code for:', guest.ticketId);
        const qrData = JSON.stringify({
          ticketId: guest.ticketId,
          guestId: guest.id,
          guestName: guest.fullName,
          tableNumber: guest.tableNumber,
          status: guest.status
        });
        const qrCodeDataURL = await generateQRCode(qrData);
        console.log('QR code generated successfully');
        setQrCode(qrCodeDataURL);
        setQrLoaded(true);
      } catch (error) {
        console.error('Erreur lors de la génération du QR code:', error);
        setQrLoaded(true); // Pour éviter un chargement infini
      }
    };
    
    // Délai court pour s'assurer que le composant est bien monté
    setTimeout(() => {
      generateQR();
    }, 100);
  }, [guest.id, guest.ticketId]);

  // Infos fixes mariage
  const weddingNames = 'GAELLE & MAXIME';
  const weddingDate = 'SAMEDI 16 AOÛT 2025';
  const weddingHour = '20H';
  const weddingPlace = 'MJS Bafoussam';

  return (
    <div className="flex flex-col items-center py-4 px-2 w-full">
      {/* Style global pour l'export dom-to-image-more : supprime toutes les bordures et ombres */}
      <style>{`
        .export-ticket * {
          border: none !important;
          box-shadow: none !important;
        }
      `}</style>
      <div
        ref={ticketRef}
        className="export-ticket w-full max-w-xs md:max-w-3xl flex flex-col rounded-2xl overflow-hidden shadow-2xl mx-auto"
        style={{ background: 'transparent', minHeight: 260 }}
      >
        {/* Bandeau vert horizontal en haut */}
        <div className="w-full bg-gradient-to-b from-green-500 to-green-700 text-white flex flex-row items-center justify-center py-4 px-2">
          <img src={allianceImg} alt="Alliance" className="w-10 h-10 mr-3" />
          <div className="text-xl md:text-2xl font-black tracking-widest text-center break-words" style={{letterSpacing:'0.13em', fontFamily:'Montserrat, Arial Black, Arial, sans-serif', padding: '0 2px'}}>{weddingNames}</div>
        </div>
        {/* Volet droit bleu nuit */}
        <div className="flex-1 bg-gradient-to-b from-blue-900 to-purple-900 text-white py-4 md:py-8 px-2 md:px-8 flex flex-col md:flex-row items-center relative font-sans" style={{fontFamily: 'Montserrat, Arial Black, Arial, sans-serif'}}>
          {/* Colonne principale */}
          <div className="flex-1 flex flex-col justify-center gap-2 w-full">
            <div className="uppercase tracking-[0.18em] text-[1rem] font-bold text-white/80 mb-1">INVITATION MARIAGE</div>
            <div className="text-[2.1rem] md:text-[2.7rem] font-black text-white text-left leading-tight mb-1" style={{fontFamily: 'Montserrat, Arial Black, Arial, sans-serif'}}>{guest.fullName}</div>
            <div className="text-lg font-bold text-white/80 mb-2">{weddingDate} | {weddingHour}</div>
            {/* 3 blocs ligne */}
            <div className="flex flex-row gap-4 mb-2">
              <div className="bg-white/90 text-blue-900 rounded-lg px-4 py-2 text-xs font-bold flex flex-col items-center min-w-[70px]">
                Lieu
                <span className="text-[1em] font-extrabold">{weddingPlace}</span>
              </div>
              <div className={`rounded-lg px-4 py-2 text-xs font-bold flex flex-col items-center min-w-[70px] ${guest.status === 'VIP' ? 'bg-yellow-200 text-yellow-900' : 'bg-white/90 text-blue-900'}`}>
                Statut
                <span className="text-[1em] font-extrabold">{guest.status === 'VIP' ? '💎 VIP' : 'Standard'}</span>
              </div>
            </div>
          </div>
          {/* QR code */}
          <div className="flex flex-col items-center justify-center ml-0 md:ml-6 mt-4 md:mt-0 w-full md:w-auto">
            {qrCode && qrLoaded ? (
              <div className="bg-white p-2 rounded-lg border-4 border-gray-200 shadow-lg" style={{display:'inline-block'}}>
                <img src={qrCode} alt="QR Code" className="w-24 h-24 md:w-32 md:h-32" crossOrigin="anonymous" />
              </div>
            ) : (
              <div className="w-24 h-24 md:w-32 md:h-32 bg-white rounded-lg flex items-center justify-center border-4 border-gray-200">
                <div className="flex flex-col items-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-2"></div>
                  <span className="text-xs text-blue-600 font-medium">QR en cours...</span>
                </div>
              </div>
            )}
            <div className="text-xs text-pink-200 mt-2 font-semibold tracking-wide text-center" style={{letterSpacing: '0.08em'}}>Scannez pour confirmer votre présence</div>
          </div>
        </div>
      </div>
      {/* Boutons d'action */}
      <div className="flex flex-col gap-2 mt-4 w-full max-w-xs mx-auto">
        <button
          onClick={() => onDownloadImage(ticketRef as React.RefObject<HTMLDivElement>, guest)}
          className="bg-green-600 text-white px-4 py-2 rounded-lg font-semibold shadow hover:bg-green-700 transition"
          disabled={!qrLoaded}
        >
          {qrLoaded ? (
            <><Download className="h-5 w-5 inline mr-1" />Télécharger Image</>
          ) : (
            <><div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white inline-block mr-1"></div>QR en cours...</>
          )}
        </button>
        <button
          onClick={() => onDownloadPDF(ticketRef as React.RefObject<HTMLDivElement>, guest)}
          className="bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold shadow hover:bg-blue-800 transition"
          disabled={!qrLoaded}
        >
          {qrLoaded ? (
            <><FileText className="h-5 w-5 inline mr-1" />Télécharger PDF</>
          ) : (
            <><div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white inline-block mr-1"></div>QR en cours...</>
          )}
        </button>
        <button
          onClick={() => onShare(ticketRef as React.RefObject<HTMLDivElement>, guest)}
          className="bg-purple-700 text-white px-4 py-2 rounded-lg font-semibold shadow hover:bg-purple-800 transition"
        >
          <Share2 className="h-5 w-5 inline mr-1" />Partager
        </button>
      </div>
    </div>
  );
};