import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navber__links">
        <Link to="/register">Register</Link>
        <Link to="/login">Login</Link>
        <Link to="/">Main</Link>
      </div>
    </div>
  )
}

export default Navbar
