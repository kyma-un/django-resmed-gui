// src/components/Login.jsx
import React, { useState } from 'react';

// Para Google OAuth (usando @react-oauth/google)
import { GoogleLogin } from '@react-oauth/google';

function Login({ onLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Login tradicional
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch('/api/auth/login/', {  // Cambia URL según tu API
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      if (!res.ok) throw new Error('Credenciales inválidas');
      const data = await res.json();
      onLoginSuccess(data); // Por ejemplo guardar token y redirigir
    } catch (err) {
      setError(err.message);
    }
  };

  // Login con Google
  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      // Enviar token JWT que da Google al backend para validar y autenticar
      const res = await fetch('/api/auth/google-login/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: credentialResponse.credential }),
      });
      if (!res.ok) throw new Error('Error en login con Google');
      const data = await res.json();
      onLoginSuccess(data);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleError = () => {
    setError('Error al iniciar sesión con Google');
  };

  return (
    <div style={{ maxWidth: 400, margin: 'auto' }}>
      <h2>Iniciar Sesión</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Usuario:</label><br/>
          <input
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Contraseña:</label><br/>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Entrar</button>
      </form>

      <hr />

      <GoogleLogin
        onSuccess={handleGoogleSuccess}
        onError={handleGoogleError}
      />

      {error && <p style={{color: 'red'}}>{error}</p>}
    </div>
  );
}

export default Login;
