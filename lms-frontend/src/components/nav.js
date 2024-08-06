// src/components/Navbar.js

import React from 'react';
import { Link } from 'react-router-dom';
import '../css/nav.css'; 

function Nav() {
  return (
    <nav className="navbar navbar-expand-lg">
      <Link className="navbar-brand" to="/">myElemes</Link>
      <div className="navbar-collapse">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/">Home</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/login">Login</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/signup">Sign Up</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/profile">Profile</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/grades">Grades</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/logout">Logout</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Nav;
