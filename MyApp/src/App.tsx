import { useState, useEffect } from 'react';
import type { Guest } from './types';
import { GuestForm } from './components/GuestForm';
import { GuestList } from './components/GuestList';
import { Ticket } from './components/Ticket';
import { QRScanner } from './components/QRScanner';
import { downloadTicketAsImage, downloadTicketAsPDF, shareTicket } from './utils';
import { loadDemoData, clearAllData } from './demo-data';
import { Users, QrCode, Ticket as TicketIcon, BarChart3, Database, Trash2 } from 'lucide-react';
import './App.css';

type TabType = 'guests' | 'tickets' | 'scanner' | 'stats';

function App() {
  const [guests, setGuests] = useState<Guest[]>([]);
  const [selectedGuest, setSelectedGuest] = useState<Guest | null>(null);
  const [activeTab, setActiveTab] = useState<TabType>('guests');

  // Charger les données depuis localStorage
  useEffect(() => {
    const savedGuests = localStorage.getItem('eventGuests');
    if (savedGuests) {
      setGuests(JSON.parse(savedGuests));
    }
  }, []);

  // Sauvegarder les données dans localStorage
  useEffect(() => {
    localStorage.setItem('eventGuests', JSON.stringify(guests));
  }, [guests]);

  const addGuest = (guest: Guest) => {
    setGuests(prev => [...prev, guest]);
    setSelectedGuest(guest);
    setActiveTab('tickets');
  };

  const updateGuestStatus = (guestId: string, status: 'Valid' | 'Scanned' | 'Invalid') => {
    setGuests(prev => prev.map(guest => 
      guest.id === guestId ? { ...guest, ticketStatus: status } : guest
    ));
  };

  const deleteGuest = (guestId: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet invité ?')) {
      setGuests(prev => prev.filter(guest => guest.id !== guestId));
      if (selectedGuest?.id === guestId) {
        setSelectedGuest(null);
      }
    }
  };

  const handleScanTicket = (ticketData: any) => {
    const guest = guests.find(g => g.id === ticketData.guestId);
    if (guest) {
      updateGuestStatus(guest.id, 'Scanned');
    }
  };

  const handleDownloadImage = async () => {
    if (selectedGuest) {
      const ticketElement = document.querySelector('[data-ticket]') as HTMLElement;
      if (ticketElement) {
        await downloadTicketAsImage(ticketElement, selectedGuest.fullName);
      }
    }
  };

  const handleDownloadPDF = async () => {
    if (selectedGuest) {
      const ticketElement = document.querySelector('[data-ticket]') as HTMLElement;
      if (ticketElement) {
        await downloadTicketAsPDF(ticketElement, selectedGuest.fullName);
      }
    }
  };

  const handleShare = async () => {
    if (selectedGuest) {
      const ticketElement = document.querySelector('[data-ticket]') as HTMLElement;
      if (ticketElement) {
        await shareTicket(ticketElement, selectedGuest.fullName);
      }
    }
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
        {activeTab === 'guests' && (
          <div className="space-y-6">
            <GuestForm onAddGuest={addGuest} />
            <GuestList 
              guests={guests}
              onUpdateGuestStatus={updateGuestStatus}
              onDeleteGuest={deleteGuest}
            />
          </div>
        )}

        {activeTab === 'tickets' && (
          <div className="space-y-6">
            {selectedGuest ? (
              <div data-ticket>
                <Ticket
                  guest={selectedGuest}
                  onDownloadImage={handleDownloadImage}
                  onDownloadPDF={handleDownloadPDF}
                  onShare={handleShare}
                />
              </div>
            ) : (
              <div className="text-center py-12">
                <TicketIcon className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                <h2 className="text-xl font-semibold text-gray-600 mb-2">Aucun ticket sélectionné</h2>
                <p className="text-gray-500">Ajoutez un invité pour générer un ticket</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'scanner' && (
          <QRScanner onScanTicket={handleScanTicket} guests={guests} />
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
                  <div className="text-gray-600 font-medium">Invités standard</div>
                </div>
              </div>

              {/* Graphique de progression */}
              <div className="mt-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Progression des scans</h3>
                <div className="bg-gray-200 rounded-full h-4">
                  <div 
                    className="bg-green-500 h-4 rounded-full transition-all duration-500"
                    style={{ width: `${stats.total > 0 ? (stats.scanned / stats.total) * 100 : 0}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-sm text-gray-600 mt-2">
                  <span>{stats.scanned} scannés</span>
                  <span>{Math.round(stats.total > 0 ? (stats.scanned / stats.total) * 100 : 0)}%</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white text-center py-4 mt-8">
        <p className="text-sm text-gray-400">
          © 2024 Gestionnaire d'Événement - Application mobile de gestion de tickets
        </p>
      </footer>
    </div>
  );
}

export default App;
