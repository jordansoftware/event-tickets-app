import domtoimage from 'dom-to-image-more';
import jsPDF from 'jspdf';
import type { Guest } from '../types';

// Fonction utilitaire pour nettoyer le nom
function cleanFileName(name: string) {
  return name.replace(/[^a-zA-Z0-9]/g, '_');
}

// Télécharger le ticket en tant qu'image
export const downloadAsImage = async (ticketRef: React.RefObject<HTMLDivElement>, guest?: Guest) => {
  if (!ticketRef.current) return;

  try {
    // Attendre 500ms pour s'assurer que le QR code est bien peint
    await new Promise(resolve => setTimeout(resolve, 500));
    console.log('Contenu du ticket juste avant capture:', ticketRef.current.innerHTML);
    const dataUrl = await domtoimage.toPng(ticketRef.current, {
      bgcolor: '#ffffff',
      cacheBust: true
    });
    const link = document.createElement('a');
    const fileName = guest ? `Billet_${cleanFileName(guest.fullName)}.png` : `Billet.png`;
    link.download = fileName;
    link.href = dataUrl;
    link.click();
  } catch (error) {
    console.error('Erreur lors du téléchargement de l\'image:', error);
    alert('Erreur lors du téléchargement de l\'image');
  }
};

// Télécharger le ticket en tant que PDF
export const downloadAsPDF = async (ticketRef: React.RefObject<HTMLDivElement>, guest?: Guest) => {
  if (!ticketRef.current) return;

  try {
    // Attendre 500ms pour s'assurer que le QR code est bien peint
    await new Promise(resolve => setTimeout(resolve, 500));
    const dataUrl = await domtoimage.toPng(ticketRef.current, {
      bgcolor: '#ffffff',
      cacheBust: true
    });
    const pdf = new jsPDF('p', 'mm', 'a4');
    // Calculer la taille de l'image pour l'adapter à la largeur de la page
    const imgProps = pdf.getImageProperties(dataUrl);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    pdf.addImage(dataUrl, 'PNG', 0, 0, pdfWidth, pdfHeight);
    const fileName = guest ? `Billet_${cleanFileName(guest.fullName)}.pdf` : `Billet.pdf`;
    pdf.save(fileName);
  } catch (error) {
    console.error('Erreur lors du téléchargement du PDF:', error);
    alert('Erreur lors du téléchargement du PDF');
  }
};

// Partager le ticket
export const shareTicket = async (guest: Guest) => {
  try {
    if (navigator.share) {
      await navigator.share({
        title: `Ticket de ${guest.fullName}`,
        text: `Ticket pour ${guest.fullName} - Table ${guest.tableNumber}`,
        url: window.location.href
      });
    } else {
      // Fallback pour les navigateurs qui ne supportent pas l'API Share
      const shareText = `Ticket de ${guest.fullName}\nTable: ${guest.tableNumber}\nStatut: ${guest.status}\nID: ${guest.ticketId}`;
      
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(shareText);
        alert('Informations du ticket copiées dans le presse-papiers !');
      } else {
        // Fallback pour les navigateurs plus anciens
        const textArea = document.createElement('textarea');
        textArea.value = shareText;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        alert('Informations du ticket copiées dans le presse-papiers !');
      }
    }
  } catch (error) {
    console.error('Erreur lors du partage:', error);
    alert('Erreur lors du partage du ticket');
  }
}; 