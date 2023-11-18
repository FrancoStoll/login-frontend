import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import "./Login.css";
import useAuth from "../../hooks/useAuth";

const Login = () => {
  const [alerta, setAlerta] = useState({});
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { elements } = e.currentTarget;

    const email = elements.namedItem("email").value;
    const password = elements.namedItem("password").value;

    if ([email, password].includes("")) {
      return setAlerta({ msg: "Completa todos lo campos" });
    }

    const options = {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ email, password }),
    };

    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/usuarios/login`,
        options
      );
      const data = await res.json();

      if (!data.res) {
        setAlerta({ msg: data.msg });
      }

      setAlerta({});
      localStorage.setItem("token", data.token);
      setAuth(data);
      navigate("/home");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h2 className="text-4xl font-bold p-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">
        Inicia Sesión
      </h2>
      <div className="form-container">
        <form className="form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" required="" />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" required="" />
          </div>
          {alerta.msg && <p>{alerta.msg}</p>}
          <div className="flex justify-between">
            <button className="form-submit-btn" to="/">
              Ingresar
            </button>

            <Link className="form-submit-btn" type="submit" to="/createAcc">
              Crear Cuenta
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
