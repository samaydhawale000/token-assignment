import React from "react";
import "./navbar.css";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.jpeg";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="logo">
          <img src={logo} alt="Logo" />
          <h2>BlueMart</h2>
        </div>
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About Us</Link></li>
          <li><Link to="/products">Products</Link></li>
          <li><Link to="/contact">Contact Us</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
