import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LiveStream from './Livestream';

export default function Home() {
  const [slider1, setSlider1] = useState(50);
  const [slider2, setSlider2] = useState(50);
  const [showCamera, setShowCamera] = useState(false);

  return (
    <div style={{ padding: 20 }}>
      <h2>Vista Principal</h2>

      <div>
        <button onClick={() => alert('Botón 1 presionado')}>Botón 1</button>
        <button onClick={() => alert('Botón 2 presionado')} style={{ marginLeft: 10 }}>
          Botón 2
        </button>
      </div>

      <div style={{ marginTop: 20 }}>
        <label>Posicion axial: {slider1}</label><br />
        <input
          type="range"
          min="0"
          max="100"
          value={slider1}
          onChange={(e) => setSlider1(e.target.value)}
        />
      </div>

      <div style={{ marginTop: 20 }}>
        <label>Acercamiento: {slider2}</label><br />
        <input
          type="range"
          min="0"
          max="100"
          value={slider2}
          onChange={(e) => setSlider2(e.target.value)}
        />
      </div>

      <div style={{ marginTop: 30 }}>
        <button onClick={() => setShowCamera(!showCamera)}>
          {showCamera ? 'Ocultar Cámara' : 'Mostrar Cámara'}
        </button>
      </div>

      {showCamera && <LiveStream />}
    </div>
  );
}
