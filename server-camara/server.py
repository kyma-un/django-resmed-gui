from flask import Flask, Response
from flask_cors import CORS
import cv2
import time

app = Flask(__name__)
CORS(app)

def generate_frames():
    cap = cv2.VideoCapture('video.mp4')

    if not cap.isOpened():
        raise RuntimeError("No se pudo abrir el archivo de video")

    fps = cap.get(cv2.CAP_PROP_FPS)
    delay = 1 / fps if fps > 0 else 1 / 60  # Delay basado en fps del archivo

    while True:
        success, frame = cap.read()
        if not success:
            cap.set(cv2.CAP_PROP_POS_FRAMES, 0)  # Reiniciar el video
            continue

        ret, buffer = cv2.imencode('.jpg', frame)
        frame_bytes = buffer.tobytes()

        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + frame_bytes + b'\r\n')

        time.sleep(delay)  # Delay basado en los fps del video

@app.route('/video_feed')
def video_feed():
    return Response(generate_frames(), mimetype='multipart/x-mixed-replace; boundary=frame')

@app.route('/')
def index():
    return '<h2>Servidor funcionando</h2><img src="/video_feed">'

if __name__ == '__main__':
    app.run(debug=False, host='0.0.0.0', port=8000, threaded=True)
