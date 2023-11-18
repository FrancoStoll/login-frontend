import { Outlet } from "react-router-dom";

import "./AuthLayout.css";

const AuthLayout = () => {
  return (
    <div className="flex items-center justify-center h-screen" id="container">
      <div className="h-screen w-full flex flex-col justify-center items-center">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
