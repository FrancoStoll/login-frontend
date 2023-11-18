import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import AuthLayout from "./Layouts/AuthLayout/AuthLayout";
import Login from "./paginas/Login/Login";
import Register from "./paginas/Register/Register";
import "./App.css";
import HomePrivate from "./Layouts/HomeLayout/HomePrivate";
import Home from './paginas/Homepage/Home'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Login */}

          <Route path="/" element={<AuthLayout />}>
            <Route index element={<Login />} />
            <Route path="createAcc" element={<Register />} />
          </Route>

          {/* Home routes */}
          <Route path="/home" element={<HomePrivate />}>
            <Route index element={<Home />} />
          </Route>


        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
