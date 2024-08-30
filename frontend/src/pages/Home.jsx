import React, { useContext } from "react";
import Navbar from "../components/Navbar";
import { AuthContext } from "../contexts/AuthContext";

function Home() {
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
  return (
    <div>
      <Navbar />
      {isAuthenticated ? <div>HOME Component</div> : null}
    </div>
  );
}

export default Home;
