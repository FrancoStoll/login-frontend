import { createContext, useEffect, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    const authUser = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      const options = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        const res = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/usuarios/perfil`,
          options
        );
        const data = await res.json();
        setAuth(data);
      } catch (error) {
        console.log(error);
      }

      setLoading(false);
    };

    authUser();
  }, []);

  const clearSesion = () => {
    setAuth({});
  };

  return (
    <AuthContext.Provider
      value={{ auth, setAuth, loading, setLoading, clearSesion }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };

export default AuthContext;
