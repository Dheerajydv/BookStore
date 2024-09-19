import React, { useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";

function Signup() {
  const [data, setData] = useState({
    email: "",
    username: "",
    password: "",
  });

  const [profilePicture, setProfilePicture] = useState(null);

  const handleSignUp = (e) => {
    e.preventDefault();
    console.log(data);
    const { email, username, password } = data;
    axios
      .post(
        "http://localhost:8000/api/v1/auth/signup",
        { email, username, password, profilePicture },
        {
          withCredentials: true,
          credentials: "include",
          headers: { "Content-Type": "multipart/form-data" },
        }
      )
      .then((res) => {
        console.log(res.data);
        toast.success(res.data.message);
      })
      .catch((error) => {
        console.error(error.response.data.message);
        toast.error(error.response.data.message);
      });
  };
  return (
    <div>
      <Navbar />
      <form>
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
        <input
          type="file"
          onChange={(e) => {
            setProfilePicture(e.target.files[0]);
          }}
        />
        {/* <form
          action="http://localhost:8000/api/v1/auth/signup"
          method="POST"
          encType="multipart/form-data"
        >
          <input type="file" />
        </form> */}
        <button onClick={handleSignUp}>Signup</button>
      </form>
      <Toaster position="bottom-right" />
    </div>
  );
}

export default Signup;
