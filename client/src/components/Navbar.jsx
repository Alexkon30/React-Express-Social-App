import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import ModeContext from '../context/context';

const Navbar = () => {
  const { mode, setMode } = useContext(ModeContext)

  return (
    <div className="navbar">
      <div className="navbar__logo">
        <a href="/">
          <img src="logo_2.png" alt="logo" />
        </a>
      </div>
      {mode === 'login'
        ? <div
          className="navbar__login"
          onClick={() => setMode('register')}
        >
          <Link to="/register">Registration</Link>
        </div>
        : <div
          className="navbar__login"
          onClick={() => setMode('login')}
        >
          <Link to="/">Login</Link>
        </div>
      }
    </div>
  )
}

export default Navbar;
