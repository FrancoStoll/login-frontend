import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./Register.css";

const Register = () => {
  const [alerta, setAlerta] = useState({});
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    const FormData = new window.FormData(e.currentTarget);
    const fields = Object.fromEntries(FormData);
    const { name, email, password } = fields;

    if ([name, email, password].includes("")) {
      setAlerta({ msg: "Completa todos los campos" });
      return;
    }
    const options = {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(fields),
    };

    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/usuarios/create`,
        options
      );
      const data = await res.json();

      setAlerta(data);
      console.log(data)
      if (!data.ok) {
        throw new Error(data.msg);
      }
      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h2 className="text-4xl font-bold p-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">
        Crea tu cuenta
      </h2>
      <div className="form-container">
        <form className="form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Nombre</label>
            <input type="text" id="name" name="name" required="" />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" required="" />
          </div>
          <div className="form-group">
            <label htmlFor="email">Password</label>
            <input type="password" id="password" name="password" required="" />
          </div>

          {alerta.msg && <p>{alerta.msg}</p>}
          <div className="flex justify-between">
            <button className="form-submit-btn" type="submit">
              Crear Cuenta
            </button>

            <Link className="form-submit-btn" to="/">
              Ingresar
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default Register;
