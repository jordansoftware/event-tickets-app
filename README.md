# 🎟️ Application de Gestion de Tickets et Invités pour Événements

**Une application React élégante et mobile-friendly pour simplifier la gestion des billets et des invités — avec codes QR, scan rapide, et bien plus !**

---

## ✨ Fonctionnalités

* 🔹 Génération de **codes QR uniques** pour chaque billet  
* 🔹 Scan des codes QR à l'entrée pour une **validation instantanée des billets**  
* 🔹 Gestion de la liste des invités avec un **statut en temps réel** : Valide | Scanné | Invalide  
* 🔹 Ajout manuel des invités — génération automatique de billets & codes QR  
* 🔹 Capture des informations détaillées des invités : **Nom, Téléphone, Numéro de table**  
* 🔹 Choix du statut de l'invité : **VIP** ou **Standard**  
* 🔹 Designs stylisés des billets avec le nom de l'invité et le code QR  
* 🔹 Partage des billets via **WhatsApp** en PDF/image ou téléchargement local  
* 🔹 Export des listes d'invités pour un reporting facile  
* 🔹 Historique des scans avec date et heure  
* 🔹 Authentification simple et sécurisée pour le personnel de l'événement  
* 🔹 Interface entièrement **responsive**, optimisée pour mobiles  

---

## 🛠️ Stack Technique

| Technologie             | Utilité                                      | Logo / Badge                                                                                  |
|------------------------|---------------------------------------------|----------------------------------------------------------------------------------------------|
| **React**              | Framework frontend                          | ![React](https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=black)               |
| **TypeScript**         | JavaScript typé                             | ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)|
| **Tailwind CSS**       | Styling moderne et utilitaire               | ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?logo=tailwind-css&logoColor=white) |
| **Firebase**           | Backend (authentification, base de données) | ![Firebase](https://img.shields.io/badge/Firebase-FFCA28?logo=firebase&logoColor=black)       |
| **qrcode.react**       | Génération des codes QR                     | ![QR Code](https://img.shields.io/badge/QRCode-000000?logo=qr-code&logoColor=white)           |
| **jsPDF**              | Export PDF                                  | ![jsPDF](https://img.shields.io/badge/jsPDF-FF0000?logo=javascript&logoColor=white)           |
| **html2canvas**        | Capture d’écran en canvas                    | ![HTML5](https://img.shields.io/badge/html5-E34F26?logo=html5&logoColor=white)                |
| **React Router**       | Navigation & routage                        | ![React Router](https://img.shields.io/badge/React_Router-CA4245?logo=react-router&logoColor=white) |

*Note : Lucia UI est utilisée pour les composants UI et l'authentification, mais n'a pas de badge officiel.*

---

## 🚀 Lancement du projet

git clone https://github.com/jordansoftware/event-tickets-app.git

# Navigate into project directory
cd event-tickets-app

# Install dependencies
npm install

# Create a .env file with your Firebase config

# Start the development server
npm run dev
