import React from "react";
import "./navbar.css";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.jpeg";
import { GiHamburgerMenu } from "react-icons/gi";

const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="logo">
          <img src={logo} alt="Logo" />
          <h2>BlueMart</h2>
        </div>
        <ul className="nav-links">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/products">Products</Link>
          </li>
          <li>
            <Link to="/favorites">Favorites</Link>
          </li>
        </ul>
        <div className="hamburger-menu">
          <GiHamburgerMenu onClick={() => setIsOpen((prev) => !prev)} />
          {isOpen && (
            <div>
              <Link to="/">Home</Link>

              <Link to="/products">Products</Link>
              <Link to="/favorites">Favorites</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
