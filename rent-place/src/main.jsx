import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import ContenedorPrincipal from './pages/ContenedorPrincipal'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ContenedorPrincipal></ContenedorPrincipal>
  </StrictMode>,
)
