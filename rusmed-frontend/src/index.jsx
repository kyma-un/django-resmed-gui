import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthProvider } from './context/AuthContext';  // Importa el contexto

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider> {/* 👈 Aquí envuelves toda tu app */}
      <App />
    </AuthProvider>
  </React.StrictMode>
);
