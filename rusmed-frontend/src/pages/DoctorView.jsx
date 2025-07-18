import React, { useState } from 'react';
import { Button, Form, Container } from 'react-bootstrap';

const DoctorView = () => {
  const [slider1, setSlider1] = useState(50);
  const [slider2, setSlider2] = useState(30);

  const handleButton1 = () => {
    alert(`Botón 1 presionado. Valor slider1: ${slider1}`);
  };

  const handleButton2 = () => {
    alert(`Botón 2 presionado. Valor slider2: ${slider2}`);
  };

  return (
    <Container className="p-4">
      <h2>Panel Doctor</h2>

      <Form.Group className="mb-3">
        <Form.Label>Slider 1: {slider1}</Form.Label>
        <Form.Range 
          value={slider1} 
          onChange={(e) => setSlider1(e.target.value)} 
          min={0} max={100} 
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Slider 2: {slider2}</Form.Label>
        <Form.Range 
          value={slider2} 
          onChange={(e) => setSlider2(e.target.value)} 
          min={0} max={100} 
        />
      </Form.Group>

      <div className="d-flex gap-3">
        <Button variant="primary" onClick={handleButton1}>
          Botón 1
        </Button>

        <Button variant="secondary" onClick={handleButton2}>
          Botón 2
        </Button>
      </div>
    </Container>
  );
};

export default DoctorView;
