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
      <div className="navbar__btn">
        {mode === 'login'
          ? <Link
            to="/register"
          //onClick={() => setMode('register')}
          >Registration</Link>
          : <Link
            to="/"
          //onClick={() => setMode('login')}
          >Login</Link>
        }
      </div>

    </div>
  )
}

export default Navbar;
