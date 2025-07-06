import React, { useState } from 'react';
import { Search, Filter, Crown, User, Phone, Hash, CheckCircle, Clock, XCircle, Trash2, Edit } from 'lucide-react';
import type { Guest } from '../types';

interface GuestListProps {
  guests: Guest[];
  onUpdateGuestStatus: (guestId: string, status: 'Valid' | 'Scanned' | 'Invalid') => void;
  onDeleteGuest: (guestId: string) => void;
}

export const GuestList = ({ guests, onUpdateGuestStatus, onDeleteGuest }: GuestListProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'Valid' | 'Scanned' | 'Invalid'>('all');
  const [typeFilter, setTypeFilter] = useState<'all' | 'VIP' | 'Standard'>('all');

  const filteredGuests = guests.filter(guest => {
    const matchesSearch = guest.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         guest.phoneNumber.includes(searchTerm) ||
                         guest.ticketId.includes(searchTerm);
    const matchesStatus = statusFilter === 'all' || guest.ticketStatus === statusFilter;
    const matchesType = typeFilter === 'all' || guest.status === typeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Valid':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'Scanned':
        return <Clock className="h-4 w-4 text-blue-500" />;
      case 'Invalid':
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Valid':
        return 'bg-green-100 text-green-800';
      case 'Scanned':
        return 'bg-blue-100 text-blue-800';
      case 'Invalid':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
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

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Liste des invités</h2>

      {/* Statistiques */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-6">
        <div className="bg-blue-50 p-3 rounded-lg text-center">
          <p className="text-2xl font-bold text-blue-600">{stats.total}</p>
          <p className="text-xs text-blue-600">Total</p>
        </div>
        <div className="bg-green-50 p-3 rounded-lg text-center">
          <p className="text-2xl font-bold text-green-600">{stats.valid}</p>
          <p className="text-xs text-green-600">Valides</p>
        </div>
        <div className="bg-blue-50 p-3 rounded-lg text-center">
          <p className="text-2xl font-bold text-blue-600">{stats.scanned}</p>
          <p className="text-xs text-blue-600">Scannés</p>
        </div>
        <div className="bg-red-50 p-3 rounded-lg text-center">
          <p className="text-2xl font-bold text-red-600">{stats.invalid}</p>
          <p className="text-xs text-red-600">Invalides</p>
        </div>
        <div className="bg-purple-50 p-3 rounded-lg text-center">
          <p className="text-2xl font-bold text-purple-600">{stats.vip}</p>
          <p className="text-xs text-purple-600">VIP</p>
        </div>
        <div className="bg-gray-50 p-3 rounded-lg text-center">
          <p className="text-2xl font-bold text-gray-600">{stats.standard}</p>
          <p className="text-xs text-gray-600">Standard</p>
        </div>
      </div>

      {/* Filtres */}
      <div className="mb-6 space-y-4">
        <div className="flex items-center space-x-2">
          <Search className="h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher par nom, téléphone ou ID ticket..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-gray-400" />
            <span className="text-sm text-gray-600">Statut:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="px-2 py-1 border border-gray-300 rounded text-sm"
            >
              <option value="all">Tous</option>
              <option value="Valid">Valides</option>
              <option value="Scanned">Scannés</option>
              <option value="Invalid">Invalides</option>
            </select>
          </div>

          <div className="flex items-center space-x-2">
            <Crown className="h-4 w-4 text-gray-400" />
            <span className="text-sm text-gray-600">Type:</span>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value as any)}
              className="px-2 py-1 border border-gray-300 rounded text-sm"
            >
              <option value="all">Tous</option>
              <option value="VIP">VIP</option>
              <option value="Standard">Standard</option>
            </select>
          </div>
        </div>
      </div>

      {/* Liste des invités */}
      <div className="space-y-4">
        {filteredGuests.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <User className="h-12 w-12 mx-auto mb-4 text-gray-300" />
            <p>Aucun invité trouvé</p>
          </div>
        ) : (
          filteredGuests.map(guest => (
            <div key={guest.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="font-semibold text-gray-800">{guest.fullName}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${guest.status === 'VIP' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'}`}>
                      {guest.status}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(guest.ticketStatus)}`}>
                      {guest.ticketStatus}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 mr-2" />
                      {guest.phoneNumber}
                    </div>
                    <div className="flex items-center">
                      <Hash className="h-4 w-4 mr-2" />
                      Table #{guest.tableNumber}
                    </div>
                    <div className="flex items-center">
                      <span className="font-mono text-xs">{guest.ticketId}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <select
                    value={guest.ticketStatus}
                    onChange={(e) => onUpdateGuestStatus(guest.id, e.target.value as 'Valid' | 'Scanned' | 'Invalid')}
                    className="px-2 py-1 border border-gray-300 rounded text-xs"
                  >
                    <option value="Valid">Valide</option>
                    <option value="Scanned">Scanné</option>
                    <option value="Invalid">Invalide</option>
                  </select>
                  
                  <button
                    onClick={() => onDeleteGuest(guest.id)}
                    className="p-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded"
                    title="Supprimer"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}; 