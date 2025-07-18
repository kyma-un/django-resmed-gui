// src/pages/DoctorDashboard.jsx
import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from 'react-router-dom';

const DoctorDashboard = () => {
  const { authData } = useContext(AuthContext);
  const [citas, setCitas] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCitas = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:8000/api/citas/doctor", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (res.ok) setCitas(data);
        else console.error("Error al traer citas:", data);
      } catch (error) {
        console.error("Error de red:", error);
      }
    };

    fetchCitas();
  }, []);

  const handleSelectCita = (cita) => {
    // Navegar a la vista examen pasando el id de la cita
    navigate(`/examen/${cita.id}`);
  };

  return (
    <div>
      <h2>Citas del día</h2>
      <ul>
        {citas.map((cita) => (
          <li key={cita.id} onClick={() => handleSelectCita(cita)} style={{ cursor: 'pointer' }}>
            {cita.fecha} - {cita.hora} - {cita.paciente.nombre} - {cita.examen.nombre}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DoctorDashboard;