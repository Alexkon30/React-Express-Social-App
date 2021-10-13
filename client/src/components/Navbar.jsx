import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import GlobalContext from '../context/GlobalContext';

const Navbar = () => {
  const { mode, logout, isAuth } = useContext(GlobalContext)

  if (!isAuth) {
    return (
      <div className="navbar">
        <div className="navbar__logo">
          <a href="/">
            <img src="logo_2.png" alt="logo" />
          </a>
        </div>
        <div className="navbar__btn" >
          {mode === 'login'
            ? <Link to="/register">Registration</Link>
            : <Link to="/login">Login</Link>
          }
        </div>
      </div>
    )
  }

  return (
    <div className="navbar">
      <div className="navbar__logo">
        <a href="/">
          <img src="logo_2.png" alt="logo" />
        </a>
      </div>
      <div className="navbar__btn" >
        <Link to="/login" onClick={logout}>Logout</Link>
      </div>
    </div>
  )
}

export default Navbar;
