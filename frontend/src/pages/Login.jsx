import React, { useContext, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { ThemeContext } from "../contexts/ThemeContext";
import { toast, Toaster } from "react-hot-toast";
import AddBooks from "../components/AddBooks";

function Login() {
  const { theme } = useContext(ThemeContext);
  const [data, setData] = useState({ email: "", password: "" });

  const handleLogin = async () => {
    const { email, password } = data;
    axios
      .post(
        "/api/v1/auth/login",
        { email, password },
        { withCredentials: true, credentials: "include" }
      )
      .then((res) => {
        console.log(res.data);
        toast.success(res.data.message);
      })
      .catch((error) => {
        console.error(error.response.data.error.message);
        toast.error(error.response.data.error.message);
      });
  };
  return (
    <div
      className={
        theme == "dark" ? "bg-gray-950 h-screen text-white" : "bg-white"
      }
    >
      <Navbar />
      <div className="h-screen w-screen flex flex-col gap-2 justify-center items-center">
        <input
          className={
            theme === "dark"
              ? "bg-gray-700 h-6 rounded-xl px-4"
              : "h-6 rounded-xl px-4 border border-black"
          }
          type="text"
          placeholder="Email"
          value={data.email}
          onChange={(e) => {
            setData({ ...data, email: e.target.value });
          }}
        />
        <input
          className={
            theme === "dark"
              ? "bg-gray-700 h-6 rounded-xl px-4"
              : "h-6 rounded-xl px-4 border border-black"
          }
          type="password"
          placeholder="Password"
          value={data.password}
          onChange={(e) => {
            setData({ ...data, password: e.target.value });
          }}
        />
        <button
          className="h-6 rounded-xl px-4 bg-orange-500"
          onClick={handleLogin}
        >
          Login
        </button>
      </div>
      {/* <AddBooks /> */}
      <Toaster position="botton-right" />
    </div>
  );
}

export default Login;
