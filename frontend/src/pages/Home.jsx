import React, { useContext } from "react";
import Navbar from "../components/Navbar";
import { AuthContext } from "../contexts/AuthContext";
import Login from "./Login";
import Signup from "./Signup";

function Home() {
  const { isAuthenticated } = useContext(AuthContext);
  return (
    <div>
      <Navbar />
    </div>
  );
}

export default Home;
