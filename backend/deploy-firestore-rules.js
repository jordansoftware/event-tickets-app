const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Déploiement des règles Firestore...');

// Vérifier si firebase-tools est installé
try {
  execSync('firebase --version', { stdio: 'pipe' });
  console.log('✅ Firebase CLI détecté');
} catch (error) {
  console.log('❌ Firebase CLI non trouvé. Installation...');
  execSync('npm install -g firebase-tools', { stdio: 'inherit' });
}

// Vérifier si le projet est initialisé
if (!fs.existsSync('firebase.json')) {
  console.log('🔧 Initialisation du projet Firebase...');
  execSync('firebase init firestore --project YOUR_PROJECT_ID --yes', { stdio: 'inherit' });
}

// Déployer les règles
console.log('📤 Déploiement des règles Firestore...');
try {
  execSync('firebase deploy --only firestore:rules --project YOUR_PROJECT_ID', { stdio: 'inherit' });
  console.log('✅ Règles Firestore déployées avec succès !');
} catch (error) {
  console.error('❌ Erreur lors du déploiement:', error.message);
  console.log('💡 Vous pouvez aussi déployer manuellement avec:');
  console.log('   firebase deploy --only firestore:rules --project YOUR_PROJECT_ID');
} 