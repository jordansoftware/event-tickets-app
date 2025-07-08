// Composant de scan de QR code pour valider les tickets (frontend)
import { useState, useRef, useEffect } from 'react';
import type { Guest } from '../types';
import { QrCode, CheckCircle, XCircle, Camera, RotateCcw } from 'lucide-react';
import { BrowserQRCodeReader } from '@zxing/browser';

interface QRScannerProps {
  onScanTicket: (ticketData: any) => void;
  guests: Guest[];
  active: boolean;
}

export const QRScanner = ({ onScanTicket, guests, active }: QRScannerProps) => {
  const [isScanning, setIsScanning] = useState(false);
  const [scannedData, setScannedData] = useState<any>(null);
  const [scanResult, setScanResult] = useState<'success' | 'error' | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const codeReaderRef = useRef<BrowserQRCodeReader | null>(null);

  useEffect(() => {
    return () => {
      stopScanning();
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (active) {
      setScannedData(null);
      setScanResult(null);
      setErrorMsg(null);
    }
  }, [active]);

  // Fonction pour démarrer un nouveau scan et réinitialiser tous les états
  const startScanning = async () => {
    setErrorMsg(null);
    setScannedData(null);
    setScanResult(null);
    setIsScanning(true);
    try {
      const codeReader = new BrowserQRCodeReader();
      codeReaderRef.current = codeReader;
      const videoInputDevices = await BrowserQRCodeReader.listVideoInputDevices();
      const deviceId = videoInputDevices[0]?.deviceId;
      if (!deviceId) throw new Error('Aucune caméra détectée');
      const previewElem = videoRef.current!;
      codeReader.decodeFromVideoDevice(deviceId, previewElem, (result, err, controls) => {
        if (result) {
          try {
            const data = JSON.parse(result.getText());
            setScannedData(data);
            setIsScanning(false);
            controls.stop();
            stopStream();
            // Vérifier si l'invité existe
            const guest = guests.find(g => g.ticketId === data.ticketId);
            if (guest) {
              setScanResult('success');
              onScanTicket(data);
            } else {
              setScanResult('error');
            }
          } catch (e) {
            setScanResult('error');
            setScannedData({ ticketId: 'QR non reconnu' });
          }
        }
        if (err && err.name !== 'NotFoundException') {
          setErrorMsg('Erreur de scan : ' + err.message);
        }
      });
    } catch (error: any) {
      setErrorMsg(error.message || 'Erreur inconnue');
      setIsScanning(false);
    }
  };

  const stopStream = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    if (codeReaderRef.current) {
      codeReaderRef.current = null;
    }
  };

  const stopScanning = () => {
    stopStream();
    setIsScanning(false);
  };

  const resetScanner = () => {
    setScannedData(null);
    setScanResult(null);
    setErrorMsg(null);
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
          {errorMsg && <div className="text-red-600 mt-4">{errorMsg}</div>}
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
        </div>
      )}

      {scannedData && scanResult && (
        <div className="mt-6">
          <div className={`p-4 rounded-lg ${scanResult === 'success' ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
            <div className="flex items-center mb-2">
              {scanResult === 'success' ? (
                <>
                  {/* Vérification du statut du ticket dans la base */}
                  {(() => {
                    const guest = guests.find(g => g.ticketId === scannedData.ticketId);
                    if (guest && guest.ticketStatus === 'Scanned') {
                      return <span className="text-yellow-700 font-bold">⚠️ Ce ticket a déjà été scanné.</span>;
                    }
                    return <CheckCircle className="h-5 w-5 text-green-500 mr-2" />;
                  })()}
                </>
              ) : (
                <XCircle className="h-5 w-5 text-red-500 mr-2" />
              )}
              <span className={`font-medium ${scanResult === 'success' ? 'text-green-800' : 'text-red-800'}`}>
                {scanResult === 'success'
                  ? (() => {
                      const guest = guests.find(g => g.ticketId === scannedData.ticketId);
                      if (guest && guest.ticketStatus === 'Scanned') {
                        return 'Ticket déjà scanné';
                      }
                      return 'Ticket valide';
                    })()
                  : 'Ticket invalide'}
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