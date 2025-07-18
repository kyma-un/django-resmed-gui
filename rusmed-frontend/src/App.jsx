import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Container, Row, Col, Button, Form, Image } from "react-bootstrap";
import { HouseFill, GearFill, InfoCircleFill } from "react-bootstrap-icons";
import { GoogleOAuthProvider } from '@react-oauth/google';

import { HomePage } from './pages/HomePage'; 
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css"
import LoginPage from './pages/LoginPage';
import AdminDashboard from './pages/AdminDashboard';
import HomePaciente from './pages/HomePaciente';
import HomeDoctor from './pages/HomeDoctor';
import ProtectedRoute from './components/ProtectedRoute';
import AdminCrearDoctor from './pages/AdminCrearDoctor';
import DoctorView from './pages/DoctorView';

const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
console.log("Google Client ID:", clientId);

function AppLayout({ children }) {
  return (
    <Container fluid>
      <Row className="general-container">
        <Col xs="auto" className="p-0">
          <Sidebar />
        </Col>
        <Col className="p-0 w-100">
          {children}
        </Col>
      </Row>
    </Container>
  );
}

function Sidebar({ userRole }) {
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
      {userRole === "admin" && (
        <Link to="/admin/crear-doctor" className="mb-4 text-white text-center">
          {/* Aquí podrías poner un icono, o texto pequeño */}
          Crear Doctor
        </Link>
      )}
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
    <GoogleOAuthProvider clientId={clientId}>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />

          <Route path="/paciente" element={
            <ProtectedRoute role="paciente">
              <AppLayout><HomePaciente /></AppLayout>
            </ProtectedRoute>
          } />

          <Route path="/doctor" element={
            <ProtectedRoute role="doctor">
              <AppLayout><DoctorView /></AppLayout>
            </ProtectedRoute>
          } />

          <Route path="/examen/:citaId" element={
            <ProtectedRoute role="doctor">
              <AppLayout>
                <ExamenView />
              </AppLayout>
            </ProtectedRoute>
          } />

          <Route path="/admin" element={
            <ProtectedRoute role="admin">
              <AppLayout><AdminDashboard /></AppLayout>
            </ProtectedRoute>
          } />

          <Route path="/admin/crear-doctor" element={
            <ProtectedRoute role="admin">
              <AppLayout><AdminCrearDoctor /></AppLayout>
            </ProtectedRoute>
          } />

          <Route path="/config" element={
            <ProtectedRoute>
              <AppLayout><Config /></AppLayout>
            </ProtectedRoute>
          } />

          <Route path="/about" element={
            <ProtectedRoute>
              <AppLayout><About /></AppLayout>
            </ProtectedRoute>
          } />

          <Route path="/home" element={
            <ProtectedRoute>
              <AppLayout><Home /></AppLayout>
            </ProtectedRoute>
          } />
        </Routes>
      </Router>
    </GoogleOAuthProvider>
  );
}

export default App;
