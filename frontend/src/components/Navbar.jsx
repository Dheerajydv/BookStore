import React, { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { ThemeContext } from "../contexts/ThemeContext";
import axios from "axios";

function Navbar() {
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
  const { theme, setTheme } = useContext(ThemeContext);
  const [searchInput, setSearchInput] = useState("");
  const navigate = useNavigate();
  let profileUrl = "";

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/v1/auth/getuser", {
        withCredentials: true,
      })
      .then((response) => {
        profileUrl = response.data.data.profilePicture;
      })
      .catch((err) => {
        console.error(err);
      });
  });

  const handelLogoutBtnClick = () => {
    setIsAuthenticated(false);
  };

  const handelLoginBtnClick = () => {
    navigate("/login");
  };

  const handelSignupBtnClick = () => {
    navigate("/signup");
  };

  const handleSearchBtnClick = () => {
    console.log(searchInput);
  };

  const themeChangeBtnClickFunction = () => {
    if (theme == "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  };

  return (
    <div
      className={
        theme === "dark"
          ? "bg-gray-950 text-white flex justify-around items-center"
          : "bg-white text-black flex justify-around items-center"
      }
    >
      <div
        onClick={() => {
          navigate("/");
        }}
      >
        <h1 className="font-extrabold text-2xl">BookStore</h1>
      </div>
      <div>
        <img
          src={isAuthenticated ? `profileUrl` : "../assets/pfp.jpg"}
          alt="Profile Picture"
        />
      </div>
      <div>
        <input
          type="text"
          placeholder="Search Books"
          name="searchInput"
          value={searchInput}
          onChange={(e) => {
            setSearchInput(e.target.value);
          }}
        />
        <button onClick={handleSearchBtnClick}>🔍</button>
      </div>
      <div>
        {isAuthenticated ? null : (
          <button
            className={
              theme == "dark"
                ? "bg-orange-500 rounded-lg px-2"
                : "bg-orange-500 rounded-lg px-2"
            }
            onClick={handelSignupBtnClick}
          >
            Signup
          </button>
        )}
        <button
          className={
            theme == "dark"
              ? "border border-orange-500 rounded-lg px-2"
              : "border border-orange-500 rounded-lg px-2"
          }
          onClick={isAuthenticated ? handelLogoutBtnClick : handelLoginBtnClick}
        >
          {isAuthenticated ? "Logout" : "Login"}
        </button>
      </div>
      <div>
        <button onClick={themeChangeBtnClickFunction}>
          {theme == "dark" ? "☀" : "🌑"}
        </button>
      </div>
    </div>
  );
}

export default Navbar;
