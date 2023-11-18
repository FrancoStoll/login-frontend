import { formatearFecha } from "../../helpers/formatearFecha";
import logoUser from "../../assets/5856.jpg";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { auth, clearSesion, loading } = useAuth();
  const navigate = useNavigate();
  const { _id, name, createdAt } = auth;
  const handleLogOut = () => {
    localStorage.removeItem("token");
    clearSesion();
    navigate("/");
  };

  if (loading) return "Loading....";

  return (
    <div className="bg-transparent shadow">
      <div
        className="max-w-2xl w-[500px]"
        style={{
          padding: "15px",
          borderWidth: "2px",
          borderStyle: "solid",
          borderImage: "linear-gradient(to right, #3498db, #8e44ad, #e74c3c) 1",
        }}
      >
        <div className="text-white flex gap-5 py-4">
          <div className="flex items-center justify-center">
            <img src={logoUser} className="w-44 rounded-full" alt="#" />
          </div>

          <div className="w-full flex flex-col gap-5">
            <div className="text-sm text-gray-300">{`id: ${_id}`}</div>
            <div>
              Bienvenido,
              <span className="font-bold text-xl p-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">
                {name ? name : undefined}
              </span>
            </div>

            <div>{`Tu cuenta fue creada el ${formatearFecha(createdAt)}`}</div>
          </div>
          <hr />
        </div>
        <div className="flex justify-between py-4 text-white">
          <p className="py-2 text-gray-400">Deseas cerrar sesión?</p>
          <button
            onClick={handleLogOut}
            className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 text-white font-bold py-2 px-4 rounded"
          >
            Cerrar Sesión
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
