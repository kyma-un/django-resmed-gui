export default function LiveStream() {
  return (
    <div style={{ marginTop: 30 }}>
      <h3>Stream de Cámara en Vivo</h3>
      <img
        src="http://localhost:8000/video_feed"
        alt="Live Camera Feed"
        style={{ width: '640px', height: '360px', border: '1px solid black' }}
      />
    </div>
  );
}
