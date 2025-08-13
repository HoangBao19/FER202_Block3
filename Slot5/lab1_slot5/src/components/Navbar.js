import React from "react";
import { Link, NavLink } from "react-router-dom";
import { FaHeart } from "react-icons/fa";

export default function Navbar({ favCount = 0 }) {
  return (
    <header className="navbar">
      <div className="container nav-inner">
        <Link to="/" className="logo">Healthy Recipe Finder</Link>
        <nav className="nav-links">
          <NavLink to="/" end>Home</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/recipes">Recipes</NavLink>
          <NavLink to="/request" className="request-link">Recipe Request Form</NavLink>
        </nav>
        <div className="nav-actions">
          <Link to="/recipes" className="btn btn-primary">Browse recipes</Link>
          <div className="fav-badge" title="Favourites">
            <FaHeart />
            <span className="badge-count">{favCount}</span>
          </div>
        </div>
      </div>
    </header>
  );
}