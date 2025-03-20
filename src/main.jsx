import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import ContenedorPrincipal from './pages/ContenedorPrincipal'
import PaginaRegistroLogin from './pages/PaginaRegistroLogin'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ContenedorPrincipal></ContenedorPrincipal>
    <PaginaRegistroLogin></PaginaRegistroLogin> 
  </StrictMode>,
)
