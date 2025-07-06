import React, { useState } from 'react';
import { User, Hash, Crown, Plus } from 'lucide-react';

interface GuestFormProps {
  onAddGuest: (guestData: {
    fullName: string;
    tableNumber: string;
    status: 'VIP' | 'Standard';
  }) => void;
}

export const GuestForm = ({ onAddGuest }: GuestFormProps) => {
  const [formData, setFormData] = useState({
    fullName: '',
    tableNumber: '',
    status: 'Standard' as 'VIP' | 'Standard'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Formulaire soumis avec les données:', formData);
    
    if (formData.fullName && formData.tableNumber) {
      setIsSubmitting(true);
      try {
        console.log('Données valides, appel de onAddGuest...');
        await onAddGuest(formData);
        setFormData({
          fullName: '',
          tableNumber: '',
          status: 'Standard'
        });
        console.log('Formulaire réinitialisé');
      } catch (error) {
        console.error('Erreur lors de la soumission:', error);
      } finally {
        setIsSubmitting(false);
      }
    } else {
      console.log('Données invalides:', {
        fullName: !!formData.fullName,
        tableNumber: !!formData.tableNumber
      });
      alert('Veuillez remplir tous les champs obligatoires');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
        <Plus className="mr-2" />
        Ajouter un invité
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Nom complet */}
        <div className="group">
          <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center">
            <div className="flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full mr-3">
              <User className="h-3 w-3 text-blue-600" />
            </div>
            Nom complet
          </label>
          <input
            type="text"
            value={formData.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 bg-white shadow-sm"
            placeholder="Prénom et nom"
            required
          />
        </div>



        {/* Numéro de table */}
        <div className="group">
          <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center">
            <div className="flex items-center justify-center w-6 h-6 bg-purple-100 rounded-full mr-3">
              <Hash className="h-3 w-3 text-purple-600" />
            </div>
            Numéro de table
          </label>
          <input
            type="text"
            value={formData.tableNumber}
            onChange={(e) => setFormData({ ...formData, tableNumber: e.target.value })}
            className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all duration-300 bg-white shadow-sm"
            placeholder="Table 1"
            required
          />
        </div>

        {/* Statut de l'invité */}
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
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-4 px-6 rounded-xl font-semibold transition-all duration-300 transform shadow-lg flex items-center justify-center gap-2 ${
            isSubmitting
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 hover:-translate-y-1 hover:shadow-xl'
          }`}
        >
          {isSubmitting ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              Ajout en cours...
            </>
          ) : (
            <>
              <Plus className="h-5 w-5" />
              Ajouter l'invité
            </>
          )}
        </button>
      </form>
    </div>
  );
}; 