import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Container, Row, Col, Button, Form, Image } from "react-bootstrap";
import { HouseFill, GearFill, InfoCircleFill } from "react-bootstrap-icons";

import { HomePage } from './pages/HomePage'; 
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css"

function Sidebar() {
  return (
    <div className="d-flex flex-column bg-dark text-white p-3 vh-100" style={{ width: "80px" }}>
      <Link to="/" className="mb-4 text-white text-center">
        <HouseFill size={24} />
      </Link>
      <Link to="/config" className="mb-4 text-white text-center">
        <GearFill size={24} />
      </Link>
      <Link to="/about" className="mb-4 text-white text-center">
        <InfoCircleFill size={24} />
      </Link>
    </div>
  );
}

function Home() {
  return (
 <>
  <HomePage/> 
 </>
  );
}

function Config() {
  return (
    <Form className="p-4">
      <Form.Group className="mb-3">
        <Form.Label>Slider 1</Form.Label>
        <Form.Range />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Slider 2</Form.Label>
        <Form.Range />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Input 1</Form.Label>
        <Form.Control type="text" placeholder="Type here" />
      </Form.Group>
    </Form>
  );
}

function About() {
  return (
    <div className="p-4">
      <h2>About Us</h2>
      <p>We are a small team dedicated to building modern React UIs with Bootstrap.</p>
      <div className="d-flex gap-3">
        <Image src="https://via.placeholder.com/100" roundedCircle />
        <Image src="https://via.placeholder.com/100" roundedCircle />
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Container fluid>
        <Row className="general-container">
          <Col xs="auto" className="p-0">
            <Sidebar />
          </Col>
          <Col className="p-0 w-100 ">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/config" element={<Config />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </Col>
        </Row>
      </Container>
    </Router>
  );
}

export default App;
