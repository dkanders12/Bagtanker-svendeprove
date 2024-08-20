import React from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.scss";
const Navbar = () => {
  return (
    <ul id="secondNavbar">
      <div>
        <li>
          <NavLink to="/Rundstykker">Rundstykker</NavLink>
        </li>
        <li>
          <NavLink to="/Baguettes">Baguettes</NavLink>
        </li>
        <li>
          <NavLink to="/Franskbrød">Franskbrød</NavLink>
        </li>
        <li>
          <NavLink to="/Kager">Kager</NavLink>
        </li>
        <li>
          <NavLink to="/Rugbrød">Rugbrød</NavLink>
        </li>
      </div>
    </ul>
  );
};

export default Navbar;
