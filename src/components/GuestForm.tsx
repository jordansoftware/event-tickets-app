import { useState } from 'react';
import type { Guest } from '../types';
import { generateId, generateTicketId } from '../utils';
import { User, Phone, Hash, Crown, Users, Plus, Sparkles } from 'lucide-react';

interface GuestFormProps {
  onAddGuest: (guest: Guest) => void;
}

export const GuestForm = ({ onAddGuest }: GuestFormProps) => {
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    tableNumber: '',
    status: 'Standard' as 'VIP' | 'Standard'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.fullName || !formData.phoneNumber || !formData.tableNumber) {
      alert('Veuillez remplir tous les champs obligatoires');
      return;
    }

    setIsSubmitting(true);

    // Simuler un délai pour l'animation
    setTimeout(() => {
      const guest: Guest = {
        id: generateId(),
        fullName: formData.fullName,
        phoneNumber: formData.phoneNumber,
        tableNumber: parseInt(formData.tableNumber),
        status: formData.status,
        ticketId: generateTicketId(),
        ticketStatus: 'Valid',
        createdAt: new Date()
      };

      onAddGuest(guest);
      
      // Reset form
      setFormData({
        fullName: '',
        phoneNumber: '',
        tableNumber: '',
        status: 'Standard'
      });
      
      setIsSubmitting(false);
    }, 500);
  };

  return (
    <div className="bg-gradient-to-br from-white to-blue-50 rounded-2xl shadow-xl p-8 mb-8 border border-blue-100">
      {/* Header avec animation */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-4 shadow-lg">
          <Users className="h-8 w-8 text-white" />
        </div>
        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
          Ajouter un invité
        </h2>
        <p className="text-gray-600 text-sm">Remplissez les informations pour créer un ticket</p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Nom complet */}
        <div className="group">
          <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center">
            <div className="flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full mr-3">
              <User className="h-3 w-3 text-blue-600" />
            </div>
            Nom complet <span className="text-red-500 ml-1">*</span>
          </label>
          <div className="relative">
            <input
              type="text"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 bg-white shadow-sm"
              placeholder="Prénom Nom"
              required
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              <Sparkles className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
            </div>
          </div>
        </div>

        {/* Téléphone */}
        <div className="group">
          <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center">
            <div className="flex items-center justify-center w-6 h-6 bg-green-100 rounded-full mr-3">
              <Phone className="h-3 w-3 text-green-600" />
            </div>
            Numéro de téléphone <span className="text-red-500 ml-1">*</span>
          </label>
          <div className="relative">
            <input
              type="tel"
              value={formData.phoneNumber}
              onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
              className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all duration-300 bg-white shadow-sm"
              placeholder="+237 000 000 000"
              required
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              <Phone className="h-5 w-5 text-gray-400 group-focus-within:text-green-500 transition-colors" />
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="group">
          <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center">
            <div className="flex items-center justify-center w-6 h-6 bg-purple-100 rounded-full mr-3">
              <Hash className="h-3 w-3 text-purple-600" />
            </div>
            Numéro de table <span className="text-red-500 ml-1">*</span>
          </label>
          <div className="relative">
            <input
              type="number"
              value={formData.tableNumber}
              onChange={(e) => setFormData({ ...formData, tableNumber: e.target.value })}
              className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all duration-300 bg-white shadow-sm"
              placeholder="1"
              min="1"
              required
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              <Hash className="h-5 w-5 text-gray-400 group-focus-within:text-purple-500 transition-colors" />
            </div>
          </div>
        </div>

        {/* Statut */}
        <div className="group">
          <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center">
            <div className="flex items-center justify-center w-6 h-6 bg-yellow-100 rounded-full mr-3">
              <Crown className="h-3 w-3 text-yellow-600" />
            </div>
            Statut de l'invité
          </label>
          <div className="relative">
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value as 'VIP' | 'Standard' })}
              className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-yellow-500 focus:ring-4 focus:ring-yellow-100 transition-all duration-300 bg-white shadow-sm appearance-none cursor-pointer"
            >
              <option value="Standard">Standard</option>
              <option value="VIP">VIP</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <Crown className="h-5 w-5 text-gray-400 group-focus-within:text-yellow-500 transition-colors" />
            </div>
          </div>
        </div>

        {/* Bouton de soumission */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg ${
              isSubmitting 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white'
            }`}
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                Création en cours...
              </div>
            ) : (
              <div className="flex items-center justify-center">
                <Plus className="h-6 w-6 mr-2" />
                Ajouter l'invité
              </div>
            )}
          </button>
        </div>

        {/* Note d'information */}
        <div className="text-center pt-4">
          <p className="text-xs text-gray-500">
            <span className="text-red-500">*</span> Champs obligatoires
          </p>
        </div>
      </form>
    </div>
  );
}; 