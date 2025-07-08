import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// Point d'entrée principal de l'application React (frontend)
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
