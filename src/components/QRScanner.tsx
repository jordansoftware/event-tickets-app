import { useState, useRef } from 'react';
import type { Guest } from '../types';
import { QrCode, CheckCircle, XCircle, Camera, RotateCcw } from 'lucide-react';

interface QRScannerProps {
  onScanTicket: (ticketData: any) => void;
  guests: Guest[];
}

export const QRScanner = ({ onScanTicket, guests }: QRScannerProps) => {
  const [isScanning, setIsScanning] = useState(false);
  const [scannedData, setScannedData] = useState<any>(null);
  const [scanResult, setScanResult] = useState<'success' | 'error' | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const startScanning = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsScanning(true);
        setScanResult(null);
        setScannedData(null);
      }
    } catch (error) {
      console.error('Erreur lors de l\'accès à la caméra:', error);
      alert('Impossible d\'accéder à la caméra');
    }
  };

  const stopScanning = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    setIsScanning(false);
  };

  // Fonction pour simuler un scan (à remplacer par une vraie implémentation)
  const simulateScan = () => {
    // Simulation d'un scan réussi pour démonstration
    const mockTicketData = {
      ticketId: 'TKT-DEMO-1234',
      guestId: guests[0]?.id || 'demo-id',
      guestName: guests[0]?.fullName || 'Invité Démo',
      tableNumber: guests[0]?.tableNumber || 1,
      status: guests[0]?.status || 'Standard'
    };
    
    setScannedData(mockTicketData);
    
    const guest = guests.find(g => g.id === mockTicketData.guestId);
    if (guest) {
      setScanResult('success');
      onScanTicket(mockTicketData);
    } else {
      setScanResult('error');
    }
    
    stopScanning();
  };

  const resetScanner = () => {
    setScannedData(null);
    setScanResult(null);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
        <QrCode className="mr-2" />
        Scanner de tickets
      </h2>

      {!isScanning && !scannedData && (
        <div className="text-center py-8">
          <Camera className="h-16 w-16 mx-auto mb-4 text-gray-400" />
          <p className="text-gray-600 mb-4">Scannez un QR code pour valider un ticket</p>
          <button
            onClick={startScanning}
            className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors"
          >
            Démarrer le scan
          </button>
        </div>
      )}

      {isScanning && (
        <div className="relative">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            className="w-full h-64 bg-gray-900 rounded-lg"
          />
          <canvas
            ref={canvasRef}
            className="hidden"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="border-2 border-white rounded-lg w-48 h-48 relative">
              <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-blue-500"></div>
              <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-blue-500"></div>
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-blue-500"></div>
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-blue-500"></div>
            </div>
          </div>
          <button
            onClick={stopScanning}
            className="absolute top-4 right-4 bg-red-600 text-white p-2 rounded-full hover:bg-red-700"
          >
            <XCircle className="h-5 w-5" />
          </button>
          <button
            onClick={simulateScan}
            className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            Simuler un scan
          </button>
        </div>
      )}

      {scannedData && (
        <div className="mt-6">
          <div className={`p-4 rounded-lg ${scanResult === 'success' ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
            <div className="flex items-center mb-2">
              {scanResult === 'success' ? (
                <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
              ) : (
                <XCircle className="h-5 w-5 text-red-500 mr-2" />
              )}
              <span className={`font-medium ${scanResult === 'success' ? 'text-green-800' : 'text-red-800'}`}>
                {scanResult === 'success' ? 'Ticket valide' : 'Ticket invalide'}
              </span>
            </div>
            
            <div className="space-y-2 text-sm">
              <p><strong>Nom:</strong> {scannedData.guestName}</p>
              <p><strong>Table:</strong> #{scannedData.tableNumber}</p>
              <p><strong>Statut:</strong> {scannedData.status}</p>
              <p><strong>ID Ticket:</strong> {scannedData.ticketId}</p>
            </div>
          </div>
          
          <div className="flex space-x-2 mt-4">
            <button
              onClick={resetScanner}
              className="flex-1 bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700 transition-colors flex items-center justify-center"
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              Nouveau scan
            </button>
            <button
              onClick={startScanning}
              className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center"
            >
              <Camera className="h-4 w-4 mr-2" />
              Scanner à nouveau
            </button>
          </div>
        </div>
      )}

      {/* Instructions */}
      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <h3 className="font-medium text-blue-800 mb-2">Instructions:</h3>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• Placez le QR code dans le cadre de scan</li>
          <li>• Le ticket sera automatiquement validé</li>
          <li>• Les tickets invalides seront marqués en rouge</li>
        </ul>
      </div>
    </div>
  );
}; 