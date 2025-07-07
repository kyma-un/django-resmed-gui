import React, { useState } from "react";
import { Button, Col, Row, Container } from "react-bootstrap";

export const Main = () => {
  const [state, setState] = useState();

  return (
    <Container fluid className="h-100">
      <Row className="h-100">
        {/* Sidebar */}
        <Col md={3} className="bg-primary text-white d-flex flex-column p-3">
          <h1>Rusmed</h1>
          <h6>Robotics UltraSound System</h6>
        </Col>

        {/* Main Content */}
        <Col md={9} className="d-flex flex-column justify-content-center align-items-center">
          <Button variant="primary" className="mb-3">
            Iniciar
          </Button>
          <Button variant="secondary">
            Otra Acción
          </Button>
        </Col>
      </Row>
    </Container>
  );
};
