import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import "./HomePrivate.css";

const HomePrivate = () => {
  const { auth, loading } = useAuth();


  if (loading) return "Loading....";
  return (
    <>
      {auth._id ? (
        <div className="h-screen w-full flex flex-col justify-center items-center" id="container">
          <Outlet />
        </div>
      ) : (
        <Navigate to="/" />
      )}
    </>
  );
};

export default HomePrivate;
