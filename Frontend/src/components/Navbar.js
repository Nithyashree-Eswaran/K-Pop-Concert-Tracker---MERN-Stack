import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-brand">
        <Link to="/">
          <img 
            src="/images/logo1.png" 
            className="nav-logo"
          />
          K-Poped :)
        </Link>
      </div>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/concerts">Concerts</Link>
        <Link to="/login">Login/Sign up</Link>
        <Link to="/register">Concerts Archive</Link>
      </div>
    </nav>
  );
}

export default Navbar;
