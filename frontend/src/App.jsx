import Home from "./pages/Home";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { useContext, useEffect } from "react";
import { AuthContext } from "./contexts/AuthContext";

function App() {
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
  useEffect(() => {
    const accessToken = document.cookie.replace("accessToken=", "");
    if (accessToken) {
      setIsAuthenticated(true);
    }
  }, [setIsAuthenticated]);
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={isAuthenticated ? <Home /> : <Navigate to="/login" />}
        />
        <Route
          path="/home"
          element={isAuthenticated ? <Home /> : <Navigate to="/login" />}
        />
        <Route
          path="/login"
          element={isAuthenticated ? <Navigate to="/home" /> : <Login />}
        />
        <Route
          path="/signup"
          element={isAuthenticated ? <Navigate to="/home" /> : <Signup />}
        />
      </Routes>
    </>
  );
}

export default App;
