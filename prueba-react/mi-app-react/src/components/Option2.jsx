import { useNavigate } from 'react-router-dom';

export default function Option2() {
  const navigate = useNavigate();

  return (
    <div style={{ padding: 20 }}>
      <h2>Opción 2</h2>
      <p>Esta es la segunda vista.</p>
      <button onClick={() => navigate('/')}>Volver al inicio</button>
    </div>
  );
}
