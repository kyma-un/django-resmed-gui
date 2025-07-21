import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import LiveStream from '../components/common/LiveStream';

const ExamenView = () => {
  const { citaId } = useParams();
  const navigate = useNavigate();
  const [cita, setCita] = useState(null);
  const [examenIniciado, setExamenIniciado] = useState(false);
  const [velocidad, setVelocidad] = useState(50);
  const [profundidad, setProfundidad] = useState(50);
  const [diagnostico, setDiagnostico] = useState('');

  useEffect(() => {
    axios.get(`/api/citas/${citaId}/`)
      .then(res => setCita(res.data))
      .catch(err => console.error(err));
  }, [citaId]);

  const handleIniciarExamen = () => {
    setExamenIniciado(true);
  };

  const handleFinalizarExamen = () => {
    axios.post('/api/examenes/', {
      cita: citaId,
      velocidad,
      profundidad,
      diagnostico,
    }).then(() => {
      navigate('/historial');
    }).catch(err => console.error(err));
  };

  if (!cita) return <div>Cargando cita...</div>;

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Examen para {cita.paciente_nombre}</h2>

      <div className="mb-4 p-4 rounded-xl shadow bg-white">
        <p><strong>Doctor:</strong> {cita.doctor_nombre}</p>
        <p><strong>Fecha:</strong> {cita.fecha}</p>
        <p><strong>Hora:</strong> {cita.hora}</p>
        <p><strong>Examen:</strong> {cita.tipo_examen}</p>
      </div>

      {!examenIniciado ? (
        <button
          onClick={handleIniciarExamen}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl shadow"
        >
          Iniciar Examen
        </button>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {/* Cámara en Vivo */}
          <div className="rounded-xl overflow-hidden shadow">
            <h3 className="text-xl font-semibold mb-2">Vista en Vivo</h3>
            <LiveStream streamUrl="http://localhost:8000/stream.mjpg" />
          </div>

          {/* Controles del Examen */}
          <div className="p-4 bg-white shadow rounded-xl">
            <h3 className="text-xl font-semibold mb-4">Controles</h3>

            <div className="mb-4">
              <label className="block font-medium mb-1">Velocidad</label>
              <input
                type="range"
                min={0}
                max={100}
                value={velocidad}
                onChange={(e) => setVelocidad(Number(e.target.value))}
                className="w-full"
              />
            </div>

            <div className="mb-4">
              <label className="block font-medium mb-1">Profundidad</label>
              <input
                type="range"
                min={0}
                max={100}
                value={profundidad}
                onChange={(e) => setProfundidad(Number(e.target.value))}
                className="w-full"
              />
            </div>

            <div className="flex gap-4 mb-4">
              <button className="bg-green-600 text-white px-4 py-2 rounded-xl">▶️ Play</button>
              <button className="bg-red-600 text-white px-4 py-2 rounded-xl">⏸️ Pausa</button>
            </div>

            <div className="mb-4">
              <label className="block font-medium mb-1">Diagnóstico</label>
              <textarea
                rows={4}
                value={diagnostico}
                onChange={(e) => setDiagnostico(e.target.value)}
                className="w-full p-2 border rounded-xl"
                placeholder="Escribe el diagnóstico..."
              />
            </div>

            <button
              onClick={handleFinalizarExamen}
              className="bg-indigo-700 hover:bg-indigo-800 text-white px-6 py-2 rounded-xl shadow"
            >
              Finalizar Examen
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExamenView;
