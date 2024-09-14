import React, { useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";

function Signup() {
  const [data, setData] = useState({ email: "", username: "", password: "" });

  const handleSignUp = () => {
    const { email, username, password } = data;
    axios
      .post(
        "http://localhost:8000/api/v1/auth/signup",
        { email, username, password },
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
    <div>
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
          type="text"
          placeholder="Username"
          value={data.username}
          onChange={(e) => {
            setData({ ...data, username: e.target.value });
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
        <button onClick={handleSignUp}>Signup</button>
      </div>
    </div>
  );
}

export default Signup;
