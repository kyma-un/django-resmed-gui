import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext.jsx'  // importa tu proveedor

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider> {/* envuelve aquí */}
      <App />
    </AuthProvider>
  </StrictMode>,
)
