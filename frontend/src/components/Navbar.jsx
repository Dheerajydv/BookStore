import React, { useCallback, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { ThemeContext } from "../contexts/ThemeContext";

function Navbar() {
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
  const { theme, setTheme } = useContext(ThemeContext);
  const [searchInput, setSearchInput] = useState("");
  const navigate = useNavigate();

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
          src={isAuthenticated ? "../assets/pfp2.jpg" : "../assets/pfp.jpg"}
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
