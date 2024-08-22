import React, { useState, useEffect } from "react";
import logo from "../../../assets/BackroundImg/Logo.png";
import { FaBars, FaTimes } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import { fetchNewsData } from "../../../Providers/FetchNewsData";
import "./Burger.scss";

const Burger = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [newsData, setNewsData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const { news } = await fetchNewsData();
      setNewsData(news);
    };

    fetchData();
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNewsClick = () => {
    if (newsData.length > 0) {
      const randomIndex = Math.floor(Math.random() * newsData.length);
      const randomNewsId = newsData[randomIndex].id;
      toggleMenu(); // Close the menu
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
            <li>
              <NavLink className="fix" to="/Login" onClick={toggleMenu}>
                Login
              </NavLink>
            </li>
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
