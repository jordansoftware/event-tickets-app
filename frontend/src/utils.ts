import QRCode from 'qrcode';

export const generateId = (): string => {
  return Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
};

export const generateTicketId = (): string => {
  return 'TKT-' + Math.random().toString(36).substr(2, 6).toUpperCase() + '-' + Date.now().toString(36).substr(-4);
};

export const generateQRCode = async (data: string): Promise<string> => {
  try {
    const qrCodeDataURL = await QRCode.toDataURL(data, {
      width: 200,
      margin: 2,
      color: {
        dark: '#000000',
        light: '#FFFFFF'
      }
    });
    return qrCodeDataURL;
  } catch (error) {
    console.error('Erreur lors de la génération du QR code:', error);
    return '';
  }
};

export const downloadTicketAsImage = async (ticketElement: HTMLElement, guestName: string) => {
  const html2canvas = (await import('html2canvas')).default;
  const canvas = await html2canvas(ticketElement, {
    backgroundColor: '#ffffff',
    scale: 2,
    useCORS: true
  });
  
  const link = document.createElement('a');
  link.download = `ticket-${guestName.replace(/\s+/g, '-')}.png`;
  link.href = canvas.toDataURL();
  link.click();
};

export const downloadTicketAsPDF = async (ticketElement: HTMLElement, guestName: string) => {
  const html2canvas = (await import('html2canvas')).default;
  const jsPDF = (await import('jspdf')).default;
  
  const canvas = await html2canvas(ticketElement, {
    backgroundColor: '#ffffff',
    scale: 2,
    useCORS: true
  });
  
  const imgData = canvas.toDataURL('image/png');
  const pdf = new jsPDF('p', 'mm', 'a4');
  const imgWidth = 210;
  const pageHeight = 295;
  const imgHeight = (canvas.height * imgWidth) / canvas.width;
  let heightLeft = imgHeight;
  
  let position = 0;
  
  pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
  heightLeft -= pageHeight;
  
  while (heightLeft >= 0) {
    position = heightLeft - imgHeight;
    pdf.addPage();
    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;
  }
  
  pdf.save(`ticket-${guestName.replace(/\s+/g, '-')}.pdf`);
};

export const shareTicket = async (ticketElement: HTMLElement, guestName: string) => {
  const html2canvas = (await import('html2canvas')).default;
  const canvas = await html2canvas(ticketElement, {
    backgroundColor: '#ffffff',
    scale: 2,
    useCORS: true
  });
  
  const blob = await new Promise<Blob>((resolve) => {
    canvas.toBlob((blob) => {
      if (blob) resolve(blob);
    }, 'image/png');
  });
  
  const file = new File([blob], `ticket-${guestName}.png`, { type: 'image/png' });
  
  if (navigator.share && navigator.canShare({ files: [file] })) {
    try {
      await navigator.share({
        title: `Ticket pour ${guestName}`,
        text: `Voici votre ticket pour l'événement`,
        files: [file]
      });
    } catch (error) {
      console.error('Erreur lors du partage:', error);
    }
  } else {
    // Fallback pour les navigateurs qui ne supportent pas le partage de fichiers
    const link = document.createElement('a');
    link.download = `ticket-${guestName.replace(/\s+/g, '-')}.png`;
    link.href = canvas.toDataURL();
    link.click();
  }
}; 