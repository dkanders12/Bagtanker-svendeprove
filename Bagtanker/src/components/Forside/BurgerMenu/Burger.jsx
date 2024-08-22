import React, { useState, useEffect } from "react";
import logo from "../../../assets/BackroundImg/Logo.png";
import { FaBars, FaTimes } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import { fetchNewsData } from "../../../Providers/FetchNewsData";
import { supabase } from "../../../Providers/LoginContoller"; // Ensure this path is correct
import "./Burger.scss";

const Burger = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [newsData, setNewsData] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const { news } = await fetchNewsData();
      setNewsData(news);
    };

    fetchData();

    // Check for access token to determine if user is logged in
    const accessToken = localStorage.getItem("access_token");
    if (accessToken) {
      setIsLoggedIn(true);
    }

    // Listen for localStorage changes (such as logging out)
    const handleStorageChange = () => {
      const token = localStorage.getItem("access_token");
      setIsLoggedIn(!!token); // Update login status based on token presence
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    localStorage.removeItem("user");
    localStorage.removeItem("access_token");
    window.dispatchEvent(new Event("storage")); // Trigger storage event manually
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNewsClick = () => {
    if (newsData.length > 0) {
      const randomIndex = Math.floor(Math.random() * newsData.length);
      const randomNewsId = newsData[randomIndex].id;
      toggleMenu();
      navigate(`/News/${randomNewsId}`);
    }
  };

  return (
    <>
      <nav id="navbar">
        <img src={logo} alt="Logo" />
        <ul id="Links" className={isMenuOpen ? "open" : ""}>
          <div id="fixer">
            <li>
              <NavLink className="fix" to="/" onClick={toggleMenu}>
                Forside
              </NavLink>
            </li>
            <li>
              <NavLink className="fix" to="/Rundstykker" onClick={toggleMenu}>
                Produkter
              </NavLink>
            </li>
            <li>
              <span className="fix" onClick={handleNewsClick}>
                Nyheder
              </span>
            </li>
            <li>
              <NavLink className="fix" to="/Kontakt" onClick={toggleMenu}>
                Kontakt
              </NavLink>
            </li>
            {isLoggedIn && (
              <li>
                <NavLink className="fix" to="/minSide" onClick={toggleMenu}>
                  Min Side
                </NavLink>
              </li>
            )}
            {isLoggedIn ? (
              <li>
                <span className="fix" onClick={handleLogout}>
                  Logout
                </span>
              </li>
            ) : (
              <li>
                <NavLink className="fix" to="/Login" onClick={toggleMenu}>
                  Login
                </NavLink>
              </li>
            )}
          </div>
        </ul>
        <div
          id="MenuToggle"
          onClick={toggleMenu}
          className={isMenuOpen ? "open" : ""}
        >
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </div>
      </nav>
    </>
  );
};

export default Burger;
