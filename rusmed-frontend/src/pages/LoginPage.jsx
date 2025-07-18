import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext.jsx";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";


const LoginPage = () => {
  const { authData, setAuthData } = useContext(AuthContext);
  const [form, setForm] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleLoginSuccess = (token) => {
    const decoded = jwtDecode(token);
    const role = decoded.role;

    setAuthData({ token, user: decoded });
    localStorage.setItem("token", token);
    localStorage.setItem("role", role);

    console.log("rol ingresado:", role);
    console.log("Usuario decodificado:", decoded); // Para que veas la info en consola

    // Cambia "role" por el nombre del campo correcto en tu token:

    if (role === "admin") {
      navigate("/admin");
    } else if (role === "doctor") {
      navigate("/doctor");
    } else if (role === "paciente") {
      navigate("/paciente");
    } else {
      navigate("/home"); // Ruta por defecto
    }
  };
  
  const handleManualLogin = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/login/manual/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (res.ok) {
        handleLoginSuccess(data.access);  
      } else {
        alert(data.error || "Error de login");
      }
    } catch (err) {
      console.error("Login manual falló:", err);
    }
  };

  const handleGoogleLogin = async (response) => {
    try {
      const res = await fetch("http://localhost:8000/api/login/google/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: response.credential }),
      });

      const data = await res.json();
      console.log("Token generado por el backend:", data.access);
      if (res.ok) {
        handleLoginSuccess(data.access);
      } else {
        alert(data.error || "Error con Google login");
      }
    } catch (err) {
      console.error("Login con Google falló:", err);
    }
  };

  // 👇 Aquí inicializas el botón de Google
  useEffect(() => {
    if (window.google && window.google.accounts) {
      window.google.accounts.id.initialize({
        client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID, // ← reemplaza con tu ID
        callback: handleGoogleLogin,
      });

      window.google.accounts.id.renderButton(
        document.getElementById("google-login-btn"),
        { theme: "outline", size: "large" }
      );
    } else {
      console.error("Google API no cargada.");
    }
  }, []);

  return (
    <div>
      <h2>Login</h2>

      <input
        type="text"
        placeholder="Usuario"
        value={form.username}
        onChange={(e) => setForm({ ...form, username: e.target.value })}
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />
      <button onClick={handleManualLogin}>Iniciar sesión</button>

      <div className="my-3">O</div>

      <div id="google-login-btn" />
    </div>
  );
};

export default LoginPage;
