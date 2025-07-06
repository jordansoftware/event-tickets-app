import React, { useState, useEffect } from 'react';
import { Users, TicketIcon, QrCode, BarChart3 } from 'lucide-react';
import { GuestForm } from './components/GuestForm';
import { GuestList } from './components/GuestList';
import { Ticket } from './components/Ticket';
import { QRScanner } from './components/QRScanner';
import type { Guest } from './types';
import { guestService } from './services/guestService';
import { downloadAsImage, downloadAsPDF, shareTicket } from './utils/ticketUtils';

type TabType = 'guests' | 'tickets' | 'scanner' | 'stats';

function App() {
  const [guests, setGuests] = useState<Guest[]>([]);
  const [activeTab, setActiveTab] = useState<TabType>('guests');
  const [loading, setLoading] = useState(true);
  const [showTicketModal, setShowTicketModal] = useState(false);
  const [newGuest, setNewGuest] = useState<Guest | null>(null);

  useEffect(() => {
    loadGuests();
  }, []);

  const loadGuests = async () => {
    try {
      setLoading(true);
      console.log('🔄 Début du chargement des invités...');
      
      // Timeout de 10 secondes pour Firebase
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Timeout de chargement Firebase')), 10000);
      });
      
      const loadPromise = guestService.getAllGuests();
      const loadedGuests = await Promise.race([loadPromise, timeoutPromise]) as Guest[];
      
      console.log('✅ Chargement réussi:', loadedGuests.length, 'invités');
      setGuests(loadedGuests);
    } catch (error: any) {
      console.error('❌ Erreur lors du chargement des invités:', error);
      
      // Afficher des détails sur l'erreur
      let errorMessage = '⚠️ Impossible de se connecter à Firebase.\n\n';
      
      if (error?.code === 'permission-denied') {
        errorMessage += '🔒 Erreur de permissions Firestore.\n';
        errorMessage += 'Les règles de sécurité bloquent l\'accès.\n\n';
        errorMessage += '💡 Solution: Déployez les règles Firestore avec:\n';
        errorMessage += 'firebase deploy --only firestore:rules --project myapp-5d335';
      } else if (error?.code === 'unavailable') {
        errorMessage += '🌐 Erreur de connexion réseau.\n';
        errorMessage += 'Vérifiez votre connexion internet.';
      } else if (error?.message?.includes('Timeout')) {
        errorMessage += '⏰ Timeout de connexion.\n';
        errorMessage += 'Firebase prend trop de temps à répondre.';
      } else {
        errorMessage += `Erreur: ${error?.message || 'Erreur inconnue'}`;
      }
      
      alert(errorMessage);
      setGuests([]);
    } finally {
      setLoading(false);
    }
  };

  const handleAddGuest = async (guestData: {
    fullName: string;
    phoneNumber: string;
    tableNumber: string;
    status: 'VIP' | 'Standard';
  }) => {
    try {
      console.log('handleAddGuest appelé avec:', guestData);
      const newGuest = await guestService.addGuest(guestData);
      console.log('Nouvel invité créé:', newGuest);
      setGuests(prev => [...prev, newGuest]);
      console.log('Liste des invités mise à jour');
      
      // Afficher le ticket généré
      setNewGuest(newGuest);
      setShowTicketModal(true);
    } catch (error) {
      console.error('Erreur lors de l\'ajout de l\'invité:', error);
      alert('Erreur lors de l\'ajout de l\'invité. Vérifiez votre connexion internet.');
    }
  };

  const handleUpdateGuestStatus = async (guestId: string, ticketStatus: 'Valid' | 'Scanned' | 'Invalid') => {
    try {
      await guestService.updateGuestStatus(guestId, ticketStatus);
      setGuests(prev => prev.map(guest => 
        guest.id === guestId ? { ...guest, ticketStatus } : guest
      ));
    } catch (error) {
      console.error('Erreur lors de la mise à jour du statut:', error);
    }
  };

  const handleDeleteGuest = async (guestId: string) => {
    try {
      await guestService.deleteGuest(guestId);
      setGuests(prev => prev.filter(guest => guest.id !== guestId));
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'invité:', error);
    }
  };

  const handleScanQR = async (ticketData: any) => {
    try {
      const guest = guests.find(g => g.ticketId === ticketData.ticketId);
      
      if (guest) {
        if (guest.ticketStatus === 'Valid') {
          await handleUpdateGuestStatus(guest.id, 'Scanned');
          alert(`✅ Invité ${guest.fullName} validé avec succès !`);
        } else if (guest.ticketStatus === 'Scanned') {
          alert(`⚠️ Le ticket de ${guest.fullName} a déjà été scanné.`);
        } else {
          alert(`❌ Le ticket de ${guest.fullName} est invalide.`);
        }
      } else {
        alert('❌ Ticket non trouvé dans la base de données.');
      }
    } catch (error) {
      alert('❌ Erreur lors du scan du QR code.');
    }
  };

  const handleDownloadImage = (ticketRef: React.RefObject<HTMLDivElement>, guest: Guest) => {
    downloadAsImage(ticketRef, guest);
  };

  const handleDownloadPDF = (ticketRef: React.RefObject<HTMLDivElement>, guest: Guest) => {
    downloadAsPDF(ticketRef, guest);
  };

  const handleShare = (guest: Guest) => {
    shareTicket(guest);
  };

  const stats = {
    total: guests.length,
    valid: guests.filter(g => g.ticketStatus === 'Valid').length,
    scanned: guests.filter(g => g.ticketStatus === 'Scanned').length,
    invalid: guests.filter(g => g.ticketStatus === 'Invalid').length,
    vip: guests.filter(g => g.status === 'VIP').length,
    standard: guests.filter(g => g.status === 'Standard').length
  };

  const tabs = [
    { id: 'guests', label: 'Invités', icon: Users },
    { id: 'tickets', label: 'Tickets', icon: TicketIcon },
    { id: 'scanner', label: 'Scanner', icon: QrCode },
    { id: 'stats', label: 'Statistiques', icon: BarChart3 }
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 shadow-lg">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold text-center">🎫 Gestionnaire d'Événement</h1>
          <p className="text-center text-blue-100 mt-1">Gestion des tickets et invités</p>
        </div>
      </header>

      {/* Navigation tabs */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto">
          <div className="flex overflow-x-auto">
            {tabs.map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as TabType)}
                  className={`flex items-center space-x-2 px-4 py-3 whitespace-nowrap transition-colors ${
                    activeTab === tab.id
                      ? 'text-blue-600 border-b-2 border-blue-600'
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Main content */}
      <main className="max-w-4xl mx-auto p-4">
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-200 border-t-blue-600 mx-auto mb-4"></div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Connexion à la base de données...</h3>
            <p className="text-gray-600 mb-4">Chargement des invités en cours</p>
            <div className="flex justify-center space-x-2">
              <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
              <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
            </div>
            <p className="text-xs text-gray-500 mt-4">Si le chargement prend trop de temps, vérifiez votre connexion internet</p>
          </div>
        ) : (
          <>
            {activeTab === 'guests' && (
              <div className="space-y-6">
                <GuestForm onAddGuest={handleAddGuest} />
                <GuestList 
                  guests={guests} 
                  onUpdateGuestStatus={handleUpdateGuestStatus}
                  onDeleteGuest={handleDeleteGuest}
                />
              </div>
            )}

            {activeTab === 'tickets' && (
              <div className="space-y-6">
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                    <TicketIcon className="mr-2" />
                    Tickets des invités
                  </h2>
                  {guests.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      <TicketIcon className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                      <p>Aucun invité enregistré</p>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {guests.map(guest => (
                        <Ticket
                          key={guest.id}
                          guest={guest}
                          onDownloadImage={handleDownloadImage}
                          onDownloadPDF={handleDownloadPDF}
                          onShare={handleShare}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'scanner' && (
              <QRScanner onScanTicket={handleScanQR} guests={guests} />
            )}

            {activeTab === 'stats' && (
              <div className="space-y-6">
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                    <BarChart3 className="mr-2" />
                    Statistiques de l'événement
                  </h2>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                    <div className="bg-blue-50 p-6 rounded-lg text-center">
                      <div className="text-3xl font-bold text-blue-600 mb-2">{stats.total}</div>
                      <div className="text-blue-600 font-medium">Total invités</div>
                    </div>

                    <div className="bg-green-50 p-6 rounded-lg text-center">
                      <div className="text-3xl font-bold text-green-600 mb-2">{stats.valid}</div>
                      <div className="text-green-600 font-medium">Tickets valides</div>
                    </div>

                    <div className="bg-blue-50 p-6 rounded-lg text-center">
                      <div className="text-3xl font-bold text-blue-600 mb-2">{stats.scanned}</div>
                      <div className="text-blue-600 font-medium">Tickets scannés</div>
                    </div>

                    <div className="bg-red-50 p-6 rounded-lg text-center">
                      <div className="text-3xl font-bold text-red-600 mb-2">{stats.invalid}</div>
                      <div className="text-red-600 font-medium">Tickets invalides</div>
                    </div>

                    <div className="bg-purple-50 p-6 rounded-lg text-center">
                      <div className="text-3xl font-bold text-purple-600 mb-2">{stats.vip}</div>
                      <div className="text-purple-600 font-medium">Invités VIP</div>
                    </div>

                    <div className="bg-gray-50 p-6 rounded-lg text-center">
                      <div className="text-3xl font-bold text-gray-600 mb-2">{stats.standard}</div>
                      <div className="text-gray-600 font-medium">Invités Standard</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </main>

      {/* Modal du ticket généré */}
      {showTicketModal && newGuest && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-800">🎫 Ticket généré avec succès !</h3>
                <button
                  onClick={() => setShowTicketModal(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="mb-6">
                <Ticket
                  guest={newGuest}
                  onDownloadImage={handleDownloadImage}
                  onDownloadPDF={handleDownloadPDF}
                  onShare={handleShare}
                />
              </div>
              
              <div className="flex gap-3">
                <button
                  onClick={() => setShowTicketModal(false)}
                  className="flex-1 py-3 px-4 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                >
                  Fermer
                </button>
                <button
                  onClick={() => {
                    setActiveTab('tickets');
                    setShowTicketModal(false);
                  }}
                  className="flex-1 py-3 px-4 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  Voir tous les tickets
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
