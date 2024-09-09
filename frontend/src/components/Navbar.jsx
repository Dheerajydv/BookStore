import React, { useCallback, useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { ThemeContext } from "../contexts/ThemeContext";

function Navbar() {
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
  const { theme, setTheme } = useContext(ThemeContext);
  const [searchInput, setSearchInput] = useState("");

  const handelLogoutBtnClick = () => {
    console.log("logged Out");
    setIsAuthenticated(false);
  };

  const handelLoginBtnClick = () => {
    console.log("logged Out");
    setIsAuthenticated(true);
  };

  const handelSignupBtnClick = () => {
    console.log("Signed UP");
    setIsAuthenticated(true);
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
    <div>
      <div>
        <h1>BookStore</h1>
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
          <button onClick={handelSignupBtnClick}>Signup</button>
        )}
        <button
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
