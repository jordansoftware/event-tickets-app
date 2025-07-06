import React, { useState, useEffect, useRef } from 'react';
import { QrCode, Download, Share2, FileText, Gem, MapPin, User } from 'lucide-react';
import { generateQRCode } from '../utils/qrCodeUtils';
import type { Guest } from '../types';

interface TicketProps {
  guest: Guest;
  onDownloadImage: (ticketRef: React.RefObject<HTMLDivElement>, guest: Guest) => void;
  onDownloadPDF: (ticketRef: React.RefObject<HTMLDivElement>, guest: Guest) => void;
  onShare: (guest: Guest) => void;
}

export const Ticket = ({ guest, onDownloadImage, onDownloadPDF, onShare }: TicketProps) => {
  const [qrCode, setQrCode] = useState<string>('');
  const [qrLoaded, setQrLoaded] = useState(false);
  const ticketRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setQrLoaded(false);
    const generateQR = async () => {
      const qrData = JSON.stringify({
        ticketId: guest.ticketId,
        guestId: guest.id,
        guestName: guest.fullName,
        tableNumber: guest.tableNumber,
        status: guest.status
      });
      const qrCodeDataURL = await generateQRCode(qrData);
      setQrCode(qrCodeDataURL);
    };
    generateQR();
  }, [guest]);

  // Infos fixes mariage
  const weddingNames = 'GAELLE & MAXIME';
  const weddingDate = 'SAMEDI 16 AOÛT 2025';
  const weddingHour = '20H';
  const weddingPlace = 'MJS Bafoussam';

  return (
    <div className="flex justify-center items-center py-8">
      {/* Style global pour l'export dom-to-image-more : supprime toutes les bordures et ombres */}
      <style>{`
        .export-ticket * {
          border: none !important;
          box-shadow: none !important;
        }
      `}</style>
      <div
        ref={ticketRef}
        className="export-ticket flex w-full max-w-3xl rounded-2xl overflow-hidden shadow-2xl"
        style={{ background: 'transparent', minHeight: 260 }}
      >
        {/* Volet gauche vert horizontal */}
        <div className="relative flex flex-col items-center justify-center py-4 px-2 w-[140px] min-w-[120px] bg-gradient-to-b from-green-500 to-green-700 text-white">
          <div className="flex flex-col items-center justify-center h-full">
            <Gem className="w-8 h-8 mb-2 text-yellow-200" />
            <div className="text-2xl font-black tracking-widest text-center" style={{letterSpacing:'0.18em', fontFamily:'Montserrat, Arial Black, Arial, sans-serif'}}>{weddingNames}</div>
          </div>
        </div>
        {/* Volet droit bleu nuit */}
        <div className="flex-1 bg-gradient-to-b from-blue-900 to-purple-900 text-white py-8 px-8 flex flex-row items-center relative font-sans" style={{fontFamily: 'Montserrat, Arial Black, Arial, sans-serif'}}>
          {/* Colonne principale */}
          <div className="flex-1 flex flex-col justify-center gap-2">
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
          <div className="flex flex-col items-center justify-center ml-6">
            {qrCode ? (
              <div className="bg-white p-2 rounded-lg border-4 border-gray-200 shadow-lg" style={{display:'inline-block'}}>
                <img src={qrCode} alt="QR Code" className="w-32 h-32" crossOrigin="anonymous" onLoad={() => setQrLoaded(true)} />
              </div>
            ) : (
              <div className="w-32 h-32 bg-white rounded-lg flex items-center justify-center border-4 border-gray-200">
                <QrCode className="h-14 w-14 text-blue-400" />
              </div>
            )}
            <div className="text-xs text-pink-200 mt-2 font-semibold tracking-wide text-center" style={{letterSpacing: '0.08em'}}>Scannez pour confirmer votre présence</div>
          </div>
        </div>
      </div>
      {/* Boutons d'action */}
      <div className="flex flex-col gap-2 ml-4">
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
          onClick={() => onShare(guest)}
          className="bg-purple-700 text-white px-4 py-2 rounded-lg font-semibold shadow hover:bg-purple-800 transition"
        >
          <Share2 className="h-5 w-5 inline mr-1" />Partager
        </button>
      </div>
    </div>
  );
};