import { useEffect, useRef, useState } from 'react';
import type { Guest } from '../types';
import { generateQRCode } from '../utils';
import { Download, Share2, QrCode, Crown, Hash, User, Heart, Sparkles } from 'lucide-react';

interface TicketProps {
  guest: Guest;
  onDownloadImage: () => void;
  onDownloadPDF: () => void;
  onShare: () => void;
}

export const Ticket = ({ guest, onDownloadImage, onDownloadPDF, onShare }: TicketProps) => {
  const [qrCode, setQrCode] = useState<string>('');
  const ticketRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'VIP':
        return 'bg-gradient-to-r from-rose-400 to-pink-500';
      case 'Standard':
        return 'bg-gradient-to-r from-purple-400 to-indigo-500';
      default:
        return 'bg-gradient-to-r from-rose-400 to-pink-500';
    }
  };

  const getTicketStatusColor = (status: string) => {
    switch (status) {
      case 'Valid':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'Scanned':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Invalid':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="bg-gradient-to-br from-rose-50 to-pink-50 rounded-3xl shadow-2xl p-8 mb-8 border border-rose-200">
      <div 
        ref={ticketRef}
        className="relative overflow-hidden rounded-2xl border-2 border-rose-200 bg-gradient-to-br from-white to-rose-50"
        style={{ minHeight: '450px' }}
      >
        {/* Header avec thème mariage */}
        <div className={`${getStatusColor(guest.status)} text-white p-6 text-center relative overflow-hidden`}>
          {/* Éléments décoratifs */}
          <div className="absolute top-2 left-2 opacity-20">
            <Heart className="h-8 w-8" />
          </div>
          <div className="absolute top-2 right-2 opacity-20">
            <Sparkles className="h-8 w-8" />
          </div>
          <div className="absolute bottom-2 left-4 opacity-20">
            <Sparkles className="h-6 w-6" />
          </div>
          <div className="absolute bottom-2 right-4 opacity-20">
            <Heart className="h-6 w-6" />
          </div>
          
          <div className="flex items-center justify-center mb-3">
            <Heart className="mr-3 h-7 w-7" />
            <h2 className="text-2xl font-bold font-serif">INVITATION MARIAGE</h2>
            <Heart className="ml-3 h-7 w-7" />
          </div>
          <p className="text-sm opacity-90 font-medium">Cérémonie & Réception</p>
          <div className="mt-2 text-xs opacity-75">
            {guest.status === 'VIP' ? 'Invité d\'Honneur' : 'Invité Privilégié'}
          </div>
        </div>

        {/* Contenu principal */}
        <div className="p-8">
          {/* Informations de l'invité avec style mariage */}
          <div className="space-y-5 mb-6">
            <div className="flex items-center bg-gradient-to-r from-rose-50 to-pink-50 p-4 rounded-xl border border-rose-100">
              <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-rose-400 to-pink-500 rounded-full mr-4">
                <User className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-xs text-rose-600 font-medium uppercase tracking-wide">Nom de l'invité</p>
                <p className="font-serif text-lg text-gray-800 font-semibold">{guest.fullName}</p>
              </div>
            </div>

            <div className="flex items-center bg-gradient-to-r from-purple-50 to-indigo-50 p-4 rounded-xl border border-purple-100">
              <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-purple-400 to-indigo-500 rounded-full mr-4">
                <Hash className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-xs text-purple-600 font-medium uppercase tracking-wide">Table</p>
                <p className="font-serif text-lg text-gray-800 font-semibold">#{guest.tableNumber}</p>
              </div>
            </div>

            <div className="flex items-center bg-gradient-to-r from-amber-50 to-yellow-50 p-4 rounded-xl border border-amber-100">
              <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-amber-400 to-yellow-500 rounded-full mr-4">
                <Crown className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-xs text-amber-600 font-medium uppercase tracking-wide">Statut</p>
                <div className="flex items-center">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium border ${
                    guest.status === 'VIP' 
                      ? 'bg-gradient-to-r from-rose-100 to-pink-100 text-rose-800 border-rose-200' 
                      : 'bg-gradient-to-r from-purple-100 to-indigo-100 text-purple-800 border-purple-200'
                  }`}>
                    {guest.status === 'VIP' ? '💎 VIP' : '✨ Standard'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* QR Code avec style mariage */}
          <div className="text-center mb-6">
            <div className="inline-block p-6 bg-gradient-to-br from-white to-rose-50 rounded-2xl border-2 border-rose-200 shadow-lg">
              {qrCode ? (
                <img src={qrCode} alt="QR Code" className="w-36 h-36" />
              ) : (
                <div className="w-36 h-36 bg-gradient-to-br from-rose-100 to-pink-100 rounded-xl flex items-center justify-center border-2 border-rose-200">
                  <QrCode className="h-12 w-12 text-rose-400" />
                </div>
              )}
            </div>
            <p className="text-xs text-rose-600 mt-3 font-medium">Scannez pour confirmer votre présence</p>
          </div>

          {/* Numéro de ticket avec style élégant */}
          <div className="text-center bg-gradient-to-r from-gray-50 to-rose-50 p-4 rounded-xl border border-gray-200">
            <p className="text-xs text-gray-500 font-medium uppercase tracking-wide mb-1">Numéro d'invitation</p>
            <p className="font-mono text-sm text-gray-700 font-semibold">{guest.ticketId}</p>
          </div>

          {/* Statut du ticket */}
          <div className="absolute top-6 right-6">
            <span className={`px-3 py-2 rounded-full text-xs font-medium border ${getTicketStatusColor(guest.ticketStatus)}`}>
              {guest.ticketStatus === 'Valid' ? '✅ Valide' : 
               guest.ticketStatus === 'Scanned' ? '🎉 Présent' : '❌ Invalide'}
            </span>
          </div>
        </div>

        {/* Filigrane décoratif */}
        <div className="absolute inset-0 pointer-events-none opacity-5">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <Heart className="h-64 w-64 text-rose-400" />
          </div>
        </div>

        {/* Éléments décoratifs supplémentaires */}
        <div className="absolute top-4 left-4 opacity-10">
          <Sparkles className="h-6 w-6 text-rose-400" />
        </div>
        <div className="absolute bottom-4 right-4 opacity-10">
          <Heart className="h-6 w-6 text-pink-400" />
        </div>
      </div>

      {/* Boutons d'action avec style mariage */}
      <div className="flex space-x-3 mt-6">
        <button
          onClick={onDownloadImage}
          className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-600 text-white py-3 px-4 rounded-xl hover:from-emerald-600 hover:to-teal-700 transition-all duration-300 flex items-center justify-center font-medium shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          <Download className="h-5 w-5 mr-2" />
          Télécharger
        </button>
        <button
          onClick={onDownloadPDF}
          className="flex-1 bg-gradient-to-r from-rose-500 to-pink-600 text-white py-3 px-4 rounded-xl hover:from-rose-600 hover:to-pink-700 transition-all duration-300 flex items-center justify-center font-medium shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          <Download className="h-5 w-5 mr-2" />
          PDF
        </button>
        <button
          onClick={onShare}
          className="flex-1 bg-gradient-to-r from-purple-500 to-indigo-600 text-white py-3 px-4 rounded-xl hover:from-purple-600 hover:to-indigo-700 transition-all duration-300 flex items-center justify-center font-medium shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          <Share2 className="h-5 w-5 mr-2" />
          Partager
        </button>
      </div>
    </div>
  );
};