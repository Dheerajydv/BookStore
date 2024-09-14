import React, { useContext, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { ThemeContext } from "../contexts/ThemeContext";

function Login() {
  const { theme, setTheme } = useContext(ThemeContext);
  const [data, setData] = useState({ email: "", password: "" });

  const handleLogin = async () => {
    const { email, password } = data;
    axios
      .post(
        "http://localhost:8000/api/v1/auth/login",
        { email, password },
        { withCredentials: true, credentials: "include" }
      )
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.error(error.response.data.message);
      });
  };
  return (
    <div
      className={
        theme == "dark" ? "bg-gray-950 h-screen text-white" : "bg-white"
      }
    >
      <Navbar />
      <div>
        <input
          type="text"
          placeholder="Email"
          value={data.email}
          onChange={(e) => {
            setData({ ...data, email: e.target.value });
          }}
        />
        <input
          type="password"
          placeholder="Password"
          value={data.password}
          onChange={(e) => {
            setData({ ...data, password: e.target.value });
          }}
        />
        <button onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
}

export default Login;
