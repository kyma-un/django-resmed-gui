import React, { useState } from 'react';

function AdminCrearDoctor() {
  const [email, setEmail] = useState('');
  const [nombre, setNombre] = useState('');
  const [mensaje, setMensaje] = useState(null);
  const [error, setError] = useState(null);

  const token = localStorage.getItem('token'); // Ajusta según cómo guardes el token

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje(null);
    setError(null);

    try {
      const res = await fetch('http://localhost:8000/api/crear-doctor/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // o la cabecera que uses para auth
        },
        body: JSON.stringify({ email, nombre }),
      });

      const data = await res.json();

      if (res.ok) {
        setMensaje(data.message);
        setEmail('');
        setNombre('');
      } else {
        setError(data.error || 'Error desconocido');
      }
    } catch (err) {
      setError('Error en la conexión con el servidor');
    }
  };

  return (
    <div className="container mt-4">
      <h2>Crear nuevo Doctor</h2>
      <form onSubmit={handleSubmit} className="mt-3">
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            required
            className="form-control"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="doctor@example.com"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Nombre</label>
          <input
            type="text"
            className="form-control"
            value={nombre}
            onChange={e => setNombre(e.target.value)}
            placeholder="Dr. Juan Pérez"
          />
        </div>
        <button type="submit" className="btn btn-primary">Crear Doctor</button>
      </form>

      {mensaje && <div className="alert alert-success mt-3">{mensaje}</div>}
      {error && <div className="alert alert-danger mt-3">{error}</div>}
    </div>
  );
}

export default AdminCrearDoctor;
