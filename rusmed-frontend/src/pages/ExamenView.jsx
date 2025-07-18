import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from 'axios';

const ExamenView = ({ doctorId }) => {
  const [citas, setCitas] = useState([]);
  const [citaActiva, setCitaActiva] = useState(null);
  const [examen, setExamen] = useState(null);
  const [diagnostico, setDiagnostico] = useState('');
  const [velocidad, setVelocidad] = useState(1);
  const [profundidad, setProfundidad] = useState(1);
  const [enProceso, setEnProceso] = useState(false);

  useEffect(() => {
    axios.get(`/api/citas-doctor/?doctor_id=${doctorId}`)
      .then(response => setCitas(response.data))
      .catch(error => console.error('Error al cargar citas:', error));
  }, [doctorId]);

  const iniciarExamen = (cita) => {
    setCitaActiva(cita);
    setExamen({
      cita_id: cita.id,
      paciente: cita.paciente,
      tipo_examen: cita.tipo_examen,
    });
    setEnProceso(true);
  };

  const guardarExamen = () => {
    axios.post('/api/examenes/', {
      cita: examen.cita_id,
      diagnostico,
      velocidad,
      profundidad,
    })
      .then(res => {
        alert('Examen guardado correctamente');
        setEnProceso(false);
        setCitaActiva(null);
        setDiagnostico('');
        setExamen(null);
      })
      .catch(err => {
        console.error('Error al guardar examen:', err);
        alert('Error al guardar examen');
      });
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Citas del Día</h2>
      <ul className="space-y-4">
        {citas.map((cita) => (
          <li key={cita.id} className="border p-4 rounded-xl shadow-md bg-white">
            <div className="flex flex-col">
              <span><strong>Paciente:</strong> {cita.paciente_nombre}</span>
              <span><strong>Examen:</strong> {cita.tipo_examen}</span>
              <span><strong>Hora:</strong> {cita.hora}</span>
              <button
                className="mt-3 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                onClick={() => iniciarExamen(cita)}
              >
                Iniciar Examen
              </button>
            </div>
          </li>
        ))}
      </ul>

      {enProceso && (
        <div className="mt-8 border-t pt-6">
          <h3 className="text-xl font-semibold mb-4">Examen en curso</h3>

          <div className="mb-4">
            <label className="block font-medium mb-1">Diagnóstico:</label>
            <textarea
              value={diagnostico}
              onChange={(e) => setDiagnostico(e.target.value)}
              className="w-full border rounded p-2"
              rows={4}
              placeholder="Escribe el diagnóstico..."
            />
          </div>

          <div className="flex gap-6 mb-4">
            <div>
              <label className="block mb-1">Velocidad:</label>
              <input
                type="range"
                min="1"
                max="10"
                value={velocidad}
                onChange={(e) => setVelocidad(e.target.value)}
              />
              <div className="text-center">{velocidad}</div>
            </div>

            <div>
              <label className="block mb-1">Profundidad:</label>
              <input
                type="range"
                min="1"
                max="10"
                value={profundidad}
                onChange={(e) => setProfundidad(e.target.value)}
              />
              <div className="text-center">{profundidad}</div>
            </div>
          </div>

          <div className="flex gap-4 mt-4">
            <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
              ▶️ Play
            </button>
            <button className="px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700">
              ⏸️ Pausa
            </button>
            <button
              className="ml-auto px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
              onClick={guardarExamen}
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