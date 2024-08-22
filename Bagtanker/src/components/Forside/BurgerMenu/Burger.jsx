import React, { useState } from "react";
import logo from "../../../assets/BackroundImg/Logo.png";
import { FaBars, FaTimes } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import "./Burger.scss";
const Burger = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return (
    <>
      <nav id="navbar">
        <img src={logo} alt="" />
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
              <NavLink className="fix" to="/News/:id" onClick={toggleMenu}>
                Nyheder
              </NavLink>
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
